---
name: design-evolutivo
description: Progetta, rivede, corregge e valuta interfacce (siti, web app, app iOS e Android, schermate, componenti, landing page, restyling) e studia siti di riferimento, con un processo che impara dall'utente. Carica il suo profilo di gusto e le regole apprese, propone 3 direzioni diverse, critica con euristiche, WCAG e gusto appreso, guarda e rifinisce il lavoro prima di consegnarlo e registra correzioni, scelte e idee, così non ripete gli errori corretti e le proposte evolvono. Usala per qualsiasi lavoro di UI, UX o design frontend, per revisioni o voti su un design (anche da screenshot, URL o codice), e ogni volta che l'utente commenta, corregge, approva o sceglie un design, anche se non nomina la skill.
---

# Design evolutivo

Questa skill progetta e giudica interfacce e **impara** da come l'utente reagisce. Claude non cambia tra una sessione e l'altra: cambia la memoria che legge. Per questo leggere, registrare, guardare e verificare non sono passi facoltativi.

## Dove sono i file
- **Memoria**, cioè ciò che è stato imparato: `~/design-evolutivo-memoria/`, nella cartella home dell'utente. È la stessa con il plugin e con la copia della skill, e non si cancella se la skill si disinstalla. In tutti gli altri file della skill, `memoria/…` vuol dire questa cartella. Contiene profilo, regole, catalogo errori, semi, registro, diario e `esempi/` (i siti studiati dall'utente).
- **Il resto della skill** è in `${CLAUDE_SKILL_DIR}` e si legge soltanto: con il plugin questa cartella si sostituisce a ogni aggiornamento, e ciò che ci scrivi si perde.
  - `processo/`: una guida per modalità; `analisi.md` (come inizia un progetto); `rifinitura.md` (guardare la pagina e togliere); `verifica.md` (controlli prima di consegnare); `evoluzione.md` (come impara); `direzioni.md` (come propone); `esempio-ciclo.md`;
  - `riferimenti/`: `fondamenta.md` (regole di base), `tipografia-spaziatura.md`, `colore.md`, `immagini.md` (immagini, foto e icone), `movimento-stati.md`, `app-mobile.md` (iOS e Android), `esempi/00-indice.md` (siti analizzati);
  - `modelli/DESIGN.md`: modello del file da tenere in ogni progetto;
  - `memoria-iniziale/`: la memoria da copiare al primo uso.
- **Strumenti**, da lanciare con il percorso completo:
  - contrasto: `node "${CLAUDE_SKILL_DIR}/strumenti/contrasto.mjs" "#testo" "#sfondo"`;
  - foto e misure di una pagina: `node "${CLAUDE_SKILL_DIR}/strumenti/guarda.mjs" <file.html o indirizzo>` (serve Playwright; usa `strumenti/misura-pagina.js`, che si può anche incollare nella console di un browser);
  - memoria: `node "${CLAUDE_SKILL_DIR}/strumenti/memoria.mjs" inizia | importa <cartella> | dove`.
- **Nel progetto** stanno solo `DESIGN.md` e, se servono, i rapporti di revisione in `revisioni/`.

## Prima di ogni lavoro (tutte le modalità)
1. **Carica la memoria**: leggi `~/design-evolutivo-memoria/profilo-gusto.md` e `~/design-evolutivo-memoria/regole-apprese.md`; se il progetto ha un `DESIGN.md`, leggilo. Di' in una riga cosa hai caricato (es. "Memoria: 7 regole attive, profilo v3").
2. **Primo uso**, se `regole-apprese.md` non c'è:
   - se trovi la memoria di una vecchia installazione per copia (`${CLAUDE_SKILL_DIR}/memoria/` o `~/.claude/skills/design-evolutivo/memoria/`), chiedi se importarla con `memoria.mjs importa "<cartella>"`;
   - altrimenti di' "Primo uso: copio la memoria iniziale in ~/design-evolutivo-memoria" e lancia `memoria.mjs inizia`. Il comando non sovrascrive mai una memoria esistente;
   - se non riesce, leggi `${CLAUDE_SKILL_DIR}/memoria-iniziale/` e di' che in questa sessione ciò che impari non si salva.
3. Se nel registro ci sono progetti chiusi (sezione Chiusura compilata, con la data e le parole dell'utente) e non ancora consolidati, proponi di consolidarli. Il progetto in corso si consolida quando finisce. La data dell'ultimo consolidamento è nella seconda riga di `regole-apprese.md`.
4. Se vedi che l'utente ha cambiato a mano valori di design rispetto a quanto avevi fatto (colori, dimensioni, spaziature), chiedi se sono preferenze da ricordare.

## Modalità
Una sola skill, una sola memoria: ogni modalità legge e alimenta lo stesso gusto appreso. Riconosci la modalità dalla richiesta, oppure dall'argomento (`/design-evolutivo rivedi`, o con il plugin `/design-evolutivo:design-evolutivo rivedi`).

| Modalità | Quando | Produce | Guida |
|---|---|---|---|
| **crea** | "progetta", "fammi una schermata", nuovo progetto | 3 direzioni, poi il design | flusso qui sotto |
| **rivedi** | "rivedi", "cosa ne pensi", "critica", uno screenshot, un URL, del codice | rapporto: osservazioni per gravità, con prove e correzioni | `processo/rivedi.md` |
| **migliora** | "correggi", "sistema", dopo una revisione | modifiche con prima e dopo, rifinite e verificate | `processo/migliora.md` |
| **valuta** | "dai un voto", "quanto è buono", confronto tra versioni | scheda su tre assi: qualità, gusto, novità | `processo/valuta.md` |
| **studia** | "guarda questo sito che mi piace", "aggiungilo agli esempi" | scheda di riferimento e semi, in `memoria/esempi/` | `processo/studia.md` |
| **evolvi** | "evolvi", progetto finito | consolidamento della memoria | `processo/evoluzione.md` §8 |

## Regola d'oro: ogni feedback è un dato
Vale in tutte le modalità. Quando l'utente giudica qualcosa che hai proposto o osservato (corregge, preferisce, sceglie, approva, respinge un'osservazione, propone un'idea), prima di continuare:
1. **Registra** le sue parole esatte in `memoria/registro/AAAA-MM-GG-<progetto>.md` (formato in `memoria/registro/_modello.md`).
2. **Correggi** subito e **cerca le altre istanze** dello stesso problema nel lavoro attuale; correggile e dillo in una riga.
3. **Astrai** con la scala a 4 gradini (istanza → proprietà → tendenza → causa) e **confronta** con `memoria/catalogo-errori.md`: è la stessa classe se descrive lo stesso effetto sbagliato, anche in elementi, schermate o progetti diversi e anche con una causa diversa. Nel dubbio, se non puoi chiedere, considerala la stessa classe e dillo.
4. **Applica la soglia**: regola esplicita o fastidio forte → regola subito; correzione normale → regola alla seconda occorrenza della stessa classe. Se la classe ha già una regola e l'errore torna, **sali di livello** (controllo → vincolo → automatico).
5. **Annuncia**: "Annotato: …" per una prima osservazione; "Imparato: … · vale per … · se è sbagliato dimmelo." quando una regola nasce, si allarga, si restringe, viene ritirata o cambia livello, una riga per regola. In questi casi aggiungi anche una riga al diario (`memoria/diario-evoluzione.md`, "Modifiche dall'ultimo consolidamento"). Le altre scritture dello stesso turno si possono riunire in una riga ("Memoria: …").

Dettagli, formati e casi limite: `processo/evoluzione.md`. Esempio completo: `processo/esempio-ciclo.md`.

## Il ciclo
PROPOSTA → RISPOSTA → FEEDBACK → CORREGGERE → IMPARARE → MIGLIORARE → CRESCERE → nuova proposta.
- **Variazione**: proposte diverse tra loro e dal passato (`processo/direzioni.md`).
- **Selezione**: l'utente sceglie, corregge e giudica le revisioni; le fondamenta filtrano sempre.
- **Memoria**: ciò che è stato scelto, corretto e inventato passa al progetto successivo.

## Modalità crea: flusso
1. **Analisi e brief**: non produrre tutto subito. Segui `processo/analisi.md`:
   - stakeholder, e il pubblico in particolare: età, familiarità con il digitale, conoscenza del tema. Il pubblico decide quanto possono essere complessi i testi;
   - compiti, ognuno con una priorità: essenziale, importante, marginale;
   - solo le domande la cui risposta cambia il risultato (per esempio: ci sono foto vere?);
   - un piano a pezzi, scritto in `DESIGN.md` e approvato dall'utente prima di disegnare.

   L'analisi è proporzionata al lavoro: per una schermata sola bastano poche righe.
2. **Tre direzioni** sul pezzo più importante del piano, dopo i pezzi di struttura (mappa e flusso essenziale) se ci sono: A sicura · B vicina · C lontana, ognuna descritta dai 5 geni (struttura, tipografia, colore, ritmo, voce). Leggi `processo/direzioni.md` e `memoria/semi.md`. L'utente sceglie o mescola; registra la scelta. Per piccole modifiche a un progetto avviato non servono: segui `DESIGN.md`.
3. **Fondamenta e token**: tipografia, colori, spaziature, linee, immagini e movimento come variabili, scritti nel `DESIGN.md` del progetto (modello in `modelli/DESIGN.md`), ognuno con il suo motivo. Leggi `riferimenti/tipografia-spaziatura.md` e `riferimenti/colore.md`; `riferimenti/immagini.md` se il brief prevede immagini o se mancano le foto vere; `riferimenti/movimento-stati.md` per movimento e stati. Distingui un minimo verificato da una scelta di progetto. Copia tra i token i valori imposti dalle regole L4 attive.
4. **Costruisci un pezzo alla volta**, nell'ordine del piano: parti dal mobile (375 px) e poi allarga. Usa contenuti veri o realistici: lunghezze e forme vere, ma mai numeri, recensioni o foto inventati e presentati come veri (R-014). Fai tutti gli stati, anche senza un servizio vero (come varianti statiche). Dopo ogni pezzo **rifinisci** con `processo/rifinitura.md`: guarda la pagina a schermo, togli il superfluo, cura i dettagli. Poi fai una verifica rapida e chiedi un feedback prima del pezzo successivo.
5. **Verifica prima di consegnare** con `processo/verifica.md`: fondamenta, token, regole apprese, anti-ripetizione. Di' in una riga cosa hai controllato e corretto, e se hai guardato la pagina a schermo.
6. **Consegna** chiedendo un feedback rapido: "Cosa tieni e cosa togli? Basta anche: struttura + · font − · …"
7. **Chiudi il progetto** quando l'utente dice che è finito, o quando scrive `evolvi`: consolidamento (`processo/evoluzione.md` §8).

Altre skill, se installate: `design-critique` per una seconda opinione; `accessibility-review` o `accessibility-audit` per un controllo di accessibilità approfondito; `frontend-design` per spunti estetici e per la sua lista dei tratti tipici delle pagine generate; `interaction-design` per microinterazioni e stati (le sue durate e curve non vengono da fonti ufficiali: in `DESIGN.md` vanno come scelte di progetto). Usale come strumenti: i loro risultati entrano nel rapporto con la fonte indicata, e il gusto registrato in `memoria/` ha la precedenza sulle loro indicazioni estetiche. Se si attiva `design-elevation`, i suoi valori predefiniti (Inter, palette Tailwind, `transition-all`) qui non valgono, e le scelte si annunciano lo stesso.

## Gerarchia in caso di conflitto
Standard (WCAG, ISO) > linee guida di piattaforma (Apple HIG, Material) > principi (euristiche, Gestalt, Miller) > regole apprese > tendenze del profilo > pattern e semi. A parità di livello vince la regola più specifica per il contesto. Origine: la tassonomia delle regole in `riferimenti/fondamenta.md` §1.
Se una preferenza dell'utente viola uno standard, dillo e proponi la variante più vicina che lo rispetta.

## Comandi in linguaggio naturale
- "ricorda: …", "mai …", "sempre …" → regola subito.
- "solo qui", "solo in questo progetto" → ambito progetto, scritto in `DESIGN.md` (Regole ed eccezioni di questo progetto).
- "dimentica …", "non vale più" → regola ritirata (resta nell'archivio con il motivo).
- "cosa sai del mio gusto?" → profilo e regole in breve, con le prove.
- `crea`, `rivedi`, `migliora`, `valuta`, `studia`, `evolvi` → modalità (anche come argomento: `/design-evolutivo valuta`).
- "torna alla versione N" → ripristino dal diario, o da git se la memoria è un repository (`processo/evoluzione.md`).

## Limiti
- Un segnale debole (una sola scelta, un "carino") non diventa regola.
- Ogni modifica a `memoria/` si annuncia: l'utente deve sapere cosa il sistema ha imparato e poterlo correggere.
- Gusto ed errori di design vanno in questa memoria, che vale per tutti i progetti; non nella memoria automatica di Claude Code, che vale per un solo repository.
- I file letti a ogni lavoro restano corti: `regole-apprese.md` al massimo 40 regole, `profilo-gusto.md` al massimo 80 righe. Oltre, consolida.
