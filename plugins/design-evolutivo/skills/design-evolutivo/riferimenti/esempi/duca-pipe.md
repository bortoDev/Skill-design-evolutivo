# Duca Pipe — pipe artigianali (Ferrara / Stienta)

URL: https://www.ducapipe.com/it/ · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026) · WordPress con Slider Revolution
Leggi questo file quando: devi progettare un sito scuro, sobrio e breve per un prodotto artigianale, usare una sola famiglia di font, o scegliere un grigio per il corpo su fondo nero.

**Perché è un riferimento:** pagina corta (≈3 schermate), una sola famiglia di font, un solo accento, voce in prima persona. Il prodotto è l'unico elemento visivo.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | Raleway, unica famiglia (Google Font) |
| H1 hero (home) | 42 px, peso 300, bianco |
| H2 (home) | 30 px, peso 500, MAIUSCOLO per i tre blocchi |
| Navigazione | 14 px, peso 500, MAIUSCOLO, tracking 0,2 px, interlinea 70 px (header probabilmente alto 70 px) |
| Corpo* | 16 px / 28,8 (interlinea 1,8), grigio #B6B6B6 |
| Colori | sfondo #151515, bianco, grigio #B6B6B6, accento arancio #D85C05 (dichiarato anche come theme-color) |
| Contrasto | bianco su #151515 18,3:1 · #B6B6B6 su #151515 9,0:1 · arancio su #151515 4,74:1 |
| Raggi | 2–3 px; 50% sulle icone social |
| Interattivi più piccoli | 13 px |
| Altezza pagina | ≈3.090 px (home) |

*I dati di corpo testo (16 px, interlinea 28,8, ≈94 caratteri per riga stimati) vengono dalla pagina Workshop: nella prima misurazione la home è passata da sola a /workshop-2/ dopo pochi secondi (non so perché). Titoli, navigazione e altezza sono della home rimisurata.

## Struttura (dal contenuto letto)
Header: logo + 6 voci (Home, Brand & History, Workshop, Grading, Pipe, Rivenditori) · slider hero con 4 slide che ripetono lo stesso titolo · frase sul marchio · 3 blocchi (Brand & History, Workshop, Grading) ciascuno con una riga e "Leggi" · "Ultime creazioni" · contatti (telefono, email, indirizzo del laboratorio).

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Contrasto morbido | Corpo in grigio #B6B6B6 su #151515 (9,0:1) invece di bianco puro | Su fondo scuro un grigio chiaro riduce l'abbagliamento e resta sopra il 7:1 (AAA) |
| Gerarchia tipografica | Una sola famiglia: H1 in peso 300, H2 in 500 maiuscolo | Con un font solo, varia peso e caso |
| Miller | 6 voci di menu, 3 blocchi in home | Pagina breve, scelte poche |
| Interlinea | Corpo con interlinea 1,8, sopra il 1,5 di WCAG 1.4.8 | Interlinea generosa sui testi lunghi scuri |
| Accento | L'arancio compare su pochi elementi (voce attiva) e passa AA | Un accento solo, a bassa frequenza |
| Voce | Testi in prima persona ("nel mio laboratorio") | Il singolo artigiano è il marchio |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Pagina | https://www.ducapipe.com/it/ (resta sulla home) |
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈3.818 px (≈4,7 schermate): la più corta degli otto |
| Meta viewport | `width=device-width, initial-scale=1, maximum-scale=1`: ingrandimento massimo fissato a 1 |
| Header | fisso, 70 px; hamburger: link 22×40 |
| Menu aperto | lista di 6 voci (Home, Brand & History, Workshop, Grading, Pipe, Rivenditori) |
| Titoli | H2 24 px/26,4, peso 500 (desktop 30) · H3 30 px, peso 300 |
| Paragrafo lungo | 16 px, interlinea 1,5 (24 px), colonna 345 px ≈ 43 caratteri per riga (stima). Su desktop: interlinea 1,8 e ≈94 caratteri, ma misurati sulla pagina Workshop: confronto indicativo |
| Dimensioni | 14 px (23 nodi), 24 (11), 16 (6), 30 (5), 13 (3), 11 (2) |
| Testo piccolo | 5 nodi su 51 sotto 14 px; 2 a 11 px |
| Interattivi | 34 misurati: 4 sotto 24 px (link 31×19 e 22×40), 14 sotto 44 px |
| Banner cookie | al caricamento un contenitore fisso a tutto schermo (375×812) con l'informativa; non ho verificato quale parte della pagina copra |

**Da portare via (mobile)**
- Pagina breve e colonna di testo stretta: ≈43 caratteri per riga (stima), sotto gli 80 di WCAG 1.4.8.
- Corpo da 16 px con interlinea 1,5, che è la soglia di 1.4.8.

**Da non copiare / punti deboli (mobile)**
- `maximum-scale=1`: limita lo zoom a pizzico nei browser che lo rispettano (comportamento non verificato qui; WCAG 1.4.4 non ne parla, vedi okomedia.md).
- Hamburger da 22 px di larghezza, sotto il minimo di 24 px salvo eccezioni non valutate.

## Punti deboli (da non imitare)
- Slider con lo stesso titolo ripetuto su 4 slide: contenuto nascosto dietro l'avanzamento.
- Misura di riga stimata a ≈94 caratteri nella pagina Workshop, oltre l'80 di WCAG 1.4.8 (AAA).
- Il pannello cookie copre parte della hero nello screenshot (non l'ho toccato).
- Interattivi da 13 px (link piccoli).

## Da non copiare
Nome, fotografie delle pipe, testi del marchio, il logo.
