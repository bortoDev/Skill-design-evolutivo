# Verifica prima di consegnare

Leggi questo file prima di ogni consegna di design: schermata, componente, pagina o direzione realizzata, dopo la rifinitura (`processo/rifinitura.md`). È la versione rapida della modalità rivedi (`processo/rivedi.md`). Calcola i valori misurabili invece di stimarli: `node strumenti/contrasto.mjs "#testo" "#sfondo"` per i contrasti, `node strumenti/guarda.mjs <file o indirizzo>` per foto e misure della pagina (il percorso completo è in SKILL.md).

## 1. Fondamenta (sempre)
| Controllo | Soglia | Fonte |
|---|---|---|
| Contrasto del testo | ≥ 4,5:1; testo grande (≥ 24 px, o ≥ 18,7 px in grassetto) ≥ 3:1 | WCAG 2.2, 1.4.3 (AA) |
| Contrasto dei componenti | bordi dei campi, contorni e stati dei controlli, focus, icone che servono a capire ≥ 3:1 con i colori vicini (esclusi i controlli disattivi) | WCAG 2.2, 1.4.11 (AA) |
| Area toccabile, web | ≥ 24×24 px CSS, salvo le eccezioni del criterio (spaziatura sufficiente, link dentro una frase…) | WCAG 2.2, 2.5.8 (AA) |
| Area toccabile, app | iOS: 44×44 pt predefinito, 28×28 pt minimo · Android: ≥ 48×48 dp | `riferimenti/app-mobile.md` |
| Focus | visibile su ogni elemento interattivo e mai coperto del tutto da barre fisse o banner (con una barra fissa: `scroll-padding` della sua altezza) | WCAG 2.2, 2.4.7 e 2.4.11 (AA) |
| Messaggi di stato | "fatto", "errore", "sto caricando" arrivano al lettore di schermo senza spostare il focus (`role="status"` o `aria-live`) | WCAG 2.2, 4.1.3 (AA) |
| Riflusso | nessuno scorrimento orizzontale a 320 px CSS | WCAG 2.2, 1.4.10 (AA) |
| Zoom | non bloccato (niente `maximum-scale=1` né `user-scalable=no`) | collegato a WCAG 1.4.4 |
| Testo lungo | ≤ 80 caratteri per riga; interlinea ≥ 1,5 | WCAG 2.2, 1.4.8 (AAA: obiettivo, non obbligo) |
| Spaziatura del testo | il layout regge interlinea 1,5, paragrafi 2, lettere 0,12 e parole 0,16 volte il corpo: niente altezze fisse né testo tagliato | WCAG 2.2, 1.4.12 (AA); `riferimenti/tipografia-spaziatura.md` |
| Testo nelle app | iOS: corpo 17 pt predefinito, minimo 11 pt · Android: testo in `sp`, prova al 200 % | `riferimenti/app-mobile.md` |
| Font caricati | ogni famiglia usata (campi `famiglie` o `stiliTesto` delle misure), salvo i font di sistema, compare in `fontCaricati` di `guarda.mjs`; se non c'è, la pagina mostra un font di riserva. `fontNonCaricati` elenca solo i file andati in errore. I pesi si controllano nel codice: ogni peso usato ha il suo file (`@font-face` o link), con `font-synthesis: none`. Un font di riserva simile è scritto nei token | processo; `riferimenti/tipografia-spaziatura.md` §6 |
| Colore | l'informazione non passa solo dal colore | WCAG 2.2, 1.4.1 (A); nelle app anche Apple HIG, Accessibility |
| Tema scuro | nelle app si segue il tema di sistema e i contrasti si ricalcolano anche in scuro (iOS: ≥ 4,5:1, per il testo piccolo puntare a 7:1); sul web, se c'è un tema scuro, idem | `riferimenti/app-mobile.md` |
| Immagini | testo alternativo per le immagini che informano, `alt=""` per le decorative; niente testo dentro le immagini, salvo i loghi | WCAG 2.2, 1.1.1 (A) e 1.4.5 (AA) |
| Pulsanti in evidenza | 1–2 per vista; la scelta preferita si distingue con lo stile, non con la dimensione | Apple HIG, Buttons (sul web: linea guida) |
| Carico di memoria | gruppi di voci entro 7±2; il resto raggruppato o a un passaggio in più. App: su iOS niente tab "Altro", su Android 3–5 destinazioni nella barra | Miller (euristica); `riferimenti/app-mobile.md` |
| Principi | nessuna violazione evidente dei 12 principi unificati (U1–U12) | `riferimenti/fondamenta.md` §2 |
| Guardata a schermo | foto guardate nella rifinitura, oppure "non guardata" dichiarato | `processo/rifinitura.md` |

## 2. Token e regole
1. **Token** (`DESIGN.md`): caratteri, corpi, pesi, colori, spazi, raggi, ombre e durate usati nel codice vengono dai token. Un valore fuori dai token si corregge, oppure si aggiunge ai token con il motivo. Cerca `transition`, `animation` e `@keyframes` (nelle app: `withAnimation`, `.animation(`, `.transition(` in SwiftUI; `animate…AsState`, `AnimatedVisibility` in Compose): ogni risultato è descritto in "Movimento e stati", ogni movimento descritto c'è nel codice, e con "riduci movimento" il codice fa ciò che c'è scritto. Le animazioni al caricamento sono quelle scritte in `DESIGN.md`, con il motivo.
2. Per ogni regola attiva in `memoria/regole-apprese.md` il cui ambito include questo progetto, e per ogni regola della sezione "Regole ed eccezioni di questo progetto" di `DESIGN.md` (nelle copie vecchie "Eccezioni locali"), esegui il controllo:
   - L5: esegui la ricerca indicata sui file del progetto e guarda ogni risultato;
   - L4: verifica che i valori usati siano tra quelli ammessi in `DESIGN.md`;
   - L3 e L2: esegui il Controllo scritto nella regola (misura, elenco, conteggio o domanda).
3. Applica le lezioni di processo in testa a `regole-apprese.md`.
4. Osservazioni (L1) in `memoria/catalogo-errori.md`: per ognuna, guarda se i suoi segnali compaiono nel lavoro attuale. Nel registro (sezione "Verifiche") scrivi quali hai controllato e con che esito, anche quando non trovi nulla o quando un caso rientra nel contro-esempio: è la prova che le osservazioni vengono usate.
5. Se trovi una violazione, correggila prima di consegnare e registrala nel registro come "intercettata in verifica": è la prova che l'apprendimento funziona.
6. Nei lavori che crei tu, correggi prima di consegnare anche i problemi di gravità 1, solo estetici (`riferimenti/fondamenta.md` §6): per questo utente la cura dei dettagli fa parte della qualità. In modalità migliora correggi solo ciò che l'utente ha scelto (`processo/migliora.md`, passo 1) ed elenca gli altri in una riga.

## 3. Anti-ripetizione e anti-default
- Il risultato cambia almeno 1 gene rispetto al progetto precedente (l'ultimo registro chiuso con un "Genoma scelto": non il progetto in corso né il registro generale) e ai riferimenti o semi da cui prende un gene? Un gene è diverso se cambia la scelta, non solo un valore o le parole. Salvo richiesta esplicita di continuità, come in un restyling leggero. Dentro lo stesso progetto le parti restano coerenti con `DESIGN.md`.
- **Impronta**: lo stesso controllo di `processo/direzioni.md` §6 (punto 2), fatto sul risultato costruito; un valore ripetuto ha il suo motivo in `DESIGN.md` (Decisioni), oppure si cambia.
- Ci sono segni da interfaccia generica? Confronta con "Default da evitare" di `regole-apprese.md`: si usano solo con un motivo scritto.

## 4. Cosa dire all'utente
Una riga, ad esempio: "Verifica: fondamenta ok · guardata a 375, 320 e 1440 px · 7 regole controllate · corretti 2 punti prima di consegnarti (R-003, R-007)." Se qualcosa non si poteva verificare (contrasto su una foto, prestazioni), dillo. Se non hai visto il movimento in un browser, scrivi "movimento letto nel codice, non visto".
