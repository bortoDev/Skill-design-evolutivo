# Design evolutivo · leggimi

Una skill per Claude Code che progetta, rivede, corregge e valuta interfacce, studia i siti che ti piacciono e **impara da te**: registra correzioni, scelte e idee, riconosce lo stesso errore anche quando si presenta in un punto diverso, e fa evolvere le proposte invece di ripetere sempre la stessa struttura.

Questo file è per te. Claude legge `SKILL.md` e la cartella `processo/`. La storia di come è nata, versione per versione, è in `STORIA.md`.

## Cosa sa fare
| Modalità | Chiedi per esempio | Ottieni |
|---|---|---|
| crea | "progettami la schermata di prenotazione" | 3 direzioni (sicura, vicina, lontana), poi il design, rifinito e verificato |
| rivedi | "rivedi questa pagina" (codice, URL o screenshot) | osservazioni per gravità (scala 0–4), con prove, fonte e correzione |
| migliora | "correggi V-02 e V-05" | le modifiche, con il valore prima e dopo |
| valuta | "dagli un voto" | una scheda su tre assi: qualità, gusto, novità |
| studia | "guarda questo sito, mi piace" | una scheda come quelle degli 8 siti, in `memoria/esempi/`, e nuovi semi |
| evolvi | "evolvi" o "progetto finito" | la memoria consolidata e una nuova versione nel diario |

**Perché una skill sola con più modalità, e non tante skill.** Tutte le modalità leggono e alimentano la stessa memoria: quando respingi un'osservazione della revisione, anche la creazione impara. Ogni skill installata aggiunge la sua descrizione al contesto a ogni turno, e con molte skill Claude Code accorcia le descrizioni (l'ho visto succedere qui, con 74 skill). Puoi comunque chiamare una modalità precisa: `/design-evolutivo rivedi`. Separare avrebbe senso solo per un critico indipendente in un subagente, e la modalità rivedi lo prevede già come opzione.

## Installazione con il plugin (consigliata)
Il plugin si installa con due comandi, si aggiorna con uno e vale per tutti i tuoi progetti.

1. Controlla la versione di Claude Code con `claude --version`. Il comando da una sessione richiede almeno la 2.1.275, quello in un solo comando dal terminale la 2.1.292 (documentazione di Claude Code, pagina "Publish and distribute a plugin", letta il 18/10/2026).
2. Da un terminale:
   ```
   claude plugin marketplace add bortoDev/Skill-design-evolutivo
   claude plugin install design-evolutivo@bortodev
   ```
   Il primo comando aggiunge il catalogo `bortodev` e si fa una volta sola. Il secondo installa il plugin `design-evolutivo` da quel catalogo.
   - In un solo comando dal terminale: `claude plugin install design-evolutivo --marketplace bortoDev/Skill-design-evolutivo`.
   - Da una sessione di Claude Code: `/plugin install design-evolutivo --marketplace bortoDev/Skill-design-evolutivo`.
3. Se il tuo computer non ha una chiave SSH per GitHub, o se non sai se ce l'ha, aggiungi a `~/.claude/settings.json`, accanto a `"permissions"`:
   ```json
   "env": { "CLAUDE_CODE_PLUGIN_PREFER_HTTPS": "1" }
   ```
   Dal terminale l'installazione passa da sola a HTTPS; da una sessione, e negli aggiornamenti, no (documentazione, "Host and maintain a marketplace"). Il repository è pubblico, quindi con HTTPS non servono password.
4. Aggiungi i permessi (sezione qui sotto) e apri una sessione nuova.

**Come si chiama.** Il comando è `/design-evolutivo:design-evolutivo`, perché Claude Code mette davanti il nome del plugin. Funziona anche la scorciatoia `/design-evolutivo`, se nessun altro comando ha quel nome. La modalità va dopo: `/design-evolutivo rivedi`. Di solito non serve chiamarla: quando chiedi un lavoro di design, Claude la usa da sola, perché ne legge la descrizione.

## Permessi
Fuori dalla cartella del progetto, Claude Code chiede il permesso prima di leggere un file (documentazione, "Configure permissions"). Senza regole te lo chiederebbe ogni volta che legge la memoria o una guida della skill, e ogni volta che scrive la memoria. Queste tre regole lo evitano. Ecco il file `~/.claude/settings.json` completo, se prima era vuoto o non c'era:

```json
{
  "permissions": {
    "allow": [
      "Read(~/design-evolutivo-memoria/**)",
      "Edit(~/design-evolutivo-memoria/**)",
      "Read(~/.claude/plugins/cache/bortodev/design-evolutivo/**)"
    ]
  }
}
```

- `Read(~/design-evolutivo-memoria/**)`: leggere la memoria.
- `Edit(~/design-evolutivo-memoria/**)`: scriverla. Una regola `Edit` vale per tutti gli strumenti che modificano file, anche per creare un file nuovo (documentazione, "Configure permissions"). La memoria è fuori da `~/.claude`, che è una cartella protetta, quindi la regola dovrebbe bastare: letto nella documentazione, non ancora provato. Se preferisci approvare ogni scrittura una per una, togli questa riga. In tutti e due i casi la skill ti annuncia in una riga ogni cosa che impara.
- `Read(~/.claude/plugins/cache/bortodev/design-evolutivo/**)`: leggere le guide della skill (`processo/`, `riferimenti/`), che Claude Code tiene in questa cartella. Il percorso segue lo schema della documentazione (`~/.claude/plugins/cache/<catalogo>/<plugin>/<versione>/`, pagina "Plugin loading reference"), ma è **da confermare dopo la prova di installazione**. Se Claude ti chiede ancora il permesso di leggere un file della skill, la richiesta mostra il percorso vero: correggi la regola con quello.
<!-- DA VERIFICARE: percorso cache -->

Se il file ha già altro contenuto, aggiungi le tre righe dentro `"allow"`; se `"permissions"` non c'è, aggiungi tutto il blocco, separato da una virgola. Se non sai modificare `settings.json`, chiedi a Claude Code: "aggiungi queste regole al mio ~/.claude/settings.json".

**Gli strumenti.** Quando la skill lancia uno dei suoi strumenti (`node …/contrasto.mjs`, `guarda.mjs` o `memoria.mjs`), Claude Code ti chiede il permesso di eseguire il comando. Puoi rispondere "Sì" per quella volta, oppure "Sì, e non chiedere più": allora Claude Code salva la regola per quel comando, nel progetto in cui sei (in `.claude/settings.local.json`, documentazione "Configure permissions"). Anche così la skill ti dice in una riga cosa ha scritto nella memoria.

## Primo uso
Apri Claude Code in un progetto e chiedi un lavoro di design, oppure scrivi `/design-evolutivo`. La prima volta vedrai:
1. "Primo uso: copio la memoria iniziale in ~/design-evolutivo-memoria", con la richiesta di permesso per `node …/memoria.mjs inizia`. Rispondi sì: è il tuo consenso. La memoria iniziale (le tue regole, il profilo, i semi) viene copiata nella cartella in cui la skill impara. Il comando non sovrascrive mai una memoria che esiste già.
2. "Memoria: 19 regole attive, profilo v0".

Se avevi una vecchia installazione per copia, al posto del passo 1 la skill ti chiede se importarne la memoria (vedi "Migrazione da una vecchia copia"). Se la copia non riesce, per esempio perché hai negato il permesso, la skill lavora con la memoria iniziale e ti dice che in quella sessione ciò che impara non si salva.

Nelle sessioni cloud (Claude Code sul web) la skill non c'è: lì non si caricano i plugin installati per il tuo utente, e nemmeno le skill di `~/.claude/skills/` (documentazione, "Extend Claude with skills", sezione "Use skills in Cowork and cloud sessions"). Usala sul tuo computer.

## Facoltativo
### Le foto delle pagine (Playwright)
Per guardare quello che costruisce, la skill fotografa la pagina con `strumenti/guarda.mjs`: a 375, 320 e 1440 px, a 375 in tema scuro e a 375 sfocata. 320 viene da WCAG 1.4.10; 375, 1440 e la sfocatura sono scelte della skill, non standard. Serve Playwright con Chromium, da installare una volta (serve Node con npm):
```
npm i -g playwright && npx playwright install chromium
```
Senza Playwright la skill funziona lo stesso: usa un browser controllabile, se c'è, oppure ti chiede una foto dello schermo; se non ha potuto guardare la pagina, lo scrive nella consegna ("non guardata a schermo"). Le foto vanno in una cartella temporanea, mai nel tuo progetto.

### La storia della memoria con git
Con git ogni passo dell'evoluzione resta nella storia, e "torna alla versione N" riporta la memoria esattamente com'era. È una storia solo tua, sul tuo computer:
```
cd ~/design-evolutivo-memoria && git init && git add -A && git commit -m "v0"
```
Se git ti chiede chi sei, scrivilo una volta sola:
```
git config --global user.name "Il tuo nome"
git config --global user.email "la-tua-email"
```
Da lì, a ogni consolidamento, la skill fa un commit "evoluzione vN: …". Git resta sul tuo computer: per una copia di sicurezza vera, copia la cartella altrove o usa un repository privato.

### Promemoria automatico
Un hook che, nei progetti con un `DESIGN.md`, ricorda a Claude a ogni tuo messaggio di registrare i giudizi di design. Rende l'apprendimento meno dipendente dall'attenzione di Claude. Va nello stesso `~/.claude/settings.json`; ecco il file completo, con i permessi di prima:
```json
{
  "permissions": {
    "allow": [
      "Read(~/design-evolutivo-memoria/**)",
      "Edit(~/design-evolutivo-memoria/**)",
      "Read(~/.claude/plugins/cache/bortodev/design-evolutivo/**)"
    ]
  },
  "hooks": {
    "UserPromptSubmit": [
      { "hooks": [ { "type": "command",
        "command": "[ -f \"$CLAUDE_PROJECT_DIR/DESIGN.md\" ] && echo '[design-evolutivo] Se il messaggio giudica un design (correzione, preferenza, scelta, idea, approvazione), prima registralo e applica il ciclo di processo/evoluzione.md della skill.' || true" } ] }
    ]
  }
}
```
Il comando è scritto per bash (macOS e Linux; su Windows serve Git Bash, non l'ho verificato). Non è dentro il plugin di proposito: un hook del plugin girerebbe in ogni sessione, anche quando non fai design.

## Aggiornare, mettere in pausa, disinstallare
- **Aggiornare:** `claude plugin update design-evolutivo@bortodev`. Poi scrivi `/reload-plugins` nella sessione aperta, oppure aprine una nuova: fino ad allora la sessione usa la versione vecchia. Un aggiornamento arriva solo quando cambia il numero di versione del plugin. Gli aggiornamenti automatici sono spenti all'inizio; per accenderli: `/plugin` → Marketplaces → `bortodev` → Enable auto-update.
- **Cosa cambia con un aggiornamento:** guide, riferimenti e strumenti. La memoria no. Per questo le novità della memoria iniziale non arrivano da sole nella tua: `STORIA.md` le elenca, e puoi dire alla skill "aggiungile".
- **Mettere in pausa:** `claude plugin disable design-evolutivo@bortodev`; per riprendere, `claude plugin enable design-evolutivo@bortodev`. Non perdi niente.
- **Disinstallare:** `claude plugin uninstall design-evolutivo@bortodev`. La memoria resta in `~/design-evolutivo-memoria`: la skill non usa la cartella dati del plugin (`~/.claude/plugins/data/…`), che la disinstallazione cancella. Se reinstalli, la skill ritrova la memoria com'era. Per togliere anche il catalogo: `claude plugin marketplace remove bortodev`. Per cancellare la memoria, cancella tu la cartella: la skill non lo fa mai.

## Senza plugin (alternativa)
Se non puoi usare i plugin, copia la cartella della skill in `~/.claude/skills/`. Su macOS e Linux:
```
git clone https://github.com/bortoDev/Skill-design-evolutivo.git
mkdir -p ~/.claude/skills
cp -R Skill-design-evolutivo/plugins/design-evolutivo/skills/design-evolutivo ~/.claude/skills/
```
Il file principale deve risultare in `~/.claude/skills/design-evolutivo/SKILL.md`. Su Windows la cartella `.claude` è nella tua cartella utente; non l'ho provato.

- **Memoria:** la stessa cartella del plugin, `~/design-evolutivo-memoria/`, e lo stesso primo uso.
- **Permessi:** le stesse tre regole, ma la terza diventa `Read(~/.claude/skills/design-evolutivo/**)`.
- **Comando:** `/design-evolutivo`.
- **Aggiornare:** `cd Skill-design-evolutivo && git pull`, poi `cp -R plugins/design-evolutivo/skills/design-evolutivo/. ~/.claude/skills/design-evolutivo/`. Dalla v0.12 la cartella della skill non contiene niente di tuo, quindi si può ricopiare tutta.
- **Mai la copia e il plugin insieme.** Claude Code caricherebbe due skill con lo stesso nome: due descrizioni nel contesto, la scorciatoia `/design-evolutivo` che apre la copia, e due versioni diverse che scrivono nella stessa memoria (documentazione, "Extend Claude with skills"). Se passi al plugin, sposta la copia fuori da `~/.claude/skills/`.

## Migrazione da una vecchia copia
Serve solo se avevi installato la skill copiando la cartella prima della v0.12. Allora la memoria stava dentro la skill, in `~/.claude/skills/design-evolutivo/memoria/`. Si fa una volta:
1. Installa il plugin (sopra). Tieni per ora la vecchia regola `Read(~/.claude/skills/design-evolutivo/**)`: serve a leggere la vecchia memoria.
2. Apri una sessione e scrivi `/design-evolutivo:design-evolutivo`, con il nome completo: finché la vecchia copia è lì, la scorciatoia apre quella. La skill trova la vecchia memoria e ti chiede se importarla. Rispondi sì: `memoria.mjs importa` copia la vecchia memoria in `~/design-evolutivo-memoria/`, e la cartella vecchia resta com'è. Se invece vedi "Primo uso: copio la memoria iniziale…", rispondi no al permesso: la skill non ha trovato la vecchia memoria, e una memoria nuova bloccherebbe l'importazione. Controlla che la vecchia cartella sia ancora in `~/.claude/skills/design-evolutivo/` e riprova.
3. Sposta la vecchia cartella fuori da `~/.claude/skills/`, senza cancellarla. Così Claude Code non carica più due skill, e la vecchia memoria resta come copia di sicurezza:
   ```
   mv ~/.claude/skills/design-evolutivo ~/design-evolutivo-vecchia
   ```
   Poi togli la vecchia regola `Read` da `settings.json`. Se in `~/.claude/CLAUDE.md` avevi la riga di sicurezza (sezione "Limiti"), cambiane il percorso in `~/design-evolutivo-memoria/regole-apprese.md`.
4. **Siti studiati.** Prima le schede dei siti che facevi studiare alla skill finivano in `riferimenti/esempi/` della copia; ora vanno in `memoria/esempi/`, con un loro indice `00-indice.md`. L'importazione te le elenca ma non le copia. Chiedi alla skill: "sposta in memoria/esempi le schede dei siti che avevo studiato, con le loro righe dell'indice". A mano, per ogni scheda: `mkdir -p ~/design-evolutivo-memoria/esempi`, poi `cp ~/design-evolutivo-vecchia/riferimenti/esempi/<nome>.md ~/design-evolutivo-memoria/esempi/`.
5. **Novità della memoria iniziale.** La v0.12 ha cambiato la memoria iniziale, ma questi cambi non entrano da soli in una memoria che esiste già:
   - R-014 comprende le foto: foto del luogo, del prodotto o delle persone, d'archivio o generate, presentate come vere, contano come dati inventati; come segnaposto dichiarati ("foto di esempio") vanno bene;
   - la frase sulle eccezioni: le regole che vietano (R-001–R-013, R-015) ammettono un'eccezione, con il motivo scritto in `DESIGN.md`; R-014 no;
   - un default da evitare in più, non attivo: fondo crema caldo con accento terracotta (e titoli serif molto contrastati);
   - la lezione di processo 2, "Cura da alto livello";
   - nel profilo, le tendenze non ancora note: la skill le fa variare tra le direzioni A, B e C invece di chiedertele;
   - il modello del registro (`registro/_modello.md`), con la riga "Impronta" e le sezioni "Analisi" e "Verifiche".

   Di' alla skill "aggiungile", oppure quali vuoi: te le mostra e annuncia ogni modifica.
6. Se la vecchia copia era sotto git, la sua storia resta in `~/design-evolutivo-vecchia`. Per la memoria nuova, git riparte da capo (sezione "Facoltativo").

Se resti senza plugin, l'ordine cambia, perché la copia nuova va nello stesso posto della vecchia:
1. sposta la vecchia cartella con il comando del passo 3. La regola `Read(~/.claude/skills/design-evolutivo/**)` invece resta, perché la copia nuova va lì;
2. copia la versione nuova (sezione "Senza plugin");
3. prima di aprire una sessione, importa la memoria dal terminale:
   ```
   node ~/.claude/skills/design-evolutivo/strumenti/memoria.mjs importa ~/design-evolutivo-vecchia/memoria
   ```
   Fallo prima di usare la skill: al primo uso, senza memoria, la skill creerebbe una memoria nuova, e l'importazione poi si rifiuterebbe per non mescolarle;
4. continua con i passi 4–6.

I formati vecchi della memoria si leggono ancora (`processo/evoluzione.md` §13): non serve riscriverli.

## Cosa vedrai
- All'inizio: "Memoria: N regole attive, profilo vN".
- Per un progetto nuovo, prima l'analisi: chi è coinvolto, cosa serve, cosa è essenziale e cosa marginale, e le domande che cambiano il risultato. Ne esce un piano a pezzi che approvi tu.
- Poi 3 direzioni sul pezzo più importante: **A sicura**, **B vicina**, **C lontana**. Scegli, scarti o mescoli. Il resto arriva un pezzo alla volta, e dopo ognuno ti chiede un parere.
- Dopo ogni pezzo, la rifinitura: Claude guarda la pagina a schermo, toglie il superfluo e cura i dettagli. Una riga dice cosa ha fatto: "Rifinitura: guardata a 375, 1440, 320 px e in scuro · tolti … · corretti …". Se non ha potuto guardarla, lo dice.
- Quando correggi: Claude corregge, cerca lo stesso problema altrove e ti dice "Ho corretto anche…", poi "Imparato: … · vale per …".
- Prima di consegnare: "Verifica: … regole controllate · corretti … punti".
- **Richieste di permesso.** Con le regole della sezione "Permessi", Claude dovrebbe leggere e scrivere la memoria, e leggere le guide della skill, senza chiedere (letto nella documentazione, non ancora provato); per i comandi `node` degli strumenti chiede ancora. Senza la regola `Edit`, ti chiede il permesso a ogni scrittura nella memoria: è più lento, ma vedi ogni cosa prima che la salvi.

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
| generalizzazione | errori diversi in superficie, stessa **firma** (la tendenza, cioè lo stesso effetto sbagliato) → stessa classe |
| overfitting | ambito (progetto, tipo, piattaforma, sempre) e contro-esempi |
| esplorazione | la direzione C, sempre presente, con distanza che si adatta alle tue scelte |
| checkpoint | il diario delle versioni (e git, se la memoria è un repository) |

Il ciclo: **proposta → risposta → feedback → correggere → imparare → migliorare → crescere**.

Due meccanismi fanno la differenza:
- **Riconoscere lo stesso errore in punti diversi.** Ogni correzione sale una scala: istanza ("titolo a 40 px") → proprietà ("troppo grande per il suo ruolo") → tendenza ("tendo a dare peso da protagonista agli elementi di supporto") → causa ("cerco l'effetto"). Due correzioni con la stessa tendenza sono lo stesso errore, anche se una riguarda un titolo e l'altra un'icona, e anche se Claude ne attribuisce l'origine a cause diverse.
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
- Da `~/.claude/skills/` la lettura della memoria chiedeva un permesso; con la regola `Read(~/.claude/skills/design-evolutivo/**)` non lo chiedeva più.
- Il promemoria compare nei progetti con `DESIGN.md` e non negli altri.
- `strumenti/contrasto.mjs` dà gli stessi rapporti calcolati a mano per gli 8 siti (10,01:1 per Dishoom, 1,85:1 per il menta di Montenellago, 2,74:1 per il corallo di okomedia).
- `strumenti/misura-pagina.js`, provato su una pagina di prova con difetti noti, a 1440 e a 375 px: trova zoom bloccato, scorrimento orizzontale solo a 375 px, testi sotto il contrasto minimo (raggruppati per colore, dal peggiore), emoji usate come icone, gradiente viola, tre card uguali con ombra, 10 voci di menu e il paragrafo da 155 caratteri per riga. Durante la prova ho scoperto che in emulazione mobile la larghezza della finestra cresce fino al contenuto: ora lo script usa la larghezza visibile.
- **Modalità rivedi**, in una sessione nuova (`/design-evolutivo rivedi index.html e stile.css`) sulla pagina di prova: ha caricato la memoria, ha calcolato i contrasti con lo strumento, ha distinto letto, calcolato e ipotesi, e ha trovato tutti i difetti che avevo inserito apposta (zoom, contrasti, riflusso, 10 voci di menu, bersagli piccoli, emoji, gradiente viola, card con ombra, testi generici, paragrafo lungo e centrato…), citando WCAG, principi U1–U12 e le regole R-001, R-002, R-003. Più altri problemi reali che non avevo previsto (titoli senza h2, font dichiarato ma non caricato, nessuno stato di focus). Ha chiuso con "Quali correggo?".
- L'apprendimento tra sessioni è stato provato il giorno dopo: vedi qui sotto.

### Prova di apprendimento (17/10/2026, Claude Code 2.1.302, base v0.8)
Tre progetti finti (pasticceria, app di una palestra, app di una biblioteca), 7 sessioni nuove e non interattive, con la memoria sotto git per vedere cosa cambiava dopo ogni sessione. I risultati segnati "(v0.10)" vengono dalla seconda prova, qui sotto.

| Prova | Esito |
|---|---|
| 1. Memoria tra sessioni | **riuscita**. "Mai testo tutto maiuscolo nei pulsanti" è diventata subito una regola (nella prova aveva il numero R-019; nella memoria iniziale R-019 ora è un'altra regola, quella sullo stile da gioco). Nei due progetti successivi è stata caricata e controllata con una ricerca nei file. |
| 2. Generalizzazione | **fallita con la v0.8, riuscita dopo la correzione.** Dopo "il titolo è enorme" e poi "le icone sono troppo grosse", la v0.8 ha aperto una classe nuova invece di riconoscere lo stesso errore, perché ha attribuito ai due errori cause diverse. Corretto il metodo: la firma è la tendenza, la causa non decide più. Nella riprova le due correzioni sono diventate la stessa classe e una regola è nata alla seconda occorrenza (nella prova R-020; nella memoria iniziale non c'è). Non provata la terza fase: un caso nuovo intercettato da sola. |
| 3. Ambito | **riuscita (v0.10)**: "qui niente verde, è il colore del concorrente" è rimasto un vincolo del solo progetto (`DESIGN.md`, Eccezioni locali, che ora si chiama "Regole ed eccezioni di questo progetto"); nel progetto successivo il verde non era vietato. |
| 4. Escalation | non provata: serve un errore che si ripete davvero nonostante una regola attiva. |
| 5. Novità | **riuscita** per quanto si vede nei registri: ogni progetto ha cambiato direzione rispetto al precedente, e una direzione è stata scartata perché violava una regola. |
| 6. Trasparenza | **riuscita**: "cosa sai del mio gusto?" dà un riassunto corretto e completo, con le prove. **(v0.10)** "dimentica…" ha spostato la regola tra le ritirate, con il motivo e una riga nel diario. |

Altre cose viste:
- Osservato con Claude Code 2.1.302 in sessioni non interattive, con Write ed Edit consentiti da riga di comando (`--allowedTools`) e la modalità `acceptEdits`: la scrittura nella memoria in `~/.claude/skills/` non è stata bloccata. La documentazione letta il 17/10/2026 dice invece che in `acceptEdits` le scritture in `.claude`, che è una cartella protetta (con alcune eccezioni, elencate solo in parte), chiedono sempre il permesso, e che le regole nelle impostazioni non bastano a evitarlo; del flag `--allowedTools` non dice nulla. Da verificare, anche in una sessione interattiva. Dalla v0.12 la memoria è fuori da `~/.claude`, quindi conta solo per le vecchie copie.
- La verifica non annotava quali osservazioni aveva controllato. Ora `processo/verifica.md` lo chiede.
- Una volta non è stata scritta la riga nel diario dopo una regola nuova. Una volta il numero di versione è cambiato fuori dal consolidamento. Ora `SKILL.md` e `processo/evoluzione.md` lo dicono in modo esplicito.
- Costo: da 0,30 a 0,87 $ e da 40 secondi a 4 minuti per sessione; circa 4,7 $ in tutto.

### Seconda prova (17/10/2026, base v0.10)
Dopo il tuo giudizio ("troppo bambinesche"), 4 sessioni nuove su due progetti:
- **Palestra rifatta da zero con R-019:** pesi leggeri, niente blocchi né contorni pesanti. La verifica ha controllato E-001 e lo ha scritto nel registro, e ha segnalato da sola il punto al limite: i pulsanti pieni.
- **Ambito:** il vincolo di colore è rimasto nel suo progetto. La skill ne ha ricavato un'osservazione, E-002 (numero della prova; nella memoria iniziale non c'è): "se il brief non dice quali colori evitare, chiedilo". Nel progetto successivo l'ha applicata, scrivendo in `DESIGN.md` che i colori andavano confermati.
- **Ottica con clienti over 60:** ha adattato R-019 al pubblico, senza pesi troppo sottili per chi ha la vista stanca.
- **"Dimentica…":** riuscito.
- **Costo:** circa 3,8 $ per le 4 sessioni.

## Limiti
- Se hai molte skill installate, Claude Code accorcia le descrizioni nell'elenco: per questo quella di questa skill mette all'inizio le parole chiave (interfacce, siti, app, schermate).
- Se la skill non si attiva, quella sessione non impara. Rete di sicurezza facoltativa: aggiungi a `~/.claude/CLAUDE.md` la riga
  `Per qualsiasi lavoro su interfacce usa la skill design-evolutivo. Regole di design apprese: @~/design-evolutivo-memoria/regole-apprese.md`
  Le regole verranno caricate in ogni sessione. Eccezione: nelle sessioni Cowork dell'app desktop gli import fuori dalla cartella di lavoro vengono saltati.
- L'astrazione la fa Claude e può sbagliare, generalizzando troppo o troppo poco. Per questo annuncia ogni cosa che impara: correggerla ti costa una parola.
- Una regola letta riduce gli errori ma non li azzera: per questo esistono i livelli controllo, vincolo e automatico.
- La memoria automatica di Claude Code vale per un solo repository; questa vale per tutti i progetti. La skill dice a Claude di mettere qui il gusto e gli errori di design.
- Nelle sessioni cloud la skill non c'è (vedi "Primo uso").
- Della v0.12 non sono ancora provati in una sessione vera: l'installazione dal catalogo, le tre regole dei permessi (in particolare il percorso della cartella del plugin) e la prima copia della memoria.
- È un sistema nuovo: finché non passa le prove qui sopra, è un'ipotesi ben costruita.

## Struttura
```
design-evolutivo/          la skill: nel repository è plugins/design-evolutivo/skills/design-evolutivo/,
                           con la copia è ~/.claude/skills/design-evolutivo/. Si legge e basta
  SKILL.md                 istruzioni per Claude: dove sono i file, modalità, regola d'oro, ciclo, flusso di creazione
  README.md                questo file
  STORIA.md                come è nata la skill, versione per versione
  processo/
    analisi.md             come inizia un progetto: stakeholder, priorità, domande, piano a pezzi
    rifinitura.md          guardare la pagina a schermo, togliere il superfluo, curare i dettagli
    verifica.md            cosa controlla prima di consegnare (il critico in versione rapida)
    evoluzione.md          come impara: feedback, astrazione, soglie, livelli, consolidamento
    direzioni.md           come propone: 5 geni, 3 direzioni, operatori, distanza adattiva
    rivedi.md              come rivede: prove, quattro lenti, gravità, rapporto, cosa impara
    migliora.md            come corregge dopo una revisione
    valuta.md              come dà un voto: tre assi, ancore, prove
    studia.md              come analizza un sito che ti piace
    esempio-ciclo.md       un esempio completo su tre progetti
  memoria-iniziale/        la memoria di partenza, copiata al primo uso; qui non cambia
    profilo-gusto.md       tendenze per gene (ricavate dai tuoi 8 siti e confermate da te)
    regole-apprese.md      19 regole e 2 lezioni di processo, approvate da te
    catalogo-errori.md     classi d'errore (all'inizio: E-001, da cui nasce R-019)
    semi.md                idee tue e dei riferimenti
    diario-evoluzione.md   versioni e metriche
    registro/              il modello del registro e il registro generale con i tuoi giudizi
  modelli/DESIGN.md        modello del file da tenere in ogni progetto
  riferimenti/
    fondamenta.md          le regole del tuo corso unite: Nielsen, Shneiderman, Norman, Gestalt, Miller…
    tipografia-spaziatura.md  minimi verificati (WCAG, Android, Material), dettagli fini dell'italiano, scelta dei font
    colore.md              come si costruisce e si motiva una palette, contrasti, tema scuro
    immagini.md            immagini, foto e icone; cosa fare quando mancano le foto vere
    movimento-stati.md     movimento, stati e "riduci movimento"
    app-mobile.md          linee guida iOS e Android
    esempi/                gli 8 siti analizzati (desktop e mobile) e il loro indice
  strumenti/
    contrasto.mjs          rapporto di contrasto WCAG tra due colori (Node)
    misura-pagina.js       misure di una pagina aperta in un browser
    guarda.mjs             foto e misure di una pagina a 375, 320 e 1440 px, in scuro e sfocata (serve Playwright)
    memoria.mjs            crea la memoria al primo uso, importa una vecchia memoria, dice dov'è (Node)

~/design-evolutivo-memoria/   la memoria viva, fuori dalla skill: cambia con l'uso
  profilo-gusto.md  regole-apprese.md  catalogo-errori.md  semi.md  diario-evoluzione.md
  registro/                un file per progetto, con le tue parole esatte
  esempi/                  i siti che fai studiare alla skill, con il loro 00-indice.md
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
