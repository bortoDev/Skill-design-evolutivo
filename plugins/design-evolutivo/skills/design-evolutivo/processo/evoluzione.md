# Evoluzione: come la skill impara

Leggi questo file quando arriva un feedback di design (anche su una revisione o un voto), quando chiudi un progetto o quando l'utente scrive `evolvi`.
Percorsi: la memoria è in `memoria/` accanto a `SKILL.md`; nel progetto c'è `DESIGN.md`.

## 1. Il principio
Claude non modifica se stesso: impara **scrivendo e rileggendo la memoria**. Funziona come un modello di machine learning, con una differenza: i "pesi" sono testo leggibile, quindi l'utente può vederli, correggerli e tornare indietro.

| Machine learning | In questa skill |
|---|---|
| dati di addestramento | registro: ogni feedback, citato parola per parola |
| etichetta del dato | tipo di feedback (§4) |
| caratteristiche (feature) | astrazione: proprietà, tendenza, causa (§6.1) |
| pesi del modello | regole apprese, profilo di gusto, semi |
| velocità di apprendimento | soglie: 1 o 2 occorrenze (§6.4) |
| generalizzazione | stessa classe d'errore riconosciuta in punti diversi (§6.3) |
| overfitting | regola troppo larga o troppo stretta → ambito e contro-esempi (§6.5) |
| set di prova | verifica prima della consegna; progetti successivi |
| esplorazione / sfruttamento | direzione lontana / direzione sicura (`direzioni.md`) |
| checkpoint | versioni nel diario (e commit git, se c'è) |

Perché ci sia evoluzione servono tre cose; se ne manca una, non c'è:
- **variazione**: proposte diverse tra loro e dal passato (altrimenti si ripete);
- **selezione**: il giudizio dell'utente e le fondamenta (altrimenti cambia a caso);
- **memoria**: ciò che è stato selezionato passa al progetto successivo (altrimenti ricomincia da zero).

## 2. La memoria
| File | Contiene | Si legge | Si scrive | Limite |
|---|---|---|---|---|
| `registro/AAAA-MM-GG-<progetto>.md` | episodi grezzi: direzioni proposte, scelte, feedback citati, errori intercettati | nel consolidamento | subito, a ogni feedback | nessuno (archivio) |
| `catalogo-errori.md` | classi d'errore: firma, cause per occorrenza, segnali, occorrenze, contro-esempi | a ogni correzione e in verifica | a ogni correzione | ~60 classi, poi unire |
| `regole-apprese.md` | regole attive in una riga, con livello, ambito e controllo | all'inizio di ogni lavoro | a ogni promozione o cambio di livello | 40 regole |
| `profilo-gusto.md` | tendenze per gene con confidenza e prove; stato dell'esplorazione | all'inizio di ogni lavoro | nel consolidamento | 80 righe |
| `semi.md` | idee dell'utente, dei riferimenti e nate nei progetti, con esito | quando generi direzioni | quando nasce o si prova un'idea | unire i duplicati |
| `diario-evoluzione.md` | versioni: cosa è cambiato, perché, prove, metriche | su richiesta e nel consolidamento | una riga a ogni promozione o cambio di livello (sezione "Modifiche dall'ultimo consolidamento"); una versione nuova a ogni consolidamento | nessuno |

Nel progetto, `DESIGN.md` (modello in `modelli/DESIGN.md`) tiene brief, direzione scelta, token ed eccezioni locali.

Regole di scrittura:
- Il numero di versione in testa a `profilo-gusto.md` e `regole-apprese.md` cambia solo nel consolidamento (§8): tra un consolidamento e l'altro le modifiche stanno nel diario.
- Date AAAA-MM-GG. Identificativi stabili: E- classi, R- regole, S- semi (numerati in tutta la memoria); F- feedback (numerati dentro ogni file di registro: quando li citi altrove aggiungi il progetto, es. "F-002, app-yoga").
- Non cancellare la storia: cambia lo stato (attiva, ristretta, ritirata) e scrivi il motivo.
- Cita sempre le parole dell'utente: sono il dato grezzo. Se un'astrazione si rivela sbagliata, si rifà partendo da lì.
- Ogni scrittura in `memoria/` si annuncia in una riga all'utente.

## 3. Il ciclo
1. **PROPOSTA**: direzioni o soluzioni (`direzioni.md`), filtrate da fondamenta e regole.
2. **RISPOSTA**: l'utente reagisce con parole, scelte o modifiche al codice.
3. **FEEDBACK**: riconosci il tipo (§4) e registralo.
4. **CORREGGERE**: correggi l'istanza e le sue "sorelle" (§5).
5. **IMPARARE**: astrai, confronta con il catalogo, applica soglie e ambito (§6).
6. **MIGLIORARE**: se un errore torna nonostante la regola, sali di livello (§7).
7. **CRESCERE**: rinforza ciò che funziona, conserva le idee riuscite, regola l'esplorazione, consolida (§8, §9).

## 4. Riconoscere il feedback
| Tipo | Esempi | Cosa diventa | Forza |
|---|---|---|---|
| Regola esplicita | "mai più emoji come icone", "ricordati che…", "sempre…" | regola subito | forte |
| Correzione forte | "di nuovo?!", "basta con…", "orribile" | occorrenza che vale come regola | forte |
| Correzione | "il titolo è troppo grande", "qui è troppo vuoto" | occorrenza di una classe d'errore | normale |
| Modifica diretta | l'utente cambia valori nel codice | chiedi: "Hai cambiato X in Y: è una preferenza da ricordare?" Se sì, è una correzione | normale, dopo conferma |
| Scelta | sceglie B, o "A con il colore di C" | segnale a favore dei geni scelti | debole, si accumula |
| Approvazione | "perfetto", "il menu mi piace" | rinforzo di ciò che ha approvato | debole, si accumula |
| Idea | "e se il menu fosse in basso?", un sito da guardare | seme in `semi.md` | — |
| Reazione a una revisione | accetta o respinge un'osservazione V-…, segnala ciò che manca | accordo, contro-esempio o nuova occorrenza (`rivedi.md` §6) | normale |
| Voto dell'utente | "io gli darei 2" dopo una scheda di valutazione | differenza tra il suo voto e il tuo, nel registro | debole, si accumula |
| Non di design | contenuti, prezzi, bug | nessun apprendimento | — |

Un messaggio con più giudizi diventa più voci (F-001, F-002…). Formato della voce: `memoria/registro/_modello.md`.

## 5. Correggere: l'istanza e le sorelle
1. Correggi ciò che l'utente ha indicato.
2. Formula la proprietà sbagliata senza nominare l'elemento (gradino 2, §6.1) e cerca altri punti del lavoro attuale che la mostrano: altre schermate, componenti, stati, breakpoint. Se la proprietà è misurabile (valori, classi, colori), usa la ricerca nei file.
3. Correggi quelli che la mostrano e dillo: "Ho corretto anche X e Y: stesso problema." Se un caso è dubbio, chiedi invece di correggere.
4. La risposta dell'utente mette alla prova l'astrazione: se conferma, è un'occorrenza in più; se dice "no, Y andava bene", l'astrazione è troppo larga: restringila e registra Y come contro-esempio.

## 6. Imparare
### 6.1 Scala di astrazione
| Gradino | Domanda | Esempio |
|---|---|---|
| 1 Istanza | Cosa, dove, con che valore? | titolo della schermata "Corsi": 40 px su mobile |
| 2 Proprietà | Cosa è sbagliato, senza nominare l'elemento? | dimensione sproporzionata rispetto al ruolo |
| 3 Tendenza | Quale mia abitudine lo produce? Inizia con "Tendo a…" | tendo a dare peso da protagonista a elementi che servono solo a orientare |
| 4 Causa | Quale passo del processo l'ha generato? (§6.2) | C5 Effetto |

La **firma** di una classe è la **tendenza**. È la firma, non il punto della pagina, a far riconoscere lo stesso errore in elementi che non si somigliano: un titolo, un'icona, un numero.
- Scrivi la tendenza al livello più generale che le parole dell'utente permettono. Se nomina il tipo di elemento (titolo, icona, filtro…), è ancora una proprietà: sali di un gradino. "Troppo grande", "sembra un poster" e "ruba la scena" dicono tutte la stessa cosa: un peso sproporzionato rispetto al ruolo.
- La **causa** è un'ipotesi su come è nato l'errore, e la stessa abitudine può nascere da passi diversi del processo. Si registra per ogni occorrenza e serve al doppio ciclo (§8), ma non decide se due errori sono lo stesso errore.
- Se il catalogo, in una copia installata prima del 17/10/2026, descrive la firma come "tendenza + causa", vale comunque questa regola.

### 6.2 Vocabolario delle cause
- **C1 Default**: scelta presa perché comune o attesa, non perché adatta. È l'origine dell'"effetto IA".
- **C2 Locale**: elemento deciso senza guardare il sistema (gerarchia, ritmo, coerenza).
- **C3 Brief**: ignorati chi, dove, perché o il tono.
- **C4 Copia**: ripreso un riferimento invece del suo principio.
- **C5 Effetto**: cercato l'impatto a scapito di chiarezza o funzione.
- **C6 Segnaposto**: progettato con contenuti finti; il design non regge quelli veri.
- **C7 Piattaforma**: ignorate convenzioni di web, iOS o Android.
- **C8 Fondamenta**: violata una regola di base (contrasto, target, leggibilità, carico di memoria).
- **C9 Gusto frainteso**: regola o tendenza applicata fuori ambito o troppo alla lettera.
- **C10 Verifica saltata**: la regola esisteva ma non è stata controllata.

Se nessuna causa calza, scrivi "C? …" con una frase; nel consolidamento si decide se aggiungerne una.

### 6.3 Stessa classe o classe nuova?
Confronta la proprietà e la tendenza del nuovo errore con quelle di ogni classe di `catalogo-errori.md`:
- **Stessa classe** se la proprietà o la tendenza descrivono lo stesso effetto sbagliato, anche con elementi, schermate, progetti o cause diverse. Aggiungi l'occorrenza con la sua causa, riscrivi la firma al livello più generale che copre tutte le occorrenze e tieni tutti gli esempi.
- **Prova pratica**: una regola scritta per la classe esistente, allargata di poco, avrebbe evitato anche il nuovo errore? Se sì, è la stessa classe.
- **Classi diverse** se cambia l'effetto sbagliato. Se due classi hanno solo la causa in comune, quella causa si valuta nel consolidamento (§8, doppio ciclo).
- **Dubbio reale**: chiedi in una riga: "È lo stesso problema di E-003 (…)?" Se non puoi chiedere, scegli "stessa classe" e dillo. Una regola un po' larga si restringe con una parola; un errore ripetuto è ciò che l'utente vuole evitare.

Ogni classe ha almeno un **contro-esempio**: un caso simile che NON è questo errore. Impedisce di generalizzare troppo.

### 6.4 Soglie
| Situazione | Effetto |
|---|---|
| 1ª correzione normale | classe in **osservazione** (L1): corretta qui; nei progetti successivi è un punto di attenzione in verifica |
| 2ª occorrenza della stessa classe, anche altrove | **regola attiva** (L2, o L3 se ha un controllo misurabile) |
| regola esplicita o correzione forte | regola attiva già alla 1ª volta |
| istanza trovata da Claude e confermata dall'utente | conta come occorrenza |
| 3 segnali deboli coerenti (scelte, approvazioni) | **tendenza** proposta per il profilo, da confermare |

### 6.5 Ambito
Ambiti, dal più stretto: progetto → tipo di progetto (e-commerce, portfolio, app di servizio…) → piattaforma (web, iOS, Android) → sempre.
- Le parole dell'utente decidono quando lo dicono: "qui" = progetto; "mai", "sempre" = sempre.
- Motivo legato al progetto (brand, pubblico, contenuti, concorrenza, richiesta di un cliente) → progetto o tipo di progetto.
- Giudizio di qualità o di gusto ("troppo grande", "confuso", "sa di template") → **sempre, provvisorio**: lo annunci e l'utente può restringerlo con una parola.
- Una regola "sempre" contraddetta in un altro contesto si **restringe** con una condizione, non si ritira.

### 6.6 Scrivere la regola
Una regola serve se si può controllare. Formato di `regole-apprese.md`:

`R-007 · L3 · sempre · Un solo elemento da protagonista per schermata; gli elementi di supporto restano entro 2× il livello successivo. · Controllo: elenca i 3 elementi più evidenti di ogni schermata e i loro rapporti. · Da: E-003 (3 occ.) · Perché: "sembra un poster" (F-012, app-yoga)`

Tre tipi di controllo:
- **misura**: un valore da verificare (rapporto, dimensione, contrasto);
- **ricerca**: un pattern da cercare nei file del progetto;
- **domanda sì/no**: a cui rispondere guardando la schermata.

Annuncio all'utente, una riga: "Imparato: … · vale per … · se è sbagliato dimmelo."

## 7. Migliorare: quando un errore torna
Se torna un errore la cui classe ha già una regola, il problema non è la conoscenza ma l'esecuzione. Registra la causa C10 e **sali di un livello**:

| Livello | Forma | Effetto |
|---|---|---|
| L1 Osservazione | voce nel catalogo | attenzione in verifica |
| L2 Regola | riga in `regole-apprese.md` | letta prima di progettare |
| L3 Controllo | regola con controllo esplicito | eseguito in ogni verifica |
| L4 Vincolo | token o valori ammessi in `DESIGN.md` (scala tipografica chiusa, palette chiusa, raggi ammessi) | l'errore diventa impossibile mentre costruisci |
| L5 Automatico | pattern di ricerca eseguito sui file prima di consegnare | trova l'errore senza contare sull'attenzione |

Sono i vincoli e le funzioni obbliganti di Norman applicati a Claude: rendere l'errore impossibile, non solo sconsigliato.

Distingui i due casi:
- stessa firma, ma la regola non copriva il caso (era troppo stretta) → **allarga la regola**, senza salire di livello: era conoscenza incompleta;
- la regola copriva il caso e non è stata rispettata → **sali di livello**: era esecuzione.

## 8. Crescere: il consolidamento
Quando: a fine progetto, quando l'utente scrive `evolvi`, o quando un file sempre letto supera il limite.
1. Leggi i registri successivi all'ultimo consolidamento (la data è nel diario).
2. Completa le voci rimaste senza astrazione.
3. Aggiorna stati, livelli e ambiti nel catalogo e nelle regole.
4. **Doppio ciclo**: se 3 o più classi hanno la stessa causa, scrivi una **lezione di processo** che cambia come lavori (per C1, ad esempio: "per ogni gene scrivi prima la scelta più ovvia, poi scartala o giustificala"). Le lezioni di processo stanno in testa a `regole-apprese.md`.
5. Rivedi le regole che hanno bloccato direzioni scelte o idee che piacevano: proponi di restringerle. Troppi vincoli soffocano la variazione.
6. Aggiorna il profilo: tendenze con ≥ 3 segnali coerenti (proponile come domanda); se 3 segnali recenti contraddicono una tendenza, abbassane la confidenza e chiedi.
7. Aggiorna i semi: esiti (provato, scelto, scartato e perché). Un'idea nata in un progetto e scelta dall'utente diventa un seme "riuscito".
8. Regola l'esplorazione (`direzioni.md` §5).
9. Compatta: unisci regole simili in una più generale, sposta i dettagli nel catalogo, riporta i file sempre letti sotto i limiti.
10. Scrivi nel diario la nuova versione: cosa è cambiato (comprese le righe di "Modifiche dall'ultimo consolidamento", che poi svuoti), perché, con quali prove, e le metriche del §12. Aggiorna il numero di versione in testa a `profilo-gusto.md` e `regole-apprese.md`, e scrivi "consolidato in vN" nella chiusura dei registri letti.
11. Mostra all'utente un riepilogo di massimo 8 righe e fai solo le domande necessarie (ambiti incerti, contraddizioni, tendenze da confermare).
12. Se la cartella della skill è un repository git, fai un commit: "evoluzione vN: …".

## 9. Rinforzo e preferenze
- Imparare solo dagli errori rende prudenti. Registra anche ciò che funziona: approvazioni e scelte sono prove a favore.
- Un segnale debole da solo non cambia nulla; tre coerenti diventano una tendenza proposta.
- Le tendenze sono intervalli ("palette calde, poco sature"), non valori fissi: orientano la direzione A, non vincolano B e C.

## 10. Contraddizioni, dimenticare, tornare indietro
- Feedback contrario a una regola attiva: non capovolgerla in silenzio. Chiedi: "La regola R-004 dice X; ora mi chiedi Y. È un'eccezione per questo contesto o il tuo gusto è cambiato?" Eccezione → restringi l'ambito o aggiungi la condizione. Cambio di gusto → ritira la regola (stato "ritirata", data, motivo) e scrivi la nuova.
- "Dimentica…" → stato "ritirata". Una regola ritirata non si reimpara da segnali deboli: serve un segnale forte.
- "Torna alla versione N" → ripristina i file come descritto nel diario, o con git.

## 11. Salvaguardie
- Le fondamenta battono il gusto (gerarchia in `SKILL.md`).
- Non imparare da feedback che non riguardano il design.
- Non generalizzare oltre ciò che le occorrenze mostrano; ogni classe ha un contro-esempio.
- L'utente deve sapere cosa il sistema crede di lui e poterlo cambiare: ogni scrittura in memoria si annuncia; "cosa sai del mio gusto?" mostra profilo e regole con le prove.
- Il gusto e gli errori di design vanno in questa memoria, non nella memoria automatica di Claude Code del progetto (che vale per un solo repository); lì al massimo un rimando.

## 12. Misurare l'evoluzione
Nel diario, a ogni consolidamento:
- correzioni per progetto (devono scendere);
- ripetizioni: errori di classi con regola attiva che si ripresentano (devono tendere a 0);
- errori intercettati in verifica prima della consegna;
- direzione scelta (A, B, C) negli ultimi 5 progetti;
- semi nati nei progetti e scelti dall'utente (crescita del repertorio);
- accordo con le revisioni: osservazioni accettate ÷ proposte (deve salire);
- distanza tra i tuoi voti e quelli dell'utente, quando li dà (deve scendere).
