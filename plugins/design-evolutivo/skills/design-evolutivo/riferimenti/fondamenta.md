# Fondamenta: le regole di base del design di interfacce

Raccoglie in un'unica lista le regole del corso di interazione uomo–macchina dell'utente: le 10 euristiche di Nielsen, le 8 regole d'oro di Shneiderman, i 7 principi di Norman, la Gestalt, Miller, l'automazione, l'architettura dell'informazione e la tassonomia delle regole.
Leggi questo file quando rivedi o valuti un design, o quando una scelta è in dubbio. Le soglie numeriche verificate sono in `processo/verifica.md` §1, in `riferimenti/esempi/00-indice.md` §3 e in `riferimenti/app-mobile.md`.

## 1. Tassonomia delle regole e conflitti
| Tipo | Cos'è | Autorità e generalità | Esempi |
|---|---|---|---|
| Standard | stabiliti da organismi nazionali o internazionali per la conformità di una larga comunità; teoria solida, cambiano lentamente | autorità alta, dettaglio basso | WCAG 2.2 (W3C); ISO 9241, che definisce l'usabilità come efficacia, efficienza e soddisfazione |
| Linee guida | da libri di testo e articoli, più generali e suggestive: astratte (prime fasi del progetto) o dettagliate, cioè guide di stile (fasi successive) | autorità media | Apple Human Interface Guidelines, Material Design |
| Principi | regole astratte che danno una comprensione generale; tre famiglie: apprendibilità, flessibilità, robustezza | autorità bassa, generalità alta | euristiche di Nielsen, regole d'oro di Shneiderman, principi di Norman |
| Pattern | soluzioni riuscite a problemi ricorrenti in contesti specifici, collegate in linguaggi di pattern (nati in architettura con Christopher Alexander) | dettaglio alto | "Torna indietro verso un posto sicuro" |

Le tre famiglie di principi:
- **apprendibilità**: quanto facilmente chi è nuovo inizia a interagire in modo efficace e arriva alla massima prestazione;
- **flessibilità**: la molteplicità di modi in cui utente e sistema si scambiano informazioni;
- **robustezza**: il supporto dato all'utente per portare a buon fine un'attività diretta a uno scopo.

**In caso di conflitto** vince il livello più alto: standard > linee guida di piattaforma > principi > regole apprese dall'utente > tendenze del profilo > pattern e semi. A parità di livello, vince la regola più specifica per il contesto.

## 2. Principi unificati
Le tre liste si sovrappongono: qui sono unite in 12 principi. Fonti: N = Nielsen (1–10), S = Shneiderman (1–8), Norman = i 7 principi di *La caffettiera del masochista*.

| # | Principio | Domanda di revisione | Cosa guardare | Fonti |
|---|---|---|---|---|
| U1 | Stato visibile e feedback | So sempre cosa sta succedendo e cosa ha prodotto la mia azione? | caricamenti, conferme, voce attiva nel menu, risposta a ogni tocco | N1, S3, Norman: feedback |
| U2 | Il linguaggio del mondo reale | Parole, icone e ordine sono quelli di chi usa il prodotto? | gergo, icone ambigue, ordine logico; mappature naturali tra comandi ed effetti | N2, Norman: modello concettuale, mappature |
| U3 | Controllo e libertà | Posso annullare, tornare indietro, uscire, decidere io? | annulla, indietro, chiudi, azioni automatiche non richieste | N3, S6, S7 |
| U4 | Coerenza e standard | Lo stesso elemento appare e funziona sempre allo stesso modo? Rispetto le convenzioni della piattaforma? | componenti, termini, posizioni, convenzioni web, iOS, Android | N4, S1 |
| U5 | Prevenire gli errori | Il design rende difficile sbagliare? | vincoli, conferme per azioni distruttive, valori predefiniti sensati, formati chiari | N5, S5, Norman: vincoli |
| U6 | Riconoscere anziché ricordare | Devo ricordare qualcosa da una schermata all'altra? | opzioni visibili, etichette, riepiloghi; gruppi di voci entro 7±2 | N6, S8, Miller |
| U7 | Flessibilità ed efficienza | Chi è nuovo non si perde e chi è esperto ha scorciatoie? | percorsi rapidi, impostazioni, accessibilità per persone e contesti diversi | N7, S2 (usabilità universale; nelle prime edizioni: scorciatoie per utenti frequenti) |
| U8 | Essenzialità | Ogni elemento serve? Emerge ciò che conta? | decorazioni, testo superfluo, gerarchia | N8 |
| U9 | Recuperare dagli errori | Il messaggio dice cosa è successo, perché e come rimediare, con parole semplici? | messaggi d'errore, stati vuoti, campi con errore | N9 |
| U10 | Aiuto e documentazione | Trovo aiuto nel punto in cui mi serve? | aiuti contestuali, guide brevi orientate al compito | N10 |
| U11 | Chiusura | Le sequenze hanno un inizio, uno svolgimento e una fine chiara? | flussi a passi, conferme finali, "fatto" | S4 |
| U12 | Scopribilità, affordance e significanti | Si capisce cosa si può fare e dove? | elementi cliccabili riconoscibili, azioni nascoste solo in gesti o hover | Norman: scopribilità, affordance, significanti |

Copertura: Nielsen 1–10 in U1–U10; Shneiderman 1–8 in U1, U3–U7, U11; i 7 principi di Norman (scopribilità, feedback, modello concettuale, affordance, significanti, mappature, vincoli) in U1, U2, U5, U12.

## 3. Percezione e cognizione
- **Gestalt**: l'occhio raggruppa per **vicinanza** (ciò che è vicino sembra collegato), **somiglianza** (stesso colore, forma o dimensione = stessa funzione), **chiusura** (completa le forme), **continuità** (segue linee e allineamenti), **figura/sfondo** (distingue l'oggetto dal fondo), **regione comune** (ciò che sta nello stesso contenitore va insieme). Domanda: i raggruppamenti visivi coincidono con quelli di significato?
- **Miller, 7±2**: non sovraccaricare la memoria di lavoro con troppi elementi non raggruppati. Raggruppa (chunking) e mostra il resto su richiesta.
- **Hick**: più alternative ci sono, più tempo serve per scegliere. Poche scelte per ogni decisione, le altre raggruppate o rimandate.
- **Fitts**: un bersaglio si raggiunge più in fretta se è grande e vicino. Su mobile le azioni frequenti stanno grandi e nella zona del pollice.

## 4. Sistemi proattivi e automazione
Nelle interfacce che anticipano l'utente o usano interazione implicita:
- **ridurre il disallineamento di consapevolezza** (awareness mismatch): rendere comprensibili le dimensioni e i valori del contesto che il sistema usa ("ti mostro questo perché…");
- **verificare se l'automazione totale è davvero la scelta migliore**, o se lasciare all'utente scelta e controllo.
Domanda: l'utente sa cosa il sistema ha dedotto su di lui e può correggerlo? (Vale anche per questa skill: per questo ogni cosa imparata si annuncia ed è modificabile.)

## 5. Architettura dell'informazione
- **Schemi esatti** (alfabetico, cronologico, geografico): ideali quando l'utente sa cosa cerca; facili da mantenere.
- **Schemi ambigui** (tematico, per compito, per pubblico, per metafora): utili quando l'utente non sa esattamente cosa cerca, ma difficili da mantenere nel tempo: ogni nuovo contenuto va classificato.
- Errore da evitare: uno schema ambiguo **non presidiato**, cioè senza criteri di classificazione chiari e senza qualcuno che lo mantenga. E non mescolare schemi diversi nello stesso elenco.
Domanda: lo schema scelto corrisponde a come l'utente cerca? Chi lo manterrà?

## 6. Scala di gravità per le revisioni
Scala di Nielsen: **0** non è un problema · **1** solo estetico: si corregge se avanza tempo · **2** minore: bassa priorità · **3** grave: alta priorità · **4** catastrofico: da correggere prima di pubblicare.
La gravità dipende da **frequenza** (quanto spesso capita), **impatto** (quanto è difficile superarlo) e **persistenza** (se si ripresenta ogni volta). Conta anche l'effetto sulla percezione del prodotto.

## Fonti
- [WCAG 2.2, criteri citati](https://www.w3.org/WAI/WCAG22/Understanding/): 1.4.3, 1.4.4, 1.4.6, 1.4.8, 1.4.10, 2.5.8
- [Nielsen Norman Group, gravità dei problemi di usabilità](https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/)
- Euristiche di Nielsen, regole d'oro di Shneiderman, principi di Norman, Gestalt, Miller, tassonomia delle regole (standard, linee guida, principi, pattern), awareness mismatch e schemi di architettura dell'informazione: dal corso di interazione uomo–macchina dell'utente.
