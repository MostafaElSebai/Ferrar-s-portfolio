"""Prepare embedded PDF artwork after `pdfimages -png` (see README)."""
from pathlib import Path
import json
import subprocess
import tempfile
from PIL import Image

root = Path(__file__).resolve().parent.parent
source = root / 'Ahmed Morsi Portfolio-02.pdf'
work = Path(tempfile.mkdtemp(prefix='ahmed-pdf-'))
listing = subprocess.check_output(['pdfimages', '-list', str(source)], text=True)
rows = [line.split() for line in listing.splitlines()[2:] if line.strip()]
subprocess.run(['pdfimages', '-png', str(source), str(work / 'image')], check=True)
out = root / 'public/portfolio'
out.mkdir(parents=True, exist_ok=True)
page_assets = {}
seen = {}
for index, row in enumerate(rows):
    page, kind, obj = int(row[0]), row[2], row[10]
    if kind != 'image' or obj == '394' or page >= 35 or (page, obj) in {(9, '42'), (22, '126'), (22, '131'), (34, '199')}:
        continue
    if obj not in seen:
        image = Image.open(work / f'image-{int(row[1]):03}.png').convert('RGBA')
        if index + 1 < len(rows) and rows[index + 1][2] == 'smask':
            mask = Image.open(work / f'image-{int(rows[index + 1][1]):03}.png').convert('L')
            image.putalpha(mask)
        filename = 'portrait.webp' if page == 2 else f'art-{obj}.webp'
        image.save(out / filename, 'WEBP', quality=92, method=6)
        seen[obj] = '/portfolio/' + filename
    page_assets.setdefault(page, []).append(seen[obj])

# Print pages contain hidden Illustrator objects. Render the visible composition
# rather than accidentally extracting unrelated or duplicate embedded layers.
subprocess.run(['pdftoppm', '-f', '36', '-l', '43', '-scale-to', '2200', '-png', str(source), str(work / 'print')], check=True)
for page in range(36, 44):
    image = Image.open(work / f'print-{page:02}.png').convert('RGB')
    width, height = image.size
    image = image.crop((int(width * .055), int(height * .145), int(width * .945), int(height * .87)))
    filename = f'print-{page}.webp'
    image.save(out / filename, 'WEBP', quality=92, method=6)
    page_assets[page] = ['/portfolio/' + filename]

# Each client has one project, including related print work.
groups = [
 ('aqua-delta','Aqua Delta',['social','print'],[8,9,10,40]),
 ('maxi','Maxi',['social','print'],[11,12,13,41]),
 ('4-swapp','4 Swapp',['social'],[15,16]),
 ('ford-expedition','Ford Expedition',['key-visual'],[5]),
 ('nayashin','Nayashin',['social'],[17,18]),
 ('roxy-plast','Roxy Plast',['social','print'],[19,20,39]),
 ('brinsova','Brinsova',['social'],[26,27]),
 ('wash-thru','Wash Thru',['social'],[14]),
 ('diamond-clinic','Diamond Clinic',['social'],[21]),
 ('nasaaem-hospital','Nasaaem Hospital',['social'],[22,23]),
 ('tabarak-hospital','Tabarak Hospital',['social'],[24,25]),
 ('egyptian-nile-tours','Egyptian Nile Tours',['social'],[28]),
 ('al-arrab-pure','Al-Arrab Pure',['social'],[29]),
 ('hotelizeit','Hotelizeit',['social'],[30]),
 ('proscan','Proscan',['social'],[31]),
 ('aso2lak','Aso2lak',['social'],[32]),
 ('cookin-aboud','Cookin Aboud',['social'],[33]),
 ('rabat-foundation','Rabat Foundation',['social'],[34]),
 ('cinematic-key-visual','Cinematic Key Visual',['key-visual'],[6]),
 ('hospital-print-design','Healthcare Print Design',['print'],[36,37,38]),
 ('corporate-brochure','Corporate Brochure',['print'],[42]),
 ('outdoor-flags','Outdoor Flags',['print'],[43]),
]
projects=[]
for slug,title,categories,pages in groups:
    gallery=list(dict.fromkeys(asset for page in pages for asset in page_assets.get(page,[])))
    projects.append(dict(slug=slug,title=title,categories=categories,pages=pages,gallery=gallery))
(root/'scripts/projects.json').write_text(json.dumps(projects,indent=2)+'\n')
print(f'{len(seen)} unique assets; {len(projects)} project groups')
