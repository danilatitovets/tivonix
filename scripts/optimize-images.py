#!/usr/bin/env python3
"""Convert landing/site images to optimized WebP. Keeps ceo.png as compressed PNG for OG."""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images"

# (max_width, quality) — 0 max_width = keep original width
RULES: list[tuple[str, int, int]] = [
    ("hero-stage-", 1400, 82),
    ("pain-bg-", 1400, 82),
    ("foooa", 1400, 82),
    ("future", 1400, 82),
    ("чер", 1400, 82),
    ("яр", 1400, 82),
    ("футер", 1400, 82),
    ("ffon", 1400, 82),
    ("/пп/6", 1400, 82),
    ("spliton.png", 1200, 82),
    ("tivonix-logo-white", 800, 90),
    ("tivonix-logo-lockup", 800, 90),
    ("logo-black", 800, 90),
    ("tivonix-logo-icon", 320, 90),
    ("ai-logos", 256, 88),
    ("stack/", 256, 88),
    ("project-priew/", 1200, 82),
    ("avtomatizaciya-biznesa/", 1400, 82),
]

SKIP_WEBP = {"ceo.png"}  # OG preview stays PNG
DEFAULT_MAX_W = 1400
DEFAULT_Q = 82


def rule_for(path: Path) -> tuple[int, int]:
    rel = path.as_posix()
    for needle, max_w, q in RULES:
        if needle in rel:
            return max_w, q
    return DEFAULT_MAX_W, DEFAULT_Q


def resize_if_needed(img: Image.Image, max_w: int) -> Image.Image:
    if max_w <= 0 or img.width <= max_w:
        return img
    ratio = max_w / img.width
    new_h = max(1, round(img.height * ratio))
    return img.resize((max_w, new_h), Image.Resampling.LANCZOS)


def optimize_png_for_og(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGB")
    img = resize_if_needed(img, 1200)
    w, h = img.size
    target_h = max(1, round(h * (630 / w))) if w else 630
    if w != 1200 or h != target_h:
        img = img.resize((1200, target_h), Image.Resampling.LANCZOS)
    img.save(dst, format="PNG", optimize=True)


def to_webp(src: Path) -> Path:
    dst = src.with_suffix(".webp")
    max_w, quality = rule_for(src)
    img = Image.open(src)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")
    img = resize_if_needed(img, max_w)
    img.save(dst, format="WEBP", quality=quality, method=6)
    return dst


def main() -> None:
    converted = 0
    for src in sorted(IMAGES.rglob("*")):
        if not src.is_file():
            continue
        if src.suffix.lower() not in {".png", ".jpg", ".jpeg"}:
            continue
        if src.name in SKIP_WEBP:
            optimize_png_for_og(src, src)
            print(f"OG  {src.relative_to(ROOT)}")
            continue
        if src.with_suffix(".webp").exists() and src.with_suffix(".webp").stat().st_mtime >= src.stat().st_mtime:
            continue
        dst = to_webp(src)
        old_kb = src.stat().st_size // 1024
        new_kb = dst.stat().st_size // 1024
        print(f"WEBP {src.relative_to(ROOT)} -> {dst.name} ({old_kb}KB -> {new_kb}KB)")
        converted += 1
    print(f"Done. Converted {converted} images.")


if __name__ == "__main__":
    main()
