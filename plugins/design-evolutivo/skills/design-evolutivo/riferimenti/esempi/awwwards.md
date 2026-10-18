# Awwwards — premi e galleria di siti web

URL: https://www.awwwards.com/ · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026)
Leggi questo file quando: devi progettare un portale con molte sezioni (galleria, corsi, mercato, directory), gerarchia di pulsanti, o cerchi dove trovare altri riferimenti per categoria.

**Perché è un riferimento:** molto contenuto, UI quasi priva di colore: l'interfaccia lascia i colori ai siti mostrati. Ogni sezione ha lo stesso limite (2–6 elementi) e la stessa chiusura ("vedi tutto").

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | Inter Tight, unica famiglia (230 nodi), pesi 300–600 |
| Display (titolo del Site of the Day e delle sezioni) | 126,7 px, interlinea 1,0, peso 600, MAIUSCOLO, #222 (≈8,8 vw, quindi fluido) |
| UI | 14 px con interlinea 28 px (2,0); 15 px peso 300 su scuro; etichette 10,5 e 13,75 px |
| Altre dimensioni | 16 · 18 · 20,6 · 24 · 41,9 px |
| Colori | sfondo #F8F8F8, fascia #E9E9E9, testo #222222, schede bianche, velo rgba(0,0,0,0.7). Nessun accento di brand |
| Contrasto | #222 su #F8F8F8 15,0:1 · #222 su #E9E9E9 13,1:1 |
| Raggi | 8 px (42 elementi), 14 px (10), 50% (21: avatar), 4 px |
| Altezza pagina | ≈12.730 px (≈14 schermate) |
| Interattivi più piccoli | 14 px |

## Struttura (dal contenuto letto)
Header: menu Explore (mega-menu con Awards 9 voci, Trending 10, By Category 10, By Technology 10, Collections, Blog), Directory, Academy (badge "New"), Jobs, Market · ricerca · Log in, Sign Up, Be Pro (pieno scuro), Submit Website (contorno). Hero con data, punteggio, titolo e autore del Site of the Day, anteprima grande con barra flottante in basso (Nominees, Courses, Collections, Directory, Market, Visit Site). Sezioni: nominati (3 card), Siti del giorno (6), Academy (4), Collections (2), Directory (3 profili + tabella di 4 righe), Blog (4), Market (4), due inviti finali. Footer a colonne.

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Miller / chunking | Sezioni da 2–6 elementi, ognuna con "vedi tutto" a fine blocco; mega-menu a gruppi con titolo, ~10 voci per gruppo | Limita gli elementi mostrati e dai una porta verso il resto |
| Coerenza | Sette sezioni chiuse con lo stesso modello: frase di invito + link in grassetto (View Nominees, View Academy, …) | Lo stesso gesto di chiusura per ogni elenco |
| Gerarchia delle azioni | Be Pro (pieno) > Submit Website (contorno) > Log in / Sign Up (testo) | Tre livelli di pulsante, non di più |
| Gerarchia tipografica | Display ≥ 8 vw contro UI da 14 px: solo due estremi | Pochi livelli, molto distanti |
| Tipografia fluida | Display proporzionale alla larghezza (≈8,8 vw) | Misure display in vw con minimo e massimo |
| Stato e status | Badge PRO / INT accanto ai nomi, "New" sui menu, data e punteggio sul sito del giorno | Un'etichetta breve dice lo stato |
| Contrasto | Grigi neutri, #222 su chiaro 13–15:1 | La UI neutra mette in risalto il contenuto |
| IA a faccette | Il mega-menu offre la stessa collezione per premio, tendenza, categoria e tecnologia | Più ingressi allo stesso contenuto, ciascuno con titolo chiaro |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈12.886 px (≈15,9 schermate) |
| Header | sticky, 54 px: logo 30×16, ricerca 14×42, hamburger 54×54 |
| Menu aperto | 10 voci con sezioni a fisarmonica |
| Titoli | H1 42 px/42, peso 600, maiuscolo (il 16/10 il sito del giorno era "OFFFFORUM"; desktop: 126,7 px) |
| Dimensioni più frequenti | 14 px (51 nodi), 18 (26), 16 (16), 10,5 (10), 15 (10), 26 (9), 24 (8), 12 (6) |
| Testo piccolo | 29 nodi su 154 sotto 14 px; 21 sotto 12 px (10,5 px in 10 di essi) |
| Interattivi | 97 misurati: 44 sotto 24 px, 68 sotto 44 px. Esempi: "View Nominees" 136×16, nomi dei siti 120–136×22 |

**Da portare via (mobile)**
- Header sticky da 54 px con hamburger da 54×54.
- Il display resta enorme rispetto alla UI anche su mobile (42 contro 14 px) ma passa da 126,7 a 42 px.

**Da non copiare / punti deboli (mobile)**
- Ricerca larga 14 px e logo 30×16: sotto il minimo di 24 px, salvo eccezioni non valutate.
- 44 interattivi su 97 sotto i 24 px, in gran parte link alti 16–22 px.
- Microtesto da 10,5 px in 10 nodi.

## Punti deboli (da non imitare)
- Titoli display da ~127 px in maiuscolo: su mobile (375 px) il display scende a 42 px e non c'è scorrimento orizzontale (verificato).
- I filtri tecnologici (WebGL, 3D, GSAP…) mostrano che i premi valorizzano gli effetti. Prima di copiare un pattern, passalo dalla checklist di usabilità e accessibilità.
- Pagina lunga (≈14 schermate) con molti blocchi; interattivi minori da 14 px.
- Il contenuto in primo piano cambia ogni giorno (qui: Overworld Audio, 15/10/2026): non dipendere dal sito del giorno come esempio fisso.

## Dove cercare altri riferimenti
Le categorie del menu includono Restaurant & Hotel, Design Agencies, E-commerce, Business & Corporate, Fashion, Mobile & Apps, Interaction Design, Illustration, Header Design; per tecnologia: React, Shopify, WordPress, Webflow, Figma. Utile per ampliare la libreria per tipo di progetto.

## Da non copiare
Layout del marchio Awwwards, schede dei siti mostrati, nomi.
