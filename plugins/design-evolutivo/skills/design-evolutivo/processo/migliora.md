# Migliorare un design dopo una revisione

Leggi questo file quando l'utente chiede di correggere, sistemare o migliorare un design, di solito dopo una revisione ("correggi V-02 e V-05", "sistema i problemi gravi"). Prima carica la memoria (`SKILL.md`, "Prima di ogni lavoro").

1. **Scegli cosa toccare.** Le osservazioni indicate dall'utente; se dice "le gravi", quelle di gravità 3 e 4; se dice "sistema tutto", tutte, comprese quelle di gravità 1 (estetiche). Non toccare ciò che ha respinto.
2. **Proteggi l'identità.** Lavora dentro i token di `DESIGN.md`. Se una correzione richiede un valore nuovo (per esempio un grigio più scuro per il contrasto), aggiorna `DESIGN.md` e dillo. Se un progetto dell'utente non ha `DESIGN.md`, ricava dal codice i valori in uso (caratteri, corpi, colori, spazi, raggi, durate), crea `DESIGN.md` con le sole sezioni Token e Movimento e stati (durate e curve in uso), dal modello in `modelli/DESIGN.md`, e dillo in una riga.
3. **Correggi e cerca le sorelle.** Per ogni correzione annota il valore prima e dopo, e cerca lo stesso problema altrove (`processo/evoluzione.md` §5).
4. **Non allargare il lavoro.** Niente restyling non richiesto. Se una correzione richiede di cambiare direzione, chiedi prima.
5. **Rifinisci e verifica.** Applica `processo/rifinitura.md` (guarda la pagina, togli, cura i dettagli) e poi `processo/verifica.md`. Qui rifinitura e verifica guardano le parti che hai toccato: ciò che toglieresti o correggeresti altrove lo proponi in una riga, senza farlo (passo 4). Dove puoi, rimisura: contrasti con `node strumenti/contrasto.mjs`, foto e misure con `node strumenti/guarda.mjs` (il percorso completo è in SKILL.md). Se c'era una scheda di valutazione, rifalla e mostra la differenza.
6. **Registra** nel registro del progetto le osservazioni corrette, respinte e rimandate. Quelle respinte sono dati per l'apprendimento.
7. **Design di altri** (un sito che non è dell'utente): non modificare nulla; proponi le correzioni come codice o mockup separato.

Output: un elenco breve, una riga per correzione, e la riga della rifinitura.
`V-03 · contrasto del testo nelle card: 2,32:1 → 5,3:1 (#AAAAAA → #6B6B6B) · corretto anche nel footer (stesso problema)`
