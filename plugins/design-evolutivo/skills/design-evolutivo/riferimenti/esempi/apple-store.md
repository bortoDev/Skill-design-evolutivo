# Apple Store Italia — e-commerce

URL: https://www.apple.com/it/store · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026)
Leggi questo file quando: devi progettare una pagina commerciale con tante offerte, una scala tipografica compatta, etichette di stato o un'informativa sul prezzo.

**Perché è un riferimento:** molte cose da dire, ma ogni sezione ha lo stesso scheletro (titolo + una riga + 2–6 card). Scala tipografica a pochi gradini e neutri quasi ovunque.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | SF Pro Text (501 nodi) e SF Pro Display (151). Display da ~24 px in su, Text sotto. Font proprietario: non riutilizzabile, il principio sì |
| Dimensioni in uso | 12 (314 nodi, in gran parte note legali) · 14 · 17 · 24 · 28 · 80 px (+ 8,4 / 10 / 14,4 / 16,8 marginali) |
| H1 "Store" | 80 px / 84 (interlinea 1,05), peso 600, tracking −1,2 px (−0,015 em) |
| H2 di sezione | 28 px / 32, peso 600 |
| Etichetta di stato (eyebrow) | 12 px / 16, peso 600, colore #B64400 |
| Colori | bianco #FFFFFF e grigio chiaro #F5F5F7; testo #1D1D1F; secondario #6E6E73; terziario #86868B; tra i colori di testo più frequenti l'unico accento è l'arancio scurito #B64400 |
| Contrasto | #1D1D1F su #F5F5F7 15,5:1 · #6E6E73 su bianco 5,07:1 · #B64400 su bianco 5,5:1 · #86868B su bianco 3,62:1 (solo testo grande) |
| Raggi | 18 px sulle card (66 elementi), pillole 980 px, 56 px su un gruppo di elementi tondi |
| Navigazione globale | logo + 10 voci (Store, Mac, iPad, iPhone, Watch, AirPods, Casa, Intrattenimento, Accessori, Supporto) + ricerca + carrello |
| Altezza pagina | ≈7.840 px |

## Struttura (dal contenuto letto)
H1 con frase di accompagnamento · riga di 9 categorie con icona · 7 sezioni con titolo e sottotitolo di una riga: novità (13 card), accessori (2), perché l'Apple Store (6), aiuto (5), audio (1), mondo Apple (6), sconti (3) · note legali e finanziamento · footer a 10 gruppi comprimibili (segno "+").

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Gerarchia tipografica | Solo 6 gradini effettivi; il salto grande (28 → 80 px) è riservato al titolo di pagina | Pochi gradini, un solo gesto grande |
| Gestalt: somiglianza / coerenza | Tutte le card condividono raggio 18 px, schema titolo–testo–prezzo | Una componente, una forma, ripetuta |
| Miller / chunking | Sezioni da 2–6 card; la riga di 9 categorie è al limite alto e si regge sulle icone | Raggruppa in blocchi ≤ 6–7; oltre, aiuta con icone e nomi noti |
| Stato e trasparenza | Etichette NOVITÀ / PREORDINA ORA / data di fine offerta; prezzo con rata mensile e rimando alla nota legale | Etichetta di stato in colore diverso, breve, in cima alla card |
| Colore funzionale | Nei dati misurati l'arancio compare come etichetta di stato ed è scurito fino a 5,5:1 (sopra il 4,5:1 di AA) | L'accento serve a dire qualcosa, non a decorare |
| Awareness / contesto | Un avviso spiega che la posizione è ricavata dall'IP o da una visita precedente e serve a mostrare più in fretta le opzioni di consegna. Dal testo letto non risulta un comando per cambiarla (da verificare) | Se usi un dato di contesto, dillo; offri anche il modo di correggerlo |
| IA mista | Categorie per prodotto + sezioni per compito ("Serve aiuto?", "Sconti e promozioni") | Prodotto per chi sa cosa cerca, compito per chi esplora |
| Footer | 10 gruppi comprimibili (accordion verificato a 375 px; su desktop non verificato) | Footer lungo → accordion |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈10.203 px (≈12,6 schermate) |
| Meta viewport | `width=device-width, initial-scale=1, minimum-scale=1, user-scalable=1, viewport-fit=cover`: zoom consentito in modo esplicito |
| Header | 4 controlli, tutti alti 48 px: logo 49×48, cerca 48×48, carrello 48×48, menu 48×48 |
| Menu aperto | lista a schermo intero con 10 voci |
| Titoli | H1 "Store" 48 px/52 (desktop 80), peso 600 · H2 24 px/28 (desktop 28) |
| Dimensioni più frequenti | 12 px (108 nodi), 14 (100), 21 (61), 17 (39) · 8,4 px in 28 nodi |
| Testo piccolo | 144 nodi su 361 sotto 14 px; 28 sotto 12 px (tutti a 8,4 px: forse apici o note, non verificato) |
| Interattivi | 114 misurati: 36 sotto 24 px, 81 sotto 44 px. Link alti 17–20 px tra i più piccoli ("Scopri di più" 99×17, "Mac" 92×20) |
| Footer | gruppi comprimibili (accordion), verificato solo a 375 px |

**Da portare via (mobile)**
- Tutti i controlli dell'header misurano almeno 48 px (logo, cerca, carrello, menu): nessun target piccolo in testata.
- Zoom lasciato libero in modo esplicito.
- Il gesto grande si riduce con la larghezza (80 → 48 px) senza perdere distanza dai gradini successivi.

**Da non copiare / punti deboli (mobile)**
- Con 10 voci il menu supera ancora 7±2 e regge sui nomi noti.
- Molto testo a 12–14 px e 8,4 px in 28 nodi.
- Link nelle pagine da 17–20 px di altezza, molto sotto i controlli dell'header.

## Punti deboli (da non imitare)
- Navigazione globale a 10 voci: supera 7±2 e regge solo perché sono nomi di prodotti noti, di una parola.
- Carosello di 13 card: le ultime sono invisibili finché non si scorre.
- Note legali a 12 px su ~980 px di larghezza: stimo ~160 caratteri per riga, oltre l'80 di WCAG 1.4.8 (livello AAA). Accettabile solo per testo legale.
- #86868B su bianco (3,62:1) non va usato per testo piccolo.

## Da non copiare
Font SF, icone, fotografie di prodotto, tono, struttura identica della pagina.
