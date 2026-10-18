# Migliorare un design dopo una revisione

Leggi questo file quando l'utente chiede di correggere, sistemare o migliorare un design, di solito dopo una revisione ("correggi V-02 e V-05", "sistema i problemi gravi").

1. **Scegli cosa toccare.** Le osservazioni indicate dall'utente; se dice "le gravi", quelle di gravità 3 e 4. Non toccare ciò che ha respinto.
2. **Proteggi l'identità.** Lavora dentro i token di `DESIGN.md`. Se una correzione richiede un valore nuovo (per esempio un grigio più scuro per il contrasto), aggiorna `DESIGN.md` e dillo.
3. **Correggi e cerca le sorelle.** Per ogni correzione annota il valore prima e dopo, e cerca lo stesso problema altrove (`processo/evoluzione.md` §5).
4. **Non allargare il lavoro.** Niente restyling non richiesto. Se una correzione richiede di cambiare direzione, chiedi prima.
5. **Verifica.** Applica `processo/verifica.md`; dove puoi, rimisura (contrasti con `strumenti/contrasto.mjs`, pagina con `strumenti/misura-pagina.js`). Se c'era una scheda di valutazione, rifalla e mostra la differenza.
6. **Registra** nel registro del progetto le osservazioni corrette, respinte e rimandate. Quelle respinte sono dati per l'apprendimento.
7. **Design di altri** (un sito che non è dell'utente): non modificare nulla; proponi le correzioni come codice o mockup separato.

Output: un elenco breve, una riga per correzione.
`V-03 · contrasto del testo nelle card: 2,32:1 → 5,3:1 (#AAAAAA → #6B6B6B) · corretto anche nel footer (stesso problema)`
