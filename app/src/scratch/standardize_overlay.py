import glob
import re

files = glob.glob('/Volumes/TEMO DISC/Ditto AI Studio/iceinstinct-site/app/src/**/*.tsx', recursive=True)

standard_overlay_inner = """<p className="va-eyebrow"><EyebrowMark />Ice &amp; Instinct / Menu</p>
          <ul className="va-list">
            <li><a href="/" data-cursor="link"><i>01</i><b>Home</b></a></li>
            <li><a href="/ice/" data-cursor="link"><i>02</i><b>ICE</b></a></li>
            <li><a href="/instinct/" data-cursor="link"><i>03</i><b>Instinct</b></a></li>
            <li><a href="/concierge/" data-cursor="link"><i>04</i><b>Concierge</b></a></li>
            <li><a href="/my-story/" data-cursor="link"><i>05</i><b>My Story</b></a></li>
            <li><a href="/gallery/" data-cursor="link"><i>06</i><b>The Collection</b></a></li>
            <li><a href="/contact/" data-cursor="link"><i>07</i><b>Inquire</b></a></li>
          </ul>
          <div className="va-deep">
            <span className="va-deep-kicker">Explore &middot; Specializations</span>
            <div className="va-deep-links">
              <a href="/weddings/">Weddings</a>
              <a href="/corporate/">Corporate</a>
              <a href="/gift/">Gift an Evening</a>
              <a href="/journal/">Journal</a>
              <a href="/press/">Press</a>
            </div>
          </div>
          <footer className="va-foot">
            <span>New York Metropolitan Area / By Appointment</span>
            <span>EST. 2024</span>
          </footer>"""

# Pattern matching from <p className="va-eyebrow"> down to </footer>
pattern = re.compile(r'<p className="va-eyebrow">.*?</footer\s*>', re.DOTALL)

updated_count = 0
for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if '<div className="va-overlay"' in content or 'va-stage' in content:
        new_content, n = pattern.subn(standard_overlay_inner, content)
        if n > 0 and new_content != content:
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            updated_count += 1
            print(f"Standardized overlay in: {fpath}")

print(f"Total files updated: {updated_count}")
