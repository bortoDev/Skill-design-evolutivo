# Immagini, foto e icone

Leggi questo file al passo 3 (fondamenta e token) se il brief prevede immagini o se mancano le foto vere, e quando rivedi immagini e icone. Il profilo lascia le immagini al brief (G5 Immagini) e chiede poche icone (G5 Icone). Nelle prove del 17/10/2026 nessuna pagina aveva immagini: la pasticceria aveva previsto le foto vere per dopo, ma nel layout non c'era lo spazio e mancava la lista degli scatti.

## 1. La domanda dell'analisi
- Chiedi: "Ci sono foto vere (prodotti, luogo, persone)? Chi le scatta o le fornisce, e quando?" La risposta cambia il layout (`processo/analisi.md`).
- Poi decidi a cosa servono le immagini in questo progetto: mostrare il prodotto, far sentire il luogo, dare fiducia con le persone, spiegare, oppure niente. Scrivilo nel Brief di `DESIGN.md`.

## 2. Il sistema (in `DESIGN.md`, Token → Immagini)
Sono scelte di progetto, da motivare con il brief:
- **Formati**: pochi rapporti fissi, uno per ruolo (per esempio verticale per i prodotti, orizzontale per gli ambienti).
- **Taglio**: dove sta il soggetto e quanto spazio ha intorno; lo stesso taglio per le immagini dello stesso ruolo. In CSS: `aspect-ratio`, `object-fit: cover` e `object-position`, per tenere il soggetto in vista.
- **Trattamento**: stessa luce, stessa temperatura e stesso tipo di sfondo, in accordo con la palette. Meglio poche foto coerenti che tante diverse.
- **Mobile**: se a 375 px il soggetto si perde, usa un altro taglio con `<picture>`.
- **Testo sopra una foto**: solo se serve. Gli strumenti non calcolano il contrasto su una foto: guardalo nelle foto della rifinitura, a ogni larghezza, e se serve aggiungi un velo o sposta il testo.

## 3. Quando mancano le foto vere
La mancanza di foto non basta per togliere lo spazio delle immagini. Scegli, e scrivi il motivo in `DESIGN.md` (Decisioni):
1. **Segnaposto dichiarati**: il riquadro con il suo rapporto, un fondo della palette e una riga su cosa ci andrà ("Foto da scattare: crostata intera vista dall'alto, luce di finestra"). Nella consegna e in `DESIGN.md` scrivi la lista degli scatti.
2. **Un design tipografico**, scelto apposta.
3. **Illustrazioni o grafica** del progetto, se il tono lo permette.

Foto d'archivio o generate si usano solo come segnaposto dichiarati ("foto di esempio"). Presentate come il luogo, il prodotto o le persone vere sono dati inventati (R-014).

## 4. Icone
- Prima un set esistente con licenza libera: controlla la licenza e scrivila in `DESIGN.md`. Un'icona si disegna solo se manca, con la stessa griglia e lo stesso tratto del set. Il tratto si accorda al peso del testo vicino.
- Significati comuni (tre righe = "menu"). Nel dubbio, solo testo (G5 Icone): nelle prove le icone disegnate a mano avevano significati sbagliati.

## 5. Tecnica
- Testo alternativo per le immagini che informano; quelle decorative si devono poter ignorare, in HTML con `alt=""` (WCAG 2.2, 1.1.1, A). Niente testo dentro le immagini, salvo i loghi (1.4.5, AA). `width` e `height`, oppure `aspect-ratio`; `srcset`; `loading="lazy"` solo sotto la prima schermata.
- App Apple: immagini @2x e @3x su iOS, @2x su iPadOS; foto in JPEG o HEIC; icone e grafica piatta in PDF o SVG; grafica raster in PNG. Prova su dispositivi veri (Apple HIG, Images).
- Tema scuro: Apple consiglia di scurire un poco le immagini con fondo bianco, perché il bianco non "brilli"; se un'immagine funziona in un solo tema, modificala o preparane una per tema (Apple, Dark Mode).

## Fonti (lette il 17–18/10/2026)
- W3C, WCAG 2.2: 1.1.1 Non-text Content e 1.4.5 Images of Text, dal repository ufficiale w3c/wcag.
- Apple HIG: [Images](https://developer.apple.com/design/human-interface-guidelines/images) e [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), lette dal loro JSON ufficiale.
- Il resto (formati, tagli, trattamento, segnaposto, icone) sono pratiche di progetto, non soglie.
