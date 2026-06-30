import urllib.request
import re

req = urllib.request.Request('https://pin.it/6PTG0ftme', headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    m = re.search(r'<meta property="og:image" [^>]*content="(.*?)"', html)
    if not m:
        m = re.search(r'<meta name="og:image" [^>]*content="(.*?)"', html)
    print(m.group(1) if m else "Not found")
except Exception as e:
    print(e)
