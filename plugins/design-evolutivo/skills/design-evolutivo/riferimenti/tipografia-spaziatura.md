# Tipografia e spaziatura: cosa dicono le fonti e cosa decide il progetto

Leggi questo file al passo 3 del flusso di creazione (fondamenta e token) e quando rivedi tipografia o spaziature.

## 1. Il principio
Le fonti ufficiali danno **minimi di accessibilità** e **valori predefiniti di piattaforma**. Non indicano una scala tipografica o una griglia "giusta". Scala e griglia sono scelte di progetto:
- nascono dal brief e dal tono;
- si scrivono come token in `DESIGN.md`, dove diventano vincoli L4;
- si giustificano, come chiede la lezione di processo "niente di standard per abitudine".

## 2. Minimi verificati (web)
| Criterio | Cosa chiede | Conseguenza per il progetto |
|---|---|---|
| WCAG 2.2, 1.4.12 Spaziatura del testo (AA) | Se chi usa la pagina imposta interlinea ≥ 1,5 volte il corpo, spazio dopo i paragrafi ≥ 2 volte il corpo, spazio tra le lettere ≥ 0,12 volte e spazio tra le parole ≥ 0,16 volte, non si perde né contenuto né funzione. | Non obbliga a usare questi valori, ma il layout deve reggerli: niente altezze fisse sui contenitori di testo, niente testo tagliato con `overflow: hidden`. |
| WCAG 2.2, 1.4.8 Presentazione visiva (AAA) | Al massimo 80 caratteri per riga; interlinea ≥ 1,5; spazio tra paragrafi ≥ 1,5 volte l'interlinea. | Obiettivo per i testi lunghi (`processo/verifica.md`). |
| WCAG 2.2, 1.4.4 Ridimensionamento del testo (AA) | Testo ingrandibile al 200 % senza perdite. | Unità relative (`rem`) per il testo; zoom mai bloccato. |

## 3. Valori di piattaforma verificati
| Piattaforma | Valore | Fonte |
|---|---|---|
| Android | "Android UI utilizes an 8 dp grid for layout, components, and spacing". Icone, testo e piccoli elementi dentro i componenti stanno meglio su una griglia di 4 dp; "If using a baseline grid, stick to measurements of 4 and 8". | Android, Grids and units |
| Android | 1 dp è circa 1 px su uno schermo a 160 dpi; dp = larghezza in pixel × 160 ÷ densità. | Android, Grids and units |
| Android | Spaziatura coerente tra elementi dello stesso tipo: spaziarli in modo incoerente rende il design casuale. | Android, Layout basics |
| Material 3 | Scala tipografica (dimensioni e pesi): Display 57, 45, 36 sp; Headline 32, 28, 24; Title 22, 16, 14; Body 16, 14, 12; Label 14, 12, 11. Interlinea e tracking non sono indicati nella fonte letta. | Material Components Android, Typography |
| iOS | Testo predefinito 17 pt, minimo 11 pt; ingrandimento con Dynamic Type almeno al 200 %. | `riferimenti/app-mobile.md` |
| Web | Nessuna griglia né scala ufficiale. | — |

## 4. Cosa si decide nel progetto (non sono standard)
- **Scala tipografica.** Pochi gradini, ognuno con un ruolo preciso (titolo, sezione, corpo, nota). Il salto tra un gradino e l'altro lo decide il tono: salti forti per un tono espressivo, salti leggeri per un'interfaccia densa. Le scale "modulari", con un rapporto fisso tra i gradini, sono una convenzione diffusa, non una regola. Il profilo dell'utente chiede 1–2 famiglie e un solo gesto forte (G2); la regola R-019 chiede pesi leggeri ed eleganza, salvo un brief giocoso.
- **Griglia di spaziatura.** Nelle app Android, la griglia di 8 e 4 dp è la convenzione della piattaforma. Sul web e su iOS una base di 4 o 8 è una scelta ragionevole ma non obbligatoria **(mia scelta, non verificata)**. Vale sempre la Gestalt della vicinanza: lo spazio tra elementi collegati è minore dello spazio tra gruppi diversi (`riferimenti/fondamenta.md` §3).
- **Interlinea.** Per i testi lunghi l'obiettivo è ≥ 1,5 (1.4.8). Per i titoli grandi si usa spesso un'interlinea più stretta: è una convenzione tipografica, non verificata.

## 5. Come si scrive nel progetto
In `DESIGN.md`, sezione Token, con il motivo legato al brief:
- la scala tipografica: i gradini e il ruolo di ciascuno;
- la griglia di spaziatura: la base e i valori ammessi;
- le interlinee per ruolo;
- la misura massima di riga per i testi lunghi.

La verifica (L4) controlla poi che il codice usi solo quei valori.

## 6. Non letto o non verificato
- Apple HIG, pagine Typography e Layout: si leggono solo con JavaScript e qui non c'era un browser. I valori iOS vengono da `app-mobile.md`, letti il 16/10/2026.
- Material 3: le pagine di m3.material.io non erano raggiungibili da questo ambiente, quindi interlinea e tracking della scala non sono verificati.
- Il sito w3.org non era raggiungibile: il testo di 1.4.12 l'ho letto dal repository ufficiale del W3C su GitHub (w3c/wcag).
- L'intervallo di 45–75 caratteri per riga, citato spesso, non è stato verificato e non è uno standard.

## Fonti (lette il 17/10/2026)
- W3C, WCAG 2.2, [Understanding 1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html), letto dal file `understanding/21/text-spacing.html` del repository w3c/wcag
- Android, [Grids and units](https://developer.android.com/design/ui/mobile/guides/layout-and-content/grids-and-units) · [Layout basics](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-basics)
- Material Components Android, [Typography](https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md)
