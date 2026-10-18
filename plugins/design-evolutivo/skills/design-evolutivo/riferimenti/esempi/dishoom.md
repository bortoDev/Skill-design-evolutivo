# Dishoom — ristorante (UK)

URL: https://www.dishoom.com/ · analizzato il 15/10/2026 · home, finestra emulata 1440×900 (più un passaggio a ~650 px) e 375×812 (mobile, 16/10/2026)
Leggi questo file quando: devi dare atmosfera a un sito con pochi elementi, progettare un mega-menu, scrivere un modulo newsletter o una barra annunci.

**Perché è un riferimento:** l'atmosfera nasce da tipografia e testo, non da effetti. Due font, nessun colore d'accento, ritmo verticale regolare.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | `cheltenhamBT` (serif, ~315 nodi di testo) + `gill-sans-nova` (sans umanista, ~91 nodi: bottoni ed etichette). Probabilmente licenze commerciali |
| Colori | sfondo crema #F0ECE0, testo #353839, sezioni scure #151515 con testo #FFFDF9. Accento assente (un solo link blu #1863DC) |
| Contrasto | #353839 su crema 10,0:1 · #FFFDF9 su #151515 18,0:1 |
| H1 | 32 px / 41,6, peso 400, tracking 3,2 px (0,1 em). È una citazione, non uno slogan in grassetto |
| H2 | 30 px / 36, bold, MAIUSCOLO, tracking 5,4 px (0,18 em) |
| H3 | 21 px, MAIUSCOLO, tracking 4,2 px (0,2 em) |
| Bottoni / etichette | sans 15 px, peso 600, MAIUSCOLO, tracking 3,75 px (0,25 em) |
| Testo corrente | 21 px è la dimensione più frequente (127 nodi), interlinea 1,3 |
| Dimensioni in uso | 21 · 32 · 15 · 12 · 14 · 30 · 16 · 42 · 10 · 18 px |
| Raggi | 2–4 px sugli elementi, 50 px sulle pillole |
| Padding verticale delle 6 sezioni | 96/64 · 72/72 · 0 (a tutto schermo) · 64/64 · 0 · 83/83 px |
| Altezza pagina | ≈10.930 px (≈12 schermate) |
| Variabili CSS dichiarate | header 82 px, barra annunci 64 px, barra mobile inferiore 70 px (a 375 px nel menu aperto compare una barra di azione in basso: altezza non misurata) |
| A ~650 px | H1 24 px (da 32), H2 24 px (da 30), corpo 14 px |

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Miller / chunking | Header con 5 etichette (Explore, Cafés, Menus, Shop, Festivities) + ricerca + CTA prenota. Pannello menu: 7 voci nel markup + "More" che apre altre 5. Pannello Shop: 3 gruppi da 7, 4 e 3 voci (dal markup, non tutte verificate a vista). Footer a 5 gruppi | Mostra al massimo ~7 voci per gruppo, il resto dietro un "Altro" |
| Schema IA esatto | Elenco dei locali raggruppato per tipo (Cafés / Permit Rooms) e in ordine alfabetico nel menu | Quando l'utente sa già cosa cerca, ordine alfabetico o geografico |
| Gestalt: figura/sfondo | Alternanza crema / scuro (#F0ECE0 / #151515) per scandire i blocchi | Cambia lo sfondo per segnalare un cambio di argomento |
| Gestalt: prossimità | Le foto hanno una didascalia breve ("ABOVE:", "RIGHT:") attaccata sotto | La didascalia sta più vicina alla sua foto che al blocco seguente |
| Gerarchia tipografica | Maiuscolo + tracking ampio (0,18–0,25 em) per titoli ed etichette, serif a 21 px per il corpo | Un solo gesto tipografico forte e ripetuto vale più di tanti pesi diversi |
| Gerarchia delle azioni | Hero con due azioni (menu / prenota); "Book a table" ripetuto in header; blocco a tre scelte (Menus, Reservations, Store) | Poche azioni, ripetute nei punti giusti |
| Moduli e microcopy | Newsletter: campo compleanno marcato "(optional)" con il motivo scritto accanto (sorpresa annuale); consenso esplicito collegato all'informativa | Spiega perché chiedi un dato e segna i campi facoltativi |
| Stato e trasparenza | Barra annunci con date esplicite (soft launch di un nuovo locale, sconto, giorni di validità) | Un annuncio dice cosa, quando, con che condizioni |
| Voce | Titoli come frasi di una lettera, testi lunghi ma ben spezzati | Il tono del testo è parte del design |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno (larghezza scorrevole 375 px) |
| Altezza pagina | ≈11.354 px (≈14 schermate) |
| Header | fisso, 82 px: icona menu ("Toggle Menu") 24×24 e pulsante "Book" 57×27 |
| Menu aperto | pannello a schermo intero con 5 + 4 voci e una barra di azione in basso (dallo screenshot a menu aperto) |
| Titoli | H1 24 px/30 (desktop 32), peso 400, tracking 2,4 px · H2 24 px, peso 700, tracking 4,3 px · H3 21 px, tracking 4,2 px |
| Paragrafo lungo | 18 px (desktop 21), interlinea 1,33, colonna 335 px ≈ 37 caratteri per riga (stima) |
| Dimensioni più frequenti | 24 px (36 nodi), 18 (34), 12 (31), 14 (21), 16 (19) |
| Testo piccolo | 49 nodi su 199 sotto 14 px; 10 sotto 12 px (9 px in 9 nodi) |
| Interattivi | 90 misurati: 9 sotto 24 px (link dentro frasi esclusi), 54 sotto 44 px. Esempi: "Home" 112×18, "LISTEN IN" 116×20, "EXPLORE CAFÉS" 335×14 |
| Pulsante flottante | "Listen in" 70×75, in basso |

**Da portare via (mobile)**
- La scala si riduce ma il carattere resta: stesso maiuscolo tracciato su titoli ed etichette. H1 e H2 arrivano entrambi a 24 px, quindi la gerarchia tra titoli si appiattisce; resta quella con il corpo.
- Header con due soli controlli (menu e prenota): l'azione primaria è sempre in vista.

**Da non copiare / punti deboli (mobile)**
- Icone dell'header da 24×24: al minimo AA di WCAG 2.5.8, sotto i 44×44 px CSS del livello AAA (2.5.5).
- Microtesto da 9–12 px con tracking largo.
- Il passaggio a ~650 px di sopra riportava corpo 14 px: potrebbe riferirsi a un altro elemento, quindi non lo confronto con il 18 px del paragrafo misurato qui.

## Punti deboli (da non imitare)
- Microtesto: 12 px in 41 nodi e 10 px in 14 nodi, con tracking largo. Sotto ~14 px la leggibilità cala (convenzione, non standard).
- Elemento interattivo più piccolo misurato: 13 px (link piccoli). WCAG 2.5.8 chiede 24×24 px, con eccezione per i link dentro una frase.
- Font probabilmente a pagamento: in un tuo progetto serve una coppia equivalente con licenza libera (un serif editoriale + una sans umanista).

## Da non copiare
Nome, testi, illustrazioni, struttura identica della home, la coppia di font.
