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

## Il piano iniziale in 7 passi
| Passo | Stato | Dove |
|---|---|---|
| 1. Struttura, nome, descrizione | fatto | `SKILL.md` |
| 2. Checklist unificata Nielsen, Shneiderman, Norman | fatto | `riferimenti/fondamenta.md` §2 |
| 3. Percezione e cognizione, automazione, architettura dell'informazione, tassonomia delle regole | fatto | `riferimenti/fondamenta.md` §1, §3–5 |
| 4. Metriche vere, verificate | in parte: WCAG e piattaforme sì; scale tipografiche e griglie di spaziatura no | `processo/verifica.md`, `riferimenti/app-mobile.md` |
| 5. Errori tipici dell'IA e il tuo gusto | in parte: 3 regole attive, 6 candidati da confermare, profilo da calibrare | `memoria/` |
| 6. Flusso che usa le skill esistenti | fatto | `SKILL.md`, `processo/rivedi.md` |
| 7. Prove e plugin | in parte: caricamento, permessi e strumenti provati; apprendimento tra sessioni e plugin ancora da fare | `README.md` |

## Cosa non c'è nella skill
- **La conversazione.** In una sessione nuova Claude sa solo ciò che è scritto in questi file. Per questo le regole del tuo corso e lo script di misura, prima solo in chat, ora sono file.
- I dati grezzi delle misure e gli screenshot dei siti: nella skill ci sono i risultati, nelle schede.

## Dove vive
Dal 17/10/2026 la copia di riferimento è il repository git `bortoDev/skill-design-evolutivo`, cartella `design-evolutivo/`. Gli zip `design-evolutivo.zip` e `design-skill-esempi.zip` non servono più. Per usarla, installa la cartella in `~/.claude/skills/`. Da qui in poi la storia la scrive git, insieme al diario della memoria. Resta da decidere dove far vivere la memoria imparata, se nella copia installata o nel repository: vedi `CLAUDE.md` nella radice del repository.

## Prossimi passi
- Prova di apprendimento tra sessioni (la prova 2 del README).
- Calibrazione del gusto: confermare o scartare i 6 default candidati e le 5 tendenze ipotetiche.
- Metriche di tipografia e spaziatura, da verificare prima di scriverle.
- Plugin, con la memoria fuori dalla cartella del plugin.
