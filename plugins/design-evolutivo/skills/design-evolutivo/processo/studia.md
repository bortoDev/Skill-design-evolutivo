# Studiare un riferimento

Leggi questo file quando l'utente condivide un sito, un'app o uno screenshot che gli piace e vuole impararne qualcosa, o chiede di aggiungerlo agli esempi. È il metodo usato per i primi 8 siti, reso ripetibile.

1. **Misura**, se hai un browser: a 1440×900 e a 375×812, con `strumenti/misura-pagina.js`, dopo aver scorso la pagina. Uno screenshot per larghezza; apri il menu su mobile. Senza browser lavora su screenshot e testo, e dichiaralo.
2. **Scrivi la scheda** in `riferimenti/esempi/<nome>.md` con la struttura delle schede esistenti: Misurato · Struttura · Regole che illustra · Punti deboli · Mobile · Da non copiare. Calcola i contrasti con `strumenti/contrasto.mjs`.
3. **Aggiorna l'indice** `riferimenti/esempi/00-indice.md`: tabelle di confronto desktop e mobile, e righe "regola → esempi".
4. **Estrai 2–4 semi** (geni da incrociare, con il sito come origine) in `memoria/semi.md`, sezione "Dai riferimenti".
5. **Profilo**: aggiungi prove alle tendenze solo se la scheda le conferma, come segnale debole (è ciò che piace all'utente negli altri, non ancora nei suoi progetti).
6. **Chiedi all'utente cosa gli piace di più** del sito. La sua risposta vale più della tua analisi: registrala come idea e trasformala in seme.

## Errori da non ripetere (dall'analisi dei primi 8 siti)
- Ciò che è nel codice non è per forza visibile: conta le voci di menu a schermo, non nel markup (caso okomedia: 8 voci visibili, circa 16 nel codice).
- Animazioni d'ingresso e banner possono rendere uno screenshot bianco o scuro: scorri davvero e riprova; se non basta, dichiaralo non valutabile.
- Non accettare né rifiutare banner cookie; se un tocco ne apre uno, dillo.
- Separa misurato, letto, osservato e ipotesi; scrivi "non verificato" quando lo è.
- Le soglie di piattaforma (44 pt, 48 dp…) si citano solo dalle fonti lette (`riferimenti/app-mobile.md`).
- Una pagina può reindirizzare da sola: controlla l'indirizzo finale (caso Duca Pipe).
- In emulazione mobile la larghezza della finestra può crescere fino al contenuto: lo scorrimento orizzontale si controlla con la larghezza visibile, come fa `misura-pagina.js`.
