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
| Material 3 | Scala (sp, corpo / interlinea): Display 57/64, 45/52, 36/44; Headline 32/40, 28/36, 24/32; Title 22/28, 16/24, 14/20; Body 16/24, 14/20, 12/16; Label 14/20, 12/16, 11/16. Pesi: Title M e S e tutti i Label in Medium, gli altri Regular. | token di material-web (v0.192) e di Material Components Android (34.0.0) |
| Material 3 | Tracking in px (calcolo dai token: rem × 16, oppure em × corpo): Body L 0,5, M 0,25, S 0,4; Label L 0,1, M e S 0,5; Title M 0,15, S 0,1; Display L −0,25; gli altri 0. Compose Material 3 cambia 3 valori (Title M 0,2; Body M 0,2; Display L −0,2); l'interlinea è uguale ovunque. | idem; Compose Material 3, `TypeScaleTokens` (androidx) |
| iOS | Testo predefinito 17 pt, minimo 11 pt, anche per i font personalizzati; idealmente ingrandibile almeno al 200 % (Dynamic Type). | Apple HIG, Typography e Accessibility |
| iOS | Dynamic Type, Body: da 14/19 pt (taglia più piccola) a 23/29 (più grande), fino a 53/62 nelle taglie di accessibilità; Large Title da 31/38 a 40/48, fino a 60/70 (pt / interlinea). Tabella della taglia predefinita in `riferimenti/app-mobile.md` §4. | Apple HIG, Typography |
| iOS | Tracking dei font di sistema, in millesimi di em. SF Pro: positivo sotto 12 pt (+6 a 11), 0 a 12, negativo da 13 a 23 (−26 a 17), di nuovo positivo da 24 (+14 a 28–30, +12 a 34), 0 da 80. New York (serif): positivo sotto 15 pt, poi sempre più stretto (−4 a 17, −14 a 34, −16 a 96). SF Pro Rounded: mai negativo (+22 a 17 pt, 0 da 80). Nelle app lo applica il sistema; per altri font dipende dal carattere (ipotesi). In CSS: `letter-spacing` in em = valore ÷ 1000 (calcolo). | Apple HIG, Typography |
| iOS | Interlinea più ampia per colonne larghe e testi lunghi; mai stretta con tre o più righe. Nessun valore numerico. | Apple HIG, Typography |
| Web | Nessuna griglia né scala ufficiale. | — |

## 4. Cosa si decide nel progetto (non sono standard)
- **Scala tipografica.** Pochi gradini, ognuno con un ruolo preciso (titolo, sezione, corpo, nota). Il salto tra un gradino e l'altro lo decide il tono: salti forti per un tono espressivo, salti leggeri per un'interfaccia densa. Le scale "modulari", con un rapporto fisso tra i gradini, sono una convenzione diffusa, non una regola. Il profilo dell'utente chiede 1–2 famiglie e un solo gesto forte (G2); la regola R-019 chiede pesi più leggeri ed eleganza, salvo un brief giocoso (ma eleganza non vuol dire caratteri sottili: §7).
- **Livelli diversi, stili diversi.** Un titolo di sezione non ha dimensione, peso e font del contenuto che introduce; gli elementi dello stesso livello condividono lo stile.
- **Griglia di spaziatura.** Nelle app Android, la griglia di 8 e 4 dp è la convenzione della piattaforma. Sul web e su iOS una base di 4 o 8 è una scelta ragionevole ma non obbligatoria **(mia scelta, non verificata)**. Vale sempre la Gestalt della vicinanza: lo spazio tra elementi collegati è minore dello spazio tra gruppi diversi (`riferimenti/fondamenta.md` §3).
- **Interlinea.** Per i testi lunghi l'obiettivo è ≥ 1,5 (1.4.8). Per i titoli grandi si usa spesso un'interlinea più stretta: è una convenzione tipografica, non verificata.

## 5. Come si scrive nel progetto
In `DESIGN.md`, sezione Token, con il motivo legato al brief:
- la scala tipografica: i gradini e il ruolo di ciascuno;
- la griglia di spaziatura: la base e i valori ammessi;
- le interlinee per ruolo;
- la misura massima di riga per i testi lunghi;
- le scelte di microtipografia (§6).

La verifica (L4) controlla poi che il codice usi solo quei valori.

## 6. Dettagli fini (italiano)
Sono convenzioni tipografiche, non standard verificati: si scelgono una volta per progetto, si scrivono in `DESIGN.md` e si guardano nelle foto della rifinitura.
- **Apostrofo e virgolette**: nel testo visibile l'apostrofo tipografico ’ ("d’attesa"), non quello dritto '. Virgolette « » oppure “ ”, sempre le stesse. Nel codice (attributi, script) resta '.
- **Spazio non separabile** (`&nbsp;`) dove la riga non deve spezzarsi: "17&nbsp;ottobre", "ore&nbsp;9:30", "2&nbsp;posti", "€&nbsp;12", i gruppi di cifre di un numero di telefono.
- **Intervalli e formati**: la lineetta – senza spazi negli intervalli ("9:00–13:00"), oppure "dalle 9 alle 13"; un solo formato per ore e date in tutto il progetto. Il carattere … per i puntini, × per le misure.
- **Accenti**: È maiuscola, non E'; "perché" con é. Il font deve avere tutte le lettere accentate italiane.
- **A capo**: `text-wrap: balance` sui titoli e `pretty` sui paragrafi (CSS Text 4, bozza; supporto dei browser non verificato). `hyphens: auto`, con `lang="it"`, solo in colonne strette di testo lungo, mai nei titoli.
- **Cifre**: `font-variant-numeric: tabular-nums` dove i numeri si confrontano in colonna (orari, prezzi), se il font le ha.
- **Pesi veri**: carica solo i pesi che usi e metti `font-synthesis: none`, così il browser non inventa un grassetto o un corsivo che il font non ha.
- **Tracking**: positivo sul maiuscolo e sul testo piccolo (anche Apple allarga sotto i 12 pt, §3); sui titoli grandi dipende dal carattere. Negli esempi: Dishoom 0,18–0,25 em sul maiuscolo, okomedia −0,03 em sui titoli (`riferimenti/esempi/00-indice.md`).
- **Caricamento**: `font-display: swap`, il file principale precaricato (`<link rel="preload">`), i font sul proprio server (motivo: velocità e privacy, non verificato) e un font di riserva con proporzioni simili, che riduce il salto quando arriva il font vero.

## 7. Scegliere e abbinare i font
- Il font si sceglie per il progetto, con un motivo legato al brief (R-006); spesso nasce dal mondo del soggetto. Deve avere ciò che serve: i pesi della scala, il corsivo se c'è, le lettere accentate italiane, cifre adatte. Apple chiede poche famiglie senza dare un numero (Typography); il profilo ne chiede 1–2 (G2).
- Con due famiglie: diverse in una cosa sola (per esempio con e senza grazie) e simili nelle proporzioni. Due personalità forti litigano (scelta di progetto, non verificata).
- Un font "iperleggibile" è un'opzione, non una scelta automatica. Per un pubblico anziano o con la vista stanca la leggibilità viene soprattutto da dimensione, contrasto, interlinea e misura della riga: leggibile ed elegante si ottengono insieme.
- I font che tornano da un progetto all'altro li trova il controllo dell'Impronta (`processo/direzioni.md` §6, `processo/verifica.md` §3).
- **Eleganza non vuol dire caratteri sottili.** Apple consiglia in generale di evitare i pesi leggeri (Ultralight, Thin, Light), soprattutto nel testo piccolo, e con un font sottile chiede corpi più grandi (Typography). Per il W3C un font molto sottile appare più chiaro del suo colore, e anche la soglia del testo grande può non bastare (Understanding 1.4.3). Linee guida e standard vengono prima delle regole apprese (`riferimenti/fondamenta.md` §1): per corpo e testo piccolo preferisci Regular o Medium; un peso Light regge meglio nei titoli grandi, con un contrasto più alto del minimo (sintesi delle fonti, non una regola dell'utente). Se scegli un peso sottile per il testo, scrivi il motivo in `DESIGN.md`.

## 8. Non letto o non verificato
- Apple HIG, pagine Typography, Accessibility e Layout: lette dal JSON ufficiale il 17–18/10/2026. Per iOS la pagina Layout non dà margini in numeri: chiede di rispettare safe area, margini e guide di sistema.
- Material 3: m3.material.io non è raggiungibile da qui. Scala, interlinea e tracking vengono dai token ufficiali su GitHub; quando usare ogni stile non è letto.
- Il sito w3.org non era raggiungibile: i testi WCAG vengono dal repository ufficiale del W3C su GitHub (w3c/wcag).
- `text-wrap`, `hyphens`, `font-synthesis`, `font-display` e `font-variant-numeric` sono nelle bozze CSS lette; il supporto dei browser non è verificato.
- L'intervallo di 45–75 caratteri per riga, citato spesso, non è stato verificato e non è uno standard.

## Fonti (lette il 17–18/10/2026)
- W3C, WCAG 2.2, Understanding [1.4.12 Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html) e [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html), letti dal repository w3c/wcag
- Android, [Grids and units](https://developer.android.com/design/ui/mobile/guides/layout-and-content/grids-and-units) · [Layout basics](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-basics)
- Apple HIG, [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) · [Layout](https://developer.apple.com/design/human-interface-guidelines/layout), lette dal loro JSON ufficiale
- Material: material-web, `tokens/versions/v0_192/_md-sys-typescale.scss` · Material Components Android, `typography/res/values/tokens.xml` e [Typography](https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md) · Compose Material 3, `tokens/TypeScaleTokens.kt` (androidx, v0_103)
- W3C, bozze nel repository w3c/csswg-drafts: CSS Text 4 (`text-wrap-style`, `hyphens`) e CSS Fonts 4 (`font-synthesis`, `font-display`, `font-variant-numeric`)
