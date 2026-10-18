# Skill design-evolutivo · istruzioni per lo sviluppo

Questo repository serve a sviluppare `design-evolutivo`, una skill di Claude Code che progetta, rivede, corregge, valuta e studia interfacce (siti, web app, app iOS e Android) e **impara dall'utente** da un progetto all'altro. L'evoluzione è il cuore della skill: giudica ogni modifica da quanto la rafforza o la indebolisce.

L'utente sta imparando il design frontend, ha seguito un corso di interazione uomo–macchina e non è un esperto. Scrivi in italiano semplice e spiega le scelte tecniche.

## Dove sono le cose
Il repository è un catalogo di plugin per Claude Code (marketplace `bortodev`) con un solo plugin, `design-evolutivo`, che contiene una sola skill.

| Percorso | Contenuto |
|---|---|
| `.claude-plugin/marketplace.json` | il catalogo: nome `bortodev`, un plugin con sorgente `./plugins/design-evolutivo` |
| `plugins/design-evolutivo/.claude-plugin/plugin.json` | il manifest del plugin; `version` va cambiata a ogni versione di `STORIA.md`, altrimenti chi l'ha installato non riceve l'aggiornamento |
| `plugins/design-evolutivo/skills/design-evolutivo/` | **la skill** (qui sotto: la cartella della skill). È anche la cartella da copiare in `~/.claude/skills/` per chi non usa il plugin |
| `README.md`, `README.it.md` | presentazione per GitHub, in inglese (principale) e in italiano, con i link per cambiare lingua |
| `LICENSE` | MIT |
| `CLAUDE.md` | questo file: serve solo allo sviluppo e resta fuori dal plugin |

Nella cartella della skill: Claude legge `SKILL.md`; `README.md` è la guida per l'utente, in italiano; `STORIA.md` riassume versioni, provenienza dei file e piano iniziale. La conversazione in cui è nata la skill (claude.ai, 15–17/10/2026) non è nel repository: le decisioni che contano sono qui sotto e in `STORIA.md`.

| Cartella della skill | Contenuto |
|---|---|
| `processo/` | una guida per modalità (`rivedi`, `migliora`, `valuta`, `studia`); `analisi.md` (come inizia un progetto: stakeholder, priorità, piano a pezzi); `rifinitura.md` (guardare la pagina, togliere, curare i dettagli); `verifica.md` (controlli prima di consegnare); `evoluzione.md` (come impara); `direzioni.md` (come propone); `esempio-ciclo.md` |
| `memoria-iniziale/` | la memoria di partenza: regole e preferenze date dall'utente, profilo, semi, modelli dei file. Al primo uso la skill la copia in `~/design-evolutivo-memoria/`, dove poi impara |
| `riferimenti/` | `fondamenta.md` (le regole del corso dell'utente unite in 12 principi), `tipografia-spaziatura.md`, `colore.md`, `immagini.md`, `movimento-stati.md`, `app-mobile.md` (iOS e Android), `esempi/` (8 siti analizzati e il loro indice) |
| `strumenti/` | `contrasto.mjs` e `memoria.mjs` (Node, senza dipendenze); `misura-pagina.js` (da eseguire in un browser); `guarda.mjs` (foto e misure di una pagina; Playwright facoltativo) |
| `modelli/DESIGN.md` | il file che la skill tiene in ogni progetto dell'utente |

## Regole di lavoro
Sono nate mentre costruivamo la skill. Rispettale anche quando sembra di poterla "migliorare" in un altro modo.

1. **Ogni numero ha una fonte verificata.** Prima di scrivere una soglia (contrasto, target, dimensioni, interlinea…) leggila sulla fonte ufficiale (W3C, Apple HIG, documentazione Android e Material) e citala; se non l'hai verificata, scrivi "non verificato". Errori già corretti, da non reintrodurre: per Apple 44×44 pt è la dimensione **predefinita** e il minimo è 28×28 pt; la HIG non fissa un numero massimo di tab; il corpo minimo di 16 px per il web non è uno standard verificato.
2. **Distingui misurato, letto, osservato e ipotesi**, sia nei file della skill sia nelle risposte, e dichiara cosa non hai fatto o provato.
3. **Niente `hooks` nel frontmatter di `SKILL.md`, e niente `hooks/hooks.json` nel plugin.** Provato: con gli hooks nel frontmatter Claude Code chiede un permesso prima di avviare la skill, e in modalità non interattiva la blocca. Un hook del plugin girerebbe in ogni sessione e scriverebbe la memoria in silenzio (regola 6). Il promemoria automatico resta facoltativo, nelle impostazioni dell'utente (guida della skill).
4. **Una sola skill con più modalità**, non skill separate. Creazione e critica condividono una sola memoria, e nel contesto c'è una sola descrizione. Un critico indipendente si ottiene con un subagente (`processo/rivedi.md` §7).
5. **Prima si ingegnerizza, poi si disegna.** Richiesta esplicita dell'utente: un progetto non si produce tutto insieme. Si parte dall'analisi di `processo/analisi.md`: stakeholder, compiti con priorità, domande giuste, piano a pezzi approvato. Poi si costruisce un pezzo alla volta, con un feedback dopo ognuno. Non accorciare questo passo, se non in proporzione alla dimensione del lavoro.
6. **La skill non si riscrive da sola.** Ogni cosa appresa si annuncia in una riga, e l'utente può correggerla o ritirarla. Le regole nuove sono proposte: decide l'utente. È il principio di intelligibilità e controllo sull'automazione del suo corso: non introdurre meccanismi che cambiano la memoria in silenzio.
7. **"Cambia almeno 1 gene su 5"** rispetto ai riferimenti e all'ultimo progetto è una scelta dell'utente (prima era 3 su 5): non riportarla a 3. La direzione C ne cambia almeno 3 per costruzione, ma è un'altra regola.
8. **Nella memoria iniziale, solo ciò che l'utente ha approvato vale come regola.** Approvati: le lezioni di processo "niente di standard per abitudine" e "cura da alto livello" (17/10/2026) e le regole R-001–R-019 di `memoria-iniziale/regole-apprese.md` (R-019 nasce dal primo giudizio dell’utente sulle schermate delle prove). Decisioni del 18/10/2026: R-014 comprende le foto d'archivio o generate presentate come vere; tutte le regole che vietano, tranne R-014, ammettono un'eccezione motivata; "fondo crema con accento terracotta" è un default da evitare non attivo; **il movimento resta libero**: R-019 non vale per le animazioni, e il rimbalzo è una scelta di tono. Per l'utente "standard" non vuol dire vietato: una soluzione comune va bene se è adeguata alla situazione, e il motivo va in `DESIGN.md`. Non trasformare le regole in divieti assoluti, tranne R-014 (dati inventati). I "default da evitare" non scelti restano non attivi: non promuoverli senza la sua conferma. Il profilo di gusto è stato calibrato con l'utente il 17/10/2026: non cambiare le tendenze confermate, né quelle lasciate al brief, senza di lui.
9. **Richiama le altre skill, non copiarle** (`frontend-design`, `design-critique`, `accessibility-review`…). Questa skill contiene solo ciò che le altre non sanno: gusto, memoria ed evoluzione.
10. **I file letti a ogni lavoro restano corti.** `SKILL.md` fa da indice e i dettagli stanno in file letti solo quando servono; i limiti sono 40 regole e 80 righe di profilo. La descrizione nel frontmatter mette all'inizio le parole chiave (interfacce, siti, app, schermate), perché con molte skill installate Claude Code la accorcia.
11. **Ogni versione nuova va in `STORIA.md`**, nella tabella delle versioni e nello stato del piano. I commit dicono cosa cambia e perché.
12. **I percorsi `${…}` si scrivono solo in `SKILL.md`.** Claude Code li sostituisce solo lì; negli altri file `memoria/…` vuol dire `~/design-evolutivo-memoria/` e i comandi degli strumenti rimandano a `SKILL.md`. La skill non scrive mai nella propria cartella: con il plugin si sostituisce a ogni aggiornamento.

## Provare la skill
- Si modifica qui, mai nella copia installata: la cache del plugin si sostituisce a ogni aggiornamento, e `~/.claude/skills/` è una cartella protetta.
- Prima di ogni push: `claude plugin validate .` (catalogo) e `claude plugin validate ./plugins/design-evolutivo` (plugin).
- **Provare il plugin in questo ambiente:**
  - si installa dal catalogo locale: `claude plugin marketplace add /home/user/skill-design-evolutivo`, poi `claude plugin install design-evolutivo@bortodev`;
  - l'installazione copia nella cache i file come sono sul disco, anche quelli non ancora nei commit (osservato il 18/10/2026). Dopo ogni modifica serve `claude plugin update design-evolutivo@bortodev`, oppure si disinstalla e si reinstalla;
  - la cache è in `~/.claude/plugins/cache/bortodev/design-evolutivo/<versione>/` (osservato con il catalogo locale).
- **La memoria delle prove** è `~/design-evolutivo-memoria/`, come per l'utente. Qui non esiste una memoria vera: prima di una prova controlla che la cartella non ci sia, oppure che sia di una prova precedente. Alla fine cancellala. Per seguire cosa cambia tra una sessione e l'altra, mettila sotto git.
- **Le prove** si fanno in sessioni nuove e non interattive:
  - comando: `claude -p "…"` con `--permission-mode acceptEdits`;
  - `--allowedTools` limitato a lettura, scrittura, `Glob`, `Grep`, `Bash(node:*)`, `Bash(ls:*)` e `Skill`: il sistema di permessi blocca le sessioni con tutti i permessi aperti;
  - cartelle di progetto con percorsi semplici, perché con percorsi strani una sessione ha scritto nel posto sbagliato;
  - poi si controllano i file della memoria.

  Le prove con il risultato atteso sono nella guida della skill, sezione "Come verificare che impari davvero". Per confrontare i risultati con e senza la skill c'è la skill `skill-creator`.
- **Permessi sul computer dell'utente.** Senza le regole della sezione "Permessi" della guida, ogni lettura della memoria e della cartella del plugin chiede un permesso.
- **Controlli rapidi degli strumenti** (cartella della skill):
  - `node strumenti/contrasto.mjs "#87CBC3" "#fff"` deve dare 1,85:1, il menta di Montenellago;
  - `node strumenti/guarda.mjs /home/user/prove-design/palestra-ritmo-2/index.html` deve dare 9 foto e le misure (serve Playwright, qui in `/opt/node22/lib/node_modules/playwright`);
  - `HOME=$(mktemp -d) node strumenti/memoria.mjs inizia` deve copiare 7 file, e rifiutare se lanciato una seconda volta.
- La modalità `studia` su siti veri e le misure interattive richiedono un browser: `guarda.mjs` (Playwright) oppure un browser controllabile da Claude Code, come Claude in Chrome.

## Stato (v0.12, 18/10/2026)
**Provato sulla v0.5** (16/10/2026):
- la skill si carica sia come skill personale sia come skill di progetto, e legge la memoria;
- i permessi;
- il promemoria facoltativo, solo nei progetti con `DESIGN.md`;
- `contrasto.mjs` e `misura-pagina.js` su una pagina con difetti noti;
- la modalità `rivedi` in una sessione nuova.

**Provato su v0.8 e v0.9** (17/10/2026, 7 sessioni non interattive; dettagli nella guida, "Prova di apprendimento"):
- analisi, direzioni e verifica nel flusso di creazione;
- memoria tra sessioni: una regola esplicita viene caricata e controllata nei progetti successivi;
- generalizzazione (titolo enorme, poi icone troppo grosse → stessa classe e regola alla seconda volta), riuscita solo dopo la correzione della firma;
- trasparenza ("cosa sai del mio gusto?").

**Provato sulla v0.10** (17/10/2026, 4 sessioni): R-019 applicata a un progetto nuovo; ambito "solo qui" (vincolo nel `DESIGN.md` del progetto, non nella memoria generale); "dimentica…" (regola tra le ritirate, con il motivo).

**Provato sulla v0.12** (18/10/2026): vedi `STORIA.md`, riga v0.12.

**Ancora da fare:**
- **prove rimaste**:
  - escalation: serve un errore che si ripete davvero;
  - la terza fase della generalizzazione: in un progetto senza correzioni, la verifica trova da sola un caso nuovo della stessa classe;
  - una prova in sessione interattiva, sul computer dell'utente;
  - l'installazione dal catalogo su GitHub, invece che da quello locale.
- **metriche**:
  - le pagine Apple HIG si leggono senza browser dal loro JSON ufficiale: `https://developer.apple.com/tutorials/data/design/human-interface-guidelines/<pagina>.json` (letto il 17–18/10/2026);
  - i token di Material 3 si leggono dai repository ufficiali su GitHub (`material-components-android`, `material-web`, androidx Compose);
  - da questo ambiente w3.org e m3.material.io sono bloccati dalla rete: il testo WCAG si legge dal repository ufficiale `w3c/wcag`. Restano non lette le pagine di m3.material.io che spiegano quando usare ciascun token.

## Base di partenza ed evoluzione
Decisione dell'utente (17/10/2026): questo repository è solo la **base di partenza**. La skill si installa (come plugin o copiandola) ed evolve da sola sul computer dell'utente. Ciò che impara non torna qui.

Dal 18/10/2026 la memoria viva sta in `~/design-evolutivo-memoria/`, fuori dal plugin e fuori da `~/.claude` (decisione dell'utente). Aggiornare o disinstallare il plugin non la tocca.

Di conseguenza:
- `memoria-iniziale/` in questo repository è il **seme**: ciò che vale prima di qualunque uso, cioè le regole e le preferenze date direttamente dall'utente, i semi, il profilo e i modelli dei file. Al primo uso `strumenti/memoria.mjs inizia` lo copia nella memoria viva, senza mai sovrascrivere.
- Qui si lavora sulla base: guide di processo, riferimenti, strumenti, memoria iniziale. Non chiedere all'utente di riportare qui la memoria evoluta.
- **Una modifica a `memoria-iniziale/` non arriva da sola a chi ha già una memoria.** Va elencata nella guida (sezione "Migrazione da una vecchia copia"), così l'utente può dire "aggiungile".
- Se si cambia il formato di un file della memoria, le memorie esistenti hanno ancora quello vecchio: la skill deve saper leggere entrambi (`processo/evoluzione.md`), oppure serve una nota di migrazione nella guida.
