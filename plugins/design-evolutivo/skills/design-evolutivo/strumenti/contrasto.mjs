#!/usr/bin/env node
// contrasto.mjs: rapporto di contrasto WCAG 2.x tra coppie di colori (testo, sfondo).
// Uso:   node contrasto.mjs "#353839" "#F0ECE0"
//        node contrasto.mjs "#87CBC3" "#fff" "rgb(29,29,31)" "#F5F5F7"   (più coppie)
// Colori: #rgb, #rrggbb, rgb(r,g,b) o rgb(r g b), con canali da 0 a 255 (o in %).
// Soglie: 1.4.3 (AA) 4,5:1 testo normale, 3:1 testo grande; 1.4.6 (AAA) 7:1 e 4,5:1.
// Testo grande = almeno 18 pt (circa 24 px) oppure 14 pt in grassetto (circa 18,7 px).
// Il 3:1 ("AA grande") è anche la soglia di 1.4.11 per bordi, icone e indicatori di focus.
// Luminanza: definizione "relative luminance" di WCAG 2.2 (w3c/wcag,
// guidelines/terms/20/relative-luminance.html, letta il 18/10/2026), con la soglia 0.04045.
// Il confronto usa il valore non arrotondato: WCAG, Understanding 1.4.3, "4.499:1 would not meet
// the 4.5:1 threshold". In stampa il rapporto ha 2 decimali, ma non viene mai arrotondato verso
// l'alto oltre una soglia: 4,496 si stampa 4,49, non 4,50.
// Colori semitrasparenti: lo strumento si ferma, perché il colore visto dipende da ciò che c'è sotto.
// Nessuna dipendenza: serve solo Node.

const USO = 'usa #rrggbb, #rgb o rgb(r,g,b)';
const nonRiconosciuto = (c, perche = '') =>
  new Error(`Colore non riconosciuto: ${c} (${perche ? perche + '; ' : ''}${USO})`);
const semitrasparente = (c, a) =>
  new Error(
    `Colore semitrasparente: ${c} (alfa ${a}). Dimmi su quale sfondo pieno sta: il colore che si vede dipende da ciò che c'è sotto. ` +
      'Per comporlo, canale per canale: alfa × colore + (1 − alfa) × sfondo; poi rilancia con il risultato.'
  );

const NUMERO = /^(\d+(\.\d*)?|\.\d+)(%?)$/;

function canale(v, c) {
  const m = v.match(NUMERO);
  if (!m) throw nonRiconosciuto(c);
  const n = m[3] ? (parseFloat(m[1]) * 255) / 100 : parseFloat(m[1]);
  if (n < 0 || n > 255) throw nonRiconosciuto(c, 'ogni canale va da 0 a 255, o da 0% a 100%');
  return n;
}

function alfa(v, c) {
  const m = v.match(NUMERO);
  if (!m) throw nonRiconosciuto(c);
  const a = m[3] ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
  if (a > 1) throw nonRiconosciuto(c, "l'alfa va da 0 a 1, o da 0% a 100%");
  return a;
}

function parse(c) {
  const s = String(c).trim().toLowerCase();
  if (s === 'transparent') throw semitrasparente(c, 0);
  let m = s.match(/^#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/);
  if (m) {
    let h = m[1];
    if (h.length <= 4) h = h.split('').map(x => x + x).join('');
    if (h.length === 8 && h.slice(6) !== 'ff') throw semitrasparente(c, +(parseInt(h.slice(6), 16) / 255).toFixed(3));
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
  }
  m = s.match(/^rgba?\((.*)\)$/);
  if (m) {
    const [parteRgb, parteAlfa, ...resto] = m[1].split('/');
    if (resto.length) throw nonRiconosciuto(c);
    const valori = parteRgb.split(/[\s,]+/).filter(Boolean);
    let a = parteAlfa === undefined ? null : parteAlfa.trim();
    if (a === null && valori.length === 4) a = valori.pop();
    if (valori.length !== 3) throw nonRiconosciuto(c);
    const rgb = valori.map(v => canale(v, c));
    if (a !== null) {
      const n = alfa(a, c);
      if (n < 1) throw semitrasparente(c, n);
    }
    return rgb;
  }
  throw nonRiconosciuto(c);
}

function luminance([r, g, b]) {
  const f = v => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function ratio(fg, bg) {
  const l1 = luminance(parse(fg));
  const l2 = luminance(parse(bg));
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

const SOGLIE = [3, 4.5, 7];
// 2 decimali; se l'arrotondamento porterebbe il valore oltre una soglia che non raggiunge, tronca.
export function mostra(r) {
  const arrotondato = Math.round(r * 100) / 100;
  const supera = SOGLIE.some(t => r < t && arrotondato >= t);
  const n = supera ? Math.floor(r * 100) / 100 : arrotondato;
  return n.toFixed(2).replace('.', ',');
}
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
      `${fg} su ${bg}: ${mostra(r)}:1 · AA normale ${ok(r, 4.5)} · AA grande ${ok(r, 3)} · AAA normale ${ok(r, 7)} · AAA grande ${ok(r, 4.5)}`
    );
  } catch (e) {
    errors++;
    console.error(e.message);
  }
}
process.exit(errors ? 1 : 0);
