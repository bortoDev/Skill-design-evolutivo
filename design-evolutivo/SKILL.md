---
name: design-evolutivo
description: Progetta, rivede, corregge e valuta interfacce (siti, web app, app iOS e Android, schermate, componenti, landing page, restyling) e studia siti di riferimento, con un processo che impara dall'utente. Carica il suo profilo di gusto e le regole apprese, propone 3 direzioni diverse, critica con euristiche, WCAG e gusto appreso, verifica prima di consegnare e registra correzioni, scelte e idee, così non ripete gli errori corretti e le proposte evolvono. Usala per qualsiasi lavoro di UI, UX o design frontend, per revisioni o voti su un design (anche da screenshot, URL o codice), e ogni volta che l'utente commenta, corregge, approva o sceglie un design, anche se non nomina la skill.
---

# Design evolutivo

Questa skill progetta e giudica interfacce e **impara** da come l'utente reagisce. Claude non cambia tra una sessione e l'altra: cambia la memoria che legge. Per questo leggere, registrare e verificare non sono passi facoltativi.

Cartelle, tutte dentro `${CLAUDE_SKILL_DIR}`: **mai** nella cartella del progetto, dove stanno solo `DESIGN.md` e, se servono, i rapporti di revisione in `revisioni/`.
- `memoria/`: ciò che è stato imparato (profilo, regole, errori, semi, registro, diario);
- `processo/`: le guide di ogni modalità, l'analisi iniziale (`analisi.md`), l'apprendimento (`evoluzione.md`), la verifica (`verifica.md`), un esempio completo (`esempio-ciclo.md`);
- `riferimenti/`: regole di base (`fondamenta.md`), siti analizzati (`esempi/00-indice.md`), app iOS e Android (`app-mobile.md`);
- `strumenti/`: `contrasto.mjs` (rapporto di contrasto: `node strumenti/contrasto.mjs <testo> <sfondo>`) e `misura-pagina.js` (misure di una pagina aperta in un browser);
- `modelli/DESIGN.md`: modello del file da tenere in ogni progetto.

## Modalità
Una sola skill, una sola memoria: ogni modalità legge e alimenta lo stesso gusto appreso. Riconosci la modalità dalla richiesta, oppure dall'argomento (`/design-evolutivo rivedi`).

| Modalità | Quando | Produce | Guida |
|---|---|---|---|
| **crea** | "progetta", "fammi una schermata", nuovo progetto | 3 direzioni, poi il design | flusso qui sotto |
| **rivedi** | "rivedi", "cosa ne pensi", "critica", uno screenshot, un URL, del codice | rapporto: osservazioni per gravità, con prove e correzioni | `processo/rivedi.md` |
| **migliora** | "correggi", "sistema", dopo una revisione | modifiche con prima e dopo, verificate | `processo/migliora.md` |
| **valuta** | "dai un voto", "quanto è buono", confronto tra versioni | scheda su tre assi: qualità, gusto, novità | `processo/valuta.md` |
| **studia** | "guarda questo sito che mi piace", "aggiungilo agli esempi" | scheda di riferimento e semi | `processo/studia.md` |
| **evolvi** | "evolvi", progetto finito | consolidamento della memoria | `processo/evoluzione.md` §8 |

## Regola d'oro: ogni feedback è un dato
Vale in tutte le modalità. Quando l'utente giudica qualcosa che hai proposto o osservato (corregge, preferisce, sceglie, approva, respinge un'osservazione, propone un'idea), prima di continuare:
1. **Registra** le sue parole esatte in `${CLAUDE_SKILL_DIR}/memoria/registro/AAAA-MM-GG-<progetto>.md` (formato in `memoria/registro/_modello.md`).
2. **Correggi** subito e **cerca le altre istanze** dello stesso problema nel lavoro attuale; correggile e dillo in una riga.
3. **Astrai** con la scala a 4 gradini (istanza → proprietà → tendenza → causa) e **confronta** con `memoria/catalogo-errori.md`: è la stessa classe se tendenza e causa coincidono, anche in elementi, schermate o progetti diversi.
4. **Applica la soglia**: regola esplicita o fastidio forte → regola subito; correzione normale → regola alla seconda occorrenza della stessa classe. Se la classe ha già una regola e l'errore torna, **sali di livello** (controllo → vincolo → automatico).
5. **Annuncia** in una riga: "Annotato: …" per una prima osservazione; "Imparato: … · vale per … · se è sbagliato dimmelo." quando nasce, si allarga o sale di livello una regola.

Dettagli, formati e casi limite: `processo/evoluzione.md`. Esempio completo: `processo/esempio-ciclo.md`.

## Il ciclo
PROPOSTA → RISPOSTA → FEEDBACK → CORREGGERE → IMPARARE → MIGLIORARE → CRESCERE → nuova proposta.
- **Variazione**: proposte diverse tra loro e dal passato (`processo/direzioni.md`).
- **Selezione**: l'utente sceglie, corregge e giudica le revisioni; le fondamenta filtrano sempre.
- **Memoria**: ciò che è stato scelto, corretto e inventato passa al progetto successivo.

## Modalità crea: flusso
0. **Carica la memoria** (in ogni modalità): leggi `${CLAUDE_SKILL_DIR}/memoria/profilo-gusto.md` e `${CLAUDE_SKILL_DIR}/memoria/regole-apprese.md`; se il progetto ha un `DESIGN.md`, leggilo. Di' in una riga cosa hai caricato (es. "Memoria: 7 regole attive, profilo v3").
   - Se nel registro ci sono progetti con feedback non ancora consolidati (il diario dice la data dell'ultimo consolidamento), proponi di consolidare prima di iniziare.
   - Se vedi che l'utente ha cambiato a mano valori di design rispetto a quanto avevi fatto (colori, dimensioni, spaziature), chiedi se sono preferenze da ricordare.
1. **Analisi e brief**: non produrre tutto subito. Segui `processo/analisi.md`:
   - stakeholder, e il pubblico in particolare: età, familiarità con il digitale, conoscenza del tema. Il pubblico decide quanto possono essere complessi i testi;
   - compiti, ognuno con una priorità: essenziale, importante, marginale;
   - solo le domande la cui risposta cambia il risultato;
   - un piano a pezzi, scritto in `DESIGN.md` e approvato dall'utente prima di disegnare.

   L'analisi è proporzionata al lavoro: per una schermata sola bastano poche righe.
2. **Tre direzioni** sul pezzo più importante del piano: A sicura · B vicina · C lontana, ognuna descritta dai 5 geni (struttura, tipografia, colore, ritmo, voce). Leggi `processo/direzioni.md` e `memoria/semi.md`. L'utente sceglie o mescola; registra la scelta. Per piccole modifiche a un progetto avviato non servono: segui `DESIGN.md`.
3. **Fondamenta e token**: tipografia, colori, spaziature e raggi come variabili, scritti nel `DESIGN.md` del progetto (modello in `modelli/DESIGN.md`).
4. **Costruisci un pezzo alla volta**, nell'ordine del piano: parti dal mobile (375 px) e poi allarga, con contenuti veri o realistici e tutti gli stati. Dopo ogni pezzo fai una verifica rapida e chiedi un feedback, poi passa al successivo.
5. **Verifica prima di consegnare** con `processo/verifica.md`: fondamenta, regole apprese, anti-ripetizione. Di' in una riga cosa hai controllato e corretto.
6. **Consegna** chiedendo un feedback rapido: "Cosa tieni e cosa togli? Basta anche: struttura + · font − · …"
7. **Chiudi il progetto** quando l'utente dice che è finito, o quando scrive `evolvi`: consolidamento (`processo/evoluzione.md` §8).

Altre skill, se installate: `design-critique` per una seconda opinione, `accessibility-review` o `accessibility-audit` per un controllo di accessibilità approfondito, `frontend-design` per spunti estetici. Usale come strumenti: i loro risultati entrano nel rapporto con la fonte indicata, e il gusto registrato in `memoria/` ha la precedenza sulle loro indicazioni estetiche.

## Gerarchia in caso di conflitto
Standard (WCAG, ISO) > linee guida di piattaforma (Apple HIG, Material) > principi (euristiche, Gestalt, Miller) > regole apprese > tendenze del profilo > pattern e semi. A parità di livello vince la regola più specifica per il contesto. Origine: la tassonomia delle regole in `riferimenti/fondamenta.md` §1.
Se una preferenza dell'utente viola uno standard, dillo e proponi la variante più vicina che lo rispetta.

## Comandi in linguaggio naturale
- "ricorda: …", "mai …", "sempre …" → regola subito.
- "solo qui", "solo in questo progetto" → ambito progetto.
- "dimentica …", "non vale più" → regola ritirata (resta nell'archivio con il motivo).
- "cosa sai del mio gusto?" → profilo e regole in breve, con le prove.
- `rivedi`, `migliora`, `valuta`, `studia`, `evolvi` → modalità (anche come argomento: `/design-evolutivo valuta`).
- "torna alla versione N" → ripristino dal diario.

## Limiti
- Un segnale debole (una sola scelta, un "carino") non diventa regola.
- Ogni modifica a `memoria/` si annuncia in una riga: l'utente deve sapere cosa il sistema ha imparato e poterlo correggere.
- Gusto ed errori di design vanno in questa memoria, che vale per tutti i progetti; non nella memoria automatica di Claude Code, che vale per un solo repository.
- I file letti a ogni lavoro restano corti: `regole-apprese.md` al massimo 40 regole, `profilo-gusto.md` al massimo 80 righe. Oltre, consolida.
