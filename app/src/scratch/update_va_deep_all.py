import glob
import re

deep_block = '''          </ul>
          <div className="va-deep">
            <a href="/weddings/">Weddings</a>
            <a href="/corporate/">Corporate</a>
            <a href="/gift/">Gift an Evening</a>
            <a href="/journal/">Journal</a>
            <a href="/press/">Press</a>
          </div>'''

files = glob.glob('/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/src/**/*.tsx', recursive=True)

count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'va-overlay' in content and 'va-deep' not in content:
        # Match any </ul> closing the va-list
        new_content = re.sub(r'(<ul className="va-list"[\s\S]*?)(</ul>)', r'\1\2\n' + deep_block, content)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {fpath}")

print(f"Total updated: {count}")
