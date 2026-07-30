import glob
import re

old_block = r'''<div className="va-deep">
\s*<a href="/weddings/"[^>]*>Weddings</a>
\s*<a href="/corporate/"[^>]*>Corporate</a>
\s*<a href="/gift/"[^>]*>Gift an Evening</a>
\s*<a href="/journal/"[^>]*>Journal</a>
\s*<a href="/press/"[^>]*>Press</a>
\s*</div>'''

new_block = '''<div className="va-deep">
            <span className="va-deep-kicker">Explore &middot; Specializations</span>
            <div className="va-deep-links">
              <a href="/weddings/">Weddings</a>
              <a href="/corporate/">Corporate</a>
              <a href="/gift/">Gift an Evening</a>
              <a href="/journal/">Journal</a>
              <a href="/press/">Press</a>
            </div>
          </div>'''

files = glob.glob('/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/src/**/*.tsx', recursive=True)

count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'va-deep' in content:
        new_content = re.sub(old_block, new_block, content)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {fpath}")

print(f"Total updated: {count}")
