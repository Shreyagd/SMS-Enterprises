import fitz
import os
import re

pdf_path = r"C:\SMS enterprise\website images.pdf"
doc = fitz.open(pdf_path)
out_dir = r"C:\SMS enterprise\public\images\products"
os.makedirs(out_dir, exist_ok=True)

image_names = [
    "silage_stretch_film",
    "ldpe_shrink_film",
    "vci_stretch_film",
    "agri_low_tunnel_film",
    "ice_cream_rolls",
    "oil_pouches",
    "milk_packaging",
    "masala_packaging",
    "pearlizes_bopp_roll",
    "aata_packaging",
    "stretch_film",
    "stretch_hood_film_roll",
    "agri_mulch_film"
]

for i, page in enumerate(doc):
    images = page.get_images()
    if i < len(image_names):
        name_prefix = image_names[i]
    else:
        name_prefix = f"page_{i}"
        
    for j, img in enumerate(images):
        xref = img[0]
        base_image = doc.extract_image(xref)
        img_ext = base_image["ext"]
        img_bytes = base_image["image"]
        img_filename = f"{name_prefix}_{j+1}.{img_ext}"
        img_path = os.path.join(out_dir, img_filename)
        with open(img_path, "wb") as f:
            f.write(img_bytes)
        print(f"Extracted: {img_filename} to {img_path}")

js_path = r"C:\SMS enterprise\src\data\products.js"
with open(js_path, "r", encoding="utf-8") as f:
    content = f.read()

matches = re.findall(r"id:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'", content)
print("\nProducts in JS:")
for m in matches:
    print(f"{m[0]}: {m[1]}")
