# Cantina Montenellago — cantina e olio (Montisola, lago d'Iseo)

URL: https://montenellago.it/ · analizzato il 15/10/2026 · finestra emulata 1440×900 (desktop) e 375×812 (mobile, 16/10/2026) · WordPress con Elementor
Leggi questo file quando: devi progettare un sito one-page di storia + prodotto, abbinare serif display e sans per il corpo, usare un colore di brand pastello, o impaginare una scheda tecnica.

**Perché è un riferimento:** racconto in sequenza (storia → territorio → prodotto → contatto) con titoli molto grandi su fotografia e CTA grandi. È anche un caso chiaro di colore di brand bello ma debole come colore di testo.

## Misurato (1440×900)
| Voce | Valore |
|---|---|
| Font | Inter (corpo, 46 nodi), Cormorant Garamond (display, 12), Italianno (corsivo decorativo, 3), EB Garamond (1). Tutti Google Fonts |
| Display | 77 / 100 / 110 / 120 px, interlinea 1,0, peso 500, bianco su fotografia |
| Corpo | 17–20 px (20: 17 nodi, 18: 17, 17: 9) |
| Bottone | Cormorant 22–25 px, peso 700 |
| Colori | mint #87CBC3 (area grande), testo #333333, bianco su foto |
| Contrasto | #333 su bianco 12,6:1 · **mint su bianco 1,85:1** (calcolo) · mint su #333 6,84:1 (coppia teorica) |
| Raggi | 3–4 px (quasi squadrato); divisore a carta strappata tra hero e sezione successiva (da screenshot) |
| CTA misurate | "Scopri il nostro vino" 242×77 px · "Contattaci ora" 246×75 · "Invia messaggio" 208×62 (con la finestra del pannello) |
| Interattivi più piccoli | 22 px |
| Altezza pagina | ≈8.430 px |

## Struttura (dal contenuto letto)
Header: logo + 5 ancore (Chi siamo, Territorio, Vino, Drugolio, Contatti) + 2 social · hero con lago, marchio, titolo e CTA · storia della famiglia · composizione tipografica a tre righe (maiuscolo / corsivo minuscolo / maiuscolo) · scheda prodotto rosato con 5 coppie etichetta–valore (uve, altezza vigneti, periodo vendemmia, forma di allevamento, prima annata) · scheda olio con 3 affermazioni brevi · contatti (indirizzo, email, telefono, modulo).

## Regole che illustra
| Regola | Cosa fa il sito | Principio da portare via |
|---|---|---|
| Gerarchia tipografica | Display da 100 a 120 px contro corpo da 17–20 px: salto di ~6× | Un contrasto di scala così largo funziona quando c'è una sola frase grande per schermata |
| Gestalt: somiglianza | Due schede prodotto con lo stesso schema (immagine, testo, specifiche) | Stesso template per prodotti diversi |
| Gestalt: prossimità | Scheda tecnica con etichetta e valore alternati per 5 coppie | Tabella leggera invece di paragrafo |
| Miller | 5 voci di navigazione, 5 specifiche, 3 affermazioni | Piccoli numeri ovunque |
| Gerarchia delle azioni | CTA grandi (altezza 62–77 px) e ripetute: scoperta del vino, contatti | Una CTA primaria ben grande vale più di molte piccole |
| Contrasto | Il mint accanto a un grigio scuro (#333) darebbe 6,84:1, accanto al bianco 1,85:1 | Colore pastello di brand: usalo come fondo o accento grafico; per il testo scegli una variante più scura |
| Voce | Titoli da favola, riferimento al lago e all'isola | Il luogo è la voce del sito |

## Mobile (375×812, emulato, 16/10/2026)
| Voce | Valore |
|---|---|
| Scorrimento orizzontale | nessuno |
| Altezza pagina | ≈7.594 px (≈9,4 schermate) |
| Header | logo 221×46 e hamburger 55×55 (un `input` di tipo checkbox senza `aria-label`; non ho verificato se ha un'etichetta associata) |
| Menu aperto | overlay a schermo intero: logo, 5 voci (Chi siamo, Territorio, Vino, Drugolio, Contatti) a 24 px in righe alte 60 px, due icone social (22×36 e 31×36), "×" in alto a destra |
| Hero | titolo "UN VINO DA FAVOLA" bianco, serif maiuscolo su foto; CTA "Scopri il nostro vino" 225×77 |
| Titoli | grandi: 75, 45 e 40 px (una volta ciascuno); H2 45 px/55, peso 500 (desktop 77–120 px) |
| Dimensioni | 16 px (11 nodi), 17 (9), 18 (3), 20 (2) |
| Testo piccolo | nessun nodo sotto 14 px (29 nodi misurati) |
| Interattivi | 19 misurati: 7 sotto 24 px, 13 sotto 44 px. Esempi: email 195×21, telefono 107×21, "Cookie policy" 102×19 |
| Caricamento | dopo 5 secondi la pagina era ancora bianca; il contenuto è comparso dopo uno scorrimento reale (non so se sia un'animazione d'ingresso o un limite dell'emulazione) |

**Da portare via (mobile)**
- Menu minimo: 5 voci in righe alte 60 px, logo e social sotto, "×" per chiudere.
- Corpo da 16–20 px e nessun microtesto.
- Hamburger da 55×55.

**Da non copiare / punti deboli (mobile)**
- Il paragrafo della storia è centrato su più righe (screenshot). Per testi lunghi la convenzione tipografica è l'allineamento a sinistra (non verificata qui).
- Il verde menta (#87CBC3) usato nel titolo "Montenellago" è lo stesso del desktop: 1,85:1 su bianco (calcolo del desktop; lo sfondo reale non è stato rimisurato su mobile).
- Icone social da 22 px di larghezza e link di contatto da 21 px di altezza.

## Punti deboli (da non imitare)
- **Contrasto mint/bianco 1,85:1** (calcolo): sotto il 3:1 anche per testo grande. Il mint compare come colore di testo in 17 nodi e il bottone "Invia messaggio" ha testo bianco; non ho verificato in ogni punto quale sia lo sfondo effettivo.
- Il testo bianco sulla foto di hero non è calcolabile e dipende dall'immagine.
- Sezioni ripetute due volte nel markup (varianti mobile/desktop): peso e rischio di incoerenze.
- Interattivi minori da 22 px (sotto il 24 di WCAG 2.5.8, salvo eccezioni).

## Da non copiare
Nome, fotografie, storia, la composizione "TRA VIGNETI / il vitigno / ULIVETI E BOSCHI", la combinazione identica di font e mint.
