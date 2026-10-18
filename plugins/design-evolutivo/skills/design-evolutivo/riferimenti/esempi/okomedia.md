# okomedia — agenzia di marketing e comunicazione (Molfetta)

URL: https://okomedia.it/ · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026) · WordPress con WPBakery
Leggi questo file quando: devi usare titoli minuscoli e compatti, ripetere uno schema di sezioni, o capire cosa NON fare con navigazione, contenuti e consenso cookie.

**Perché è un riferimento:** buon esempio di ripetizione (4 sezioni × 3 elementi con lo stesso schema) e di voce tipografica netta. È anche un anti-esempio su navigazione nascosta, cura dei contenuti e consenso cookie.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | Proxima Nova (57 nodi) e Arial (128 nodi): circa due terzi dei nodi di testo cadono sul font di sistema |
| H1 di sezione | 60 px / 78, peso 600, minuscolo, tracking −1,8 px (−0,03 em) |
| Sottotitolo | 28 px / 36,4, peso 600, tracking −0,84 px (−0,03 em) |
| Navigazione (overlay) | 30 px, peso 700, bianco su #1F1F1F |
| Testo corrente | 18–20 px (20: 35 nodi, 18: 25); 10 px in 19 nodi |
| Colori | bianco #FEFEFE, testo #1F1F1F, secondario #505050, corallo #FF6D70 |
| Contrasto | #1F1F1F su bianco 16,3:1 · corallo su bianco 2,74:1 (sotto il 3:1, anche per testo grande) |
| Raggi | quasi nessuno (un solo elemento con 20 px) |
| Altezza pagina | ≈6.150 px |
| Interattivi più piccoli | 15 px |

## Struttura (dal contenuto letto)
Logo + icona hamburger (a 1440 px la navigazione è collassata) · banner animato a tutta larghezza · citazione · 4 sezioni (web, graphic, marketing & communication, event), ognuna con titolo grande, sottotitolo e 3 blocchi (es. website / e-commerce / cloud) · contatti con modulo (mittente, email, area di interesse, messaggio) · menu overlay con 8 voci visibili (misurate a 375 px); nel markup ce ne sono circa 16, tra cui nomi di clienti e strumenti.

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Gestalt: somiglianza | 4 sezioni con identica struttura, 3 blocchi ciascuna | Schema ripetuto = pagina prevedibile; 4×3 sta ben sotto 7±2 |
| Gerarchia tipografica | Titoli minuscoli, grandi, con tracking negativo (−0,03 em) | Il tracking negativo funziona sui titoli grandi, non sul corpo |
| Moduli | Selettore "Area di interesse" con le 4 aree del sito: smista la richiesta | Un campo a scelta chiusa al posto di una domanda aperta |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈8.846 px (≈10,9 schermate) |
| Meta viewport | `width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover`: ingrandimento massimo fissato a 1 |
| Header | fisso, alto 140 px (≈17 % dello schermo); il link dell'hamburger misura 24×15 |
| Menu aperto | overlay a schermo intero con 8 link visibili (tra cui home, web, graphic, communication, event, contatti, video), testo 30 px |
| Titoli | H1 "web" 34 px/44, peso 600, minuscolo, tracking −1,02 px (−0,03 em) · H3 20 px/26, tracking −0,6 px |
| Testo | 26 nodi misurati (su desktop 185), tutti Proxima Nova: non confrontabile con il desktop. 5 nodi da 1 px (probabilmente nascosti) |
| Dimensioni | 30 px (6 nodi), 20 (6), 34 (4), 13 (2); 12, 14 e 18 (1 ciascuno) |
| Interattivi | 14 misurati: 1 sotto 24 px (il link hamburger), 11 sotto 44 px |
| Banner cookie | fisso, alto 120 px |

**Da portare via (mobile)**
- Il tracking negativo dei titoli (−0,03 em) resta identico dal desktop al mobile.
- Overlay a tutto schermo con testo grande (30 px): voci facili da leggere.

**Da non copiare / punti deboli (mobile)**
- `maximum-scale=1`: limita lo zoom a pizzico nei browser che lo rispettano (comportamento non verificato qui). La pagina WCAG 1.4.4 che ho letto non cita `maximum-scale`; elenca solo una regola di test collegata ("Meta viewport allows for zoom").
- Header fisso da 140 px: occupa quasi un sesto dello schermo.
- Hamburger con link da 24×15: sotto il minimo di 24 px in altezza, salvo eccezioni non valutate.

## Anti-esempi (da non imitare)
- **Navigazione (markup):** nel markup dell'overlay compaiono circa 16 voci: servizi (web, graphic…), clienti (picca motors, mortatek, museo civico, rocca imperiale), strumenti (livestream, guida e assistenza online) e due voci "contatti" (una minuscola, una maiuscola). A 375 px ne sono visibili 8; non so quali delle altre siano mostrate, quindi non lo uso come prova di una violazione di Miller né di schemi misti.
- **Navigazione nascosta:** a 1440 px solo logo e hamburger (da screenshot). Si ricorda invece di riconoscere.
- **Contenuti:** titoli e descrizioni scambiati nella versione duplicata del blocco "web" (il testo sul cloud sotto "e-commerce"), refusi ("newesletter", "comunication"), copyright 2018 su un sito con contenuti caricati nel 2025.
- **Testo di tema nel markup:** frasi del tipo "You can toggle right click protection within Theme Options…" (probabilmente nascoste, ma presenti).
- **Consenso:** nel markup letto il banner cookie ha un solo pulsante ("ACCEPT"); il link dell'informativa privacy punta a un altro dominio.
- **Colore:** corallo #FF6D70 usato come colore di testo in 7 nodi: 2,74:1 se su bianco.
- **Testo:** 10 px in 19 nodi.

## Da non copiare
Testi, banner, nomi dei clienti, il menu.
