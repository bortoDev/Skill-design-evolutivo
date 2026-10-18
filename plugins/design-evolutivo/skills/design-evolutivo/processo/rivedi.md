# Rivedere un design

Leggi questo file quando l'utente chiede di rivedere, criticare o giudicare un design: suo, tuo o di altri; da codice, URL, screenshot o mockup.

## 1. Prima di iniziare
- Carica la memoria (`SKILL.md`, "Prima di ogni lavoro").
- Chiedi solo ciò che manca davvero: cos'è, per chi, su quale piattaforma, e che revisione vuole: **rapida** (i 5 punti più importanti), **completa**, **solo accessibilità**, **solo gusto**. Se non lo dice, fai la completa.
- Se il design l'hai fatto tu, valuta una revisione indipendente (§7).

## 2. Raccogli le prove
| Fonte | Come |
|---|---|
| Codice (HTML, CSS, JSX, Swift, Kotlin…) | leggi stili e markup; calcola i contrasti con `node strumenti/contrasto.mjs "#testo" "#sfondo"` (il percorso completo è in SKILL.md); esegui le ricerche (pattern) delle regole di livello L5 |
| Pagina o URL | `node strumenti/guarda.mjs <file o indirizzo>` (serve Playwright): foto a 375, 320, 1440, in tema scuro e sfocata, con le misure di `misura-pagina.js`. Senza, con un browser controllabile: `misura-pagina.js` a 1440×900 e a 375×812 dopo aver scorso la pagina, uno screenshot per larghezza, il menu aperto su mobile |
| Screenshot | descrivi ciò che vedi; niente misure inventate |
| Movimento e stati | in uno screenshot non si vedono: leggili nel codice (`transition`, `animation`, `prefers-reduced-motion`, `:focus-visible`, `:active`, `aria-live`); se hai un browser prova tocco, Tab e "riduci movimento"; altrimenti scrivi "movimento non osservato" |

Etichetta ogni prova: **misurato** (stili calcolati, calcolo) · **letto** (codice o testo della pagina) · **osservato** (screenshot) · **ipotesi**.
Lezioni dalle prime analisi:
- ciò che è nel codice non è per forza visibile: conta ciò che appare a schermo;
- animazioni d'ingresso e banner possono rendere uno screenshot bianco o scuro: scorri davvero e riprova, altrimenti dichiaralo;
- non accettare né rifiutare banner cookie.

## 3. Cinque lenti, in quest'ordine
1. **Fondamenta**: standard e linee guida di piattaforma (`processo/verifica.md` §1).
2. **Principi**: i 12 principi unificati, la percezione, l'automazione e l'architettura dell'informazione (`riferimenti/fondamenta.md` §2–5).
3. **Gusto dell'utente**: regole apprese, tendenze del profilo, default da evitare (`memoria/`). Se il profilo ha confidenza bassa, dichiaralo.
4. **Novità**, solo per lavori dell'utente o tuoi: somiglia ai default senza un motivo scritto? Ripete i progetti precedenti, anche nell'impronta? (`processo/direzioni.md` §6–7)
5. **Rifinitura**: le domande di `processo/rifinitura.md` §2–4, sulle foto della pagina se puoi farle.

## 4. Formato di ogni osservazione
`V-NN · gravità 0–4 (4 = catastrofico) · dove · cosa ho visto (prova) · perché (principio o regola) · correzione proposta · sforzo basso/medio/alto`

Numera le osservazioni in ordine, senza salti: l'utente le citerà per numero ("correggi V-02 e V-05").

Esempio: `V-03 · 3 · card dei servizi · testo #AAAAAA su bianco, 2,32:1 (misurato) · WCAG 1.4.3, sotto 4,5:1 · portalo a #6B6B6B (5,3:1) · basso`
- Gravità: scala di Nielsen (`riferimenti/fondamenta.md` §6); pesa frequenza, impatto e persistenza.
- Perché: cita sempre la fonte: U1–U12 (con N, S o Norman), criterio WCAG, linea guida di piattaforma o regola R-…
- Annota a parte anche i **punti di forza**: cosa funziona e perché. Sono rinforzi e, nei siti di altri, possibili semi.

## 5. Il rapporto
1. Giudizio in due righe e i **3 interventi** con più effetto per meno sforzo.
2. Osservazioni per gravità, dalla 4 alla 1, raggruppate per lente.
3. Punti di forza.
4. Se richiesta, la scheda di `processo/valuta.md`.
5. Chiudi con: "Quali correggo?" La risposta porta a `processo/migliora.md`.

Un rapporto lungo va salvato nel progetto: `revisioni/AAAA-MM-GG-<oggetto>.md`. Nel registro del progetto (`memoria/registro/`) annota la revisione: data, oggetto, numero di osservazioni per gravità.

## 6. Anche il critico impara
Le reazioni dell'utente alle osservazioni sono feedback (`processo/evoluzione.md` §4):

| Reazione | Cosa significa | Cosa diventa |
|---|---|---|
| "giusto", "correggilo" | accordo | rinforzo della regola o del principio usato |
| "non è un problema", "mi piace così" | il critico non conosce ancora questo gusto | contro-esempio della classe o eccezione; alla seconda volta, regola ristretta o "non segnalare…" |
| "manca…", "non hai visto…" | il critico non l'ha visto | occorrenza o nuova classe nel catalogo, con la nota "non rilevato in revisione" |

Metrica: **accordo** = osservazioni accettate ÷ osservazioni proposte. Va nel diario a ogni consolidamento. Se sale, il critico sta imparando il gusto dell'utente: è come un modello di ricompensa che impara a prevedere il suo giudizio.

## 7. Revisione indipendente (facoltativa)
Chi ha creato un design tende a giudicarlo con indulgenza. Per rivedere un tuo lavoro in modo più neutrale, affida la revisione a un subagente che non ha visto la conversazione. Il subagente non legge `SKILL.md`, quindi passagli i percorsi completi:
- i file del progetto e il suo `DESIGN.md`;
- la cartella della memoria, con il percorso assoluto (quello di `SKILL.md`; `node strumenti/memoria.mjs dove` lo stampa): "memoria/" da solo non gli dice dove cercare;
- questo file, `processo/verifica.md`, `processo/rifinitura.md` e `riferimenti/fondamenta.md`, con il percorso completo della cartella della skill.

Digli che **legge soltanto**: non scrive in memoria né nel progetto. Il rapporto torna a te: lo mostri all'utente e le sue reazioni le registri tu (§6). Costa di più: proponila a fine progetto o su richiesta.
