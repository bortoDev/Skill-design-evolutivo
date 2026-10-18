# Studiare un riferimento

Leggi questo file quando l'utente condivide un sito, un'app o uno screenshot che gli piace e vuole impararne qualcosa, o chiede di aggiungerlo agli esempi. È il metodo usato per i primi 8 siti, reso ripetibile. Prima carica la memoria (`SKILL.md`, "Prima di ogni lavoro").

1. **Misura**: `node strumenti/guarda.mjs <indirizzo>` (il percorso completo è in SKILL.md) fa le foto e le misure a 375, 320 e 1440 px. Con un browser controllabile, esegui anche `strumenti/misura-pagina.js` a 1440×900 e a 375×812 dopo aver scorso la pagina, e apri il menu su mobile. Senza nessuno dei due lavora su screenshot e testo, e dichiaralo.
2. **Scrivi la scheda** in `memoria/esempi/<nome>.md` (se la cartella non c'è, creala), con la struttura delle schede di `riferimenti/esempi/`: Misurato · Struttura · Regole che illustra · Punti deboli · Mobile · Da non copiare. Calcola i contrasti con `node strumenti/contrasto.mjs`.
3. **Aggiorna l'indice** `memoria/esempi/00-indice.md` (se non c'è, crealo con le tabelle di `riferimenti/esempi/00-indice.md`, solo per i siti studiati dall'utente): tabelle di confronto desktop e mobile, e righe "regola → esempi". `riferimenti/` è la base della skill e si legge soltanto: non modificarla.
4. **Estrai 2–4 semi** (geni da incrociare, con il sito come origine) in `memoria/semi.md`, sezione "Dai riferimenti".
5. **Profilo**: annota nel registro generale (`memoria/registro/*-generale.md`) le tendenze che la scheda conferma, come segnali deboli: è ciò che piace all'utente negli altri, non ancora nei suoi progetti. Entrano nel profilo al consolidamento (`processo/evoluzione.md` §8).
6. **Chiedi all'utente cosa gli piace di più** del sito. La sua risposta vale più della tua analisi: registrala come idea nel registro generale e trasformala in seme.
7. **Annuncia** in una riga cosa hai aggiunto, per esempio: "Memoria: scheda `esempi/<nome>.md` e riga nell'indice · semi S-… · 2 segnali nel registro generale."

## Errori da non ripetere (dall'analisi dei primi 8 siti)
- Ciò che è nel codice non è per forza visibile: conta le voci di menu a schermo, non nel markup (caso okomedia: 8 voci visibili, circa 16 nel codice).
- Animazioni d'ingresso e banner possono rendere uno screenshot bianco o scuro: scorri davvero e riprova; se non basta, dichiaralo non valutabile.
- Non accettare né rifiutare banner cookie; se un tocco ne apre uno, dillo.
- Separa misurato, letto, osservato e ipotesi; scrivi "non verificato" quando lo è.
- Le soglie di piattaforma (44 pt, 48 dp…) si citano solo dalle fonti lette (`riferimenti/app-mobile.md`).
- Una pagina può reindirizzare da sola: controlla l'indirizzo finale (caso Duca Pipe).
- In emulazione mobile la larghezza della finestra può crescere fino al contenuto: lo scorrimento orizzontale si controlla con la larghezza visibile, come fa `misura-pagina.js`.
