// misura-pagina.js: misure di una pagina web dagli stili calcolati del browser.
// Nasce dagli script usati per analizzare gli 8 siti di riferimento (desktop e mobile).
// Uso: con un browser controllabile (strumento JavaScript del browser, Playwright…), apri la pagina,
// imposta la finestra (1440×900 per il desktop, 375×812 per il mobile), scorri fino in fondo e torna su
// (alcune pagine mostrano i contenuti solo dopo lo scorrimento), poi esegui tutto questo file:
// restituisce una stringa JSON.
// Limiti: conta solo ciò che è disposto e dentro la finestra in orizzontale (i menu laterali chiusi sono
// esclusi); il contrasto usa il primo colore di sfondo pieno tra gli antenati e restituisce null se trova
// un'immagine di sfondo. Il testo sopra foto o video posizionati non si può calcolare: controllalo a vista.
(() => {
  const top = (o, n = 6) => Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n);
  const cs = e => getComputedStyle(e);
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
  const rgb = c => { const m = (c || '').match(/[\d.]+/g); return m && m.length >= 3 ? m.slice(0, 4).map(Number) : null; };
  const lum = c => {
    const m = rgb(c); if (!m) return null;
    const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    return 0.2126 * f(m[0]) + 0.7152 * f(m[1]) + 0.0722 * f(m[2]);
  };
  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    if (l1 == null || l2 == null) return null;
    return +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
  };
  const isTransparent = c => { const m = rgb(c); return !m || (m.length === 4 && m[3] === 0); };
  const bgOf = el => {
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const s = cs(n);
      if (s.backgroundImage && s.backgroundImage !== 'none') return null;
      if (!isTransparent(s.backgroundColor)) return s.backgroundColor;
    }
    const html = cs(document.documentElement).backgroundColor;
    return isTransparent(html) ? 'rgb(255, 255, 255)' : html;
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

  // Testo: famiglie, dimensioni, colori, testo piccolo, contrasto
  const fonts = {}, sizes = {}, fg = {};
  let nodi = 0, sotto12 = 0, sotto14 = 0, contrastoBasso = 0, contrastoNonCalcolabile = 0;
  const gruppiContrasto = {};
  document.querySelectorAll('body *').forEach(el => {
    if (!hasOwnText(el) || !vis(el)) return;
    const s = cs(el), fs = parseFloat(s.fontSize), w = parseInt(s.fontWeight, 10) || 400;
    nodi++;
    const f = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
    fonts[f] = (fonts[f] || 0) + 1;
    const k = Math.round(fs * 10) / 10 + 'px';
    sizes[k] = (sizes[k] || 0) + 1;
    fg[s.color] = (fg[s.color] || 0) + 1;
    if (fs < 12) sotto12++;
    if (fs < 14) sotto14++;
    const bg = bgOf(el), r = bg ? ratio(s.color, bg) : null;
    if (r == null) { contrastoNonCalcolabile++; return; }
    const grande = fs >= 24 || (fs >= 18.66 && w >= 700);
    if (r < (grande ? 3 : 4.5)) {
      contrastoBasso++;
      const key = s.color + ' su ' + bg;
      const g = gruppiContrasto[key] || (gruppiContrasto[key] = { colore: s.color, sfondo: bg, rapporto: r, soglia: grande ? 3 : 4.5, quanti: 0, esempi: [] });
      g.quanti++;
      if (g.esempi.length < 3) g.esempi.push(el.innerText.trim().replace(/\s+/g, ' ').slice(0, 24) + ' (' + s.fontSize + ')');
    }
  });
  Object.assign(out, {
    nodiDiTesto: nodi, famiglie: top(fonts, 5), dimensioni: top(sizes, 10), coloriTesto: top(fg, 5),
    nodiSotto12px: sotto12, nodiSotto14px: sotto14,
    contrastoSottoSoglia: contrastoBasso, contrastoNonCalcolabile,
    peggioriContrasti: Object.values(gruppiContrasto).sort((a, b) => a.rapporto - b.rapporto).slice(0, 8),
  });

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

  // Navigazione, header, barre fisse, controlli del menu
  const nav = document.querySelector('header nav, nav');
  out.vociNavigazioneVisibili = nav ? [...nav.querySelectorAll('a,button')].filter(vis).length : null;
  const hdr = document.querySelector('header');
  out.altezzaHeader = hdr && laidOut(hdr) ? Math.round(hdr.getBoundingClientRect().height) : null;
  out.barreFisse = [...document.querySelectorAll('body *')].filter(e => {
    const s = cs(e);
    return (s.position === 'fixed' || s.position === 'sticky') && vis(e) && e.getBoundingClientRect().width > W * 0.5;
  }).slice(0, 6).map(e => {
    const r = e.getBoundingClientRect();
    return { tag: e.tagName, posizione: cs(e).position, alto: Math.round(r.top), altezza: Math.round(r.height), testo: (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 50) };
  });
  out.controlliMenu = [...document.querySelectorAll('button,[role=button],a,input[type=checkbox]')].filter(e => vis(e) &&
    /menu|hamburger|nav|burger|toggle/i.test((e.getAttribute('aria-label') || '') + ' ' + (typeof e.className === 'string' ? e.className : '') + ' ' + (e.id || '') + ' ' + (e.innerText || '')))
    .slice(0, 4).map(e => {
      const r = e.getBoundingClientRect();
      return { tag: e.tagName, etichetta: (e.getAttribute('aria-label') || e.innerText || '').trim().slice(0, 20) || null, dimensione: Math.round(r.width) + '×' + Math.round(r.height) };
    });

  // Segni tipici da interfaccia generata: emoji, gradienti viola, card uguali con ombra
  const emojiRe = /\p{Extended_Pictographic}/u;
  const emoji = [];
  document.querySelectorAll('body *').forEach(el => {
    if (!hasOwnText(el) || !vis(el)) return;
    const txt = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join(' ');
    if (emojiRe.test(txt) && emoji.length < 8) emoji.push(el.tagName + ': ' + txt.trim().slice(0, 20));
  });
  out.emoji = emoji;
  const hue = c => {
    const m = rgb(c); if (!m) return null;
    const [r, g, b] = m.slice(0, 3).map(v => v / 255), mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (d < 0.08) return null;
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return Math.round((h * 60 + 360) % 360);
  };
  const gradienti = [];
  document.querySelectorAll('body, body *').forEach(el => {
    const bi = cs(el).backgroundImage;
    if (!bi || !/gradient/.test(bi) || !laidOut(el) || gradienti.length >= 5) return;
    const tinte = (bi.match(/rgba?\([^)]*\)/g) || []).map(hue).filter(h => h != null);
    gradienti.push({ elemento: el.tagName + (typeof el.className === 'string' && el.className ? '.' + el.className.split(' ')[0] : ''), tinte, viola: tinte.some(h => h >= 260 && h <= 300) });
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
  const vars = {};
  try {
    for (const sh of document.styleSheets) {
      let rules; try { rules = sh.cssRules; } catch (e) { continue; }
      for (const r of rules) {
        if (r.selectorText === ':root') for (const n of r.style) {
          if (n.startsWith('--') && Object.keys(vars).length < 25) vars[n] = r.style.getPropertyValue(n).trim().slice(0, 40);
        }
      }
    }
  } catch (e) { /* fogli di stile non leggibili */ }
  out.variabiliCSS = vars;

  return JSON.stringify(out);
})()
