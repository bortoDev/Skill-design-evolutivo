# BBANG — studio di comunicazione (Milano)

URL: https://bbang.it/ · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026) · WordPress con Elementor
Leggi questo file quando: devi organizzare un portfolio con due modi di filtrare (cosa/per chi), progettare un tema scuro con più accenti, o impostare CTA ripetute.

**Perché è un riferimento:** lo scheletro della home (WHO / WHAT / PEOPLE) coincide con la navigazione, quindi chi esplora ritrova la stessa logica dappertutto.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | Roboto, unica famiglia (107 nodi); i contrasti vengono dai pesi (da 300 a 900) |
| Etichette WHO / WHAT | 21 px, peso 900, MAIUSCOLO, tracking 2,52 px (0,12 em), teal #00997C |
| Titolo progetto | 28,5 px, peso 500, bianco, tracking 0,57 px |
| Navigazione | 18 px, peso 400, tracking 0,36 px |
| Dimensioni | frazionarie (18,0002 · 21,0002 · 28,5002 · 45,0002 px): scala fluida |
| Colori | sfondo #13151B (più #000 e #1A1A1A), testo bianco; accenti teal #00997C, giallo #F7B91E, ciano #45BEC4 |
| Contrasto | bianco su #13151B 18,3:1 · teal 5,08:1 · giallo 10,35:1 · ciano 8,18:1 |
| Raggi | pillole: 50 px (26 elementi), 25 px (14), 1000 px, 64 px |
| Testo più piccolo | 12 px, peso 300, nel banner cookie |
| Altezza pagina | ≈8.220 px |

## Struttura (dal contenuto letto)
Header: logo + 4 voci (Chi siamo, Cosa facciamo, Progetti, Manifesto) + CTA "Cominciamo!". Menu Progetti: due colonne WHAT (6 servizi) e WHO (6 settori). Home: video hero con il titolo ripetuto due volte (probabile scorrimento) · paragrafo WHO · 5 card progetto (settore + servizi + "Scopri") · 6 settori come link grandi · paragrafo WHAT con rimando al portfolio · paragrafo PEOPLE con rimando al manifesto · carosello testimonianze · CTA finale · footer che ripete WHO e WHAT.

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Schema IA tematico (ambiguo) | Due faccette indipendenti, 6 voci ciascuna: cosa facciamo / per chi lavoriamo | Le faccette servono a chi esplora; ogni nuovo progetto va classificato su entrambe (costo di manutenzione) |
| Miller | 6 + 6 voci nel menu, 4 voci in header | Ogni gruppo sotto il 7 |
| Coerenza | Stessa coppia WHO/WHAT in menu, card, sezioni e footer | Una sola logica di classificazione, ripetuta |
| Gestalt: figura/sfondo | Card chiare con immagini su sfondo scuro | Lo sfondo scuro fa risaltare le immagini |
| Gestalt: continuità | Linea curva sottile che attraversa l'hero (visibile nello screenshot) | Una linea guida porta l'occhio |
| Gerarchia delle azioni | Stessa CTA "Cominciamo" nell'header e a fine pagina | Apri e chiudi con la stessa azione |
| Accenti su scuro | Tre accenti, tutti sopra 5:1 | Su scuro puoi permetterti più colore se i rapporti restano alti |
| Segnifier | Etichetta "Scopri" su ogni card progetto | L'azione è scritta, non solo implicita |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈8.507 px (≈10,5 schermate) |
| Header | logo 120×33 e CTA "Cominciamo!" 160×40, barra da 72 px. Nessun hamburger in testata. Dopo uno scorrimento in giù e uno in su di poco, la barra era di nuovo visibile in alto |
| Menu | pulsante circolare 40×40 fisso in basso al centro (zona del pollice, apre un popup di Elementor) con 4 voci: Chi siamo, Cosa Facciamo, Progetti, Manifesto, ognuna con un pallino colorato (teal, giallo, rosso, ciano, dallo screenshot). Link alti 16 px (testo 16 px), distanti ≈40 px l'uno dall'altro |
| Banner cookie | al primo caricamento copre circa il 40 % inferiore dello schermo e il pulsante del menu |
| Dimensioni più frequenti | 16 px (30 nodi), 12,8 (8), 11,5 (7), 12 (7), 22 (5) |
| Paragrafo lungo | il primo trovato è 12 px, interlinea 1,4, ≈57 caratteri per riga: probabilmente il testo del banner cookie (non verificato) |
| Testo piccolo | 26 nodi su 65 sotto 14 px; 7 sotto 12 px (11,5 px) |
| Interattivi | 60 misurati: 28 sotto 24 px (link dentro frasi esclusi), 53 sotto 44 px. Esempi: etichette dei settori "STARTUP" 85×19, "EDU" 36×19 |

**Da portare via (mobile)**
- Menu in basso, nella zona del pollice, con voci riconoscibili dal colore; l'invito "Cominciamo!" resta in testata.
- La logica WHO/WHAT regge in 4 voci.

**Da non copiare / punti deboli (mobile)**
- Finché il banner cookie è aperto copre il pulsante del menu: il mio primo tocco è finito sul link "Scopri di più e personalizza" del banner (ho solo aperto il pannello delle preferenze, senza salvare nulla, e ho ricaricato la pagina). Il menu l'ho aperto con un click da script.
- Link del menu da 16 px di altezza: il minimo di 24 px di WCAG 2.5.8 regge solo per l'eccezione di spaziatura (verificata a occhio sul passo di ≈40 px, non con il test formale).
- Testo da 11,5–12 px in 26 nodi; etichette dei settori alte 19 px.

## Punti deboli (da non imitare)
- Sei card di testimonianza identiche con testo segnaposto e avatar generico, ancora presenti il 15/10/2026.
- Banner cookie con testo 12 px peso 300 su fondo scuro: sottile e piccolo.
- Pagina molto lunga con video: non ho misurato peso né comportamento con movimento ridotto.
- Interattivi minori da 14 px.

## Da non copiare
Nome WHO/WHAT come tali, testi, l'identità cromatica teal–giallo–ciano, il video.
