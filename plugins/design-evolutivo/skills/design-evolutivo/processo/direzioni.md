# Direzioni: come proporre cose nuove

Leggi questo file quando devi proporre direzioni per un progetto nuovo o un restyling. Leggi anche `memoria/semi.md`, i genomi e le impronte degli ultimi progetti chiusi in `memoria/registro/`, `riferimenti/esempi/00-indice.md` e `memoria/esempi/00-indice.md` (i siti studiati dall'utente, se ci sono).

## 1. Il genoma: 5 geni
Ogni direzione si descrive con 5 geni, le stesse 5 dimensioni della libreria di esempi (`riferimenti/esempi/00-indice.md`, §1). Un gene è diverso se cambia la scelta (un'altra famiglia di caratteri, un'altra temperatura di colore, un altro impianto), non solo un valore o le parole.

| Gene | Cosa decide |
|---|---|
| G1 Struttura | impianto della pagina o della schermata, griglia, navigazione, ordine dei blocchi |
| G2 Tipografia | famiglie, salti di scala, maiuscolo o minuscolo, tracking |
| G3 Colore | palette, temperatura, accento, base chiara o scura |
| G4 Ritmo | spaziature, densità, raggi, bordi o ombre |
| G5 Voce | in tre parti: testo (tono) · immagini (tipo, soggetto, trattamento) · movimento (dove, a cosa serve, momento firma) |

## 2. Tre direzioni
| | Ruolo | Come nasce | Vincolo di novità |
|---|---|---|---|
| **A Sicura** | sfruttare ciò che si sa | profilo di gusto + regole apprese + brief | cambia almeno 1 gene rispetto al progetto precedente e ai riferimenti da cui prende (§6) |
| **B Vicina** | migliorare a piccoli passi | A con 1–2 geni cambiati da un operatore (§3), di solito con un seme | — |
| **C Lontana** | esplorare | almeno 3 geni diversi da A, almeno 1 gene mai usato nei registri; operatore di trasferimento, vincolo, inversione o esagerazione | diversa in almeno 3 geni da ciascuno degli ultimi 5 progetti chiusi |

Tutte e tre rispettano fondamenta e regole apprese: la novità sta dentro i vincoli, non contro di essi.

Scheda di ogni direzione (massimo 8 righe):
- nome (2–3 parole) e concetto in una frase legata al brief;
- G1–G4, una riga ciascuno; G5 in una riga di tre parti: testo · immagini · movimento, con il **momento firma** (cosa si muove, quando e quale idea racconta, oppure "nessuno" con il motivo);
- operatore usato e origine (profilo, seme S-…, riferimento, dominio esterno);
- rischio: cosa potrebbe non piacere.

Se puoi, accompagna le schede con un'anteprima piccola di ogni direzione: lo stesso pezzo con lo stesso contenuto (per esempio la parte alta della schermata principale a 375 px), nel rispetto di fondamenta e regole. Così l'utente confronta caratteri, colori, spazi e movimento invece di immaginarli. Se non puoi, dillo.

L'utente può scegliere, scartare o mescolare ("A con il colore di C"). Registra tutto nel registro del progetto: la scelta è un dato. Quando i token sono fissati in `DESIGN.md` (passo 3 di SKILL.md), scrivi nel registro la riga "Impronta" sotto "Genoma scelto", con i valori veri (fondo, accento, famiglie, bordi, raggi, immagini). Se cambiano, aggiornala prima della Chiusura.

Se nessuna piace: chiedi quale gene non funziona (basta una parola per gene, es. "struttura ok, colore no"), tieni i geni promossi, cambia quelli bocciati e proponi una **nuova generazione** di 3 direzioni. Nel registro diventa "Generazione 2", con il motivo: i geni bocciati sono segnali utili quanto quelli scelti.

## 3. Operatori di variazione
| Operatore | Come funziona | Esempio |
|---|---|---|
| Mutazione | cambia un gene con un valore mai usato | stesso impianto, ma tipografia tutta in maiuscolo tracciato |
| Incrocio | combina geni di due fonti lontane | la sobrietà di colore e ritmo di Duca Pipe con la voce giocosa di SBC |
| Trasferimento | importa un principio da un dominio fuori dal web legato al brief | sito di una cantina: la gerarchia di un'etichetta di vino; app di trasporti: la segnaletica |
| Vincolo | aggiunge un limite che costringe a inventare | una sola dimensione di testo; niente card; solo due colori |
| Inversione | rovescia un'abitudine | navigazione in basso; prima il testo e poi l'immagine; base scura |
| Esagerazione | porta un solo gene all'estremo | spazio bianco enorme; densità da quotidiano |

## 4. Idee "dal nulla"
Nemmeno qui le idee nascono dal nulla: nascono da combinazioni, trasferimenti, vincoli e inversioni usati con intenzione. Ciò che rende il sistema creativo nel tempo è la **ritenzione**: un'idea nata nella direzione C e scelta dall'utente diventa un seme in `memoria/semi.md` (sezione "Nati nei progetti") e può tornare, mutata, nei progetti futuri. Così il repertorio cresce con idee che non c'erano in nessun riferimento iniziale.

Quando generi C, parti da un dominio esterno al web e scrivi da quale oggetto reale viene l'idea.

## 5. Distanza adattiva dell'esplorazione
La sezione Esplorazione di `memoria/profilo-gusto.md` tiene la distanza attuale di C (numero di geni cambiati, da 3 a 5) e le scelte degli ultimi 5 progetti. Si aggiorna nel consolidamento (`evoluzione.md` §8), dalle scelte scritte nel registro.
- C, o un suo gene preso in prestito, scelta almeno 2 volte negli ultimi 5 progetti → aumenta la distanza (un gene in più o un dominio più lontano).
- C mai scelta negli ultimi 5 → riduci la distanza di 1 (minimo 3) o cambia operatore.
- C non si elimina mai: senza esplorazione il sistema converge e ripete.

Ispirazione: la regola di 1/5 delle strategie evolutive, che adatta l'ampiezza dei passi al tasso di successo.

## 6. Controllo di novità
Prima di presentare, confronta A, B e C con gli ultimi 5 progetti chiusi del registro (con la sezione Chiusura compilata, cioè con una data vera e le parole dell'utente: non il progetto in corso né il registro generale) e con i riferimenti e i semi da cui prendi un gene. Il "progetto precedente" del §2 è il più recente di questi. Se non c'è un progetto precedente, vale solo il confronto con i riferimenti. Due controlli:
1. **Geni**: verifica i vincoli del §2.
2. **Impronta**: confronta i valori concreti (fondo, accento, famiglie, bordi, raggi, immagini) con le righe "Impronta" dei registri. Un gene descritto con parole nuove ma con gli stessi valori non è cambiato. Se un valore torna uguale o molto vicino (stessa famiglia di colore, stesso font), scrivi in `DESIGN.md` (Decisioni) il motivo legato al brief, oppure cambialo.

Non contano come abitudine i valori che vengono da una tendenza confermata del profilo (per esempio i raggi piccoli) o da un vincolo del brief. Il vincolo resta 1 gene su 5 (§2): l'impronta serve solo a misurarlo con i valori. Un registro vecchio senza Impronta: ricavala dal `DESIGN.md` del progetto (la cartella è scritta nel registro); se non puoi, salta quel progetto e dillo.
Se i vincoli non sono rispettati, cambia la direzione, non il vincolo.

## 7. Contro il default
Per ogni gene di A scrivi prima due cose: la scelta più ovvia per quel tipo di progetto e la scelta che hai fatto più spesso nel registro. Se una delle due coincide con la tua, giustificala con il brief o cambiala, salvo che venga da una tendenza confermata del profilo. Così si evitano i default comuni (anche i "Default da evitare" di `regole-apprese.md`) e le abitudini della skill stessa: è il rimedio alla causa C1 (`evoluzione.md` §6.2).
Vale anche per il movimento (per esempio: comparsa in dissolvenza di ogni blocco, card che si alzano al passaggio del mouse).
