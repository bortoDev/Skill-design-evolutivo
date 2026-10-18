# Movimento e stati: cosa dicono le fonti e cosa decide il progetto

Leggi questo file al passo 3 (token), prima di costruire un pezzo con azioni e quando rivedi il comportamento di un design. Per la teoria (microinterazioni, macchine a stati, scopi e coreografia del movimento) richiama la skill `interaction-design`, se è installata: le sue durate e curve non vengono da fonti ufficiali, quindi in `DESIGN.md` vanno come scelte di progetto.

## 1. Due strati
- **Cambi di stato silenziosi** (tocco, mouse, focus, selezione): di solito senza animazione, o con una transizione di colore brevissima. Non aggiungere movimento a ogni elemento: nelle app Apple consiglia di solito niente movimento sulle interazioni frequenti (Motion).
- **Pochi punti espressivi scelti** (profilo, G5 Movimento): i punti in cui il movimento racconta l'idea del progetto (il timbro che si posa, il pallino che si riempie). Nascono dalla direzione; quanti, lo decide il progetto: il profilo non dà un numero per schermata.
- Ogni animazione ha uno scopo, scritto in una riga (riscontro, continuità, orientamento, attenzione, carattere: vedi `interaction-design`). Senza scopo, si toglie. Apple: niente movimento aggiunto "per aggiungere movimento", e mai come unico modo di dare un'informazione (Motion).
- Rimbalzi e oscillazioni sono una scelta di tono legata al brief, come il resto del movimento.

## 2. Come si costruisce
- **Si può interrompere**: non far aspettare la fine di un'animazione per agire (Apple, Motion). Per i cambi di stato `transition`, che torna indietro se la persona cambia idea; `@keyframes` per un momento che parte una volta.
- **Il riscontro segue l'evento, non lo stato**: l'animazione di "hai appena prenotato" non riparte quando cambia un filtro.
- **L'azione contraria non compare sotto il dito**: "Prenota" non diventa subito "Annulla" nello stesso punto. Prima lo stato "fatto", poi l'annullamento accanto (U5).
- **Un cambio di stato non sposta la pagina**: testi e pulsanti che cambiano tengono la stessa misura; le immagini hanno le proporzioni riservate.
- **Mouse**: gli effetti al passaggio del mouse dentro `@media (hover: hover)` (Media Queries 4), e solo se la pagina si usa anche con il mouse.
- Si animano di preferenza `transform`, `opacity` e i colori; niente `transition: all` (pratica tecnica, non standard).

## 3. Stati e attese
- Uno stato si progetta anche senza un servizio vero: fallo come variante statica (`#caricamento`, `#errore`, `#vuoto`) e scrivi in `DESIGN.md` cosa cambierà con i dati (R-018).
- **Caricamento**: mostra subito qualcosa (un testo o un segnaposto) e sostituiscilo quando arriva il contenuto. Indicatore determinato se sai quanto manca, indeterminato se non lo sai (Apple, Loading).
- I messaggi di stato ("Prenotato", "Errore") arrivano ai lettori di schermo senza spostare il focus, per esempio con `role="status"` o `aria-live` (WCAG 2.2, 4.1.3, AA).

## 4. Riduci movimento e accessibilità
- Con "riduci movimento" (`prefers-reduced-motion: reduce`) togli spostamenti, scale e rimbalzi; il cambio di stato deve restare visibile, anche senza animazione. Una dissolvenza breve è possibile, non obbligatoria: per WCAG i cambi di colore e di opacità non sono "motion animation" (definizione).
- WCAG 2.2: il movimento avviato da un'interazione si può disattivare, se non è essenziale (2.3.3, AAA: obiettivo); ciò che si muove da solo per più di 5 secondi accanto ad altri contenuti si può mettere in pausa, fermare o nascondere (2.2.2, A); niente lampeggia più di 3 volte in un secondo, salvo restare sotto le soglie di lampo (2.3.1, A).
- Focus da tastiera visibile (2.4.7, AA) e mai coperto del tutto da contenuti come le barre fisse (2.4.11, AA; una soluzione tecnica: `scroll-padding` pari all'altezza della barra). Obiettivo AAA (2.4.13): indicatore grande almeno quanto un contorno di 2 px CSS, con contrasto ≥ 3:1 tra stato con e senza focus.

## 5. Durate e curve
- Apple non dà durate: la pagina Motion non ha millisecondi. Anche sul web nessuna fonte ufficiale le fissa. Scegli poche durate e curve per ruolo (entrata, uscita, cambio sul posto) e scrivile in `DESIGN.md` con il motivo: sono scelte di progetto.
- Base facoltativa, da dichiarare "da Material": 16 durate da 50 a 1000 ms (short 50–200, medium 250–400, long 450–600, extra-long 700–1000 ms). Curve per CSS (valori web, uguali in Compose): standard `cubic-bezier(0.2, 0, 0, 1)`, standard-decelerate `(0, 0, 0, 1)`, standard-accelerate `(0.3, 0, 1, 1)`, emphasized-decelerate `(0.05, 0.7, 0.1, 1)`, emphasized-accelerate `(0.3, 0, 0.8, 0.15)`. Solo MDC Android usa altri valori per le curve emphasized. Le curve "legacy" sono probabilmente di Material 2 (non verificato): non presentarle come Material 3.
- Molle di Material (Android): standard con smorzamento 0,9 (un piccolo rimbalzo), espressive 0,6–0,8 (più rimbalzo), 1 per gli effetti di colore e opacità.

## 6. Non letto o non verificato
- m3.material.io (quando usare ogni durata e curva) non è raggiungibile: i valori vengono dai token ufficiali su GitHub.
- Supporto dei browser per View Transitions e `@starting-style`; i limiti di 0,1, 1 e 10 secondi per i tempi di risposta (Nielsen); la durata "short" di sistema di Android: non verificati.
- Nessuna animazione è stata guardata in movimento: tutto viene da testi letti.

## Fonti (lette il 17–18/10/2026)
- Apple HIG: [Motion](https://developer.apple.com/design/human-interface-guidelines/motion), [Loading](https://developer.apple.com/design/human-interface-guidelines/loading), [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility), lette dal loro JSON ufficiale.
- W3C, WCAG 2.2, dal repository w3c/wcag: 2.2.2, 2.3.1, 2.3.3 con la definizione di "motion animation", 2.4.7, 2.4.11, 2.4.13, 4.1.3.
- W3C, bozze in w3c/csswg-drafts: Media Queries 5 (`prefers-reduced-motion`, Working Draft) e Media Queries 4 (`hover`). MDN, `prefers-reduced-motion`.
- Material: token di movimento di material-web (v0.192) e di Material Components Android (34.0.0); Compose Material 3 (`MotionTokens`, androidx).
