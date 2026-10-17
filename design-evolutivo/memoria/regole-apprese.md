# Regole apprese
Versione v0 · 2026-10-16 · si legge all'inizio di ogni lavoro di design · massimo 40 regole: oltre, consolida.
Formato: `R-NNN · livello · ambito · regola · Controllo: … · Da: … · Perché: …` (livelli e ambiti in `processo/evoluzione.md` §6–7)

## Lezioni di processo
(nessuna: nascono nel consolidamento quando 3 o più classi d'errore hanno la stessa causa)

## Regole attive
R-001 · L5 · sempre · Niente emoji usate come icone di interfaccia: usa un set di icone coerente (SVG) o il testo. · Controllo: cerca nei file di markup e dei componenti il pattern `[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]` e guarda ogni risultato; su una pagina aperta nel browser, il campo `emoji` di `strumenti/misura-pagina.js`. · Da: proposta di Claude approvata dall'utente (2026-10-16) · Perché: segno tipico di interfaccia generata.
R-002 · L3 · sempre · Niente gradienti viola o blu-viola come sfondo o decorazione. · Controllo: elenca i gradienti usati e i loro colori; una tinta tra ~260° e ~300° è una violazione (su una pagina aperta: campo `gradienti` di `misura-pagina.js`). · Da: idem · Perché: idem.
R-003 · L3 · sempre · Niente griglie di card identiche con ombra (3 o più card uguali con `box-shadow` in fila) come soluzione predefinita. · Controllo: conta i gruppi di card uguali con ombra; se ce n'è uno, giustificalo con il contenuto o cambia struttura (su una pagina aperta: campo `gruppiCardConOmbra`). · Da: idem · Perché: idem.

## Default da evitare (candidati: non attivi finché l'utente non li conferma)
- Hero centrato con titolo, sottotitolo e due pulsanti come prima idea.
- Tre colonne "icona + titolo + testo" per presentare le funzioni.
- Una sola famiglia neutra per tutto, senza un gesto tipografico.
- Raggi grandi (16–24 px) su ogni elemento e ombre morbide ovunque.
- Vetro sfocato e neon su fondo scuro usati come effetto.
- Testi generici ("Sblocca il tuo potenziale", "Soluzioni innovative") e testimonianze segnaposto.

## Ritirate
(nessuna)
