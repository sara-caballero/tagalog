const DISHES = [
  { id: "adobo", name: "Adobo", syl: "a-DO-bo", en: "Chicken or pork simmered in vinegar, soy sauce, garlic, bay leaves and black pepper.",
    about: "Often called the unofficial national dish. Every family has its own version, and it keeps for days, which is why it was made long before fridges.", taste: ["maalat", "maasim"], when: "Any day, always with rice" },
  { id: "sinigang", name: "Sinigang", syl: "si-NI-gang", en: "A sour soup, usually made sour with tamarind (sampalok), with pork, shrimp or fish and vegetables.",
    about: "Kangkong (water spinach), radish, tomatoes, string beans and a long green chili go in the pot. The sourness is the whole point: Ang asim!", taste: ["maasim"], when: "Comfort food on rainy days" },
  { id: "lechon", name: "Lechon", syl: "le-CHON", en: "A whole pig roasted for hours over charcoal until the skin is glassy and crisp.",
    about: "The star of fiestas, weddings and Christmas. Cebu's lechon is famous for needing no sauce; in Manila it comes with a sweet liver sauce.", taste: ["masarap", "maalat"], when: "Fiestas and big celebrations" },
  { id: "karekare", name: "Kare-kare", syl: "ka-re-KA-re", en: "Oxtail and vegetables in a thick peanut sauce, served with bagoong (fermented shrimp paste).",
    about: "The sauce itself is mild. You add bagoong on the side to make each bite salty and savoury.", taste: ["masarap", "maalat"], when: "Sunday lunch and family gatherings" },
  { id: "sisig", name: "Sisig", syl: "SI-sig", en: "Chopped pork with onions, chili and calamansi, served sizzling on a hot iron plate, often with an egg on top.",
    about: "Created in Pampanga, the province known as the culinary capital of the Philippines. A favourite pulutan: food eaten with drinks.", taste: ["maanghang", "maasim"], when: "Evenings with friends" },
  { id: "pancit", name: "Pancit", syl: "PAN-sit", en: "Stir-fried noodles with vegetables, meat or shrimp, squeezed with calamansi.",
    about: "Brought by Chinese traders centuries ago. Long noodles stand for a long life, so pancit is always served at birthdays.", taste: ["masarap", "maalat"], when: "Birthdays and celebrations" },
  { id: "lumpia", name: "Lumpia", syl: "LUM-pya", en: "Spring rolls. Lumpiang shanghai are small, crispy and filled with ground pork.",
    about: "No Filipino party is complete without a tray of lumpia, dipped in sweet chili sauce or vinegar.", taste: ["masarap"], when: "Parties, the first plate to empty" },
  { id: "tapsilog", name: "Tapsilog", syl: "tap-SI-log", en: "Cured beef (tapa) with garlic fried rice (sinangag) and a fried egg (itlog).",
    about: "Its name is built from the three parts: TAPa + SInangag + itLOG. There's a whole family: longsilog with sausage, tocilog with sweet pork.", taste: ["maalat", "matamis"], when: "Breakfast" },
  { id: "bulalo", name: "Bulalo", syl: "bu-LA-lo", en: "Beef shank and bone marrow soup with corn and cabbage.",
    about: "Famous in Batangas and Tagaytay, where it is eaten looking at the Taal volcano in the cool air. The marrow is the prize.", taste: ["masarap", "maalat"], when: "Cool evenings" },
  { id: "halohalo", name: "Halo-halo", syl: "HA-lo HA-lo", en: "Shaved ice with milk, sweet beans, jellies, fruit, leche flan and purple ube.",
    about: "Halo means mix: halo-halo is mix-mix. You stir everything together before eating. The classic summer treat.", taste: ["matamis"], when: "Hot afternoons" },
  { id: "bibingka", name: "Bibingka", syl: "bi-BING-ka", en: "A rice cake baked in a clay pot lined with banana leaves, topped with salted egg and cheese.",
    about: "Sold outside churches at Christmas, after the dawn masses of Simbang Gabi.", taste: ["matamis", "maalat"], when: "The Christmas season" },
  { id: "turon", name: "Turon", syl: "tu-RON", en: "Banana and jackfruit wrapped in a spring roll wrapper, fried with caramelised sugar.",
    about: "A street food favourite, sold on a stick or on banana leaves in the afternoon.", taste: ["matamis"], when: "Merienda" }
];

const ART = (() => {
  const plate = (cx = 120, cy = 92, rx = 96, ry = 64) => `<ellipse cx="${cx}" cy="${cy + 6}" rx="${rx}" ry="${ry}" fill="#000" opacity=".08"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#fffdf8" stroke="#e5dccb" stroke-width="2"/><ellipse cx="${cx}" cy="${cy}" rx="${rx - 16}" ry="${ry - 11}" fill="#f6f0e4"/>`;
  const bowl = (fill, cx = 120, cy = 80, rx = 82, ry = 34, body = "#e9e2d2", rim = "#f8f4ea") => `<ellipse cx="${cx}" cy="${cy + 66}" rx="${rx * .62}" ry="10" fill="#000" opacity=".1"/><path d="M${cx - rx} ${cy} Q${cx - rx + 8} ${cy + 66} ${cx} ${cy + 66} Q${cx + rx - 8} ${cy + 66} ${cx + rx} ${cy}Z" fill="${body}"/><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${rim}"/><ellipse cx="${cx}" cy="${cy + 2}" rx="${rx - 9}" ry="${ry - 7}" fill="${fill}"/>`;
  const rice = (x, y, rx = 34, ry = 22) => `<ellipse cx="${x}" cy="${y + 3}" rx="${rx}" ry="${ry}" fill="#e9e1cf"/><ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#fff"/>` + [[-14, -6], [-4, -10], [8, -7], [16, 0], [-18, 4], [2, 2], [12, 8], [-6, 10], [-12, -1]].map(([a, b]) => `<ellipse cx="${x + a}" cy="${y + b}" rx="3.2" ry="1.6" fill="#ece6d8"/>`).join("");
  const calamansi = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="#5f9a3a"/><circle cx="${x}" cy="${y}" r="7" fill="#f2c94c"/><path d="M${x} ${y - 6}v12M${x - 6} ${y}h12M${x - 4} ${y - 4}l8 8M${x + 4} ${y - 4}l-8 8" stroke="#f8e08e" stroke-width="1"/>`;
  const leaf = (x, y, r = 0, c = "#5e8f3e", s = 1) => `<path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0 C10 -10 30 -10 40 0 C30 10 10 10 0 0Z" fill="${c}"/><path transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M2 0H37" stroke="#3f6b28" stroke-width="1" opacity=".6"/>`;
  return {
    adobo: plate() + rice(72, 88) +
      `<ellipse cx="146" cy="96" rx="52" ry="30" fill="#5b2c12" opacity=".85"/>` +
      [[120, 86, 0], [148, 80, 15], [172, 92, -10], [134, 104, 8], [160, 108, -6]].map(([x, y, r]) => `<rect x="${x - 15}" y="${y - 10}" width="30" height="20" rx="8" transform="rotate(${r} ${x} ${y})" fill="#8a4a22"/><rect x="${x - 11}" y="${y - 8}" width="16" height="7" rx="3" transform="rotate(${r} ${x} ${y})" fill="#a4602f" opacity=".7"/>`).join("") +
      [[112, 102], [182, 80], [150, 118]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.5" fill="#f3e6c4"/>`).join("") + leaf(160, 70, -20, "#7d8a3a", .7) +
      [[128, 116], [176, 104], [140, 72], [190, 96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#2a1a10"/>`).join(""),
    sinigang: bowl("#e7bf74", 120, 78, 86, 36, "#cfdde6", "#e9f0f4") +
      `<ellipse cx="120" cy="80" rx="74" ry="27" fill="#eecb86" opacity=".7"/>` +
      [[96, 76], [140, 72], [118, 88]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="#d9a07e"/><ellipse cx="${x - 3}" cy="${y - 2}" rx="5" ry="3" fill="#f0c9a8"/>`).join("") +
      leaf(60, 78, -15, "#4f8f3a", .9) + leaf(150, 86, 10, "#4f8f3a", .8) + leaf(84, 92, -5, "#6aa84f", .6) +
      [[162, 70], [76, 66]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9" fill="#d7402f"/><circle cx="${x}" cy="${y}" r="5.5" fill="#f07a5f"/>`).join("") +
      [[104, 98], [132, 60]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="8" ry="5" fill="#fbf6ee" stroke="#e9e0d0"/>`).join("") +
      `<path d="M150 98 q22 -6 34 -26" stroke="#3d7a2c" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    lechon: `<path d="M20 140 L40 52 L208 44 L224 136Z" fill="#6f9d47"/><path d="M30 134 L46 60 L200 54 L214 130Z" fill="#87b35a"/>` +
      [[64, 74], [100, 70], [136, 68], [172, 66], [70, 104], [108, 100], [146, 98], [182, 96]].map(([x, y], i) => `<g transform="rotate(${i % 2 ? 4 : -3} ${x} ${y})"><rect x="${x - 16}" y="${y - 12}" width="32" height="26" rx="4" fill="#f1d4b4"/><rect x="${x - 16}" y="${y - 12}" width="32" height="9" rx="4" fill="#b8541e"/><rect x="${x - 13}" y="${y - 11}" width="12" height="3" rx="1.5" fill="#e08a3c" opacity=".8"/></g>`).join("") +
      `<ellipse cx="196" cy="128" rx="22" ry="11" fill="#e9e2d2"/><ellipse cx="196" cy="126" rx="17" ry="7.5" fill="#7a4a24"/>`,
    karekare: bowl("#e39a3c", 108, 76, 84, 36, "#6e4a33", "#8a5d40") +
      `<ellipse cx="108" cy="78" rx="70" ry="26" fill="#eba54a" opacity=".6"/>` +
      [[86, 74], [122, 70], [104, 88]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="13" fill="#7b3f1d"/><circle cx="${x}" cy="${y}" r="5" fill="#f0e2c2"/>`).join("") +
      [[58, 78], [146, 84]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="11" ry="9" fill="#4b2560"/><ellipse cx="${x}" cy="${y}" rx="7" ry="5.5" fill="#e9dcb0"/>`).join("") +
      `<path d="M66 92 l40 6 M70 98 l36 3" stroke="#4a8a35" stroke-width="4" stroke-linecap="round"/>` + leaf(136, 62, -10, "#3f7f34", .7) +
      `<ellipse cx="206" cy="128" rx="24" ry="11" fill="#e9e2d2"/><ellipse cx="206" cy="126" rx="18" ry="7.5" fill="#b26a7a"/>`,
    sisig: `<ellipse cx="120" cy="98" rx="104" ry="62" fill="#a8743f"/><ellipse cx="120" cy="94" rx="104" ry="60" fill="#c18a52"/><ellipse cx="120" cy="92" rx="86" ry="48" fill="#232323"/><ellipse cx="120" cy="90" rx="78" ry="42" fill="#3a3a3a"/>` +
      Array.from({ length: 46 }, (_, i) => { const a = i * 2.39996, r = 8 + (i * 37 % 60); const x = 120 + Math.cos(a) * r, y = 90 + Math.sin(a) * r * .5; return `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${5 + i % 4}" height="${4 + i % 3}" rx="1.5" transform="rotate(${i * 23 % 90} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${["#9a5428", "#b7682f", "#7a3d1a", "#d8a06a"][i % 4]}"/>`; }).join("") +
      [[88, 80], [150, 98], [134, 70], [100, 104]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="none" stroke="#5fae3e" stroke-width="2"/>`).join("") +
      [[110, 84], [160, 82], [84, 96]].map(([x, y]) => `<path d="M${x} ${y} q5 -4 10 0" stroke="#9b4f9e" stroke-width="2" fill="none"/>`).join("") +
      `<ellipse cx="122" cy="88" rx="15" ry="10" fill="#fffaf0"/><circle cx="123" cy="88" r="7" fill="#f2b51d"/>` + calamansi(214, 132) + calamansi(194, 140),
    pancit: plate() +
      Array.from({ length: 16 }, (_, i) => { const y = 64 + i * 3.6, w = 70 - Math.abs(i - 8) * 5; return `<path d="M${120 - w} ${y} q${w / 4} -8 ${w / 2} 0 t${w / 2} 0 t${w / 2} 0 t${w / 2} 0" stroke="${i % 3 ? "#e3b94e" : "#d4a63c"}" stroke-width="3" fill="none" stroke-linecap="round"/>`; }).join("") +
      [[96, 70, 20], [140, 80, -15], [118, 96, 35], [156, 66, 60]].map(([x, y, r]) => `<rect x="${x}" y="${y}" width="18" height="3.5" rx="1.5" transform="rotate(${r} ${x} ${y})" fill="#ee8a2b"/>`).join("") +
      [[84, 88], [150, 98], [128, 64]].map(([x, y]) => `<path d="M${x} ${y} q8 -8 16 0 q-8 6 -16 0Z" fill="#8cc45e"/>`).join("") +
      [[104, 84], [146, 86]].map(([x, y]) => `<path d="M${x} ${y} a8 8 0 1 1 10 6" stroke="#f08a6c" stroke-width="5" fill="none" stroke-linecap="round"/>`).join("") + calamansi(178, 108) + calamansi(194, 96),
    lumpia: plate(110, 92, 92, 62) +
      [[70, 70], [90, 82], [110, 94], [130, 106], [96, 62], [116, 74]].map(([x, y]) => `<g transform="rotate(-24 ${x} ${y})"><rect x="${x - 34}" y="${y - 7}" width="68" height="15" rx="7.5" fill="#c97f22"/><rect x="${x - 32}" y="${y - 6}" width="64" height="6" rx="3" fill="#e2a443"/><path d="M${x - 20} ${y - 6}v14M${x} ${y - 6}v14M${x + 20} ${y - 6}v14" stroke="#b56d18" stroke-width="1" opacity=".6"/></g>`).join("") +
      `<ellipse cx="196" cy="118" rx="27" ry="13" fill="#e9e2d2"/><ellipse cx="196" cy="116" rx="21" ry="9" fill="#d8402e"/>` + [[188, 115], [200, 113], [205, 119], [192, 120]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.4" fill="#f6d57a"/>`).join(""),
    tapsilog: plate() + rice(80, 82, 36, 24).replace(/fill="#fff"/, 'fill="#f8edc9"') + [[70, 76], [86, 88], [92, 74]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="#b07a32"/>`).join("") +
      [[142, 66, -8], [150, 80, -4], [146, 94, 6]].map(([x, y, r]) => `<path transform="rotate(${r} ${x} ${y})" d="M${x - 26} ${y} q26 -14 52 0 q-26 12 -52 0Z" fill="#7a2b1c"/><path transform="rotate(${r} ${x} ${y})" d="M${x - 18} ${y - 2} q18 -7 36 0" stroke="#a24a32" stroke-width="2" fill="none"/>`).join("") +
      `<path d="M104 104 q-14 -14 6 -22 q18 -10 34 2 q16 10 2 24 q-20 12 -42 -4Z" fill="#fffef8"/><circle cx="122" cy="98" r="9" fill="#f5a81c"/><circle cx="119" cy="95" r="3" fill="#fbd27a"/>` +
      [[170, 112], [184, 102]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#d7402f"/><circle cx="${x}" cy="${y}" r="4" fill="#f07a5f"/>`).join(""),
    bulalo: bowl("#e8d29a", 120, 78, 86, 36, "#e9e2d2", "#f8f4ea") + `<ellipse cx="120" cy="80" rx="74" ry="27" fill="#efdcab" opacity=".7"/>` +
      `<circle cx="104" cy="78" r="18" fill="#f3ead8"/><circle cx="104" cy="78" r="10" fill="#b97a4b"/><circle cx="104" cy="78" r="6" fill="#d9a77a"/>` +
      [[140, 70], [128, 92]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="14" ry="9" fill="#8a4b2c"/>`).join("") +
      `<g transform="rotate(-20 160 86)"><rect x="146" y="76" width="30" height="22" rx="8" fill="#f2c234"/>${[150, 156, 162, 168].map(x => `<path d="M${x} 77v20" stroke="#e0a91e" stroke-width="1.4"/>`).join("")}<path d="M147 87h28" stroke="#e0a91e" stroke-width="1.4"/></g>` +
      leaf(54, 80, -10, "#a6cf7a", 1.1) + leaf(70, 94, 12, "#bfe08f", .8) + `<path d="M80 64 l14 -6 M86 66 l12 -8" stroke="#4f8f3a" stroke-width="3" stroke-linecap="round"/>`,
    halohalo: `<ellipse cx="120" cy="156" rx="40" ry="8" fill="#000" opacity=".1"/><path d="M84 40 L92 150 Q120 158 148 150 L156 40Z" fill="#eef4f6" stroke="#cfdde4" stroke-width="2"/>` +
      `<path d="M91 126 L92 150 Q120 158 148 150 L149 126 Q120 132 91 126Z" fill="#8a4a2b"/>` +
      [[100, 118], [116, 114], [132, 118], [108, 108], [126, 106], [140, 110]].map(([x, y], i) => `<rect x="${x}" y="${y}" width="10" height="10" rx="2" fill="${["#e5525b", "#57b05a", "#f1c232", "#e5525b", "#57b05a", "#d48ee0"][i]}" opacity=".9"/>`).join("") +
      `<path d="M89 100 Q120 108 151 100 L152 84 Q120 92 88 84Z" fill="#f4ead6"/>` +
      `<path d="M80 52 Q120 10 160 52 Q120 66 80 52Z" fill="#ffffff" stroke="#e4ecef" stroke-width="2"/>` +
      `<rect x="98" y="34" width="28" height="12" rx="3" fill="#f2c14e"/><rect x="98" y="34" width="28" height="4" rx="2" fill="#a8641e"/>` +
      `<circle cx="134" cy="30" r="15" fill="#7d3c98"/><circle cx="129" cy="25" r="5" fill="#9b59b6"/><path d="M168 8 L140 70" stroke="#c9b48a" stroke-width="4" stroke-linecap="round"/>`,
    bibingka: `<path d="M120 20 L140 40 L176 34 L170 64 L204 82 L172 100 L184 130 L146 126 L120 152 L94 126 L56 130 L68 100 L36 82 L70 64 L64 34 L100 40Z" fill="#5f9c45"/>` +
      `<ellipse cx="120" cy="90" rx="62" ry="44" fill="#c8862e"/><ellipse cx="120" cy="86" rx="60" ry="42" fill="#e7b04f"/>` +
      [[96, 72], [140, 96], [108, 104], [146, 70], [88, 94]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#a5641f" opacity=".7"/>`).join("") +
      [[112, 78], [132, 88]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="12" ry="9" fill="#fffaf2"/><ellipse cx="${x}" cy="${y}" rx="6" ry="4.5" fill="#e0582a"/>`).join("") +
      Array.from({ length: 14 }, (_, i) => `<rect x="${92 + i * 37 % 60}" y="${66 + i * 23 % 42}" width="6" height="2" rx="1" fill="#fff6d8" transform="rotate(${i * 40} ${92 + i * 37 % 60} ${66 + i * 23 % 42})"/>`).join(""),
    turon: plate() +
      [[86, 72], [112, 88]].map(([x, y]) => `<g transform="rotate(-18 ${x} ${y})"><rect x="${x - 38}" y="${y - 10}" width="76" height="20" rx="10" fill="#a8581a"/><rect x="${x - 35}" y="${y - 8}" width="70" height="9" rx="4.5" fill="#d48a2c"/><path d="M${x - 30} ${y - 4} h50" stroke="#f3c26b" stroke-width="2" opacity=".8"/></g>`).join("") +
      `<g transform="rotate(-18 150 104)"><rect x="118" y="94" width="40" height="20" rx="10" fill="#a8581a"/><rect x="152" y="92" width="22" height="24" rx="4" fill="#f6e3a0"/><ellipse cx="163" cy="104" rx="8" ry="9" fill="#fbefc0"/><rect x="152" y="98" width="22" height="4" fill="#f2a43a"/></g>` +
      `<path d="M60 108 q30 20 60 6 q30 -12 66 6" stroke="#8a3f10" stroke-width="3" fill="none" opacity=".55" stroke-linecap="round"/>`
  };
})();
const dishArt = id => `<svg viewBox="0 0 240 170" role="img" aria-label="Illustration of ${esc((DISHES.find(d => d.id === id) || {}).name || id)}">${ART[id] || ""}</svg>`;
function dishesHTML() {
  return `<div class="dishgrid">${DISHES.map(d => `<article class="dish"><div class="dish-art">${dishArt(d.id)}</div>
    <div class="dish-body"><div class="row" style="justify-content:space-between;flex-wrap:nowrap"><div><h4>${esc(d.name)}</h4><span class="small muted syl">${sylHTML(d.syl)}</span></div>${playText(d.name)}</div>
    <p>${esc(d.en)}</p><p class="small muted">${esc(d.about)}</p>
    <div class="row" style="gap:6px">${d.taste.map(t => `<span class="tag green">${esc(t)} · ${esc(ITEMS[t] ? ITEMS[t].en : "")}</span>`).join("")}<span class="tag cream">${esc(d.when)}</span></div></div></article>`).join("")}</div>`;
}
