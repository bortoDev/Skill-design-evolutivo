# Valutare un design con un punteggio

Leggi questo file quando l'utente chiede un voto, un punteggio, un confronto tra versioni o "quanto è buono". Prima carica la memoria (`SKILL.md`, "Prima di ogni lavoro"): l'asse Gusto dipende da lei.

## 1. Tre assi, non un numero solo
Un numero unico nasconde i compromessi. Si valuta su tre assi, da 0 a 4 (4 = ottimo; al contrario della gravità delle revisioni, dove 4 = catastrofico):

| Asse | Domanda | Criteri |
|---|---|---|
| **Qualità** | Funziona per chi lo usa? | accessibilità · usabilità (principi U1–U12) · gerarchia e leggibilità · coerenza · adattamento (mobile, piattaforma, riflusso) · rifinitura (spazi, tipografia fine, immagini, stati, movimento: `processo/rifinitura.md`) |
| **Gusto** | Somiglia a ciò che l'utente vuole? | regole apprese rispettate · tendenze del profilo, oppure i geni scelti dall'utente se ha scelto B o C · nessun default usato senza un motivo scritto in `DESIGN.md` |
| **Novità** | Ha un'idea propria? | distanza dai default · distanza dai progetti precedenti (geni e impronta) · un'idea riconoscibile |

## 2. Ancore per ogni criterio
Per Gusto e per i criteri di Qualità, tranne la rifinitura:
- **4**: nessun problema rilevato e almeno una scelta esemplare;
- **3**: solo problemi di gravità 1–2;
- **2**: un problema di gravità 3, o molti di gravità 2;
- **1**: più problemi di gravità 3;
- **0**: un problema di gravità 4, o criterio ignorato.

Rifinitura: **4** nessun difetto visibile · **3** pochi difetti isolati · **2** difetti ripetuti · **1** difetti ovunque · **0** non curata.

Novità: **4** un'idea propria e riconoscibile, che non c'è nei progetti precedenti né nei riferimenti · **3** un'idea propria su un solo gene · **2** almeno 1 gene diverso, ma nessuna idea riconoscibile · **1** quasi uguale a un progetto precedente o a un riferimento · **0** copia.

Il voto di un asse è la media dei suoi criteri, arrotondata al mezzo punto. Ogni voto cita almeno una prova (V-NN, una misura, una regola): niente voto senza prova.

## 3. Limiti da dichiarare
- Con il profilo a confidenza bassa, l'asse Gusto è provvisorio: scrivilo.
- Se non hai guardato la pagina a schermo, il criterio rifinitura è provvisorio: scrivilo.
- Per il lavoro di altri, Novità misura solo la distanza dai default.
- Le schede registrate prima della v0.12 non hanno la rifinitura: per confrontarle usa i criteri in comune.
- Due valutazioni dello stesso design possono non coincidere: usa i voti per confrontare versioni nella stessa sessione e per seguire l'andamento nel tempo, non come verità assoluta.

## 4. Scheda
| Asse | Voto (0–4, 4 = ottimo) | Criteri | Prove principali |
|---|---|---|---|
| Qualità | 2,5 | accessibilità 2 · usabilità 3 · gerarchia 2 · coerenza 3 · adattamento 2 · rifinitura 2 | V-01, V-03, V-05 |
| Gusto | 2 (provvisorio) | regole 1 · tendenze 3 · default 2 | R-001, R-003 |
| Novità | 1,5 | default 1 · progetti precedenti 2 · idea 2 | — |

Poi chiedi: "Che voto daresti tu?" Se l'utente risponde, registra la differenza nel registro: la distanza tra il tuo voto e il suo misura quanto il critico conosce il suo gusto.
Registra la scheda nel registro del progetto: l'andamento dei voti tra le versioni è l'evoluzione resa visibile.
