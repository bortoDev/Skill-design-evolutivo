# Colore: come si costruisce e si motiva una palette

Leggi questo file al passo 3 (fondamenta e token) e quando rivedi il colore. Il profilo chiede neutri che fanno il lavoro, 0–1 accento e mai nero puro sul chiaro (G3): qui c'è il come. Ogni colore va in `DESIGN.md` con il suo ruolo e il suo motivo.

## 1. La struttura
- **Da dove nasce**: dal mondo del soggetto, cioè materiali, luoghi, oggetti, insegne (il nastro a terra di una palestra, il timbro di una biblioteca). Scrivi l'origine di ogni colore (R-008).
- **Neutri come una scala**: fondo, superficie, linea, testo secondario, testo. Tutti con la stessa temperatura (tutti caldi o tutti freddi) e con salti di chiarezza regolari. Costruirli in `oklch()` aiuta a tenere i salti uguali: è un metodo, non un obbligo (CSS Color 4; supporto dei browser non verificato).
- **Accento**: pochi gradini (normale, premuto, fondo tenue), pochi ruoli e poca superficie. Se lo stesso accento segna azione, selezione, urgenza e focus, non dice più niente. Apple lo chiede per i controlli in Liquid Glass: colore solo dove serve enfasi, come uno stato o l'azione principale (Color).
- **Un colore, un significato**: lo stesso colore non indica cose diverse, per esempio un pulsante senza bordo e un testo che non si clicca (Apple, Color).
- **Colori di stato** (errore, successo): compaiono solo in quello stato, sempre con un testo o un'icona, mai con il solo colore (WCAG 2.2, 1.4.1, A). Se sembrano in conflitto con "0–1 accento" del profilo, scrivi la scelta in `DESIGN.md` e chiedi all'utente.
- **Stati dei controlli** (premuto, selezionato, disattivo): presi dalla scala, non inventati uno per uno.

## 2. Contrasti
- Testo: WCAG 1.4.3 (`processo/verifica.md` §1).
- Bordi dei campi, contorni e stati dei controlli, indicatore di focus, icone che servono a capire: almeno **3:1** con i colori vicini (WCAG 2.2, 1.4.11, AA; esclusi i controlli disattivi). Le linee solo decorative possono essere chiare; quelle che fanno riconoscere un controllo no. Conta di più quando alleggerisci linee e bordi per eleganza (R-019).
- Calcola con `node strumenti/contrasto.mjs` (il percorso completo è in SKILL.md): il risultato "AA grande" (3:1) vale anche per bordi, icone e focus.

## 3. Tema scuro, contrasto alto e luce
- Il tema scuro **non è l'inverso** del chiaro: sfondi più spenti e primo piano più luminoso, e alcuni colori non si invertono (Apple, Dark Mode). Ricalcola tutti i contrasti. Superfici più in alto un po' più chiare, testo non bianco puro e accento più chiaro sono convenzioni, non verificate.
- Ogni colore personalizzato ha una variante chiara, una scura e, per ciascuna, una a contrasto aumentato (Apple, Color). Sul web: `prefers-color-scheme` e `prefers-contrast: more`. Non usare `@media (prefers-contrast)` senza `more` o `less` per alzare il contrasto: la specifica lo chiama "incorrect and user-hostile". Senza qualificatore serve solo a semplificare: niente gradienti decorativi, bordi pieni al posto delle ombre (Media Queries 5).
- Prova la palette con molta e con poca luce: al sole i colori sembrano più scuri e spenti, al buio più luminosi e saturi (Apple, Color). Guarda la foto in tema scuro (`processo/rifinitura.md`).
- Nelle app native usa i colori di sistema (`riferimenti/app-mobile.md`).

## Fonti (lette il 17–18/10/2026)
- W3C, WCAG 2.2: 1.4.1 Use of Color e 1.4.11 Non-text Contrast, dal repository ufficiale w3c/wcag (w3.org non è raggiungibile da qui).
- Apple HIG: [Color](https://developer.apple.com/design/human-interface-guidelines/color) e [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode), lette dal loro JSON ufficiale.
- W3C, bozze nel repository w3c/csswg-drafts: CSS Color 4 (`oklch()`, Editor's Draft) e Media Queries 5 (`prefers-color-scheme`, `prefers-contrast`, Working Draft del 19/02/2026). Supporto dei browser non verificato.
