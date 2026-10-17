# Skill design-evolutivo · istruzioni per lo sviluppo

Questo repository serve a sviluppare `design-evolutivo`, una skill di Claude Code che progetta, rivede, corregge, valuta e studia interfacce (siti, web app, app iOS e Android) e **impara dall'utente** da un progetto all'altro. L'evoluzione è il cuore della skill: giudica ogni modifica da quanto la rafforza o la indebolisce.

L'utente sta imparando il design frontend, ha seguito un corso di interazione uomo–macchina e non è un esperto. Scrivi in italiano semplice e spiega le scelte tecniche.

## Dove sono le cose
- `design-evolutivo/` è la skill, cioè la cartella da installare in `~/.claude/skills/`. Claude legge `SKILL.md`; `README.md` è per l'utente; `STORIA.md` riassume versioni, provenienza dei file e piano iniziale.
- Questo `CLAUDE.md` serve solo allo sviluppo: non fa parte della skill e non va copiato nella cartella installata.
- La conversazione in cui è nata la skill (claude.ai, 15–17/10/2026) non è nel repository: le decisioni che contano sono qui sotto e in `STORIA.md`.

| Cartella della skill | Contenuto |
|---|---|
| `processo/` | una guida per modalità (`rivedi`, `migliora`, `valuta`, `studia`); `evoluzione.md` (come impara); `direzioni.md` (come propone); `verifica.md` (controlli prima di consegnare); `esempio-ciclo.md` |
| `memoria/` | ciò che la skill ha imparato: profilo di gusto, regole, catalogo errori, semi, diario, registro dei progetti. Cambia con l'uso |
| `riferimenti/` | `fondamenta.md` (le regole del corso dell'utente unite in 12 principi), `app-mobile.md` (iOS e Android), `esempi/` (8 siti analizzati e il loro indice) |
| `strumenti/` | `contrasto.mjs` (Node, senza dipendenze); `misura-pagina.js` (da eseguire in un browser) |
| `modelli/DESIGN.md` | il file che la skill tiene in ogni progetto dell'utente |

## Regole di lavoro
Sono nate mentre costruivamo la skill. Rispettale anche quando sembra di poterla "migliorare" in un altro modo.

1. **Ogni numero ha una fonte verificata.** Prima di scrivere una soglia (contrasto, target, dimensioni, interlinea…) leggila sulla fonte ufficiale (W3C, Apple HIG, documentazione Android e Material) e citala; se non l'hai verificata, scrivi "non verificato". Errori già corretti, da non reintrodurre: per Apple 44×44 pt è la dimensione **predefinita** e il minimo è 28×28 pt; la HIG non fissa un numero massimo di tab; il corpo minimo di 16 px per il web non è uno standard verificato.
2. **Distingui misurato, letto, osservato e ipotesi**, sia nei file della skill sia nelle risposte, e dichiara cosa non hai fatto o provato.
3. **Niente `hooks` nel frontmatter di `SKILL.md`.** Provato: Claude Code chiede un permesso prima di avviare la skill, e in modalità non interattiva la blocca. Il promemoria automatico resta facoltativo, nelle impostazioni dell'utente (`README.md`).
4. **Una sola skill con più modalità**, non skill separate. Creazione e critica condividono una sola memoria, e nel contesto c'è una sola descrizione. Un critico indipendente si ottiene con un subagente (`processo/rivedi.md` §7).
5. **La skill non si riscrive da sola.** Ogni cosa appresa si annuncia in una riga, e l'utente può correggerla o ritirarla. Le regole nuove sono proposte: decide l'utente. È il principio di intelligibilità e controllo sull'automazione del suo corso: non introdurre meccanismi che cambiano la memoria in silenzio.
6. **"Cambia almeno 1 gene su 5"** rispetto ai riferimenti e all'ultimo progetto è una scelta dell'utente (prima era 3 su 5): non riportarla a 3. La direzione C ne cambia almeno 3 per costruzione, ma è un'altra regola.
7. **La memoria iniziale non è confermata.** L'utente ha approvato solo le 3 regole attive (R-001 emoji come icone, R-002 gradienti viola, R-003 card identiche con ombra). I 6 "default da evitare" e le 5 tendenze del profilo sono ipotesi ricavate dagli 8 siti: non promuoverli senza la sua conferma.
8. **Richiama le altre skill, non copiarle** (`frontend-design`, `design-critique`, `accessibility-review`…). Questa skill contiene solo ciò che le altre non sanno: gusto, memoria ed evoluzione.
9. **I file letti a ogni lavoro restano corti.** `SKILL.md` fa da indice e i dettagli stanno in file letti solo quando servono; i limiti sono 40 regole e 80 righe di profilo. La descrizione nel frontmatter mette all'inizio le parole chiave (interfacce, siti, app, schermate), perché con molte skill installate Claude Code la accorcia.
10. **Ogni versione nuova va in `STORIA.md`**, nella tabella delle versioni e nello stato del piano. I commit dicono cosa cambia e perché.

## Provare la skill
- Non modificarla dentro `~/.claude/skills/`: è una cartella protetta e ogni scrittura chiede un permesso. Si modifica qui e si copia lì (o in `.claude/skills/` di un progetto di prova) per provarla.
- Le prove si fanno in sessioni nuove e non interattive di Claude Code (`claude -p "…"`) in una cartella di prova, poi si controllano i file di `memoria/`. Le prove con il risultato atteso sono in `README.md`, sezione "Come verificare che impari davvero". Per confrontare i risultati con e senza la skill c'è la skill `skill-creator`.
- Senza la regola `Read(~/.claude/skills/design-evolutivo/**)` (passo 2 di `README.md`), la lettura della memoria dalla copia installata chiede un permesso.
- Controllo rapido degli strumenti: `node design-evolutivo/strumenti/contrasto.mjs "#87CBC3" "#fff"` deve dare 1,85:1 (il menta di Montenellago).
- La modalità `studia` e le misure su pagine vere richiedono un browser controllabile da Claude Code (per esempio Claude in Chrome); tutto il resto funziona senza.

## Stato (v0.5, 16/10/2026)
**Provato:**
- la skill si carica sia come skill personale sia come skill di progetto, e legge la memoria;
- i permessi;
- il promemoria facoltativo, solo nei progetti con `DESIGN.md`;
- `contrasto.mjs` e `misura-pagina.js` su una pagina con difetti noti;
- la modalità `rivedi` in una sessione nuova.

**Ancora da fare:**
- **apprendimento tra sessioni.** Correzione → regola → sessione nuova che non ripete l'errore: sono le prove 1–6 di `README.md`, mai eseguite;
- **calibrazione del gusto** con l'utente: confermare o scartare i 6 default candidati e le 5 tendenze;
- **metriche di tipografia e spaziatura** (scale, griglie), da verificare prima di scriverle;
- **plugin**, con la memoria fuori dalla cartella del plugin.

## Questione aperta: dove vive la memoria
La skill scrive la memoria nella propria cartella (`${CLAUDE_SKILL_DIR}/memoria/`), cioè nella copia installata e non in questo repository. Copiando la skill per provarla o aggiornarla, le due memorie si separano, e una copia nuova cancellerebbe ciò che è stato imparato.

Prima dell'uso reale va decisa con l'utente una soluzione. Per esempio:
- installare la skill con un collegamento simbolico a questa cartella;
- tenere `memoria/` fuori dal repository e versionarla a parte.

Nessuna delle due è stata provata. La scelta tocca anche il passo 4 dell'installazione in `README.md` e il commit a fine consolidamento in `processo/evoluzione.md` §8.
