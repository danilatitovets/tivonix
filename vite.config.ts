import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { PRERENDER_ROUTES, prerenderHtmlPath } from "./scripts/prerender-routes.mjs";

function prerenderPreviewPlugin() {
  return {
    name: "prerender-preview",
    configurePreviewServer(server) {
      const distDir = path.resolve("dist");
      server.middlewares.use((req, res, next) => {
        if (!req.url || req.method !== "GET") return next();

        const url = new URL(req.url, "http://127.0.0.1");
        let pathname = decodeURIComponent(url.pathname);
        if (pathname.length > 1 && pathname.endsWith("/")) {
          pathname = pathname.slice(0, -1);
        }

        // Let Vite serve built assets (js, css, images, …)
        if (/\.[a-zA-Z0-9]+($|\?)/.test(pathname) && !pathname.endsWith(".html")) {
          return next();
        }

        if (!PRERENDER_ROUTES.includes(pathname)) return next();

        const filePath = prerenderHtmlPath(distDir, pathname);
        if (!fs.existsSync(filePath)) return next();

        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(fs.readFileSync(filePath));
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), prerenderPreviewPlugin()],
  server: {
    proxy: {
      // Local form submit → production API (env secrets live on Vercel)
      "/api": {
        target: "https://www.tivonix.tech",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
