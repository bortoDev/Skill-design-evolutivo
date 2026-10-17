# Design evolutivo · leggimi

Una skill per Claude Code che progetta, rivede, corregge e valuta interfacce, studia i siti che ti piacciono e **impara da te**: registra correzioni, scelte e idee, riconosce lo stesso errore anche quando si presenta in un punto diverso, e fa evolvere le proposte invece di ripetere sempre la stessa struttura.

Questo file è per te. Claude legge `SKILL.md` e la cartella `processo/`. La storia di come è nata, versione per versione, è in `STORIA.md`.

## Cosa sa fare
| Modalità | Chiedi per esempio | Ottieni |
|---|---|---|
| crea | "progettami la schermata di prenotazione" | 3 direzioni (sicura, vicina, lontana), poi il design verificato |
| rivedi | "rivedi questa pagina" (codice, URL o screenshot) | osservazioni per gravità (scala 0–4), con prove, fonte e correzione |
| migliora | "correggi V-02 e V-05" | le modifiche, con il valore prima e dopo |
| valuta | "dagli un voto" | una scheda su tre assi: qualità, gusto, novità |
| studia | "guarda questo sito, mi piace" | una scheda come quelle degli 8 siti, e nuovi semi |
| evolvi | "evolvi" o "progetto finito" | la memoria consolidata e una nuova versione nel diario |

**Perché una skill sola con più modalità, e non tante skill.** Tutte le modalità leggono e alimentano la stessa memoria: quando respingi un'osservazione della revisione, anche la creazione impara. Ogni skill installata aggiunge la sua descrizione al contesto a ogni turno, e con molte skill Claude Code accorcia le descrizioni (l'ho visto succedere qui, con 74 skill). Puoi comunque chiamare una modalità precisa: `/design-evolutivo rivedi`. Separare avrebbe senso solo per un critico indipendente in un subagente, e la modalità rivedi lo prevede già come opzione.

## Installazione
1. Copia la cartella `design-evolutivo` del repository in `~/.claude/skills/`. Il file principale deve risultare in `~/.claude/skills/design-evolutivo/SKILL.md` (su Windows la cartella `.claude` è nella tua cartella utente). Così vale per tutti i tuoi progetti. Va copiata, non collegata: il repository è la base di partenza, mentre la copia installata è quella che impara ed evolve con l'uso. Ciò che impara resta lì e non torna nel repository.
2. Permetti a Claude di **leggere** la memoria senza chiedertelo ogni volta. Senza questo passo, a ogni sessione ti chiede il permesso di leggere i file della skill (l'ho verificato). Aggiungi a `~/.claude/settings.json` (se il file ha già contenuto, unisci le chiavi):
   ```json
   {
     "permissions": {
       "allow": ["Read(~/.claude/skills/design-evolutivo/**)"]
     }
   }
   ```
3. Apri Claude Code in un progetto e chiedi un lavoro di design, oppure scrivi `/design-evolutivo`. Dovresti vedere "Memoria: 17 regole attive, profilo v0".
4. Consigliato: metti la copia installata sotto git, così ogni passo dell'evoluzione resta nella storia e puoi tornare indietro. È una storia solo tua, sul tuo computer, separata dal repository di partenza:
   `cd ~/.claude/skills/design-evolutivo && git init && git add -A && git commit -m "v0"`

### Aggiornare la base senza perdere ciò che ha imparato
Se un giorno il repository di partenza migliora (per esempio nuove guide in `processo/`), non ricopiare tutta la cartella: la cartella `memoria/` della copia installata contiene ciò che la skill ha imparato da te, e verrebbe sostituita dalla memoria iniziale. Copia tutto tranne `memoria/`.

### Facoltativo: promemoria automatico
Un hook che, nei progetti con un `DESIGN.md`, ricorda a Claude a ogni tuo messaggio di registrare i giudizi di design. Rende l'apprendimento meno dipendente dall'attenzione di Claude. Va nello stesso `~/.claude/settings.json`, accanto a `permissions`:
```json
"hooks": {
  "UserPromptSubmit": [
    { "hooks": [ { "type": "command",
      "command": "[ -f \"$CLAUDE_PROJECT_DIR/DESIGN.md\" ] && echo '[design-evolutivo] Se il messaggio giudica un design (correzione, preferenza, scelta, idea, approvazione), prima registralo e applica il ciclo di processo/evoluzione.md della skill.' || true" } ] }
  ]
}
```
Il comando è scritto per bash (macOS e Linux; su Windows serve Git Bash, non l'ho verificato).

## Cosa vedrai
- All'inizio: "Memoria: N regole attive, profilo vN".
- Per un progetto nuovo: 3 direzioni, **A sicura**, **B vicina**, **C lontana**. Scegli, scarti o mescoli.
- Quando correggi: Claude corregge, cerca lo stesso problema altrove e ti dice "Ho corretto anche…", poi "Imparato: … · vale per …".
- Prima di consegnare: "Verifica: … regole controllate · corretti … punti".
- **Richieste di permesso per scrivere.** `~/.claude` è una cartella protetta di Claude Code: quando Claude vuole scrivere nella memoria ti chiede il permesso (in modalità automatica decide un classificatore) e una regola nelle impostazioni non basta a evitarlo. Puoi rispondere che lo consenti per tutta la sessione. È anche un vantaggio: vedi ogni cosa che impara prima che la salvi.

## Come darle feedback
Parla normalmente. Funzionano anche frasi brevi:
- "ricorda: …", "mai …", "sempre …" → regola subito;
- "solo qui" → vale solo per questo progetto;
- "dimentica …" → regola ritirata;
- "cosa sai del mio gusto?" → ti mostra cosa crede di te, con le prove;
- `evolvi` → fa il punto e consolida;
- su una revisione: "giusto", "non è un problema", "manca…"; dopo un voto: "io gli darei 3";
- voto rapido sui 5 geni: "struttura + · font − · colore = · ritmo − · voce +".

Più feedback dai, più impara. Anche "questo sì" conta: imparare solo dagli errori rende prudenti.

## Come funziona
Claude non cambia dentro tra una sessione e l'altra: cambia la **memoria** che legge prima di lavorare. È machine learning fatto con file di testo leggibili:

| Machine learning | Qui |
|---|---|
| dati | il registro: le tue parole esatte, progetto per progetto |
| pesi del modello | regole apprese, profilo di gusto, semi |
| velocità di apprendimento | regola alla 2ª occorrenza dello stesso errore (alla 1ª se dici "mai" o se ti arrabbi) |
| generalizzazione | errori diversi in superficie, stessa **firma** (tendenza + causa) → stessa classe |
| overfitting | ambito (progetto, tipo, piattaforma, sempre) e contro-esempi |
| esplorazione | la direzione C, sempre presente, con distanza che si adatta alle tue scelte |
| checkpoint | il diario delle versioni (e git) |

Il ciclo: **proposta → risposta → feedback → correggere → imparare → migliorare → crescere**.

Due meccanismi fanno la differenza:
- **Riconoscere lo stesso errore in punti diversi.** Ogni correzione sale una scala: istanza ("titolo a 40 px") → proprietà ("troppo grande per il suo ruolo") → tendenza ("tendo a dare peso da protagonista agli elementi di supporto") → causa ("cerco l'effetto"). Due correzioni con la stessa tendenza e causa sono lo stesso errore, anche se una riguarda un titolo e l'altra un'icona.
- **Non ripeterlo.** Se un errore torna nonostante la regola, la regola sale di livello: da semplice nota, a controllo prima di consegnare, a vincolo nei token del progetto (il valore sbagliato non è più ammesso), a ricerca automatica nei file. È l'idea dei vincoli e delle funzioni obbliganti di Norman, applicata a Claude.

**Creatore e critico.** La modalità crea propone, la modalità rivedi giudica: entrambe imparano dal tuo giudizio. Quando accetti o respingi un'osservazione, il critico impara a prevedere cosa ti importa, come un modello di ricompensa nell'apprendimento per rinforzo. La misura è l'**accordo**: la quota di osservazioni che accetti. Se sale, il critico ti conosce meglio; e la verifica prima di ogni consegna usa proprio il critico in versione rapida.

Le idee nuove nascono dalla direzione C: incroci tra riferimenti lontani, trasferimenti da oggetti reali (un'etichetta di vino, la segnaletica), vincoli e inversioni. Quando una di queste ti piace, diventa un seme e torna nei progetti dopo: il repertorio cresce con idee che non erano in nessun riferimento di partenza.

## Come verificare che impari davvero
Fai queste prove nei primi progetti. Ogni prova ha un risultato atteso preciso.
1. **Memoria tra sessioni.** In un progetto di' "mai più bordi arrotondati sui pulsanti". Apri una sessione nuova, in un altro progetto, chiedi una schermata con pulsanti. Atteso: niente bordi arrotondati, e la regola citata nella riga di verifica.
2. **Generalizzazione.** In un progetto correggi "il titolo è troppo grande". In un altro correggi "le icone sono troppo grosse". Atteso: Claude dice che è lo stesso problema e allarga la regola. In un terzo progetto non correggere nulla. Atteso: la verifica intercetta da sola un caso nuovo, per esempio numeri o decorazioni troppo grandi.
3. **Ambito.** Di' "qui niente verde: è il colore del concorrente". Atteso: la regola vale solo per quel progetto; nel successivo il verde è di nuovo possibile.
4. **Escalation.** Se un errore con regola attiva si ripresenta, segnalalo. Atteso: "errore ripetuto nonostante la regola" e un livello in più.
5. **Novità.** Dopo 3 progetti apri i registri. Atteso: la direzione C differisce in almeno 3 geni dai progetti precedenti; la A in almeno 1.
6. **Trasparenza.** Chiedi "cosa sai del mio gusto?", poi "dimentica R-002". Atteso: un riassunto corretto con le prove, poi la regola segnata come ritirata.

Se una prova fallisce, quella è la prossima cosa da migliorare nella skill.

### Cosa ho già provato (16/10/2026, Claude Code 2.1.301, sessioni nuove e non interattive)
- La skill viene trovata sia come skill di progetto sia come skill personale; il percorso della memoria si risolve da solo; Claude legge memoria e profilo e risponde "Memoria: 3 regole attive, profilo v0".
- Con un blocco `hooks` dentro `SKILL.md`, Claude Code chiedeva il permesso prima di eseguire la skill (e in modalità non interattiva la bloccava): per questo il promemoria è diventato facoltativo, nelle impostazioni.
- Da `~/.claude/skills/` la lettura della memoria chiedeva un permesso; con la regola `Read(…)` del passo 2 non lo chiede più.
- Il promemoria compare nei progetti con `DESIGN.md` e non negli altri.
- `strumenti/contrasto.mjs` dà gli stessi rapporti calcolati a mano per gli 8 siti (10,01:1 per Dishoom, 1,85:1 per il menta di Montenellago, 2,74:1 per il corallo di okomedia).
- `strumenti/misura-pagina.js`, provato su una pagina di prova con difetti noti, a 1440 e a 375 px: trova zoom bloccato, scorrimento orizzontale solo a 375 px, testi sotto il contrasto minimo (raggruppati per colore, dal peggiore), emoji usate come icone, gradiente viola, tre card uguali con ombra, 10 voci di menu e il paragrafo da 155 caratteri per riga. Durante la prova ho scoperto che in emulazione mobile la larghezza della finestra cresce fino al contenuto: ora lo script usa la larghezza visibile.
- **Modalità rivedi**, in una sessione nuova (`/design-evolutivo rivedi index.html e stile.css`) sulla pagina di prova: ha caricato la memoria, ha calcolato i contrasti con lo strumento, ha distinto letto, calcolato e ipotesi, e ha trovato tutti i difetti che avevo inserito apposta (zoom, contrasti, riflusso, 10 voci di menu, bersagli piccoli, emoji, gradiente viola, card con ombra, testi generici, paragrafo lungo e centrato…), citando WCAG, principi U1–U12 e le regole R-001, R-002, R-003. Più altri problemi reali che non avevo previsto (titoli senza h2, font dichiarato ma non caricato, nessuno stato di focus). Ha chiuso con "Quali correggo?".
- **Non ancora provato:** l'apprendimento vero e proprio tra sessioni (correzione → regola → sessione nuova che non ripete l'errore). È la prova 2 qui sopra.

## Limiti
- Se hai molte skill installate, Claude Code accorcia le descrizioni nell'elenco: per questo quella di questa skill mette all'inizio le parole chiave (interfacce, siti, app, schermate).
- Se la skill non si attiva, quella sessione non impara. Rete di sicurezza facoltativa: aggiungi a `~/.claude/CLAUDE.md` la riga
  `Per qualsiasi lavoro su interfacce usa la skill design-evolutivo. Regole di design apprese: @~/.claude/skills/design-evolutivo/memoria/regole-apprese.md`
  Le regole verranno caricate in ogni sessione. Eccezione: nelle sessioni Cowork dell'app desktop gli import fuori dalla cartella di lavoro vengono saltati.
- L'astrazione la fa Claude e può sbagliare, generalizzando troppo o troppo poco. Per questo annuncia ogni cosa che impara: correggerla ti costa una parola.
- Una regola letta riduce gli errori ma non li azzera: per questo esistono i livelli controllo, vincolo e automatico.
- La memoria automatica di Claude Code vale per un solo repository; questa vale per tutti i progetti. La skill dice a Claude di mettere qui il gusto e gli errori di design.
- È un sistema nuovo: finché non passa le prove qui sopra, è un'ipotesi ben costruita.
- Se diventerà un plugin, la memoria andrà spostata fuori dalla cartella del plugin (da verificare quando ci arriveremo).

## Struttura
```
design-evolutivo/
  SKILL.md                 istruzioni per Claude: modalità, regola d'oro, ciclo, flusso di creazione
  README.md                questo file
  STORIA.md                come è nata la skill, versione per versione
  processo/
    evoluzione.md          come impara: feedback, astrazione, soglie, livelli, consolidamento
    direzioni.md           come propone: 5 geni, 3 direzioni, operatori, distanza adattiva
    verifica.md            cosa controlla prima di consegnare (il critico in versione rapida)
    rivedi.md              come rivede: prove, quattro lenti, gravità, rapporto, cosa impara
    migliora.md            come corregge dopo una revisione
    valuta.md              come dà un voto: tre assi, ancore, prove
    studia.md              come analizza un sito che ti piace
    esempio-ciclo.md       un esempio completo su tre progetti
  memoria/                 cambia con l'uso
    profilo-gusto.md       tendenze per gene (all'inizio: ricavate dai tuoi 8 siti e confermate da te)
    regole-apprese.md      regole attive (all'inizio: i "da non fare" che hai scelto)
    catalogo-errori.md     classi d'errore (vuoto)
    semi.md                idee tue, dei riferimenti e nate nei progetti
    diario-evoluzione.md   versioni e metriche
    registro/              un file per progetto, con le tue parole esatte
  modelli/DESIGN.md        modello del file da tenere in ogni progetto
  riferimenti/
    fondamenta.md          le regole del tuo corso unite: Nielsen, Shneiderman, Norman, Gestalt, Miller…
    app-mobile.md          linee guida iOS e Android
    esempi/                gli 8 siti analizzati (desktop e mobile) e il loro indice
  strumenti/
    contrasto.mjs          rapporto di contrasto WCAG tra due colori (Node)
    misura-pagina.js       misure di una pagina aperta in un browser
```

## Le idee dietro
- Variazione e ritenzione selettiva come motore della creatività: Donald T. Campbell, 1960.
- Computazione evolutiva interattiva, dove una persona fa da funzione di valutazione: Hideyuki Takagi, 2001; Picbreeder, Secretan e colleghi, 2008.
- Ricerca della novità invece che di un obiettivo fisso: Joel Lehman e Kenneth Stanley, 2011.
- Apprendimento a doppio ciclo (correggere l'azione, poi le regole che l'hanno prodotta): Chris Argyris e Donald Schön, 1978.
- Vincoli e funzioni obbliganti: Donald Norman, *La caffettiera del masochista*; poka-yoke: Shigeo Shingo.
- Adattare l'ampiezza dell'esplorazione al successo: la regola di 1/5 di Ingo Rechenberg, strategie evolutive.
- Esplorazione e sfruttamento: apprendimento per rinforzo (Sutton e Barto).
- Creatore e critico che imparano dallo stesso giudizio: l'idea di attore e critico nell'apprendimento per rinforzo e dei modelli di ricompensa addestrati sul feedback umano.
- Gravità dei problemi di usabilità (0–4, frequenza, impatto, persistenza): Jakob Nielsen.
- Intelligibilità e controllo sull'automazione: dal tuo corso di interazione uomo-macchina. Il sistema ti mostra cosa ha imparato e ti lascia correggerlo.
