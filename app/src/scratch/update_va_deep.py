import glob
import re

deep_block = '''          </ul>
          <div className="va-deep">
            <a href="/weddings/" data-cursor="link">Weddings</a>
            <a href="/corporate/" data-cursor="link">Corporate</a>
            <a href="/gift/" data-cursor="link">Gift an Evening</a>
            <a href="/journal/" data-cursor="link">Journal</a>
            <a href="/press/" data-cursor="link">Press</a>
          </div>'''

files = glob.glob('/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/src/pages/**/*.tsx', recursive=True)

count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'va-overlay' in content and 'va-deep' not in content:
        # Pattern to replace </ul> after va-list
        new_content = re.sub(r'<li><a href="/contact/"[^>]*><i>07</i><b>Inquire</b><em>[^<]*</em></a></li>\s*</ul>', r'<li><a href="/contact/" data-cursor="link"><i>07</i><b>Inquire</b><em>Begin the conversation</em></a></li>\n' + deep_block, content)
        if new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated {fpath}")

print(f"Total updated: {count}")
