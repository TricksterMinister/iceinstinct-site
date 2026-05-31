#!/usr/bin/env python3
"""Single-source global footer.

Edit the canonical footer in _footer.html, then run this script:
    python3 _sync-footer.py
It rewrites the <footer class="footer" ...>...</footer> block in every
page so the footer is byte-identical (mirrored) across the whole site.
"""
import re, glob, sys, os

ROOT = os.path.dirname(os.path.abspath(__file__))
CANON = open(os.path.join(ROOT, "_footer.html"), encoding="utf-8").read().strip()

# every page that carries the global footer
pages = [p for p in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True)
         if "/picker/" not in p and os.path.basename(p) != "_footer.html"]

pat = re.compile(r'<footer class="footer"[^>]*>.*?</footer>', re.DOTALL)
changed = 0
for p in sorted(pages):
    src = open(p, encoding="utf-8").read()
    if not pat.search(src):
        continue
    new = pat.sub(lambda _: CANON, src, count=1)
    if new != src:
        open(p, "w", encoding="utf-8").write(new)
        changed += 1
        print("synced", os.path.relpath(p, ROOT))
    else:
        print("ok    ", os.path.relpath(p, ROOT))
print(f"\n{changed} file(s) updated")
