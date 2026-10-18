# Analisi: ingegnerizzare il progetto prima di disegnarlo

Leggi questo file all'inizio di un progetto nuovo o di una parte nuova e grande (modalità crea, passo 1). Nasce da una richiesta dell'utente: "non produrlo tutto insieme subito ma capire gli stakeholders, individuare le necessità, le cose piu importanti, le cose da marginare, ecc insomma ingegnerizzare e organizzare a pezzi ponenndosi le giuste domande".

**Proporzione.** Per un componente o una schermata sola bastano poche righe: chi la usa, a cosa serve, quali stati ha. Per un sito o un'app interi fai tutti i passi. Per piccole modifiche a un progetto avviato, segui il piano già scritto in `DESIGN.md`.

## 1. Stakeholder
Chi ha un interesse nel progetto, non solo chi lo usa:

| Chi | Per esempio | Cosa chiedersi |
|---|---|---|
| Utenti finali | i diversi gruppi di chi lo usa | età, familiarità con il digitale, conoscenza del tema, contesto d'uso (dove, quando, con quanta fretta) |
| Committente | il proprietario, il cliente | a cosa serve il progetto, come si capisce che funziona, vincoli di brand |
| Chi gestisce i contenuti | chi aggiorna testi, foto, prezzi, orari | quanto spesso, con quali competenze: il design deve reggere contenuti veri che cambiano |
| Chi sviluppa e mantiene | l'utente, un team | tecnologia, tempi, cosa costa fatica fare e mantenere |
| Vincoli esterni | norme, accessibilità, piattaforme | WCAG, linee guida iOS e Android, privacy |

Per ognuno scrivi in una riga cosa vuole. Se due stakeholder vogliono cose in conflitto, dillo all'utente: la decisione è sua.

## 2. Necessità e compiti
Elenca ciò che le persone devono riuscire a fare, come verbo più oggetto ("prenotare un tavolo", "trovare gli orari", "aggiornare il menu"), non come pagine. Le pagine vengono dopo e nascono dai compiti.

## 3. Priorità
Ogni compito prende un livello:
- **essenziale**: senza, il prodotto non serve al suo scopo;
- **importante**: lo migliora molto, ma può arrivare dopo;
- **marginale**: utile a pochi o di rado: si rimanda, si sposta un passaggio più in là o si toglie;
- **fuori**: non si fa ora, e si scrive perché.

È una versione semplificata del metodo MoSCoW. Le priorità decidono la gerarchia visiva: ciò che è essenziale si vede e si raggiunge per primo, ciò che è marginale non gli fa concorrenza.

## 4. Le domande giuste
Una domanda è giusta se la risposta cambia il design. Prima di farla, chiediti: "Se la risposta fosse diversa, disegnerei in un altro modo?" Se no, non chiederla: scegli tu e dichiaralo.
- Raggruppa le domande in un solo messaggio, ognuna con la risposta che consigli.
- Esempi di domande giuste: "Chi aggiorna il menu, e quanto spesso?" decide se il menu è un testo modificabile o un'immagine. "Ci sono foto vere (prodotti, luogo, persone), e chi può scattarle?" decide se il layout ha gli spazi per le foto, segnaposto dichiarati o un design tipografico (`riferimenti/immagini.md`).
- Esempio di domanda sbagliata: "Che colore preferisci?" prima delle direzioni. Il colore lo propongono le direzioni.

## 5. Piano a pezzi
Scomponi il lavoro in pezzi piccoli, ognuno da consegnare e giudicare da solo, in ordine di priorità. Un ordine tipico:
1. **Mappa**: schermate o pagine e navigazione, ricavate dai compiti (`riferimenti/fondamenta.md` §5).
2. **Flusso essenziale**: i passi del compito più importante, anche solo come struttura.
3. **Direzioni e fondamenta** (passi 2 e 3 del flusso di creazione), sul pezzo più importante. Mappa e flusso essenziale vengono prima perché sono struttura; le direzioni decidono l'aspetto.
4. **Schermate essenziali**, una alla volta, ognuna con tutti i suoi stati.
5. **Schermate e funzioni importanti.**
6. **Ciò che è marginale**, solo se resta tempo e serve.

Scrivi il piano in `DESIGN.md`, sezione "Piano a pezzi", e fallo approvare all'utente prima di disegnare. Dopo ogni pezzo: rifinitura (`processo/rifinitura.md`), verifica rapida, consegna e feedback, poi il pezzo successivo. Ogni consegna è un'occasione di feedback, quindi di apprendimento (`processo/evoluzione.md`).

## 6. Cosa scrivere
- In `DESIGN.md`: Brief (con il tipo di progetto e le immagini: ci sono foto vere? chi le fornisce?), Analisi (stakeholder, compiti con priorità) e Piano a pezzi, con lo stato di ogni pezzo. Così una sessione nuova riprende dal punto giusto.
- Nel registro del progetto (`memoria/registro/`, sezione "Analisi · domande e risposte"): le domande fatte, la risposta che consigliavi e le parole dell'utente.
