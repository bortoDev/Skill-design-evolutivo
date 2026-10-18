// misura-pagina.js: misure di una pagina web dagli stili calcolati del browser.
// Nasce dagli script usati per analizzare gli 8 siti di riferimento (desktop e mobile).
// Uso: il modo più semplice è `guarda.mjs`, che lo esegue da solo a ogni larghezza. Altrimenti, con un
// browser controllabile, apri la pagina, imposta la finestra (1440×900 per il desktop, 375×812 per il
// mobile), scorri fino in fondo e torna su (alcune pagine mostrano i contenuti solo dopo lo scorrimento),
// poi esegui tutto questo file: restituisce una stringa JSON.
//
// Questi numeri non dicono se è bello: guardalo.
//
// Colori: ogni colore, in qualunque formato CSS (hex, rgb, hsl, oklch, lab, color()…), passa da una tela
// (canvas) di 1×1 pixel, che lo converte in sRGB. I colori fuori da sRGB vengono tagliati: il risultato è
// segnato "approssimato" (controllo fatto solo per oklch, oklab, lch, lab e color(srgb)).
// Contrasto: risale gli antenati e compone gli sfondi, anche semitrasparenti, fino al primo pieno; sotto a
// tutto c'è il fondo del browser: bianco, oppure scuro se la pagina dichiara color-scheme dark e il tema è
// scuro. Poi compone sopra il colore del testo, anche se semitrasparente. Restituisce
// "non calcolabile" se trova un'immagine di sfondo (foto o gradiente) prima di uno sfondo pieno. Se un
// antenato ha opacity minore di 1, il calcolo non ne tiene conto: il testo va in "da controllare a vista".
// Il testo sopra foto o video posizionati non si può calcolare: controllalo a vista. Conta solo ciò che
// è disposto e dentro la finestra in orizzontale (i menu laterali chiusi sono esclusi) e salta il testo
// nascosto per i lettori di schermo (sr-only).
// Campi aggiunti nella v0.12 (i vecchi restano): stiliTesto, pulsantiPieni, testoVicinoAlBordo,
// tipografia, movimento, contrastoDaControllareAVista, conversioneColori, gradienti[].violaAlLimite.
// Soglie con fonte: contrasto 4,5:1 e 3:1 per il testo grande (WCAG 1.4.3), testo grande da 24 px o da
// 18,66 px in grassetto (WCAG, "large scale": 18 pt o 14 pt bold); confronto sul valore non arrotondato
// (WCAG, Understanding 1.4.3); luminanza con la soglia 0.04045 (WCAG 2.2, "relative luminance");
// bersagli da 24 px (WCAG 2.5.8, AA) e 44 px (WCAG 2.5.5, AAA). Il rapporto mostrato ha 2 decimali e non è
// mai arrotondato verso l'alto oltre una soglia (4,496 diventa 4,49).
// Scelte di progetto, non standard: pulsante "pieno" = sfondo con alfa almeno 0,5 e contrasto almeno
// 2:1 con ciò che c'è dietro (oppure un gradiente); testo vicino al bordo = meno di 6 px a sinistra o a
// destra, meno di 2 px sopra o sotto; viola = tinta tra 260° e 300° (dal controllo di R-002);
// violaAlLimite = tinta tra 245° e 259° (blu-viola al limite: guarda tu); al massimo 20 stili di testo
// e 40 variabili CSS.
// Movimento: elenca gli elementi con un'animazione CSS (animationName diverso da none), anche se è già
// finita, e le transizioni. Non vede le animazioni fatte con JavaScript. Con "riduci movimento" attivo
// (come in guarda.mjs) le animazioni che la pagina spegne non compaiono: guarda.mjs le riporta in
// "movimentoSenzaRiduci".
// Fogli di stile: quelli di altri domini non si leggono, e nemmeno quelli collegati a una pagina aperta
// da file (guarda.mjs avvia il browser in modo da leggerli). "fogliNonLeggibili" ne elenca gli indirizzi.
// Se uno non si legge, riduciMovimento vale "non leggibile" e le variabili CSS vengono dallo stile
// calcolato della radice (senza quelle interne di Tailwind, --tw-…). I fogli dei servizi di font
// (Google Fonts, Adobe Fonts, Bunny Fonts, Fontshare) non contano: contengono solo i font.
(() => {
  const top = (o, n = 6) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  const cs = (e, p) => getComputedStyle(e, p);
  const laidOut = e => {
    const r = e.getBoundingClientRect(), s = cs(e);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0;
  };
  // In emulazione mobile innerWidth può crescere fino alla larghezza del contenuto: si usa clientWidth.
  const W = document.documentElement.clientWidth || innerWidth;
  const VH = document.documentElement.clientHeight || innerHeight;
  const onScreenX = e => { const r = e.getBoundingClientRect(); return r.right > 0 && r.left < W; };
  const vis = e => laidOut(e) && onScreenX(e);
  const hasOwnText = el => [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
  // Testo nascosto per i lettori di schermo (classi tipo "sr-only": 1 px e ritagliato): non si vede.
  const memoNascosto = new Map();
  const soloLettori = el => {
    if (!el || el.nodeType !== 1 || el === document.body) return false;
    if (memoNascosto.has(el)) return memoNascosto.get(el);
    const s = cs(el), r = el.getBoundingClientRect();
    const v = ((r.width <= 1 || r.height <= 1) && (s.overflow === 'hidden' || s.clip !== 'auto' || s.clipPath !== 'none')) ||
      /inset\(50%\)/.test(s.clipPath) || soloLettori(el.parentElement);
    memoNascosto.set(el, v);
    return v;
  };
  const nome = el => el.tagName + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const breve = (t, n = 24) => (t || '').trim().replace(/\s+/g, ' ').slice(0, n);

  // Colori: una tela di 1×1 pixel converte qualunque formato CSS in sRGB.
  const tela = document.createElement('canvas');
  tela.width = tela.height = 1;
  const cx = tela.getContext('2d', { willReadFrequently: true });
  const formati = {}, fuoriSRGB = new Set(), nonConvertiti = new Set();
  const memoColori = new Map();
  // [r, g, b, a] con a da 0 a 255, oppure null se il browser non capisce il colore.
  const rgba = c => {
    if (!c) return null;
    if (memoColori.has(c)) return memoColori.get(c);
    cx.fillStyle = '#010203'; cx.fillStyle = c; const s1 = cx.fillStyle;
    cx.fillStyle = '#040506'; cx.fillStyle = c; const s2 = cx.fillStyle;
    let v = null;
    if (s1 === s2) {
      cx.globalCompositeOperation = 'copy';
      cx.fillRect(0, 0, 1, 1);
      cx.globalCompositeOperation = 'source-over';
      v = [...cx.getImageData(0, 0, 1, 1).data];
      const f = (c.match(/^([a-z-]+)\(/) || [, c.startsWith('#') ? 'hex' : 'parola'])[1];
      formati[f] = (formati[f] || 0) + 1;
      if (fuori(c) && fuoriSRGB.size < 8) fuoriSRGB.add(c);
    } else if (nonConvertiti.size < 8) nonConvertiti.add(c);
    memoColori.set(c, v);
    return v;
  };
  // Compone il colore c (anche semitrasparente) sopra un colore pieno [r, g, b], come fa il browser.
  const memoSopra = new Map();
  const sopra = (c, base) => {
    const k = c + '|' + base;
    if (memoSopra.has(k)) return memoSopra.get(k);
    cx.globalCompositeOperation = 'copy';
    cx.fillStyle = `rgb(${base[0]}, ${base[1]}, ${base[2]})`;
    cx.fillRect(0, 0, 1, 1);
    cx.globalCompositeOperation = 'source-over';
    cx.fillStyle = c;
    cx.fillRect(0, 0, 1, 1);
    const v = [...cx.getImageData(0, 0, 1, 1).data].slice(0, 3);
    memoSopra.set(k, v);
    return v;
  };
  // Il colore è fuori da sRGB? true, false, oppure null se il formato non è controllato.
  const memoFuori = new Map();
  function fuori(c) {
    if (!memoFuori.has(c)) memoFuori.set(c, fuoriCalcola(c));
    return memoFuori.get(c);
  }
  function fuoriCalcola(c) {
    const m = c.match(/^(oklch|oklab|lch|lab|color)\(([^)]*)\)/);
    if (!m) return /^(rgb|hsl|hwb|#)/.test(c) ? false : null;
    const parti = m[2].split('/')[0].trim().split(/\s+/);
    if (m[1] === 'color') {
      const sp = parti.shift();
      if (sp !== 'srgb' && sp !== 'srgb-linear') return null;
      return parti.some(v => { const n = parseFloat(v) / (v.endsWith('%') ? 100 : 1); return n < -0.001 || n > 1.001; });
    }
    const n = parti.map(v => (v === 'none' ? 0 : parseFloat(v)));
    const pct = parti.map(v => v.endsWith('%'));
    // Matrici del codice di esempio di CSS Color 4 (w3c/csswg-drafts, css-color-4/conversions.js,
    // letto il 18/10/2026): OKLab → XYZ D65; Lab → XYZ D50 → D65 (Bradford); XYZ D65 → sRGB lineare.
    let X, Y, Z;
    if (m[1] === 'oklch' || m[1] === 'oklab') {
      const L = pct[0] ? n[0] / 100 : n[0];
      let a = n[1], b = n[2];
      if (m[1] === 'oklch') { const C = pct[1] ? n[1] * 0.004 : n[1], h = (n[2] * Math.PI) / 180; a = C * Math.cos(h); b = C * Math.sin(h); }
      const l = (L + 0.3963377773761749 * a + 0.2158037573099136 * b) ** 3;
      const mm = (L - 0.1055613458156586 * a - 0.0638541728258133 * b) ** 3;
      const s = (L - 0.0894841775298119 * a - 1.2914855480194092 * b) ** 3;
      X = 1.2268798758459243 * l - 0.5578149944602171 * mm + 0.2813910456659647 * s;
      Y = -0.0405757452148008 * l + 1.112286803280317 * mm - 0.0717110580655164 * s;
      Z = -0.0763729366746601 * l - 0.4214933324022432 * mm + 1.5869240198367816 * s;
    } else {
      const L = n[0];
      let a = n[1], b = n[2];
      if (m[1] === 'lch') { const C = pct[1] ? n[1] * 1.5 : n[1], h = (n[2] * Math.PI) / 180; a = C * Math.cos(h); b = C * Math.sin(h); }
      const k = 24389 / 27, e = 216 / 24389, f1 = (L + 16) / 116, f0 = a / 500 + f1, f2 = f1 - b / 200;
      const x = (f0 ** 3 > e ? f0 ** 3 : (116 * f0 - 16) / k) * 0.3457 / 0.3585;
      const y = L > k * e ? f1 ** 3 : L / k;
      const z = (f2 ** 3 > e ? f2 ** 3 : (116 * f2 - 16) / k) * (1 - 0.3457 - 0.3585) / 0.3585;
      X = 0.955473421488075 * x - 0.02309845494876471 * y + 0.06325924320057072 * z;
      Y = -0.0283697093338637 * x + 1.0099953980813041 * y + 0.021041441191917323 * z;
      Z = 0.012314014864481998 * x - 0.020507649298898964 * y + 1.330365926242124 * z;
    }
    const lin = [12831 / 3959 * X - 329 / 214 * Y - 1974 / 3959 * Z,
      -851781 / 878810 * X + 1648619 / 878810 * Y + 36519 / 878810 * Z,
      705 / 12673 * X - 2585 / 12673 * Y + 705 / 667 * Z];
    return lin.some(v => v < -0.001 || v > 1.001);
  }
  const testoRGB = c => `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
  // Luminanza relativa: WCAG 2.2, soglia 0.04045.
  const lum = ([r, g, b]) => {
    const f = v => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const rapporto = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
  // 2 decimali, mai arrotondati verso l'alto oltre una soglia.
  const mostra = r => {
    const t = Math.round(r * 100) / 100;
    return [3, 4.5, 7].some(s => r < s && t >= s) ? Math.floor(r * 100) / 100 : t;
  };
  const isTransparent = c => { const v = rgba(c); return !v || v[3] === 0; };
  // Il fondo del browser sotto la pagina (Canvas): bianco, oppure scuro con color-scheme dark e tema scuro.
  const sonda = document.createElement('div');
  sonda.style.cssText = 'display:none;background-color:Canvas';
  document.documentElement.appendChild(sonda);
  const FONDO = (rgba(cs(sonda).backgroundColor) || [255, 255, 255]).slice(0, 3);
  sonda.remove();

  // Lo strato sotto un elemento: sfondo composto, immagine di sfondo, opacità, colore approssimato.
  const memoStrato = new Map();
  const strato = el => {
    if (!el || el.nodeType !== 1) return { rgb: FONDO, immagine: false, opacita: 1, approssimato: false };
    if (memoStrato.has(el)) return memoStrato.get(el);
    const s = cs(el), sotto = strato(el.parentElement), c = rgba(s.backgroundColor);
    const img = !!s.backgroundImage && s.backgroundImage !== 'none';
    const fu = fuori(s.backgroundColor) === true;
    let r;
    if (!c || c[3] === 0) r = { rgb: sotto.rgb, immagine: sotto.immagine || img, approssimato: sotto.approssimato };
    else if (c[3] === 255) r = { rgb: c.slice(0, 3), immagine: img, approssimato: fu };
    else r = { rgb: sopra(s.backgroundColor, sotto.rgb), immagine: sotto.immagine || img, approssimato: fu || sotto.approssimato };
    r.opacita = sotto.opacita * (parseFloat(s.opacity) || 0);
    memoStrato.set(el, r);
    return r;
  };

  const out = {
    url: location.href,
    finestra: [W, VH],
    larghezzaLayout: innerWidth,
    agenteMobile: /Android|Mobile/.test(navigator.userAgent),
    touch: navigator.maxTouchPoints,
  };

  // Viewport, zoom, riflusso, lunghezza
  const mv = document.querySelector('meta[name=viewport]');
  out.metaViewport = mv ? mv.content : null;
  out.zoomBloccato = !!(mv && /maximum-scale\s*=\s*1(\.0+)?(?![\d.])|user-scalable\s*=\s*(no|0)/i.test(mv.content));
  out.larghezzaContenuto = document.documentElement.scrollWidth;
  out.scorrimentoOrizzontale = document.documentElement.scrollWidth > W + 1;
  out.altezzaPagina = document.documentElement.scrollHeight;
  out.schermate = +(out.altezzaPagina / VH).toFixed(1);

  // Testo: famiglie, dimensioni, colori, stili, testo piccolo, contrasto, distanza dal bordo
  const fonts = {}, sizes = {}, fg = {}, stili = {};
  let nodi = 0, sotto12 = 0, sotto14 = 0, contrastoBasso = 0, contrastoNonCalcolabile = 0;
  const gruppiContrasto = {}, daVedere = { quanti: 0, motivo: 'un antenato ha opacity minore di 1: il rapporto calcolato non ne tiene conto', esempi: [] };
  const testiPerScatola = new Map(), memoScatola = new Map();
  document.querySelectorAll('body *').forEach(el => {
    if (!hasOwnText(el) || !vis(el) || soloLettori(el)) return;
    const st = strato(el);
    if (st.opacita === 0) return;
    const s = cs(el), fs = parseFloat(s.fontSize), w = parseInt(s.fontWeight, 10) || 400;
    nodi++;
    const f = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    fonts[f] = (fonts[f] || 0) + 1;
    const k = Math.round(fs * 10) / 10 + 'px';
    sizes[k] = (sizes[k] || 0) + 1;
    fg[s.color] = (fg[s.color] || 0) + 1;
    const ks = `${f} · ${k} · ${w}`, testo = breve(el.innerText, 30);
    const g0 = stili[ks] || (stili[ks] = { nodi: 0, esempi: [] });
    g0.nodi++;
    if (g0.esempi.length < 2 && testo && !g0.esempi.includes(testo)) g0.esempi.push(testo);
    if (fs < 12) sotto12++;
    if (fs < 14) sotto14++;
    raccogliPerScatola(el);
    // Il colore visibile del testo: -webkit-text-fill-color vince su color (testo con gradiente: trasparente).
    const colore = s.webkitTextFillColor || s.color, t = rgba(colore);
    if (st.immagine || !t || t[3] === 0) { contrastoNonCalcolabile++; return; }
    const visto = t[3] === 255 ? t.slice(0, 3) : sopra(colore, st.rgb);
    const r = rapporto(visto, st.rgb);
    const grande = fs >= 24 || (fs >= 18.66 && w >= 700);
    const soglia = grande ? 3 : 4.5;
    if (st.opacita < 1) {
      daVedere.quanti++;
      if (daVedere.esempi.length < 5) daVedere.esempi.push(breve(el.innerText) + ' (rapporto senza opacità ' + String(mostra(r)).replace('.', ',') + ', opacità ' + String(+st.opacita.toFixed(2)).replace('.', ',') + ')');
    }
    if (r < soglia) {
      contrastoBasso++;
      const sf = testoRGB(st.rgb), key = colore + ' su ' + sf;
      const g = gruppiContrasto[key] || (gruppiContrasto[key] = { colore, sfondo: sf, rapporto: mostra(r), soglia, quanti: 0, esempi: [] });
      if (t[3] < 255) g.coloreVisto = testoRGB(visto);
      if (st.approssimato || fuori(colore) === true) g.approssimato = true;
      if (st.opacita < 1) g.daControllareAVista = true;
      g.quanti++;
      if (g.esempi.length < 3) g.esempi.push(breve(el.innerText) + ' (' + s.fontSize + ')');
    }
  });
  const stiliOrdinati = Object.entries(stili).sort((a, b) => b[1].nodi - a[1].nodi);
  Object.assign(out, {
    nodiDiTesto: nodi, famiglie: top(fonts, 5), dimensioni: top(sizes, 10), coloriTesto: top(fg, 5),
    nodiSotto12px: sotto12, nodiSotto14px: sotto14,
    contrastoSottoSoglia: contrastoBasso, contrastoNonCalcolabile,
    peggioriContrasti: Object.values(gruppiContrasto).sort((a, b) => a.rapporto - b.rapporto).slice(0, 8),
    contrastoDaControllareAVista: daVedere,
    stiliTesto: Object.fromEntries(stiliOrdinati.slice(0, 20)),
    stiliTestoDiversi: stiliOrdinati.length,
  });

  // Testo vicino al bordo: per ogni scatola visibile (sfondo diverso da ciò che c'è dietro, immagine di
  // sfondo o bordo) la distanza tra il suo testo e il bordo interno. Ogni testo conta per la scatola più
  // vicina. Uno sfondo conta come scatola se differisce da ciò che c'è dietro di almeno 4 su 255 in un canale.
  function lati(n) {
    if (n === document.body || n === document.documentElement) return null;
    const s = cs(n), l = {};
    // Evidenziazioni nel testo (mark, code): in linea e senza spazio interno ai lati, non sono scatole.
    if (s.display === 'inline' && parseFloat(s.paddingLeft) + parseFloat(s.paddingRight) === 0) return null;
    const st = strato(n), dietro = strato(n.parentElement);
    const sfondoVisibile = !/text/.test(s.backgroundClip + ' ' + s.webkitBackgroundClip) && // non il testo con gradiente
      (st.immagine !== dietro.immagine || st.rgb.some((v, i) => Math.abs(v - dietro.rgb[i]) > 3));
    if (sfondoVisibile) return { sinistra: 1, destra: 1, alto: 1, basso: 1 };
    if (s.display.startsWith('inline') && s.display !== 'inline-block' && s.display !== 'inline-flex' && s.display !== 'inline-grid') return null; // sottolineature dei link
    for (const [lato, css] of [['sinistra', 'Left'], ['destra', 'Right'], ['alto', 'Top'], ['basso', 'Bottom']]) {
      const c = rgba(s['border' + css + 'Color']);
      if (parseFloat(s['border' + css + 'Width']) > 0 && !/none|hidden/.test(s['border' + css + 'Style']) && c && c[3] > 0) l[lato] = 1;
    }
    return Object.keys(l).length ? l : null;
  }
  function scatola(el) {
    for (let n = el; n && n !== document.body; n = n.parentElement) {
      if (memoScatola.has(n)) return memoScatola.get(n);
      const l = lati(n);
      if (l) { memoScatola.set(n, { el: n, lati: l }); return memoScatola.get(n); }
    }
    return null;
  }
  function raccogliPerScatola(el) {
    const sc = scatola(el);
    if (!sc) return;
    const rg = document.createRange();
    [...el.childNodes].filter(n => n.nodeType === 3 && n.textContent.trim()).forEach(n => {
      rg.selectNodeContents(n);
      const r = rg.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const u = testiPerScatola.get(sc) || { l: Infinity, t: Infinity, r: -Infinity, b: -Infinity, testo: '' };
      u.l = Math.min(u.l, r.left); u.t = Math.min(u.t, r.top); u.r = Math.max(u.r, r.right); u.b = Math.max(u.b, r.bottom);
      if (!u.testo) u.testo = breve(n.textContent);
      testiPerScatola.set(sc, u);
    });
  }
  const vicini = [];
  testiPerScatola.forEach((u, sc) => {
    if (!vis(sc.el)) return;
    const b = sc.el.getBoundingClientRect(), s = cs(sc.el);
    const d = {
      sinistra: u.l - (b.left + parseFloat(s.borderLeftWidth)), destra: b.right - parseFloat(s.borderRightWidth) - u.r,
      alto: u.t - (b.top + parseFloat(s.borderTopWidth)), basso: b.bottom - parseFloat(s.borderBottomWidth) - u.b,
    };
    const soglia = { sinistra: 6, destra: 6, alto: 2, basso: 2 };
    const troppoVicini = Object.keys(sc.lati).filter(l => d[l] < soglia[l]);
    if (!troppoVicini.length) return;
    const distanze = {};
    Object.keys(sc.lati).forEach(l => { distanze[l] = Math.round(d[l] * 10) / 10; });
    vicini.push({ testo: u.testo, scatola: nome(sc.el), distanze, minima: Math.min(...troppoVicini.map(l => d[l])) });
  });
  vicini.sort((a, b) => a.minima - b.minima);
  out.testoVicinoAlBordo = {
    soglia: 'meno di 6 px a sinistra o a destra, meno di 2 px sopra o sotto (scelta di progetto, non uno standard); un valore negativo vuol dire testo che esce dalla scatola',
    quanti: vicini.length,
    esempi: vicini.slice(0, 8).map(({ minima, ...v }) => v),
  };

  // Titoli e paragrafo lungo
  const H = t => {
    const e = [...document.querySelectorAll(t)].find(e => vis(e) && e.innerText.trim());
    if (!e) return null;
    const s = cs(e);
    return { testo: e.innerText.trim().slice(0, 28), dimensione: s.fontSize, interlinea: s.lineHeight, peso: s.fontWeight, tracking: s.letterSpacing, maiuscolo: s.textTransform };
  };
  out.h1 = H('h1'); out.h2 = H('h2'); out.h3 = H('h3');
  const p = [...document.querySelectorAll('p')].find(e => vis(e) && e.innerText.trim().length > 80);
  if (p) {
    const s = cs(p), fs = parseFloat(s.fontSize), w = p.getBoundingClientRect().width;
    const lh = parseFloat(s.lineHeight);
    out.paragrafo = {
      dimensione: s.fontSize, interlinea: s.lineHeight, rapportoInterlinea: isNaN(lh) ? null : +(lh / fs).toFixed(2),
      larghezza: Math.round(w), caratteriPerRigaStimati: Math.round(w / (fs * 0.5)), allineamento: s.textAlign,
    };
  }

  // Elementi interattivi: dimensioni dei bersagli
  const inter = [...document.querySelectorAll('a,button,input,select,textarea,[role=button]')].filter(vis);
  let s24 = 0, s24f = 0, s44 = 0, s44f = 0;
  const piuPiccoli = [];
  inter.forEach(e => {
    const r = e.getBoundingClientRect(), m = Math.min(r.width, r.height), nelTesto = !!e.closest('p');
    if (m < 24) {
      s24++;
      if (!nelTesto) {
        s24f++;
        if (piuPiccoli.length < 8) piuPiccoli.push((e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 16) + ': ' + Math.round(r.width) + '×' + Math.round(r.height));
      }
    }
    if (m < 44) { s44++; if (!nelTesto) s44f++; }
  });
  Object.assign(out, {
    interattivi: inter.length, sotto24px: s24, sotto24pxFuoriDalTesto: s24f,
    sotto44px: s44, sotto44pxFuoriDalTesto: s44f, piuPiccoli,
  });

  // Pulsanti pieni: quanti nella prima schermata e quanti in tutta la pagina
  const fisso = el => { for (let n = el; n && n.nodeType === 1; n = n.parentElement) if (cs(n).position === 'fixed') return true; return false; };
  let pieniPrima = 0, pieniPagina = 0;
  const esempiPieni = [];
  // Candidati: i controlli veri, le label (nei prototipi senza JavaScript fanno spesso da pulsante) e gli
  // elementi con una classe come btn, button, bottone, pulsante o cta (anche btn-primario, non btn__testo).
  // Si conta solo il più esterno tra due pulsanti pieni uno dentro l'altro.
  const controllo = 'button,[role=button],a,label,summary,input[type=submit],input[type=button],input[type=reset]';
  const classePulsante = /^(btn|button|bottone|pulsante|cta)(-{1,2}[a-z0-9]+)*$/i;
  const contati = new Set();
  document.querySelectorAll('body *').forEach(e => {
    if (!e.matches(controllo) && ![...e.classList].some(c => classePulsante.test(c))) return;
    if (!vis(e) || strato(e).opacita === 0 || (e.tagName === 'A' && e.closest('p'))) return;
    for (let n = e.parentElement; n; n = n.parentElement) if (contati.has(n)) return;
    const s = cs(e), c = rgba(s.backgroundColor), dietro = strato(e.parentElement);
    const gradiente = /gradient/.test(s.backgroundImage);
    let pieno = gradiente;
    if (!pieno && c && c[3] >= 128) pieno = rapporto(c[3] === 255 ? c.slice(0, 3) : sopra(s.backgroundColor, dietro.rgb), dietro.rgb) >= 2;
    if (!pieno) return;
    contati.add(e);
    const r = e.getBoundingClientRect(), su = fisso(e) ? 0 : scrollY;
    pieniPagina++;
    if (r.top + su < VH && r.bottom + su > 0) pieniPrima++;
    if (esempiPieni.length < 6) esempiPieni.push(breve(e.innerText || e.value || e.getAttribute('aria-label') || e.tagName, 20) + ' (' + Math.round(r.width) + '×' + Math.round(r.height) + (gradiente ? ', gradiente' : ', ' + s.backgroundColor) + ')');
  });
  out.pulsantiPieni = {
    primaSchermata: pieniPrima, pagina: pieniPagina,
    criterio: 'sfondo con alfa almeno 0,5 e contrasto almeno 2:1 con ciò che c\'è dietro, oppure un gradiente (scelta di progetto)',
    esempi: esempiPieni,
  };

  // Navigazione, header, barre fisse, controlli del menu
  const nav = document.querySelector('header nav') || document.querySelector('nav');
  out.vociNavigazioneVisibili = nav ? [...nav.querySelectorAll('a,button')].filter(vis).length : null;
  const hdr = document.querySelector('header');
  out.altezzaHeader = hdr && laidOut(hdr) ? Math.round(hdr.getBoundingClientRect().height) : null;
  const barre = [...document.querySelectorAll('body *')].filter(e => {
    const s = cs(e);
    return (s.position === 'fixed' || s.position === 'sticky') && vis(e) && e.getBoundingClientRect().width > W * 0.5;
  }).slice(0, 6);
  out.barreFisse = barre.map(e => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, posizione: cs(e).position, alto: Math.round(r.top), altezza: Math.round(r.height), testo: (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50) };
  });
  out.controlliMenu = [...document.querySelectorAll('button,[role=button],a,input[type=checkbox]')].filter(e => vis(e) &&
    /menu|hamburger|nav|burger|toggle/i.test((e.getAttribute('aria-label') || '') + ' ' + (typeof e.className === 'string' ? e.className : '') + ' ' + (e.id || '') + ' ' + (e.innerText || '')))
    .slice(0, 4).map(e => {
      const r = e.getBoundingClientRect();
      return { tag: e.tagName, etichetta: (e.getAttribute('aria-label') || e.innerText || '').trim().slice(0, 20) || null, dimensione: Math.round(r.width) + '×' + Math.round(r.height) };
    });

  // Segni tipici da interfaccia generata: emoji, gradienti viola, card uguali con ombra.
  // Emoji: solo i caratteri che si mostrano come emoji (non ©, ®, ™, ↔, ★ e simili, se non seguiti da FE0F),
  // più i tasti numerati (una cifra o # seguita da FE0F e 20E3).
  const emojiRe = /\p{Emoji_Presentation}|\p{Extended_Pictographic}\u{FE0F}|\u{20E3}/u;
  const emoji = [];
  document.querySelectorAll('body *').forEach(el => {
    if (!hasOwnText(el) || !vis(el) || soloLettori(el)) return;
    const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ');
    if (emojiRe.test(txt) && emoji.length < 8) emoji.push(el.tagName + ': ' + txt.trim().slice(0, 20));
  });
  out.emoji = emoji;
  const hue = c => {
    const m = rgba(c); if (!m || m[3] === 0) return null;
    const [r, g, b] = m.slice(0, 3).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (d < 0.08) return null;
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return Math.round((h * 60 + 360) % 360);
  };
  const coloreRe = /(?:rgba?|hsla?|hwb|oklch|oklab|lch|lab|color)\([^()]*\)|#[0-9a-f]{3,8}\b/gi;
  const gradienti = [];
  document.querySelectorAll('body, body *').forEach(el => {
    const bi = cs(el).backgroundImage;
    if (!bi || !/gradient/.test(bi) || !laidOut(el) || gradienti.length >= 5) return;
    const tinte = (bi.match(coloreRe) || []).map(hue).filter(h => h != null);
    gradienti.push({
      elemento: nome(el), tinte,
      viola: tinte.some(h => h >= 260 && h <= 300),
      violaAlLimite: tinte.some(h => h >= 245 && h < 260),
    });
  });
  out.gradienti = gradienti;
  const gruppiOmbra = {};
  document.querySelectorAll('body *').forEach(el => {
    if (!laidOut(el) || cs(el).boxShadow === 'none' || !el.parentElement) return;
    const k = el.tagName + '.' + (typeof el.className === 'string' ? el.className : '');
    const g = gruppiOmbra[k] || (gruppiOmbra[k] = { parent: el.parentElement, n: 0 });
    if (g.parent === el.parentElement) g.n++;
  });
  out.gruppiCardConOmbra = Object.entries(gruppiOmbra).filter(([, g]) => g.n >= 3).map(([k, g]) => k + ' ×' + g.n);

  // Superfici: sfondi per area, raggi, sezioni, variabili CSS
  const bgArea = {}, raggi = {};
  document.querySelectorAll('body *').forEach(el => {
    if (!laidOut(el)) return;
    const s = cs(el), a = el.offsetWidth * el.offsetHeight;
    if (a > 2000 && !isTransparent(s.backgroundColor)) bgArea[s.backgroundColor] = (bgArea[s.backgroundColor] || 0) + a;
    if (s.borderRadius !== '0px' && el.offsetWidth > 30 && el.offsetWidth < 600) raggi[s.borderRadius] = (raggi[s.borderRadius] || 0) + 1;
  });
  out.sfondiPerArea = top(bgArea, 5);
  out.raggi = top(raggi, 5);
  out.sezioni = [...document.querySelectorAll('section')].slice(0, 10).map(e => {
    const s = cs(e);
    return { altezza: Math.round(e.getBoundingClientRect().height), paddingAlto: s.paddingTop, paddingBasso: s.paddingBottom };
  });

  // Fogli di stile leggibili: variabili di :root (anche dentro @layer e @media, come in Tailwind v4)
  // e regole @media (prefers-reduced-motion). Dei fogli non leggibili si tiene l'indirizzo.
  const vars = {}, radice = cs(document.documentElement), nonLeggibili = [];
  let riduci = false;
  const visita = regole => {
    for (const r of regole) {
      const media = r.media ? r.media.mediaText : (r.conditionText || '');
      if (/prefers-reduced-motion/.test(media)) riduci = true;
      if (r.selectorText && /:root/.test(r.selectorText) && r.style) {
        for (const n of r.style) {
          if (n.startsWith('--') && !(n in vars) && Object.keys(vars).length < 40) {
            vars[n] = (radice.getPropertyValue(n).trim() || r.style.getPropertyValue(n).trim()).slice(0, 40);
          }
        }
      }
      let figli = null;
      try { figli = r.cssRules; } catch (e) { /* regola non leggibile */ }
      if (figli && figli.length) visita(figli);
      if (r.styleSheet) { try { visita(r.styleSheet.cssRules); } catch (e) { nonLeggibili.push(r.styleSheet.href || r.href); } }
    }
  };
  for (const sh of document.styleSheets) {
    if (sh.media && /prefers-reduced-motion/.test(sh.media.mediaText)) riduci = true;
    let rules; try { rules = sh.cssRules; } catch (e) { nonLeggibili.push(sh.href || 'foglio senza indirizzo'); continue; }
    visita(rules);
  }
  // I fogli dei servizi di font contengono solo @font-face: non contano.
  const FONT = /fonts\.googleapis\.com|use\.typekit\.net|fonts\.bunny\.net|api\.fontshare\.com/;
  const altriNonLeggibili = nonLeggibili.filter(h => !FONT.test(h));
  if (altriNonLeggibili.length) {
    for (const n of radice) {
      if (n.startsWith('--') && !n.startsWith('--tw-') && !(n in vars) && Object.keys(vars).length < 40) vars[n] = radice.getPropertyValue(n).trim().slice(0, 40);
    }
  }
  out.variabiliCSS = vars;

  // Movimento: animazioni CSS, durate, curve, transition: all, riduci movimento, barre fisse
  const animati = [], durate = {}, curve = {}, tutte = [];
  let quantiAnimati = 0, quantiAll = 0;
  const zero = d => /^0m?s$/.test(d.trim());
  document.querySelectorAll('body, body *').forEach(el => {
    if (cs(el).display === 'none') return;
    for (const ps of [null, '::before', '::after']) {
      const s = cs(el, ps);
      if (ps && (s.content === 'none' || s.content === 'normal')) continue;
      const qui = nome(el) + (ps || '');
      if (s.animationName && s.animationName !== 'none') {
        quantiAnimati++;
        if (animati.length < 10) animati.push({ elemento: qui, nome: s.animationName, durata: s.animationDuration, curva: s.animationTimingFunction, ripetizioni: s.animationIterationCount });
        s.animationDuration.split(',').forEach((d, i) => {
          if (zero(d)) return;
          durate[d.trim()] = (durate[d.trim()] || 0) + 1;
          const c = (s.animationTimingFunction.split(/,(?![^(]*\))/)[i] || '').trim();
          if (c) curve[c] = (curve[c] || 0) + 1;
        });
      }
      const props = s.transitionProperty.split(',').map(x => x.trim());
      const tc = s.transitionTimingFunction.split(/,(?![^(]*\))/).map(x => x.trim());
      s.transitionDuration.split(',').forEach((d, i) => {
        if (zero(d)) return;
        durate[d.trim()] = (durate[d.trim()] || 0) + 1;
        const c = tc[i % tc.length];
        if (c) curve[c] = (curve[c] || 0) + 1;
        if (props[i % props.length] === 'all') { quantiAll++; if (tutte.length < 6 && !tutte.includes(qui)) tutte.push(qui); }
      });
    }
  });
  const html = cs(document.documentElement);
  const senzaPadding = v => v === 'auto' || parseFloat(v) === 0;
  out.movimento = {
    animati: { quanti: quantiAnimati, esempi: animati },
    durate: Object.fromEntries(top(durate, 10)),
    curve: Object.fromEntries(top(curve, 8)),
    transitionAll: { quanti: quantiAll, esempi: tutte },
    riduciMovimento: riduci ? true : altriNonLeggibili.length ? 'non leggibile' : false,
    riduciMovimentoAttivo: matchMedia('(prefers-reduced-motion: reduce)').matches,
    fogliNonLeggibili: nonLeggibili.slice(0, 5).map(h => h.slice(0, 120)),
    barreFisseSenzaScrollPadding: barre.map(e => {
      const r = e.getBoundingClientRect(), lato = r.top < VH / 2 ? 'alto' : 'basso';
      const v = lato === 'alto' ? html.scrollPaddingTop : html.scrollPaddingBottom;
      return senzaPadding(v) ? { tag: e.tagName, posizione: cs(e).position, lato, altezza: Math.round(r.height) } : null;
    }).filter(Boolean),
  };

  // Formati di colore incontrati e colori convertiti in modo approssimato
  out.conversioneColori = { formati, fuoriSRGB: [...fuoriSRGB], nonConvertiti: [...nonConvertiti] };

  // Tipografia fine: apostrofi dritti e intervalli con spazi nel testo visibile
  const tipo = { apostrofiDritti: 0, intervalliConSpazi: 0, esempi: [] };
  const intervallo = /\d\s+[-–—]\s*\d|\d\s*[-–—]\s+\d/g;
  const esamina = txt => {
    const a = txt.match(/'/g), iv = txt.match(intervallo);
    if (a) {
      tipo.apostrofiDritti += a.length;
      if (tipo.esempi.length < 6) { const i = txt.indexOf("'"); tipo.esempi.push('apostrofo dritto: …' + txt.slice(Math.max(0, i - 12), i + 12).replace(/\s+/g, ' ') + '…'); }
    }
    if (iv) {
      tipo.intervalliConSpazi += iv.length;
      if (tipo.esempi.length < 6) { const i = txt.search(intervallo); tipo.esempi.push('intervallo con spazi: …' + txt.slice(Math.max(0, i - 8), i + 16).replace(/\s+/g, ' ') + '…'); }
    }
  };
  const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = tw.nextNode(); n; n = tw.nextNode()) {
    const el = n.parentElement;
    if (!el || !n.textContent.trim() || el.closest('script,style,noscript,template,code,pre,kbd,samp,textarea') || !vis(el) || soloLettori(el)) continue;
    esamina(n.textContent);
  }
  document.querySelectorAll('[placeholder]').forEach(el => { if (vis(el)) esamina(el.getAttribute('placeholder'), el); });
  out.tipografia = tipo;

  return JSON.stringify(out);
})()
