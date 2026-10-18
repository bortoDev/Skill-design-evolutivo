#!/usr/bin/env node
// memoria.mjs: prepara la memoria della skill, cioè la cartella in cui impara.
// La memoria sta in ~/design-evolutivo-memoria/, fuori da ~/.claude: è la stessa con il plugin e con la
// copia della skill. Il seme è la cartella memoria-iniziale/ della skill, che si legge e basta.
// Uso:
//   node memoria.mjs inizia              copia la memoria iniziale, se la memoria non c'è ancora
//   node memoria.mjs importa <cartella>  copia una memoria che esiste già, per esempio quella di una
//                                        vecchia installazione: ~/.claude/skills/design-evolutivo/memoria
//   node memoria.mjs dove                dice dov'è la memoria e se esiste
// Regole:
// - non sovrascrive mai un file che esiste già e non cancella mai niente, nemmeno la cartella di origine;
// - regole-apprese.md si copia per ultimo: se c'è, la copia è finita. Se manca, "inizia" completa una
//   copia lasciata a metà, copiando solo i file che mancano;
// - "inizia" e "importa" rifiutano se la memoria ha già regole-apprese.md, e anche se la memoria esiste a
//   metà con file che non vengono dalla stessa origine (la memoria iniziale per "inizia", la cartella
//   indicata per "importa"): così due memorie non si mescolano. Una copia interrotta della stessa origine
//   si completa. I file nascosti (.DS_Store, .git) non contano;
// - stampa i percorsi assoluti e i file copiati, così la skill lo annuncia all'utente in una riga.
// Codici di uscita: 0 fatto; 1 errore o rifiuto.
// Nessuna dipendenza: serve solo Node.
import { constants, copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const QUI = dirname(fileURLToPath(import.meta.url));
const MEMORIA = join(homedir(), 'design-evolutivo-memoria');
const SEME = resolve(QUI, '..', 'memoria-iniziale');
const ESEMPI_BASE = resolve(QUI, '..', 'riferimenti', 'esempi');
const SEGNO = 'regole-apprese.md';
// Le schede della base in riferimenti/esempi/: da aggiornare se cambiano gli esempi della skill.
const SCHEDE_BASE = ['00-indice.md', 'apple-store.md', 'awwwards.md', 'bbang.md', 'dishoom.md', 'duca-pipe.md',
  'montenellago.md', 'okomedia.md', 'sbc-niu-midia.md'];
const USO = [
  'Uso:',
  '  node memoria.mjs inizia              copia la memoria iniziale in ' + MEMORIA,
  '  node memoria.mjs importa <cartella>  copia lì una memoria che esiste già',
  '  node memoria.mjs dove                dice dov\'è la memoria e se esiste',
].join('\n');

const esci = (codice, ...righe) => { (codice ? console.error : console.log)(righe.join('\n')); process.exit(codice); };
const espandi = p => (p === '~' ? homedir() : p.startsWith('~/') || p.startsWith('~\\') ? join(homedir(), p.slice(2)) : p);
const dentro = (figlia, madre) => { const r = relative(madre, figlia); return r === '' || (!r.startsWith('..') && !isAbsolute(r)); };
const vero = p => { try { return realpathSync(p); } catch { return resolve(p); } };
const elenco = a => a.slice(0, 8).join(', ') + (a.length > 8 ? ` e altri ${a.length - 8}` : '');

// Tutti i file e le cartelle sotto "radice", con percorsi relativi; regole-apprese.md per ultimo.
function elenca(radice) {
  const file = [], cartelle = [], saltati = [];
  const visita = rel => {
    for (const nome of readdirSync(join(radice, rel)).sort()) {
      const r = rel ? join(rel, nome) : nome, info = lstatSync(join(radice, r));
      if (info.isSymbolicLink()) saltati.push(r);
      else if (info.isDirectory()) { cartelle.push(r); visita(r); }
      else if (info.isFile()) file.push(r);
    }
  };
  visita('');
  const i = file.indexOf(SEGNO);
  if (i >= 0) file.push(...file.splice(i, 1));
  return { file, cartelle, saltati };
}

// Copia senza sovrascrivere: i file che esistono già restano come sono.
// I file della memoria che non vengono da "origine": mancano lì o hanno un contenuto diverso.
function estranei(origine) {
  if (!existsSync(MEMORIA)) return [];
  const nascosto = f => f.split(/[\\/]/).some(parte => parte.startsWith('.'));
  const { file, saltati } = elenca(MEMORIA);
  return [...saltati, ...file].filter(f => !nascosto(f)).filter(f => {
    const o = join(origine, f);
    try { return !existsSync(o) || !readFileSync(o).equals(readFileSync(join(MEMORIA, f))); } catch { return true; }
  });
}

function copia(da, a) {
  const { file, cartelle, saltati } = elenca(da);
  const copiati = [], presenti = [];
  mkdirSync(a, { recursive: true });
  for (const c of cartelle) mkdirSync(join(a, c), { recursive: true });
  for (const f of file) {
    const dest = join(a, f);
    if (existsSync(dest)) { presenti.push(f); continue; }
    try { copyFileSync(join(da, f), dest, constants.COPYFILE_EXCL); copiati.push(f); }
    catch (e) {
      if (e.code === 'EEXIST') { presenti.push(f); continue; }
      throw new Error(`non riesco a copiare ${f}: ${e.message}` + (copiati.length ? `. Copiati finora: ${copiati.join(', ')}` : ''));
    }
  }
  return { copiati, presenti, saltati };
}

function rapporto({ copiati, presenti, saltati }) {
  const righe = [`Copiati (${copiati.length}): ${copiati.join(', ') || 'nessuno'}`];
  if (presenti.length) righe.push(`Già presenti, lasciati come sono (${presenti.length}): ${presenti.join(', ')}`);
  if (saltati.length) righe.push(`Collegamenti simbolici non copiati: ${saltati.join(', ')}`);
  return righe;
}

const [, , comando, argomento] = process.argv;

if (comando === 'dove') {
  const stato = !existsSync(MEMORIA) ? 'non esiste ancora: si crea con "node memoria.mjs inizia"'
    : existsSync(join(MEMORIA, SEGNO)) ? 'esiste'
    : `esiste, ma senza ${SEGNO}: è una copia lasciata a metà, si completa rilanciando lo stesso comando ("inizia" o "importa")`;
  esci(0, MEMORIA, `Stato: ${stato}`, `Memoria iniziale (sola lettura): ${SEME}`);
}

if (comando === 'inizia') {
  if (!existsSync(join(SEME, SEGNO))) esci(1, `Non trovo la memoria iniziale in ${SEME}: la skill è installata male.`);
  if (existsSync(join(MEMORIA, SEGNO))) {
    const mancano = elenca(SEME).file.filter(f => !existsSync(join(MEMORIA, f)));
    esci(1, `La memoria esiste già in ${MEMORIA} (c'è ${SEGNO}): non copio nulla, per non toccare ciò che la skill ha imparato.`,
      ...(mancano.length ? [`Rispetto alla memoria iniziale mancano: ${mancano.join(', ')}. Se servono, si copiano a mano da ${SEME}, con il permesso dell'utente.`] : []));
  }
  const aMeta = existsSync(MEMORIA) && readdirSync(MEMORIA).length > 0;
  const diversi = estranei(SEME);
  if (diversi.length) {
    esci(1, `In ${MEMORIA} c'è una memoria incompleta (senza ${SEGNO}) con file che non vengono dalla memoria iniziale: ${elenco(diversi)}. Non copio nulla, per non mescolare due memorie.`,
      'Se è un\'importazione interrotta, rilancia "importa" con la stessa cartella. Altrimenti spostala, per esempio in ~/design-evolutivo-memoria-a-meta, e rilancia "inizia".');
  }
  try {
    const esito = copia(SEME, MEMORIA);
    esci(0, `${aMeta ? 'Ho completato la memoria lasciata a metà' : 'Ho creato la memoria'} in ${MEMORIA}`,
      `Copiata da: ${SEME}`, ...rapporto(esito));
  } catch (e) { esci(1, `Errore: ${e.message}`); }
}

if (comando === 'importa') {
  if (!argomento) esci(1, 'Manca la cartella da importare.', USO);
  const da = resolve(espandi(argomento));
  if (!existsSync(da) || !statSync(da).isDirectory()) esci(1, `Cartella non trovata: ${da}`);
  if (!existsSync(join(da, SEGNO))) esci(1, `In ${da} non c'è ${SEGNO}: non sembra una memoria della skill. Non importo nulla.`);
  const daVero = vero(da), memVero = vero(MEMORIA);
  if (dentro(daVero, memVero) || dentro(memVero, daVero)) esci(1, `${da} e ${MEMORIA} sono la stessa cartella o una sta dentro l'altra: non importo nulla.`);
  if (existsSync(join(MEMORIA, SEGNO))) {
    esci(1, `La memoria esiste già in ${MEMORIA} (c'è ${SEGNO}): non importo nulla, per non mescolare due memorie.`,
      `La cartella ${da} resta com'è.`);
  }
  const diversi = estranei(da);
  if (diversi.length) {
    esci(1, `In ${MEMORIA} c'è una memoria incompleta (senza ${SEGNO}) con file diversi da quelli di ${da}: ${elenco(diversi)}. Non importo, per non mescolare due memorie.`,
      `Spostala, per esempio in ~/design-evolutivo-memoria-a-meta, e rilancia "importa". La cartella ${da} resta com'è.`);
  }
  let esito;
  try { esito = copia(da, MEMORIA); } catch (e) { esci(1, `Errore: ${e.message}`, `La cartella ${da} resta com'è.`); }
  const righe = [`Ho importato la memoria in ${MEMORIA}`, `Da: ${da} (non l'ho toccata né cancellata)`, ...rapporto(esito)];
  // Schede di siti studiati nella vecchia installazione (riferimenti/esempi/ accanto alla vecchia memoria).
  // Si confrontano con l'elenco fisso della base, perché in una copia aggiornata sul posto quella cartella
  // è anche la cartella degli esempi della skill.
  const vecchiEsempi = join(da, '..', 'riferimenti', 'esempi');
  if (existsSync(vecchiEsempi) && statSync(vecchiEsempi).isDirectory()) {
    const stessa = vero(vecchiEsempi) === vero(ESEMPI_BASE);
    const base = new Set([...SCHEDE_BASE, ...(!stessa && existsSync(ESEMPI_BASE) ? readdirSync(ESEMPI_BASE) : [])]);
    const nuove = readdirSync(vecchiEsempi).filter(f => f.endsWith('.md') && !base.has(f));
    const indice = join(vecchiEsempi, '00-indice.md'), indiceBase = join(ESEMPI_BASE, '00-indice.md');
    const indiceDiverso = !stessa && existsSync(indice) && existsSync(indiceBase) && readFileSync(indice, 'utf8') !== readFileSync(indiceBase, 'utf8');
    if (nuove.length || indiceDiverso) {
      righe.push(`In ${resolve(vecchiEsempi)} ci sono anche ` +
        [nuove.length ? `schede di siti studiati che non sono nella base: ${nuove.join(', ')}` : '', indiceDiverso ? 'un 00-indice.md diverso da quello della base' : ''].filter(Boolean).join(' e ') +
        `. Non li ho copiati: se l'utente vuole, vanno in ${join(MEMORIA, 'esempi')}.`);
    }
  }
  esci(0, ...righe);
}

esci(1, comando ? `Comando sconosciuto: ${comando}` : 'Manca il comando.', USO);
