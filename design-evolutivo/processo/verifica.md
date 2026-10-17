# Verifica prima di consegnare

Leggi questo file prima di ogni consegna di design: schermata, componente, pagina o direzione realizzata. È la versione rapida della modalità rivedi (`processo/rivedi.md`). Calcola i valori misurabili invece di stimarli: `node strumenti/contrasto.mjs <testo> <sfondo>` per i contrasti, `strumenti/misura-pagina.js` se puoi aprire la pagina in un browser.

## 1. Fondamenta (sempre)
| Controllo | Soglia | Fonte |
|---|---|---|
| Contrasto del testo | ≥ 4,5:1; testo grande (≥ 24 px, o ≥ 18,7 px in grassetto) ≥ 3:1 | WCAG 2.2, 1.4.3 (AA) |
| Area toccabile, web | ≥ 24×24 px CSS, salvo le eccezioni del criterio (spaziatura sufficiente, link dentro una frase…) | WCAG 2.2, 2.5.8 (AA) |
| Area toccabile, app | iOS: 44×44 pt predefinito, 28×28 pt minimo · Android: ≥ 48×48 dp | `riferimenti/app-mobile.md` |
| Riflusso | nessuno scorrimento orizzontale a 320 px CSS | WCAG 2.2, 1.4.10 (AA) |
| Zoom | non bloccato (niente `maximum-scale=1` né `user-scalable=no`) | collegato a WCAG 1.4.4 |
| Testo lungo | ≤ 80 caratteri per riga; interlinea ≥ 1,5 | WCAG 2.2, 1.4.8 (AAA: obiettivo, non obbligo) |
| Testo nelle app | iOS: corpo 17 pt predefinito, minimo 11 pt · Android: testo in `sp`, prova al 200 % | `riferimenti/app-mobile.md` |
| Colore | l'informazione non passa solo dal colore | Apple HIG, Accessibility |
| Carico di memoria | gruppi di voci entro 7±2; il resto dietro "Altro" | Miller (euristica) |
| Principi | nessuna violazione evidente dei 12 principi unificati (U1–U12) | `riferimenti/fondamenta.md` §2 |

## 2. Regole apprese
1. Per ogni regola attiva in `memoria/regole-apprese.md` il cui ambito include questo progetto, esegui il controllo:
   - L5: esegui la ricerca indicata sui file del progetto e guarda ogni risultato;
   - L4: verifica che i valori usati siano tra quelli ammessi in `DESIGN.md`;
   - L3 e L2: misura o rispondi alla domanda.
2. Applica le lezioni di processo in testa al file.
3. Osservazioni (L1) in `memoria/catalogo-errori.md`: per ognuna, guarda se i suoi segnali compaiono nel lavoro attuale. Nel registro scrivi quali hai controllato e con che esito, anche quando non trovi nulla o quando un caso rientra nel contro-esempio: è la prova che le osservazioni vengono usate.
4. Se trovi una violazione, correggila prima di consegnare e registrala nel registro come "intercettata in verifica": è la prova che l'apprendimento funziona.

## 3. Anti-ripetizione e anti-default
- Il risultato cambia almeno 1 gene rispetto all'ultimo progetto nel registro? (Salvo richiesta esplicita di continuità, come in un restyling leggero.)
- Ci sono segni da interfaccia generica? Confronta con la sezione "Default da evitare" di `regole-apprese.md`.

## 4. Cosa dire all'utente
Una riga, ad esempio: "Verifica: fondamenta ok · 7 regole controllate · corretti 2 punti prima di consegnarti (R-003, R-007)." Se qualcosa non si poteva verificare (contrasto su una foto, prestazioni), dillo.
