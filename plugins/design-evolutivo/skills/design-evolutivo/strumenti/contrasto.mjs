#!/usr/bin/env node
// contrasto.mjs: rapporto di contrasto WCAG 2.x tra coppie di colori (testo, sfondo).
// Uso:   node contrasto.mjs "#353839" "#F0ECE0"
//        node contrasto.mjs "#87CBC3" "#fff" "rgb(29,29,31)" "#F5F5F7"   (più coppie)
//        node contrasto.mjs "oklch(70.7% 0.022 261.325)" "#fff"
// Colori: #rgb, #rrggbb, rgb(r,g,b) o rgb(r g b), con canali da 0 a 255 (o in %); oklch(L C H) e
// oklab(L a b), con L da 0 a 1 (o in %) e la tinta H in gradi (o deg, grad, rad, turn). Per oklch e oklab
// la riga mostra anche l'esadecimale equivalente (arrotondato), da scrivere nei token.
// Conversione da OKLab: CSS Color 4 (w3c/csswg-drafts, css-color-4/conversions.js, funzioni OKLab_to_XYZ,
// XYZ_to_lin_sRGB e gam_sRGB; Overview.bs per le percentuali: L 100% = 1; a, b e C 100% = 0,4; L fuori
// da 0–1 e C negativo si riportano nei limiti). Letti il 18/10/2026. Un colore fuori da sRGB (tolleranza
// 0,001 sul valore lineare, scelta) ferma lo strumento: il colore visto dipende dallo schermo.
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

const USO = 'usa #rrggbb, #rgb, rgb(r,g,b), oklch(L C H) o oklab(L a b)';
const nonRiconosciuto = (c, perche = '') =>
  new Error(`Colore non riconosciuto: ${c} (${perche ? perche + '; ' : ''}${USO})`);
const semitrasparente = (c, a) =>
  new Error(
    `Colore semitrasparente: ${c} (alfa ${a}). Dimmi su quale sfondo pieno sta: il colore che si vede dipende da ciò che c'è sotto. ` +
      'Per comporlo, canale per canale: alfa × colore + (1 − alfa) × sfondo; poi rilancia con il risultato.'
  );

const fuoriSRGB = c =>
  new Error(
    `Colore fuori da sRGB: ${c}. Uno schermo sRGB non lo mostra così: il colore visto, e quindi il contrasto, ` +
      'dipende dallo schermo e dal browser. Riduci la croma (C) finché rientra, poi rilancia.'
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

// oklch() e oklab() → [r, g, b] da 0 a 255 (non arrotondati).
const ANGOLO = { '': 1, deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 };
function daOklab(c, tipo, corpo) {
  const [parte, parteAlfa, ...resto] = corpo.split('/');
  const v = parte.trim().split(/\s+/).filter(Boolean);
  if (resto.length || v.length !== 3) throw nonRiconosciuto(c);
  const numero = (x, cento) => {
    if (x === 'none') return 0;
    const m = x.match(/^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)(%?)$/);
    if (!m) throw nonRiconosciuto(c);
    return m[5] ? (parseFloat(m[1]) / 100) * cento : parseFloat(m[1]);
  };
  const L = Math.min(1, Math.max(0, numero(v[0], 1)));
  let a, b;
  if (tipo === 'oklch') {
    const C = Math.max(0, numero(v[1], 0.4));
    const m = v[2] === 'none' ? ['', '0', ''] : v[2].match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(deg|grad|rad|turn)?$/);
    if (!m) throw nonRiconosciuto(c, 'la tinta H è un numero in gradi, oppure con deg, grad, rad o turn');
    const h = (parseFloat(m[1]) * ANGOLO[m[2] || ''] * Math.PI) / 180;
    a = C * Math.cos(h);
    b = C * Math.sin(h);
  } else {
    a = numero(v[1], 0.4);
    b = numero(v[2], 0.4);
  }
  // OKLab → LMS (al cubo) → XYZ D65 → sRGB lineare: matrici di CSS Color 4.
  const l = (L + 0.3963377773761749 * a + 0.2158037573099136 * b) ** 3;
  const m = (L - 0.1055613458156586 * a - 0.0638541728258133 * b) ** 3;
  const s = (L - 0.0894841775298119 * a - 1.2914855480194092 * b) ** 3;
  const X = 1.2268798758459243 * l - 0.5578149944602171 * m + 0.2813910456659647 * s;
  const Y = -0.0405757452148008 * l + 1.112286803280317 * m - 0.0717110580655164 * s;
  const Z = -0.0763729366746601 * l - 0.4214933324022432 * m + 1.5869240198367816 * s;
  const lin = [
    (12831 / 3959) * X - (329 / 214) * Y - (1974 / 3959) * Z,
    (-851781 / 878810) * X + (1648619 / 878810) * Y + (36519 / 878810) * Z,
    (705 / 12673) * X - (2585 / 12673) * Y + (705 / 667) * Z,
  ];
  if (lin.some(x => x < -0.001 || x > 1.001)) throw fuoriSRGB(c);
  if (parteAlfa !== undefined) {
    const t = parteAlfa.trim();
    if (t === 'none') throw semitrasparente(c, 0);
    const n = alfa(t, c);
    if (n < 1) throw semitrasparente(c, n);
  }
  return lin.map(x => {
    x = Math.min(1, Math.max(0, x));
    return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  });
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
  m = s.match(/^(oklch|oklab)\((.*)\)$/);
  if (m) return daOklab(c, m[1], m[2]);
  throw nonRiconosciuto(c);
}

// Per oklch e oklab: il colore seguito dall'esadecimale equivalente, arrotondato.
const esadecimale = rgb => '#' + rgb.map(v => Math.round(v).toString(16).padStart(2, '0')).join('');
const nome = c => (/^\s*ok(lch|lab)\(/i.test(c) ? `${c} (≈ ${esadecimale(parse(c))})` : c);

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
      `${nome(fg)} su ${nome(bg)}: ${mostra(r)}:1 · AA normale ${ok(r, 4.5)} · AA grande ${ok(r, 3)} · AAA normale ${ok(r, 7)} · AAA grande ${ok(r, 4.5)}`
    );
  } catch (e) {
    errors++;
    console.error(e.message);
  }
}
process.exit(errors ? 1 : 0);
