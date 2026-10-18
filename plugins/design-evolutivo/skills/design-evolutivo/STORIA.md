# Storia della skill

Come è nata, versione per versione, e da quale parte del lavoro viene ogni file. Serve a sapere cosa c'è, cosa manca e da dove ripartire.

## Versioni
| Versione | Data | Cosa è entrato | Da dove viene |
|---|---|---|---|
| v0.1 | 15/10/2026 | Libreria di esempi: 8 siti analizzati a 1440×900 (stili calcolati, contrasti calcolati), indice "regola → esempi", WCAG 1.4.3, 2.5.8 e 1.4.8 verificati | la tua idea di usare i siti che ti piacciono come esempi |
| v0.2 | 16/10/2026 | Regola "cambia almeno 1 dimensione su 5" (prima erano 3); passaggio mobile a 375×812 sugli 8 siti, con i menu aperti; correzione di affermazioni troppo sicure (okomedia, Dishoom, Apple); WCAG 1.4.4 e 1.4.10 verificati | la tua domanda "per mobile come facciamo?" |
| v0.3 | 16/10/2026 | `riferimenti/app-mobile.md`: parte comune, differenze iOS e Android, schede per piattaforma; scoperto che per Apple 44 pt è il valore predefinito e il minimo è 28 pt | Apple HIG e documentazione Android e Material |
| v0.4 | 16/10/2026 | Motore di evoluzione: memoria, protocollo di apprendimento, direzioni A/B/C, verifica, esempio completo; nome `design-evolutivo`; prove in sessioni nuove di Claude Code (caricamento, permessi, promemoria facoltativo) | la tua richiesta di un'evoluzione "come il machine learning" |
| v0.5 | 16/10/2026 | Modalità rivedi, migliora, valuta e studia; `riferimenti/fondamenta.md` con le regole del tuo corso; `strumenti/` con lo script di misura usato sugli 8 siti (migliorato) e il calcolo del contrasto; WCAG 1.4.6 e scala di gravità di Nielsen verificate | la tua richiesta di revisione e valutazione, e le regole del corso che mi avevi scritto all'inizio |
| v0.6 | 17/10/2026 | Repository git come base di partenza (la skill evolve nella copia installata); `CLAUDE.md` per lo sviluppo; i tuoi "da non fare": lezione di processo "niente di standard per abitudine" e regole R-004–R-017; brief con l'analisi del pubblico, che decide quanto possono essere complessi i testi | la tua decisione sulla base di partenza e le tue risposte sui "da non fare" |
| v0.7 | 17/10/2026 | Profilo di gusto calibrato con te: tipografia, colore, forme e voce confermate (voce più sobria nei prodotti seri); struttura e fondo chiaro o scuro lasciati al brief; movimento espressivo e densità ariosa | le tue risposte sul profilo |
| v0.8 | 17/10/2026 | `processo/analisi.md`: prima di disegnare, stakeholder, compiti con priorità (essenziale, importante, marginale), domande che cambiano il risultato e piano a pezzi approvato da te; costruzione un pezzo alla volta con feedback; R-018 (tutti gli stati); immagini lasciate al brief, icone il meno possibile | la tua richiesta di "ingegnerizzare il progetto e organizzarlo a pezzi" |
| v0.9 | 17/10/2026 | Prima prova di apprendimento: 3 progetti finti e 7 sessioni nuove. La memoria tra sessioni funziona; il riconoscimento dello stesso errore in punti diversi falliva ed è stato corretto (la firma è la tendenza, non tendenza + causa), poi riprovato con successo. La verifica annota le osservazioni controllate; diario e versioni sono più espliciti | i risultati della prova (`README.md`, "Prova di apprendimento") |
| v0.10 | 17/10/2026 | Il tuo primo giudizio sulle schermate delle prove entra nella memoria iniziale: R-019, lo stile da gioco solo se il brief lo chiede, altrimenti eleganza (palestra "bambinesca", biblioteca "da elegantizzare", pasticceria adatta). Registro "generale" con le tue parole | il tuo parere sulle tre schermate |
| v0.11 | 17/10/2026 | `riferimenti/tipografia-spaziatura.md` con le metriche verificate (WCAG 1.4.12, griglia Android 8 e 4 dp, scala Material). Seconda prova in 4 sessioni: R-019 applicata alla palestra rifatta, ambito "solo qui" e "dimentica…" riusciti | il tuo "continuiamo con quello che manca" |
| v0.12 | 18/10/2026 | **Controllo completo, design di alto livello e plugin.** Sei revisori, ognuno verificato da un secondo agente, hanno controllato tutta la skill. Correzioni: niente domanda di consolidare alla prima sessione, livelli L2/L3 chiari, "solo qui" in `DESIGN.md`, diario con prima e dopo, consolidamento solo con il tuo sì; strumenti che leggono oklch e trasparenze. Nuovo passo di rifinitura (`processo/rifinitura.md`) con `strumenti/guarda.mjs`, che fotografa la pagina; riferimenti nuovi su colore, immagini e movimento; dettagli tipografici italiani; novità misurata con l'impronta dei valori; WCAG 1.4.1, 1.4.11, 2.4.7, 2.4.11, 4.1.3, 1.1.1 e Apple Buttons in verifica. Memoria iniziale: lezione "cura da alto livello", R-014 con le foto, eccezioni anche per R-001 e R-002, default "crema e terracotta". Plugin (catalogo `bortodev`), memoria in `~/design-evolutivo-memoria/`, licenza MIT, README in inglese e italiano | la tua richiesta di una cura "come Apple" e di ricontrollare tutto prima del plugin; le tue scelte del 18/10 |

## Il piano iniziale in 7 passi
| Passo | Stato | Dove |
|---|---|---|
| 1. Struttura, nome, descrizione | fatto | `SKILL.md` |
| 2. Checklist unificata Nielsen, Shneiderman, Norman | fatto | `riferimenti/fondamenta.md` §2 |
| 3. Percezione e cognizione, automazione, architettura dell'informazione, tassonomia delle regole | fatto | `riferimenti/fondamenta.md` §1, §3–5 |
| 4. Metriche vere, verificate | fatto: WCAG (1.1.1, 1.4.1, 1.4.3, 1.4.4, 1.4.5, 1.4.6, 1.4.8, 1.4.10, 1.4.11, 1.4.12, 2.2.2, 2.3.1, 2.3.3, 2.4.7, 2.4.11, 2.4.13, 2.5.5, 2.5.8, 4.1.3); Apple HIG lette dal JSON ufficiale (Typography, Layout, Motion, Color, Buttons, Images, Accessibility…); griglia Android 8/4 dp; scala, interlinea, tracking, durate e curve di Material 3 dai token ufficiali. Scale e griglie del web sono scelte di progetto da motivare | `processo/verifica.md`, `riferimenti/` |
| 5. Errori tipici dell'IA e il tuo gusto | fatto per la memoria iniziale: 19 regole (R-001–R-019), 2 lezioni di processo, profilo calibrato | `memoria-iniziale/` |
| 6. Flusso che usa le skill esistenti | fatto | `SKILL.md`, `processo/rivedi.md` |
| 7. Prove e plugin | plugin fatto (v0.12); provati caricamento, permessi, strumenti e apprendimento tra sessioni (v0.9–v0.12). Restano l'escalation, la terza fase della generalizzazione, una prova interattiva e l'installazione da GitHub | `README.md` |

## Cosa non c'è nella skill
- **La conversazione.** In una sessione nuova Claude sa solo ciò che è scritto in questi file. Per questo le regole del tuo corso e lo script di misura, prima solo in chat, ora sono file.
- I dati grezzi delle misure e gli screenshot dei siti: nella skill ci sono i risultati, nelle schede.

## Dove vive
Dal 17/10/2026 la copia di riferimento è il repository git `bortoDev/Skill-design-evolutivo`. Gli zip `design-evolutivo.zip` e `design-skill-esempi.zip` non servono più. Il repository è la **base di partenza** e, dalla v0.12, anche un catalogo di plugin (`bortodev`): la skill sta in `plugins/design-evolutivo/skills/design-evolutivo/`. Si installa come plugin, oppure copiando questa cartella in `~/.claude/skills/`. Ciò che impara sta in `~/design-evolutivo-memoria/` e non torna nel repository, che cambia solo quando si migliora la base.

## Prossimi passi
- Prove ancora da fare:
  - l'escalation: un errore che si ripete nonostante la regola;
  - la terza fase della generalizzazione: un caso nuovo intercettato da sola;
  - una prova in sessione interattiva, sul tuo computer;
  - l'installazione del plugin da GitHub.
- Leggere le pagine di m3.material.io che spiegano quando usare ciascuna durata e curva (da qui non sono raggiungibili).
