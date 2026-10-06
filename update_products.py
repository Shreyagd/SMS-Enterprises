import re

js_path = r"C:\SMS enterprise\src\data\products.js"
with open(js_path, "r", encoding="utf-8") as f:
    content = f.read()

updates = {
    'ldpe-shrink-film': {
        'image': "'/images/products/ldpe_shrink_film_1.jpeg'",
        'images': "['/images/products/ldpe_shrink_film_1.jpeg', '/images/products/ldpe_shrink_film_2.jpeg']"
    },
    'stretch-hood-film': {
        'image': "'/images/products/stretch_hood_film_roll_1.jpeg'",
        'images': "['/images/products/stretch_hood_film_roll_1.jpeg', '/images/products/stretch_hood_film_roll_2.jpeg']"
    },
    'industrial-stretch-film': {
        'image': "'/images/products/stretch_film_1.jpeg'",
        'images': "['/images/products/stretch_film_1.jpeg', '/images/products/stretch_film_2.jpeg']"
    },
    'vci-film': {
        'image': "'/images/products/vci_stretch_film_1.jpeg'",
        'images': "['/images/products/vci_stretch_film_1.jpeg', '/images/products/vci_stretch_film_3.jpeg']"
    },
    'vci-stretch-film': {
        'image': "'/images/products/vci_stretch_film_2.jpeg'",
        'images': "['/images/products/vci_stretch_film_2.jpeg']"
    },
    'silage-stretch-film': {
        'image': "'/images/products/silage_stretch_film_1.jpeg'",
        'images': "['/images/products/silage_stretch_film_1.jpeg', '/images/products/silage_stretch_film_2.jpeg', '/images/products/silage_stretch_film_3.jpeg']"
    },
    'agricultural-mulch-film': {
        'image': "'/images/products/agri_mulch_film_1.jpeg'",
        'images': "['/images/products/agri_mulch_film_1.jpeg', '/images/products/agri_mulch_film_2.jpeg', '/images/products/agri_mulch_film_3.jpeg']"
    },
    'low-tunnel-film': {
        'image': "'/images/products/agri_low_tunnel_film_1.jpeg'",
        'images': "['/images/products/agri_low_tunnel_film_1.jpeg', '/images/products/agri_low_tunnel_film_2.jpeg']"
    },
    'milk-packaging-film': {
        'image': "'/images/products/milk_packaging_1.jpeg'",
        'images': "['/images/products/milk_packaging_1.jpeg', '/images/products/milk_packaging_2.jpeg']"
    },
    'pearlised-bopp-ice-cream-pouches': {
        'image': "'/images/products/ice_cream_rolls_1.jpeg'",
        'images': "['/images/products/ice_cream_rolls_1.jpeg', '/images/products/ice_cream_rolls_2.jpeg', '/images/products/ice_cream_rolls_3.jpeg']"
    },
    'bopp-wrap-around-labels': {
        'image': "'/images/products/pearlizes_bopp_roll_1.jpeg'",
        'images': "['/images/products/pearlizes_bopp_roll_1.jpeg', '/images/products/pearlizes_bopp_roll_2.jpeg', '/images/products/pearlizes_bopp_roll_3.jpeg']"
    },
    'masala-spice-packaging-film': {
        'image': "'/images/products/masala_packaging_1.jpeg'",
        'images': "['/images/products/masala_packaging_1.jpeg', '/images/products/masala_packaging_2.jpeg', '/images/products/masala_packaging_3.jpeg', '/images/products/masala_packaging_4.jpeg']"
    },
    'oil-packaging-film': {
        'image': "'/images/products/oil_pouches_1.jpeg'",
        'images': "['/images/products/oil_pouches_1.jpeg', '/images/products/oil_pouches_2.jpeg', '/images/products/oil_pouches_3.jpeg']"
    },
    'atta-flour-packaging-film': {
        'image': "'/images/products/aata_packaging_1.jpeg'",
        'images': "['/images/products/aata_packaging_1.jpeg', '/images/products/aata_packaging_2.jpeg']"
    }
}

for prod_id, urls in updates.items():
    # Regex to find block for product
    pattern = r"(id:\s*'" + prod_id + r"'[\s\S]*?)(image:\s*)[^\n]*(\n\s*images:\s*)[^\n]*(\n)"
    def repl(m):
        return m.group(1) + m.group(2) + urls['image'] + "," + m.group(3) + urls['images'] + "," + m.group(4)
    content = re.sub(pattern, repl, content)

with open(js_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Updated products.js")
