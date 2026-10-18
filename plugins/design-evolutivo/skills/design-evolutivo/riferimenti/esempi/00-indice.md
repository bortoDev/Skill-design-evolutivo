# Esempi di riferimento — indice per regola

Analisi su 8 siti scelti dall'utente: desktop il 15/10/2026, mobile il 16/10/2026. Un file per sito nella stessa cartella; questo indice serve a trovare gli esempi partendo dalla regola.
Leggi questo file quando: devi applicare una regola di design e vuoi vedere come l'hanno risolta siti reali, o devi decidere una misura (corpo testo, raggio, contrasto, numero di voci).

## 1. Come usare gli esempi senza produrre cose tutte uguali
Gli esempi spiegano il perché di una scelta. Il come lo decidi tu.
1. Parti dalla regola o dal problema (es. "navigazione con troppe voci").
2. Leggi 2–3 esempi e scrivi in una riga il principio, non il layout ("raggruppare sotto etichette e nascondere il resto dietro 'Altro'").
3. Prima di disegnare, cambia almeno 1 di queste 5 dimensioni rispetto agli esempi letti: struttura della pagina · coppia di font · palette · ritmo di spaziature e raggi · tono del testo e movimento.
   Sono i 5 geni con cui la skill descrive ogni direzione: vedi `../../processo/direzioni.md`.
4. Non riprendere nomi, testi, immagini, loghi, illustrazioni né font a pagamento.
5. Passa il risultato dalla checklist (contrasto, target, numero di voci, misura di riga).
6. Se il progetto parte da mobile, leggi per prima la sezione "Mobile" di ogni file sito e la tabella della sezione 4b.

I siti sono stati scelti per gusto, non perché siano tutti corretti: ogni file ha una sezione di punti deboli da non imitare.

Leggi anche le schede dei siti studiati dall'utente in `memoria/esempi/00-indice.md`: la modalità studia scrive lì, perché questa cartella si legge soltanto.

## 2. Cosa è stato misurato, e cosa no
- **Misurato (desktop)** con gli stili calcolati del browser, finestra emulata 1440×900: famiglie, dimensioni, pesi, interlinee e tracking del testo; colori più usati; raggi; padding delle sezioni; altezza pagina; voci di navigazione; elemento interattivo più piccolo.
- **Misurato (mobile)** il 16/10/2026 con viewport emulato 375×812, touch e user agent Android (non un telefono vero), stesso script per tutti gli 8: scorrimento orizzontale, meta viewport, dimensioni del testo, interattivi sotto 24 e 44 px, barre fisse, controlli del menu, titoli e paragrafo lungo. Menu aperto su tutti e 8 (su BBANG con un click da script, perché il banner cookie copriva il pulsante).
- **Letto** dal contenuto delle pagine: struttura, etichette, testi, numero di elementi per sezione.
- **Visto** in uno screenshot per sito, parte alta della pagina, a bassa risoluzione (desktop), più uno o due screenshot a 375 px per il menu aperto.
- **Non fatto:** telefono reale, orientamento orizzontale, 320 px (WCAG 1.4.10), zoom al 200 % (1.4.4), stati hover/focus/tastiera, animazioni, scorrimento completo, pagine interne. I banner cookie non sono stati né accettati né rifiutati e in alcuni screenshot coprono parte della hero. Su BBANG un mio tocco ha aperto il pannello delle preferenze del banner: non ho salvato nulla e ho ricaricato la pagina.
- I contrasti sono calcolati con la formula WCAG sulle coppie di colori misurate. Dove lo sfondo è una foto non si può calcolare.
- La lunghezza di riga è una stima (larghezza ÷ metà del corpo).
- I conteggi degli interattivi sotto 24 e 44 px (mobile) sono candidati, non violazioni: l'elenco include qualche elemento nascosto (link "vai al contenuto" 1×1, campi da 16×16) e non applico le eccezioni di WCAG 2.5.8 (spaziatura, link dentro frasi, ecc.).
- Su SBC e Montenellago le animazioni d'ingresso hanno reso scuro o bianco il primo screenshot: i numeri dagli stili calcolati restano validi, le impressioni visive no.
- Sono 8 siti scelti per gusto: i numeri descrivono quei siti, non sono standard.
- Duca Pipe: nella prima misurazione la home è passata da sola a /workshop-2/. I dati di corpo testo vengono da quella pagina, titoli e altezza dalla home rimisurata.

## 3. Standard verificati (W3C, WCAG 2.2)
| Criterio | Valore |
|---|---|
| 1.4.3 Contrasto minimo (AA) | testo normale ≥ 4,5:1; testo grande ≥ 3:1. "Grande" = 18 pt (≈24 px) oppure 14 pt in grassetto (≈18,7 px) |
| 2.5.8 Dimensione del target (AA) | almeno 24×24 px CSS. Eccezioni: spaziatura sufficiente, funzione equivalente, link dentro una frase, controllo del browser, presentazione essenziale |
| 2.5.5 Dimensione del target, avanzata (AAA) | almeno 44×44 px CSS. Eccezioni: funzione equivalente, link dentro una frase, controllo del browser, presentazione essenziale (non c'è quella della spaziatura) |
| 1.4.8 Presentazione visiva (AAA) | non più di 80 caratteri per riga; interlinea ≥ 1,5; spazio tra paragrafi ≥ 1,5 volte l'interlinea (come meccanismo regolabile dall'utente) |
| 1.4.4 Ridimensionamento del testo (AA) | il testo si può ingrandire fino al 200 % senza assistive technology e senza perdere contenuto o funzioni (eccetto sottotitoli e immagini di testo). La pagina letta non cita `user-scalable` né `maximum-scale`; elenca solo una regola di test collegata, "Meta viewport allows for zoom" |
| 1.4.10 Riflusso (AA) | il contenuto si dispone senza scorrimento a due dimensioni a 320 px CSS di larghezza (contenuto a scorrimento verticale) o 256 px di altezza (orizzontale), cioè 1280 px di partenza con zoom al 400 %. Eccezioni: mappe, diagrammi, video, giochi, presentazioni, tabelle dati (le celle devono comunque riflettersi), interfacce con barre degli strumenti fisse |
| 1.4.11 Contrasto non testuale (AA) | ≥ 3:1 con i colori vicini per ciò che fa riconoscere componenti e stati (bordi dei campi, contorni, focus, icone di comando) e per le parti di grafica necessarie a capire. Esclusi i componenti disattivi e quelli lasciati all'aspetto predefinito del browser |
| 2.4.7 Focus visibile (AA) | con la tastiera l'indicatore di focus si vede |
| 2.4.11 Focus non coperto, minimo (AA, nuovo in 2.2) | l'elemento con il focus non è mai nascosto del tutto da contenuti dell'autore (intestazioni fisse, barre in basso, banner) |
| 1.1.1 Contenuti non testuali (A) | ogni immagine che informa ha un testo alternativo equivalente; quelle decorative si possono ignorare (in HTML `alt=""`) |
| 1.4.5 Immagini di testo (AA) | testo vero, non immagini di testo, salvo personalizzazione o casi essenziali; i loghi sono essenziali |

Le righe 2.5.5, 1.4.11, 2.4.7, 2.4.11, 1.1.1 e 1.4.5 sono state lette il 18/10/2026 dal repository ufficiale w3c/wcag (w3.org non è raggiungibile da qui).

Per le app native i valori sono stati verificati su fonti ufficiali il 16/10/2026 e stanno in [`../app-mobile.md`](../app-mobile.md): su Apple il controllo è 44×44 pt **predefinito** e 28×28 pt minimo; su Android 48×48 dp. Il corpo minimo di 16 px per il web **non** è stato verificato (16 sp è il Body Large di Material, 17 pt il testo predefinito su iOS: sono valori di piattaforma, non standard web). Anche l'effetto reale di `maximum-scale=1` sui vari browser non è stato verificato.

## 4. Misure a confronto (1440×900)
| Sito | Font | Corpo | Titolo massimo | Sfondo / testo | Contrasto del testo | Accenti | Raggi | Voci di navigazione | Altezza pagina |
|---|---|---|---|---|---|---|---|---|---|
| Dishoom | serif + sans umanista | 21 px, interl. 1,3 | 32 px (H1) | #F0ECE0 / #353839 | 10,0:1 | nessuno | 2–4 px, pillole | 5 | ≈10.930 px |
| Apple Store | SF Text / Display | 12–17 px | 80 px | #F5F5F7 / #1D1D1F | 15,5:1 | arancio #B64400 (stato) | 18 px (card) | 10 | ≈7.840 px |
| SBC Niu Midia | VT323 + Space Grotesk + Work Sans | 16–20 px | 180 px | bianco / #373636 (H2 #0D0D0D, hero scuro) | 12,0:1 | viola, lime | 8 px, pillole | 6 (+9 sottovoci) | ≈11.420 px |
| BBANG | Roboto | 17,5–18 px | 45 px | #13151B / bianco | 18,2:1 | teal, giallo, ciano | pillole 25–50 px | 4 + CTA | ≈8.220 px |
| okomedia | Proxima Nova + Arial | 18–20 px | 60 px | #FEFEFE / #1F1F1F | 16,3:1 | corallo (2,74:1) | quasi nessuno | 0 in header (solo hamburger); 8 nell'overlay | ≈6.150 px |
| Montenellago | Inter + Cormorant + corsivo | 17–20 px | 120 px | bianco / #333 | 12,6:1 | mint (1,85:1 su bianco) | 3–4 px | 5 | ≈8.430 px |
| Duca Pipe | Raleway | 16 px, interl. 1,8 | 42 px (home) | #151515 / #B6B6B6 | 9,0:1 | arancio (4,74:1) | 2–3 px | 6 | ≈3.090 px |
| Awwwards | Inter Tight | 14 px, interl. 2,0 (UI) | 126,7 px (≈8,8 vw) | #F8F8F8 / #222 | 15,0:1 | nessuno | 8 px, 50% | 5 + mega-menu | ≈12.730 px |

Tendenze osservate (descrittive, solo su questi 8):
- 6 siti su 8 hanno 4–6 voci visibili in header; fanno eccezione Apple (10, nomi di prodotto noti) e okomedia (nessuna voce in header a 1440 px, solo hamburger).
- 6 siti su 8 usano 1–2 famiglie di font; i due con 3–4 (SBC, Montenellago) hanno la terza decorativa (pixel, corsivo).
- Nei 6 siti con sfondo chiaro nessuno usa nero puro per il testo (i più scuri: #0D0D0D e #1D1D1F).
- 6 siti su 8 hanno 0–1 colore d'accento; SBC ne ha 2 e BBANG 3, entrambi su fondo scuro con rapporti alti.
- Titoli display con interlinea 1,0–1,05 in 4 siti (SBC, Montenellago, Awwwards, Apple).
- Tracking: MAIUSCOLO con tracking positivo in Dishoom (0,18–0,25 em) e BBANG (0,12 em); titoli grandi con tracking negativo in okomedia (−0,03 em) e Apple (−0,015 em).
- Tutti e 8 hanno almeno un elemento interattivo sotto i 24 px (minimo misurato 13–22 px, in gran parte link piccoli o dentro frasi); le CTA primarie misurate su Montenellago sono alte 62–77 px.

## 4b. Misure mobile a confronto (375×812, emulato)
| Sito | Scorrimento orizzontale | Altezza pagina | Menu aperto | Controllo di apertura (px) | Dimensioni più frequenti (nodi) | Interattivi sotto 24 px / totale | Zoom |
|---|---|---|---|---|---|---|---|
| Dishoom | no | ≈11.354 px (14 schermate) | pannello a schermo intero, 5 + 4 voci e barra di azione | 24×24 (+ "Book" 57×27) | 24 (36), 18 (34), 12 (31) | 9 / 90 | libero |
| Apple Store | no | ≈10.203 px (12,6) | lista a schermo intero, 10 voci | 48×48 | 12 (108), 14 (100), 21 (61) | 36 / 114 | libero, esplicito |
| SBC Niu Midia | no | ≈16.416 px (20,2) | drawer, 6 voci + CTA email, righe da 68 px | 24×24 | 16 (33), 18 (20), 36 (17) | 9 / 34 | libero |
| BBANG | no | ≈8.507 px (10,5) | popup in basso con 4 voci, da pulsante 40×40 fisso in basso al centro | 40×40 | 16 (30), 12,8 (8), 11,5 (7) | 28 / 60 | libero |
| okomedia | no | ≈8.846 px (10,9) | overlay a schermo intero, 8 voci a 30 px | 24×15 | 30 (6), 20 (6), 34 (4) | 1 / 14 | **bloccato** (`maximum-scale=1`) |
| Montenellago | no | ≈7.594 px (9,4) | overlay a schermo intero, 5 voci a 24 px, righe da 60 px | 55×55 | 16 (11), 17 (9), 18 (3) | 7 / 19 | libero |
| Duca Pipe | no | ≈3.818 px (4,7) | lista di 6 voci | 22×40 | 14 (23), 24 (11), 16 (6) | 4 / 34 | **bloccato** (`maximum-scale=1`) |
| Awwwards | no | ≈12.886 px (15,9) | 10 voci con fisarmonica | 54×54 | 14 (51), 18 (26), 16 (16) | 44 / 97 | libero |

Note: "Interattivi" esclude i link dentro le frasi e include qualche elemento nascosto (vedi sezione 2). "Zoom libero" = nessuna restrizione nel meta viewport.

Tendenze mobile (descrittive, solo su questi 8):
- Tutti e 8 mettono la navigazione dietro un'icona; 7 la tengono in alto, BBANG la sposta in basso al centro.
- Voci del menu aperto: BBANG 4, Montenellago 5, SBC 6, Duca 6, okomedia 8, Dishoom 5 + 4, Apple 10, Awwwards 10 (di primo livello, con fisarmonica). Sopra il limite alto di 7±2 (9) solo Apple e Awwwards.
- Nessuno ha scorrimento orizzontale a 375 px. A 320 px (WCAG 1.4.10) non ho provato.
- Controlli di apertura del menu: 3 su 8 (Apple 48×48, Awwwards 54×54, Montenellago 55×55) misurano almeno 44 px in entrambe le direzioni; Dishoom e SBC sono 24×24; okomedia (altezza 15) e Duca (larghezza 22) sono sotto i 24 px in una dimensione, salvo eccezioni non valutate.
- 2 siti su 8 (okomedia, Duca) fissano l'ingrandimento massimo a 1.
- Interlinea del paragrafo lungo: 1,3–1,5 (Dishoom 1,33, SBC 1,3, Duca 1,5); solo Duca raggiunge il valore di 1.4.8. Apple e BBANG: il primo paragrafo trovato è a 12 px, forse note legali e testo del banner cookie (non verificato).
- Microtesto (nodi sotto 12 px): Apple 28, Awwwards 21, Dishoom 10, BBANG 7, Duca 2; SBC e Montenellago nessuno; okomedia 5 nodi da 1 px, probabilmente nascosti e non contati.
- Titoli display: Awwwards 126,7 → 42 px, SBC 180 → 72 px (interlinea 0,9), Apple 80 → 48 px, okomedia tracking −0,03 em invariato.
- Pagine: da 4,7 (Duca) a 20,2 schermate (SBC).

## 5. Indice: regola → esempi
| Regola | Esempi che la rispettano | Anti-esempi |
|---|---|---|
| Coerenza (Nielsen 4, Shneiderman 1) e Gestalt: somiglianza | Apple: card con lo stesso raggio e schema · Awwwards: 7 sezioni chiuse da "vedi tutto" · okomedia: 4 sezioni × 3 blocchi · Montenellago: due schede prodotto con lo stesso template | okomedia: titoli e descrizioni scambiati nel blocco duplicato · SBC: due indirizzi diversi per la stessa pagina |
| Miller 7±2, chunking, Shneiderman 8 | Dishoom: menu a 7 + "More", gruppi da 7/4/3 (dal markup) · Awwwards: sezioni da 2–6 · BBANG: 6 + 6 · Apple: gruppi da 2–6 card | SBC: elenco di 14 competenze · Apple: carosello di 13 card e 10 voci in header (compensate da nomi noti) |
| Riconoscere anziché ricordare (Nielsen 6), segnifier | BBANG: "Scopri" su ogni card · Dishoom: frecce e sottotitolo sulle voci Menus/Store | okomedia: navigazione dietro hamburger a 1440 px |
| Schemi IA: esatto / ambiguo | Esatto: Dishoom (locali in ordine alfabetico), SBC (cronologia 1995→2003), Apple (per prodotto). Tematico, per chi esplora: BBANG (WHAT/WHO), Awwwards (premio/categoria/tecnologia), SBC (servizi). Nota: gli schemi tematici richiedono manutenzione ad ogni nuovo contenuto | okomedia: nel markup del menu servizi, clienti e strumenti stanno nello stesso elenco (non verificato quali siano visibili) |
| Gestalt: figura/sfondo | Dishoom: crema/scuro alternati · SBC: hero scuro su corpo chiaro · BBANG: card chiare su fondo scuro | — |
| Gestalt: prossimità e continuità | Dishoom: didascalia attaccata alla foto · Montenellago: scheda tecnica etichetta–valore · SBC: timeline · BBANG: linea curva in hero (dallo screenshot) | — |
| Gestalt: chiusura | Nessun esempio affidabile in questi 8 siti | — |
| Gerarchia tipografica | Apple: scala a 6 gradini · Dishoom: maiuscolo tracciato per titoli ed etichette · Awwwards e Montenellago: display ≥ 100 px contro corpo 14–20 px · Duca: una famiglia, pesi 300/500 · SBC: gesto estremo (180 px) una volta | Dishoom: 12 px in 41 nodi e 10 px in 14 · okomedia: 10 px in 19 nodi · BBANG: 12 px peso 300 nel banner cookie |
| Contrasto (WCAG 1.4.3) | Dishoom 10,0 · Apple 15,5 · SBC viola 7,3 e lime su nero 13,8 · BBANG teal 5,1 · Duca grigio su nero 9,0 e arancio 4,7 · Awwwards 15,0 | Montenellago: mint su bianco 1,85 · okomedia: corallo su bianco 2,74 · Apple: #86868B su bianco 3,62 (solo testo grande) |
| Colore d'accento | Apple: arancio scurito a 5,5:1 solo per lo stato · Dishoom: nessun accento · Duca: un accento a bassa frequenza | Accenti chiari usati come testo (Montenellago, okomedia) |
| Gerarchia delle azioni | Awwwards: pieno > contorno > testo · Dishoom: azioni in hero + prenota in header · BBANG: stessa CTA in apertura e chiusura · Montenellago: CTA alte 62–77 px | okomedia: nessuna CTA primaria evidente fuori dal modulo (dal testo letto) |
| Moduli e microcopy (Nielsen 5, 10) | Dishoom: campo facoltativo marcato con il motivo accanto · okomedia: selettore "Area di interesse" · SBC: 3 campi | okomedia: informativa privacy su altro dominio, solo "ACCEPT" nel markup del banner cookie |
| Stato e trasparenza (Nielsen 1) | Apple: etichette NOVITÀ/PREORDINA e prezzo con rata e nota · Dishoom: annunci con date · Awwwards: data, punteggio, badge PRO/INT | — |
| Awareness mismatch / contesto usato dal sistema | Apple: avviso che la posizione deriva dall'IP o da una visita precedente (dal testo letto non risulta un comando per cambiarla: da verificare) | Gap: nessun altro sito è proattivo o basato su IA |
| Target e dimensioni cliccabili (WCAG 2.5.8) | Montenellago: CTA primarie grandi | Tutti e 8: link minori sotto i 24 px |
| Misura di riga e interlinea (WCAG 1.4.8) | Duca: interlinea 1,8 su desktop e 1,5 su mobile, ≈43 caratteri per riga a 375 px · Dishoom: ≈37 caratteri per riga su mobile (stima) | Apple: note legali ~160 caratteri (stima) · Duca: ~94 (stima, pagina Workshop su desktop) |
| Tipografia fluida e responsive | Awwwards: display ≈ 8,8 vw (126,7 → 42 px su mobile) · BBANG: misure frazionarie · Dishoom: H1 24→32 px tra ~650 e 1440 px · SBC: H1 180 → 72 px · Apple: 80 → 48 px | — |
| Qualità e credibilità dei contenuti | — | BBANG: 6 testimonianze segnaposto · okomedia: © 2018, testo di tema nel markup, refusi · SBC: refusi nel testo |
| Voce e metafora | SBC: titoli giocosi, navigazione neutra · Duca: prima persona artigiana · Dishoom: tono da lettera · Montenellago: luogo come voce | — |
| Ritmo verticale | Dishoom: padding di sezione 64–96 px | — |
| Mobile: menu | BBANG: popup in basso, nella zona del pollice, 4 voci · SBC: drawer con righe da 68 px, fisarmonica e CTA finale · Montenellago: overlay con 5 voci in righe da 60 px · Apple: controllo da 48×48 e lista a schermo intero | okomedia: header fisso da 140 px (≈17 % dello schermo) con hamburger 24×15 · BBANG: il banner cookie copre il pulsante del menu |
| Mobile: target (WCAG 2.5.8, AA: 24×24 px CSS; 2.5.5, AAA: 44×44 px CSS) | Apple: tutti i controlli dell'header ≥ 48 px · Awwwards: hamburger 54×54 · Montenellago: 55×55 | Duca: hamburger largo 22 px · okomedia: 24×15 · SBC: "×" 15×15 · Awwwards: ricerca larga 14 px · Awwwards: 44 interattivi su 97 sotto i 24 px |
| Mobile: zoom (WCAG 1.4.4) | Apple: `user-scalable=1` esplicito | okomedia e Duca: `maximum-scale=1` (effetto sui browser non verificato) |
| Mobile: microtesto | SBC e Montenellago: nessun nodo sotto 12 px | Apple: 28 nodi sotto 12 px · Awwwards: 21 · Dishoom: 10 · BBANG: 7 |

## 6. Cosa manca in questa libreria
- Nessuna app mobile nativa tra gli esempi: la parte mobile è solo web emulato a 375×812 (non un telefono, niente orientamento orizzontale, 320 px, zoom 200 % né gesture o safe area reali). Le linee guida di piattaforma sono in [`../app-mobile.md`](../app-mobile.md); mancano ancora esempi visivi di app reali.
- Nessuna interfaccia ricca di dati (dashboard, tabelle, editor).
- Pochissimo sulle funzioni proattive o con IA (solo la nota sulla posizione di Apple).
- Nessun esempio di stati hover/focus, né di movimento con preferenza "riduci animazioni".
- Per ampliare: il menu di Awwwards ha le categorie Mobile & Apps e Interaction Design, utili per cercare esempi di app.

## Fonti
- [Dishoom](https://www.dishoom.com/) · [Apple Store Italia](https://www.apple.com/it/store) · [SBC Niu Midia](https://sbcniumidia.com/) · [BBANG](https://bbang.it/) · [okomedia](https://okomedia.it/) · [Cantina Montenellago](https://montenellago.it/) · [Duca Pipe](https://www.ducapipe.com/it/) · [Awwwards](https://www.awwwards.com/)
- [WCAG 2.2 — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 — Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
- WCAG 2.2 — [Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) · [Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) · [Focus Not Obscured (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html) · [Non-text Content](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html) · [Images of Text](https://www.w3.org/WAI/WCAG22/Understanding/images-of-text.html): testo letto dal repository w3c/wcag
- [WCAG 2.2 — Visual Presentation](https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html)
- [WCAG 2.2 — Resize Text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html)
- [WCAG 2.2 — Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)
- App native (Apple HIG, Android, Material): fonti elencate in `../app-mobile.md`
