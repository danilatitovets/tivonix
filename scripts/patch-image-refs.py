#!/usr/bin/env python3
"""Update image references from PNG/JPG to WebP in source files."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
SKIP_SUBSTRINGS = ("ceo.png", "index.recovered.css", "index.css.githead", "index.css.restored")

EXT_PATTERN = re.compile(
    r'(/images/[^"\')\s]+?)\.(png|jpg|jpeg)(?=["\')\s])',
    re.IGNORECASE,
)
BARE_PATTERN = re.compile(
    r'(?<=["\'])([1-9]\d?)\.(png|jpg|jpeg)(?=["\'])',
    re.IGNORECASE,
)
AI_FILE_PATTERN = re.compile(
    r'file:\s*"([^"]+)\.(png|jpg|jpeg)"',
    re.IGNORECASE,
)


def patch_text(text: str, path: Path) -> str:
    if any(s in path.as_posix() for s in SKIP_SUBSTRINGS):
        return text

    def repl_path(m: re.Match[str]) -> str:
        return f"{m.group(1)}.webp"

    text = EXT_PATTERN.sub(repl_path, text)
    text = BARE_PATTERN.sub(lambda m: f"{m.group(1)}.webp", text)
    text = AI_FILE_PATTERN.sub(lambda m: f'file: "{m.group(1)}.webp"', text)
    return text


def main() -> None:
    changed = 0
    for path in SRC.rglob("*"):
        if path.suffix not in {".ts", ".tsx", ".css"}:
            continue
        if "_css_parts" in path.parts and path.name not in {"ai-section-fix.css", "738.css"}:
            continue
        original = path.read_text(encoding="utf-8")
        updated = patch_text(original, path)
        if updated != original:
            path.write_text(updated, encoding="utf-8")
            print(f"updated {path.relative_to(ROOT)}")
            changed += 1
    print(f"Patched {changed} files.")


if __name__ == "__main__":
    main()
