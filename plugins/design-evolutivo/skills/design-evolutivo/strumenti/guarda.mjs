#!/usr/bin/env node
// guarda.mjs: fotografa una pagina alle larghezze di prova della skill e ne raccoglie le misure.
// Uso: node guarda.mjs <file.html | https://…> [cartella delle foto]
// Stampa un JSON: { cartella, prove: [ { larghezza, tema, foto, fontCaricati, misure } ], sfocata,
// movimentoSenzaRiduci }. "misure" è il risultato di misura-pagina.js in quella finestra.
//
// Foto:
// - 375×812, 320×640, 1440×900 e 375×812 in tema scuro: la finestra (prima schermata) e la pagina intera;
// - 375×812 sfocata (filter: blur di 6 px su tutta la pagina), per vedere cosa pesa di più.
// 375 e 1440 sono le larghezze di prova della skill e 640, 812, 900 le altezze: scelte di progetto, non
// standard. 320 viene da WCAG 1.4.10 (Reflow). Il raggio della sfocatura è una scelta, non uno standard.
// Sotto i 600 px la foto della finestra ha 2 pixel per pixel CSS, come un telefono; la pagina intera ne
// ha sempre 1, così una pagina lunga resta un file leggibile.
// Nella pagina intera le barre fisse restano dove stavano nella prima schermata e coprono ciò che c'è
// lì sotto: giudicale nella foto della finestra.
// "Riduci movimento" è attivo durante le foto, così un'animazione d'ingresso non lascia una foto a metà.
// Le animazioni che la pagina spegne con "riduci movimento" sono in "movimentoSenzaRiduci" (a 375 px).
// Attese (scelte): 20 s per il caricamento e 5 s per i font. Se scadono, le foto si fanno lo stesso e
// "avvisi" lo dice. "fontCaricati" dice quali font sono arrivati davvero: se manca quello del progetto,
// la foto mostra un font di riserva.
//
// Le foto vanno in una cartella temporanea del sistema, mai nella cartella del progetto: lo script
// rifiuta una cartella che sta dentro quella della pagina.
//
// Serve Playwright con Chromium. Se manca, lo script esce con codice 2 e lo dice: nella consegna scrivi
// "non guardata a schermo". Installazione, solo con il permesso dell'utente e mai nella cartella del
// progetto:
//   npm i -g playwright && npx playwright install chromium
// Lo script cerca Playwright accanto alla skill e poi tra i pacchetti globali di npm (npm root -g).
// Codici di uscita: 0 almeno una foto fatta; 1 errore (uso, file, cartella, nessuna foto);
// 2 Playwright o Chromium mancanti.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ATTESA_PAGINA = 20000; // ms, scelta
const ATTESA_FONT = 5000; // ms, scelta
const SFOCATURA = 6; // px CSS, scelta
const PROVE = [
  { larghezza: 375, altezza: 812, tema: 'light', sfocata: true, senzaRiduci: true },
  { larghezza: 320, altezza: 640, tema: 'light' },
  { larghezza: 1440, altezza: 900, tema: 'light' },
  { larghezza: 375, altezza: 812, tema: 'dark' },
];

const esci = (codice, ...righe) => { console.error(righe.join('\n')); process.exit(codice); };
const riga = e => String((e && e.message) || e).split('\n')[0].slice(0, 200);

const [, , bersaglio, uscita] = process.argv;
if (!bersaglio) esci(1, 'Uso: node guarda.mjs <file.html | https://…> [cartella delle foto]');

// Cosa fotografare
let url, nome, cartellaPagina = null;
if (/^https?:\/\//i.test(bersaglio)) {
  try { url = new URL(bersaglio).href; nome = new URL(bersaglio).hostname; }
  catch { esci(1, `Indirizzo non valido: ${bersaglio}`); }
} else {
  const file = resolve(bersaglio);
  if (!existsSync(file) || !statSync(file).isFile()) esci(1, `File non trovato: ${file}`);
  url = pathToFileURL(file).href;
  cartellaPagina = dirname(file);
  nome = basename(file, extname(file)) === 'index' ? basename(cartellaPagina) : basename(file, extname(file));
}
nome = nome.toLowerCase().replace(/[^a-z0-9.-]+/g, '-').replace(/^-+|-+$/g, '') || 'pagina';

// Dove mettere le foto
const quando = new Date().toISOString().slice(0, 19).replace(/[-:]/g, '').replace('T', '-');
const cartella = resolve(uscita || join(tmpdir(), 'design-evolutivo', `${nome}-${quando}`));
if (cartellaPagina) {
  const rel = relative(cartellaPagina, cartella);
  if (rel === '' || (!rel.startsWith('..') && !isAbsolute(rel))) {
    esci(1, `Le foto non vanno nella cartella del progetto (${cartellaPagina}).`,
      'Togli la cartella dal comando: lo script ne usa una temporanea del sistema.');
  }
}

// Playwright: prima accanto alla skill, poi tra i pacchetti globali di npm
async function caricaPlaywright() {
  for (const p of ['playwright', 'playwright-core']) {
    try { return await import(p); } catch { /* non c'è qui */ }
  }
  let radice = null;
  try { radice = execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { /* npm assente */ }
  for (const p of radice ? ['playwright', 'playwright-core'] : []) {
    const f = join(radice, p, 'index.mjs');
    if (existsSync(f)) { try { return await import(pathToFileURL(f).href); } catch { /* non si carica */ } }
  }
  return null;
}
const COME_INSTALLARE = [
  'Nella consegna scrivi "non guardata a schermo", oppure usa un browser controllabile se c\'è.',
  'Per installarlo (solo con il permesso dell\'utente, e mai nella cartella del progetto):',
  '  npm i -g playwright && npx playwright install chromium',
];
const pw = await caricaPlaywright();
if (!pw || !pw.chromium) esci(2, 'Playwright non è installato: non posso fotografare la pagina.', ...COME_INSTALLARE);
let browser;
try { browser = await pw.chromium.launch(); }
catch (e) { esci(2, `Chromium per Playwright non si avvia: ${riga(e)}`, ...COME_INSTALLARE); }

try { mkdirSync(cartella, { recursive: true }); }
catch (e) { await browser.close(); esci(1, `Non riesco a creare la cartella delle foto ${cartella}: ${riga(e)}`); }
const misura = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'misura-pagina.js'), 'utf8');
const uaMobile = pw.devices && pw.devices['Pixel 7'] ? pw.devices['Pixel 7'].userAgent : undefined;

const esito = { cartella, prove: [], sfocata: null, movimentoSenzaRiduci: null };

async function prova(p) {
  const tema = p.tema === 'dark' ? 'scuro' : 'chiaro';
  const etichetta = `${p.larghezza}${p.tema === 'dark' ? '-scuro' : ''}`;
  const r = { larghezza: p.larghezza, altezza: p.altezza, tema, foto: [], fontCaricati: [], fontNonCaricati: [], misure: null };
  const avvisi = [], nonCaricati = new Set();
  const mobile = p.larghezza < 600;
  let ctx;
  try {
    ctx = await browser.newContext({
      viewport: { width: p.larghezza, height: p.altezza },
      deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile,
      colorScheme: p.tema, reducedMotion: 'reduce', bypassCSP: true,
      ...(mobile && uaMobile ? { userAgent: uaMobile } : {}),
    });
    const page = await ctx.newPage();
    page.on('requestfailed', q => { if (nonCaricati.size < 5) nonCaricati.add(q.url().slice(0, 120)); });
    try { await page.goto(url, { waitUntil: 'load', timeout: ATTESA_PAGINA }); }
    catch (e) { avvisi.push(`la pagina non ha finito di caricare (${riga(e)}): foto fatte lo stesso`); }
    const pronti = await page.evaluate(ms => Promise.race([
      document.fonts.ready.then(() => true), new Promise(ok => setTimeout(() => ok(false), ms)),
    ]), ATTESA_FONT).catch(() => false);
    if (!pronti) avvisi.push(`i font non erano pronti dopo ${ATTESA_FONT / 1000} s`);
    // Scorre fino in fondo e torna su: alcune pagine mostrano i contenuti solo dopo lo scorrimento.
    await page.evaluate(async () => {
      const passo = innerHeight * 0.8;
      for (let y = 0, i = 0; y < document.documentElement.scrollHeight && i < 60; y += passo, i++) {
        scrollTo(0, y);
        await new Promise(ok => setTimeout(ok, 50));
      }
      scrollTo(0, 0);
    }).catch(() => {});
    await page.waitForTimeout(300);

    for (const [tipo, opzioni] of [['finestra', {}], ['intera', { fullPage: true, scale: 'css' }]]) {
      const f = join(cartella, `${etichetta}-${tipo}.png`);
      try { await page.screenshot({ path: f, ...opzioni }); r.foto.push(f); }
      catch (e) { avvisi.push(`foto ${tipo} non fatta: ${riga(e)}`); }
    }
    const font = await page.evaluate(() => {
      const f = [...document.fonts], fam = s => [...new Set(f.filter(x => x.status === s).map(x => x.family.replace(/["']/g, '')))];
      return { caricati: fam('loaded'), errore: fam('error') };
    }).catch(() => ({ caricati: [], errore: [] }));
    r.fontCaricati = font.caricati;
    r.fontNonCaricati = font.errore;
    try { r.misure = JSON.parse(await page.evaluate(misura)); }
    catch (e) { r.misure = { errore: `misure non prese: ${riga(e)}` }; }

    if (p.sfocata) {
      const f = join(cartella, `${etichetta}-sfocata.png`);
      try {
        const stile = await page.addStyleTag({ content: `html { filter: blur(${SFOCATURA}px) !important; }` });
        await page.waitForTimeout(100);
        await page.screenshot({ path: f });
        esito.sfocata = { larghezza: p.larghezza, foto: f, raggio: `${SFOCATURA} px CSS (scelta, non uno standard)` };
        await stile.evaluate(n => n.remove());
      } catch (e) { avvisi.push(`foto sfocata non fatta: ${riga(e)}`); }
    }
    if (p.senzaRiduci) {
      try {
        await page.emulateMedia({ reducedMotion: 'no-preference' });
        await page.waitForTimeout(100);
        esito.movimentoSenzaRiduci = JSON.parse(await page.evaluate(misura)).movimento;
      } catch (e) { avvisi.push(`movimento senza "riduci movimento" non letto: ${riga(e)}`); }
    }
  } catch (e) {
    avvisi.push(`prova non riuscita: ${riga(e)}`);
  } finally {
    if (ctx) await ctx.close().catch(() => {});
  }
  if (nonCaricati.size) avvisi.push(`risorse non caricate: ${[...nonCaricati].join(' · ')}`);
  if (avvisi.length) r.avvisi = avvisi;
  return r;
}

for (const p of PROVE) esito.prove.push(await prova(p));
await browser.close();
console.log(JSON.stringify(esito, null, 1));
const quante = esito.prove.reduce((n, p) => n + p.foto.length, 0) + (esito.sfocata ? 1 : 0);
if (!quante) esci(1, 'Nessuna foto fatta: leggi "avvisi" nel JSON.');
