import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useRef, useMemo, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
function clamp01(v) {
  return Math.min(1, Math.max(0, v));
}
const VS = `
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;
const FS = `
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2  uMouse;
uniform vec2  uPrevMouse;
uniform vec2  uRes;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p){
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p){
  float v = 0.0;
  float a = 0.58;
  for(int i=0;i<3;i++){
    v += a * noise(p);
    p *= 2.02;
    a *= 0.52;
  }
  return v;
}

vec2 flowField(vec2 p, float t){
  float e = 0.0032;
  vec2 tp = vec2(0.10*t, -0.07*t);
  float n  = fbm(p + tp);
  float nx = fbm(p + vec2(e,0.0) + tp);
  float ny = fbm(p + vec2(0.0,e) + tp);
  vec2 g = vec2(nx-n, ny-n)/e;
  return vec2(g.y, -g.x);
}

float sdSegment(vec2 p, vec2 a, vec2 b){
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa,ba)/dot(ba,ba), 0.0, 1.0);
  return length(pa - ba*h);
}

void main(){
  vec2 uv = vUv;
  vec2 aspect = vec2(uRes.x / uRes.y, 1.0);

  vec2 p  = (uv - 0.5) * aspect;
  vec2 m  = (uMouse - 0.5) * aspect;
  vec2 pm = (uPrevMouse - 0.5) * aspect;

  float t = uTime;

  vec2 f0 = flowField(p * 1.05, t);
  vec2 f1 = flowField(p * 1.90 + 1.6, t * 0.83);
  vec2 flow = f0 * 0.58 + f1 * 0.42;

  float dist = length(p - m);
  float influence = exp(-dist * 1.9);

  p += flow * 0.13;
  p += flow * 0.26 * influence;

  float nA = fbm(p * 1.25 + vec2(0.06*t, 0.03*t));
  float nB = fbm(p * 2.05 + vec2(-0.04*t, 0.07*t) + 2.0);
  float nC = fbm(p * 3.00 + vec2(0.02*t, -0.05*t) - 1.5);

  float nebA = smoothstep(0.25, 0.92, nA);
  float nebB = smoothstep(0.35, 0.97, nB) * 0.85;
  float fil  = smoothstep(0.42, 0.99, nC) * 0.55;

  vec3 dark   = vec3(0.02, 0.02, 0.03);
  vec3 amber  = vec3(1.00, 0.62, 0.25);
  vec3 orange = vec3(1.00, 0.40, 0.12);
  vec3 cream  = vec3(1.00, 0.84, 0.69);

  vec3 col = dark;
  col += amber  * nebA * 0.48;
  col += orange * nebB * 0.56;
  col += cream  * fil  * 0.20;

  float core = smoothstep(0.22, 0.0, dist) * 0.20;
  float halo = smoothstep(0.55, 0.0, dist) * 0.10;
  col += (amber * 0.42 + cream * 0.10) * core;
  col += (orange * 0.18) * halo;

  float cutDist = sdSegment(p, pm, m);
  float speed = length(m - pm);

  float radius = mix(0.032, 0.090, clamp(speed * 22.0, 0.0, 1.0));
  float cut = smoothstep(radius, 0.0, cutDist);

  float cutStrength = (0.10 + 0.22 * clamp(speed * 14.0, 0.0, 1.0));
  col -= cut * cutStrength;
  col += cut * (amber * 0.09 + cream * 0.03);

  float vig = smoothstep(0.98, 0.30, length((uv - 0.5) * aspect));
  col *= (0.56 + 0.44 * vig);

  float g = noise(uv * uRes * 0.18 + t * 0.45);
  col += (g - 0.5) * 0.016;

  gl_FragColor = vec4(col, 1.0);
}
`;
function Quad({
  onContextLost,
  quality = "high",
  interactive = true
}) {
  const matRef = useRef(null);
  const { size, gl } = useThree();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.55, 0.45) },
      uPrevMouse: { value: new THREE.Vector2(0.55, 0.45) },
      uRes: { value: new THREE.Vector2(1, 1) }
    }),
    []
  );
  const mouseTarget = useRef(new THREE.Vector2(0.55, 0.45));
  const prevMouse = useRef(new THREE.Vector2(0.55, 0.45));
  const dprRef = useRef(quality === "low" ? 0.88 : 1.15);
  const avgDt = useRef(1 / 60);
  const frameRef = useRef(0);
  useEffect(() => {
    uniforms.uRes.value.set(size.width, size.height);
  }, [size.width, size.height, uniforms]);
  useEffect(() => {
    if (!interactive) return;
    const el = gl.domElement;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = clamp01((e.clientX - r.left) / Math.max(1, r.width));
      const y = clamp01(1 - (e.clientY - r.top) / Math.max(1, r.height));
      mouseTarget.current.set(x, y);
    };
    const onLost = (e) => {
      e.preventDefault?.();
      onContextLost();
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("webglcontextlost", onLost, { passive: false });
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("webglcontextlost", onLost);
    };
  }, [gl, onContextLost, interactive]);
  useFrame((_, delta) => {
    if (!matRef.current) return;
    if (quality === "low") {
      frameRef.current += 1;
      if (frameRef.current % 2 !== 0) return;
    }
    const dt = Math.min(0.033, Math.max(1e-3, delta));
    avgDt.current = avgDt.current * 0.92 + dt * 0.08;
    const m = matRef.current.uniforms.uMouse.value;
    const pm = matRef.current.uniforms.uPrevMouse.value;
    pm.copy(prevMouse.current);
    const lerpK = 1 - Math.pow(1e-3, dt);
    m.lerp(mouseTarget.current, lerpK);
    prevMouse.current.copy(m);
    matRef.current.uniforms.uTime.value += dt;
    const ms = avgDt.current * 1e3;
    let targetDpr = dprRef.current;
    if (quality === "low") {
      if (ms > 19.5) targetDpr = Math.max(0.72, targetDpr - 0.025);
      else if (ms < 16.8) targetDpr = Math.min(0.95, targetDpr + 0.01);
    } else {
      if (ms > 19.5) targetDpr = Math.max(1, targetDpr - 0.03);
      else if (ms < 16.8) targetDpr = Math.min(1.25, targetDpr + 0.015);
    }
    if (Math.abs(targetDpr - dprRef.current) > 1e-3) {
      dprRef.current = targetDpr;
      gl.setPixelRatio(dprRef.current);
      matRef.current.uniforms.uRes.value.set(size.width, size.height);
    }
  }, quality);
  return /* @__PURE__ */ jsxs("mesh", { children: [
    /* @__PURE__ */ jsx("planeGeometry", { args: [2, 2] }),
    /* @__PURE__ */ jsx(
      "shaderMaterial",
      {
        ref: matRef,
        uniforms,
        vertexShader: VS,
        fragmentShader: FS
      }
    )
  ] });
}
function Fallback() {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "aria-hidden": "true",
      style: {
        position: "absolute",
        inset: 0,
        background: "radial-gradient(120% 90% at 55% 35%, rgba(255,154,61,0.10) 0%, rgba(255,106,26,0.07) 32%, rgba(0,0,0,0) 62%), linear-gradient(180deg, #000000 0%, #000000 100%)"
      }
    }
  );
}
function HeroWebGLBg({
  quality = "high",
  interactive = true
}) {
  const [dead, setDead] = useState(false);
  if (dead) return /* @__PURE__ */ jsx(Fallback, {});
  const initialDpr = typeof window !== "undefined" ? quality === "low" ? Math.min(0.9, window.devicePixelRatio || 1) : Math.min(1.2, window.devicePixelRatio || 1) : 1;
  return /* @__PURE__ */ jsx("div", { style: { position: "absolute", inset: 0 }, children: /* @__PURE__ */ jsx(
    Canvas,
    {
      frameloop: "always",
      dpr: initialDpr,
      gl: {
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false
      },
      camera: { position: [0, 0, 1], fov: 50 },
      style: { width: "100%", height: "100%" },
      onCreated: ({ gl }) => {
        gl.setClearColor(0, 0);
      },
      children: /* @__PURE__ */ jsx(Quad, { onContextLost: () => setDead(true), quality, interactive })
    }
  ) });
}
export {
  HeroWebGLBg as default
};
