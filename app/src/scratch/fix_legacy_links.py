import glob
import re

files = glob.glob('/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/src/**/*.tsx', recursive=True)

count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace /offerings/ -> /instinct/
    new_content = content.replace("href: '/offerings/", "href: '/instinct/")
    new_content = new_content.replace('href="/offerings/', 'href="/instinct/')
    new_content = new_content.replace("secondaryHref: '/offerings/'", "secondaryHref: '/instinct/'")

    if new_content != content:
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        print(f"Updated {fpath}")

print(f"Total updated: {count}")
