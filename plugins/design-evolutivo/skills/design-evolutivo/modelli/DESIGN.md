# DESIGN.md · <nome del progetto>
File del progetto, da tenere nella sua cartella principale. La skill design-evolutivo lo legge a ogni sessione: contiene le decisioni e i vincoli di questo progetto, così il lavoro resta coerente tra una sessione e l'altra.

## Brief
- Tipo di progetto (e-commerce, portfolio, app di servizio…):
- Chi lo usa (età, familiarità con il digitale, conoscenza del tema):
- Quanto possono essere complessi i testi, di conseguenza:
- Per fare cosa:
- Dove (piattaforme, schermi):
- Tono:
- Contenuti veri disponibili:
- Immagini: ci sono foto vere? chi le fornisce? a cosa servono (prodotto, luogo, persone, nessuna)?
- Vincoli (brand, tecnologia, tempi):

## Analisi (`processo/analisi.md`)
- Stakeholder: chi · cosa vuole · eventuali conflitti
- Compiti e priorità: compito · essenziale | importante | marginale | fuori (con il motivo)

## Piano a pezzi
Approvato dall'utente il: AAAA-MM-GG
| # | Pezzo | Priorità | Stato (da fare · in corso · consegnato · approvato) |
|---|---|---|---|
| 1 | … | essenziale | da fare |

## Direzione scelta
- Nome, data, registro: `memoria/registro/<file>`
- Concetto in una frase (cosa rende riconoscibile questo progetto):
- G1 Struttura:
- G2 Tipografia:
- G3 Colore:
- G4 Ritmo:
- G5 Voce: testo · immagini (tipo, soggetto, trattamento) · movimento e momento firma

## Token (vincoli di livello L4)
Solo questi valori sono ammessi; la verifica controlla che il codice usi questi e nient'altro. Ogni riga dice il ruolo di ogni valore e il motivo legato al brief; un minimo preso da una fonte la cita.
- Tipografia: famiglie (con il motivo, R-006) e carattere di riserva; gradini della scala, ognuno con il suo ruolo e il motivo del salto; pesi; interlinea e tracking per ruolo; misura massima della riga
- Colori: ruolo → valore chiaro / valore scuro (se c'è il tema scuro), con i contrasti calcolati in tutti e due; origine e ruoli dell'accento (`riferimenti/colore.md`)
- Spaziature: base e valori ammessi; spazio dentro i gruppi e spazio tra i gruppi
- Linee, raggi, ombre: spessori, raggi e ombre per ruolo (struttura, campi, stato e focus) e dove si usano
- Immagini: ruolo, rapporti, taglio, trattamento, provenienza (vere · da scattare · segnaposto); se mancano, la lista degli scatti (`riferimenti/immagini.md`)
- Icone: set e licenza, tratto, dimensioni, dove sì e dove no
- Microtipografia: apostrofi e virgolette, formato di ore, date e intervalli, spazi non separabili (`riferimenti/tipografia-spaziatura.md` §6)
- Larghezze: dalla più stretta (320 px, WCAG 2.2, 1.4.10) alla più larga; larghezza massima del contenuto e cosa succede oltre
- Movimento: vedi "Movimento e stati"

## Movimento e stati (`riferimenti/movimento-stati.md`)
- Durate e curve ammesse (vincolo L4): nome · valore · uso · motivo (oppure "da Material")
- Momento firma: cosa si muove, quando, quale idea racconta (oppure "nessuno")
- Altri movimenti, uno per riga: chi lo avvia (tocco, scorrimento, caricamento…) · cosa si muove e in che ordine · cosa resta con "riduci movimento"
- Stati (R-018): fatti · varianti statiche (`#…`) · mancanti, con il motivo

## Regole ed eccezioni di questo progetto
Vincoli nati da "solo qui" o da motivi del progetto (brand, concorrenza, cliente) e regole della memoria sospese di proposito per tutto il progetto, sempre con il motivo. La verifica li controlla come le regole della memoria.
- AAAA-MM-GG · regola · Controllo: … · Perché: "parole dell'utente"
- AAAA-MM-GG · R-… sospesa · motivo

## Decisioni
Ogni scelta comune usata di proposito (un font molto diffuso, un layout classico…) e ogni eccezione puntuale a una regola che vieta ha qui il suo motivo legato al brief: è la lezione di processo "niente di standard per abitudine". Un numero presentato come soglia ha la sua fonte; altrimenti è una scelta di progetto o "non verificato".
- AAAA-MM-GG · decisione · motivo

## Prove a schermo (`processo/rifinitura.md`)
- AAAA-MM-GG · larghezze guardate · cosa è stato corretto guardando
