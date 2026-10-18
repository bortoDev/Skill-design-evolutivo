# Rifinitura: guardare la pagina e togliere

Leggi questo file in modalità crea e migliora, dopo ogni pezzo e prima di `processo/verifica.md`. La verifica controlla che il design sia corretto; la rifinitura, che sia curato e misurato. Nasce dalla lezione di processo "Cura da alto livello" e dalle prove del 17/10/2026, in cui nessuna sessione aveva guardato la pagina.

## 1. Guarda
- Lancia `node strumenti/guarda.mjs <file.html o indirizzo>` (il percorso completo è in SKILL.md). Fa le foto a 375, 320 e 1440 px e a 375 in tema scuro (prima schermata e pagina intera), più una foto sfocata a 375, con "riduci movimento" attivo, e raccoglie le misure. 320 viene da WCAG 1.4.10; 375, 1440 e il raggio della sfocatura sono scelte della skill, non standard.
- Apri ogni foto con lo strumento che legge i file e guardala **prima** di leggere i numeri. Le barre fisse giudicale nella foto della prima schermata: nella pagina intera coprono ciò che hanno sotto.
- La foto sfocata mostra cosa pesa di più: deve essere ciò che l'analisi mette al primo posto.
- Se manca Playwright (lo script esce con codice 2): usa un browser controllabile, se c'è, oppure chiedi all'utente una foto dello schermo. App native: chiedi una foto dello schermo dal simulatore o dall'emulatore, oppure guarda le anteprime (SwiftUI, Compose).
- Le foto non mostrano il movimento: leggilo nel codice e nei campi `movimento` e `movimentoSenzaRiduci`. Se non hai guardato, dillo nella consegna: "non guardata a schermo".

## 2. Il primo sguardo
- Cosa vedi per primo, per secondo e per terzo? L'ordine segue le priorità dell'analisi in `DESIGN.md`.
- L'idea del progetto (la frase che lo rende riconoscibile) si capisce dalla foto, senza leggere `DESIGN.md`?
- Tre aggettivi per il carattere della schermata, confrontati con il tono del brief: è il controllo di R-019, fatto sull'immagine.
- Pochi gesti forti, il resto quieto. Ma spoglio non vuol dire sobrio: senza immagini, marchio e gesto tipografico la pagina è vuota.

## 3. Togli
Togli almeno una cosa, oppure scrivi in una riga perché resta tutto.
- Ogni bordo, linea o contenitore separa qualcosa che lo spazio da solo non separa?
- Pulsanti pieni nella stessa vista: Apple ne chiede 1–2 (HIG, Buttons; sul web è una linea guida). Ognuno è davvero l'azione principale?
- La stessa informazione detta insieme con colore, peso, bordo, icona e testo: togli i segnali in più. WCAG 1.4.1 chiede solo che il colore non sia l'unico.
- L'accento: quanti ruoli ha, e su quanta superficie? (`riferimenti/colore.md` §1)

## 4. Dettagli
Misura invece di stimare: i campi `stiliTesto`, `pulsantiPieni`, `testoVicinoAlBordo`, `tipografia` e `movimento` di `misura-pagina.js` (in `guarda.mjs` stanno sotto `misure`).
- Lo spazio dentro un gruppo è minore dello spazio tra i gruppi (Gestalt, vicinanza: `riferimenti/fondamenta.md` §3).
- Nessun testo tocca il bordo del suo contenitore: guarda le etichette più lunghe a 320 px.
- Livelli diversi, stili diversi; lo stesso livello, lo stesso stile.
- Pochi bordi sinistri; gli elementi affiancati si allineano sulla linea di base del testo o sul centro.
- Apostrofi, virgolette, spazi non separabili, intervalli, a capo: `riferimenti/tipografia-spaziatura.md` §6. Immagini e icone: `riferimenti/immagini.md`.
- Ogni elemento toccabile ha uno stato premuto (Apple, Buttons) e un focus visibile (WCAG 2.4.7).
- Movimento solo nei punti scelti nella direzione (G5, momento firma) e scritti in `DESIGN.md`, con `transform` e `opacity`. Con "riduci movimento" il cambio di stato resta visibile (`riferimenti/movimento-stati.md` §4).
- A 1440 px: larghezza massima e composizione decise in `DESIGN.md`. Una colonna stretta nel vuoto va bene solo se è scritta lì.

## 5. Cosa dire
- Una riga nella consegna, per esempio: "Rifinitura: guardata a 375, 320, 1440 e in scuro · tolta la linea sotto i titoli · corretti 3 dettagli (un'etichetta sul bordo, 2 apostrofi)."
- In `DESIGN.md`, sezione "Prove a schermo": la data, le larghezze guardate e cosa hai corretto guardando.
- Un errore visto solo nelle foto va nel registro del progetto come "intercettato in rifinitura".
