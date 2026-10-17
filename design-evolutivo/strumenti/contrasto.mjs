#!/usr/bin/env node
// contrasto.mjs: rapporto di contrasto WCAG 2.x tra coppie di colori (testo, sfondo).
// Uso:   node contrasto.mjs "#353839" "#F0ECE0"
//        node contrasto.mjs "#87CBC3" "#fff" "rgb(29,29,31)" "#F5F5F7"   (più coppie)
// Soglie: 1.4.3 (AA) 4,5:1 testo normale, 3:1 testo grande; 1.4.6 (AAA) 7:1 e 4,5:1.
// Testo grande = almeno 18 pt (circa 24 px) oppure 14 pt in grassetto (circa 18,7 px).
// Nessuna dipendenza: serve solo Node.

function parse(c) {
  const s = String(c).trim().toLowerCase();
  let m = s.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/);
  if (m) {
    let h = m[1];
    if (h.length === 3) h = h.split('').map(x => x + x).join('');
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  }
  m = s.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/);
  if (m) return [m[1], m[2], m[3]].map(Number);
  throw new Error(`Colore non riconosciuto: ${c} (usa #rrggbb, #rgb o rgb(r,g,b))`);
}

function luminance([r, g, b]) {
  const f = v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function ratio(fg, bg) {
  const l1 = luminance(parse(fg));
  const l2 = luminance(parse(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const fmt = n => n.toFixed(2).replace('.', ',');
const ok = (r, t) => (r >= t ? 'sì' : 'no');

const args = process.argv.slice(2);
if (args.length < 2 || args.length % 2 !== 0) {
  console.log('Uso: node contrasto.mjs <testo> <sfondo> [<testo> <sfondo> ...]');
  process.exit(args.length === 0 ? 0 : 1);
}
let errors = 0;
for (let i = 0; i < args.length; i += 2) {
  const [fg, bg] = [args[i], args[i + 1]];
  try {
    const r = ratio(fg, bg);
    console.log(
      `${fg} su ${bg}: ${fmt(r)}:1 · AA normale ${ok(r, 4.5)} · AA grande ${ok(r, 3)} · AAA normale ${ok(r, 7)} · AAA grande ${ok(r, 4.5)}`
    );
  } catch (e) {
    errors++;
    console.error(e.message);
  }
}
process.exit(errors ? 1 : 0);
