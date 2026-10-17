# Esempio completo del ciclo

Leggi questo file se non è chiaro come applicare `evoluzione.md`. Tre progetti inventati; gli identificativi (F-1xx, E-1xx, R-1xx) sono di esempio e non esistono nella memoria.

## Progetto 1 · app per prenotare corsi di yoga (iOS e Android)

**Proposta.** Tre direzioni. L'utente sceglie B. Nel registro: tabella dei geni di A, B, C e "Scelta: B · 'questa, ma più calda'".
→ Il "più calda" è un segnale debole su G3: si registra, non cambia ancora il profilo.

**Feedback F-101 (correzione):** "Il titolo della lista corsi è enorme, sembra un poster."
1. Registro: voce F-101 con le parole esatte.
2. Correggere: titolo da 40 a 22 pt. Proprietà (senza nominare l'elemento): *dimensione sproporzionata rispetto al ruolo*. Cerco le sorelle nelle altre schermate e trovo il prezzo nel riepilogo a 48 pt. Lo riduco e scrivo: "Ho ridotto anche il prezzo nel riepilogo: stesso problema."
3. L'utente: "Sì, anche quello." → l'istanza confermata conta come seconda occorrenza.
4. Astrazione:
   - istanza: titolo della lista, 40 pt;
   - proprietà: dimensione sproporzionata rispetto al ruolo;
   - tendenza: *Tendo a dare peso da protagonista a elementi che servono a orientare o informare*;
   - causa: C5 Effetto.
5. Catalogo: nessuna firma simile → nuova classe E-101. Con 2 occorrenze diventa regola.
6. Ambito: è un giudizio di qualità, non legato al progetto → "sempre, provvisorio".
7. Regola:
   `R-101 · L3 · sempre (provvisorio) · Un solo elemento da protagonista per schermata; titoli di orientamento e numeri restano entro 2× il testo vicino. · Controllo: elenca le 3 dimensioni di testo più grandi per schermata e i rapporti. · Da: E-101 (2 occ.) · Perché: "sembra un poster" (F-101)`
8. Annuncio: "Imparato: niente titoli o numeri da poster dove servono solo a orientare · vale per tutti i progetti · se è solo per questo, dimmelo."

**Feedback F-102 (regola esplicita):** "Mai più emoji come icone." La regola esisteva già (livello L2, senza controllo) e non è stata rispettata: è un errore di **esecuzione** (C10). Sale a L5: si aggiunge il pattern di ricerca degli emoji, eseguito a ogni verifica. Annuncio: "Errore ripetuto nonostante la regola: da ora la controllo con una ricerca automatica prima di ogni consegna."

## Progetto 2 · sito di una cantina

**Memoria caricata:** R-101 attiva. I titoli escono già proporzionati.
**Proposta:** la direzione C usa un trasferimento ("la gerarchia di un'etichetta di vino"). L'utente sceglie C → nel profilo, sezione Esplorazione: "C scelta 1 volta su 2"; in `semi.md`, sezione "Nati nei progetti": S-150 "gerarchia da etichetta di vino" · scelto.

**Feedback F-110 (correzione):** "Le icone dei servizi sono troppo grosse, rubano la scena alle foto."
1. Astrazione: istanza icone da 64 px | proprietà: un elemento di supporto più evidente del contenuto | tendenza: *Tendo a dare peso da protagonista a elementi di supporto* | causa: C5.
2. Confronto: stessa tendenza e stessa causa di E-101, anche se un'icona non somiglia a un titolo → **stessa classe**. Firma riscritta più generale: *Tendo a dare peso da protagonista a elementi di supporto (titoli di orientamento, numeri, icone)*.
3. R-101 parlava solo di testo: il caso non era coperto. È **conoscenza incompleta**, non esecuzione → la regola si allarga, il livello resta L3:
   `R-101 · L3 · sempre · Gli elementi di supporto (titoli di orientamento, numeri, icone, decorazioni) non attirano più attenzione del contenuto principale. · Controllo: elenca i 3 elementi più evidenti per schermata, con dimensione e ruolo; nessun elemento di supporto supera 2× il testo vicino né è più evidente del contenuto. · Da: E-101 (3 occ.)`
4. Contro-esempio aggiunto a E-101: "Il titolo unico della pagina d'ingresso della cantina, grande per scelta e approvato (F-111): non è questo errore, perché lì il titolo è il contenuto."
5. Annuncio: "Stesso problema del titolo e del prezzo dell'app di yoga: ho allargato la regola alle icone."

**Feedback F-112 (approvazione):** "Il menu in basso mi piace tanto." → il seme S-010 (navigazione nella zona del pollice) passa a "scelto"; +1 prova per una tendenza in G1.

## Progetto 3 · dashboard per una palestra

**Memoria caricata:** R-101 allargata, la regola sugli emoji a L5.
**Verifica prima di consegnare:**
- I numeri dei KPI sono a 56 px: sono il contenuto principale della dashboard → per il contro-esempio non sono un errore. Restano.
- Le icone del menu laterale sono a 32 px accanto a voci da 14 px: sono elementi di supporto oltre 2× il testo vicino → violano R-101. Corrette a 20 px **prima** di consegnare. Registro: "Intercettato in verifica · R-101".
- La ricerca degli emoji non trova nulla.

Riga all'utente: "Verifica: fondamenta ok · 5 regole controllate · ridotte le icone del menu prima di consegnarti (R-101)."
Il terzo caso (icone in una dashboard) non era mai stato corretto dall'utente: la classe l'ha riconosciuto da sola. È la prova di generalizzazione.

## Consolidamento dopo il progetto 3
- Metriche: correzioni per progetto 3 → 1 → 0; ripetizioni 0; intercettati in verifica 1; direzioni scelte B, C, A.
- Esplorazione: C scelta 1 volta su 3 progetti → distanza invariata (serve almeno 2 volte su 5 per aumentarla).
- Doppio ciclo: nel catalogo ci sono ora tre classi con causa C5 (E-101 elementi di supporto, E-104 animazione d'ingresso su ogni sezione, E-106 ombre e gradienti su tutto). Lezione di processo in testa alle regole: "Prima di aggiungere un effetto, scrivi a cosa serve a chi usa l'interfaccia. Se la risposta è 'a fare colpo', toglilo o tienilo per un solo punto della schermata."
- Profilo: G3 ha 3 segnali coerenti verso palette calde ("più calda", scelta di C con palette terrose, approvazione) → domanda all'utente: "Ho notato che scegli palette calde: la considero una tua tendenza?"
- Diario: "v3 · R-101 allargata alle icone (E-101, 3 occorrenze) · nuova lezione di processo da C5 · tendenza G3 calda proposta."
