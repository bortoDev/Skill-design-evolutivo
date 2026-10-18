# App mobile — iOS e Android: parte comune, differenze, schede per piattaforma

Letto il 16/10/2026 dalle pagine ufficiali di Apple (Human Interface Guidelines) e di Google (documentazione Android e Material). Il 17–18/10/2026 ho riletto o letto, dal loro JSON ufficiale, le pagine Apple Typography, Layout, Accessibility, Dark Mode, Color, Motion e Buttons, e i token Material su GitHub. Ogni valore ha la sua fonte in fondo; ciò che non ho potuto leggere è elencato nella sezione 7.
Leggi questo file quando: progetti una app mobile (nativa, React Native, Flutter o web app installabile), o scegli navigazione, dimensione dei target, tipografia o gesti per telefono.

**Come usarlo**
- Progetto per entrambe le piattaforme (o tecnologia non decisa): leggi le sezioni 1, 2 e 3.
- Solo iOS: sezioni 1 e 4. Solo Android: sezioni 1 e 5.
- Le righe segnate **(mia scelta)** sono indicazioni di progetto, non citazioni delle fonti.
- Sono guide delle piattaforme, non leggi: se un'interfaccia deve distinguersi, le regole di gusto stanno in `memoria/` (profilo e regole apprese), mentre queste restano tra le fondamenta (vedi sezione 3).

## 1. Cosa vale per entrambe
| Tema | Apple (iOS, iPadOS) | Android (Material) | Per il progetto |
|---|---|---|---|
| Dimensione dei controlli | predefinita 44×44 pt, **minima 28×28 pt**; per i pulsanti, "come regola generale", area di tocco di almeno 44×44 pt (Buttons); come si concilia con il minimo di 28 pt è un'ipotesi (§4) | almeno 48×48 dp; "più grande è meglio" | **(mia scelta)** area toccabile ≥ 48 su tutti i controlli primari; sotto, solo con spazio attorno |
| Spazio tra i controlli | circa 12 pt attorno agli elementi con bordo (bezel), circa 24 pt attorno a quelli senza | la pagina letta non dà un valore | **(mia scelta)** tenere ≥ 12 tra controlli vicini |
| Testo: dimensione | predefinita 17 pt, minima 11 pt (iOS e iPadOS) | la pagina di accessibilità non indica un minimo; nella scala Material il corpo è 16, 14 e 12 sp | i valori sono di piattaforma, non standard web |
| Testo: ingrandimento | idealmente, poter ingrandire il testo almeno al 200 % (Dynamic Type); il layout si adatta (es. elementi affiancati si impilano) | dal sistema operativo Android 14 il sistema supporta fino al 200 % con curva non lineare; unità `sp` per il testo e per l'interlinea, non per padding e altezze | testare sempre al massimo ingrandimento |
| Contrasto | soglie WCAG AA: 4,5:1 fino a 17 pt; 3:1 da 18 pt o in grassetto. In Dark Mode almeno 4,5:1 e, per testo piccolo, puntare a 7:1 | 4,5:1 sotto 18 sp (o grassetto sotto 14 sp); 3:1 per il resto | le cifre sono in pt/sp, mentre WCAG web definisce "grande" in punti tipografici (18 pt ≈ 24 px): a parità di numero le unità differiscono. **(mia scelta)** per testo ≤ 24 px/sp resta su 4,5:1 |
| Colore da solo | non basta: aggiungere forma o icona (coppie difficili per chi non distingue i colori: rosso-verde e blu-arancio) | (non letto) | forma o icona oltre al colore |
| Gesti | non rendere un gesto l'unico modo di fare qualcosa; offrire un'alternativa (es. un pulsante per lo swipe); i gesti personalizzati solo se servono, sono scopribili e distinti | non mettere gesti o bersagli sotto le aree dei gesti di navigazione (insets) | ogni azione importante ha un controllo visibile |
| Area sicura | rispettare la safe area: sistema e hardware (es. Dynamic Island) non devono coprire contenuti e controlli | disegnare edge-to-edge e gestire le barre di sistema con `WindowInsets`; verificare che nulla sia coperto | nulla di importante sotto le barre di sistema o l'indicatore dei gesti |
| Layout adattivo | usare le *size class* (compatta/regolare), non il tipo di dispositivo né l'orientamento | usare le *window size class*, la larghezza è il segnale principale; "non sono pensate per la logica tipo `isTablet`" | decidere sul **spazio disponibile**, non sul dispositivo |
| Rivelazione progressiva | ridurre ciò che si mostra all'inizio con menu, viste annidate, sezioni scorrevoli | (non letto) | un livello di contenuto per schermata |

## 2. Dove le due piattaforme divergono
| Tema | iOS | Android |
|---|---|---|
| Navigazione primaria | tab bar in basso (sull'iPhone fluttua sopra il contenuto con materiale Liquid Glass). La HIG non dà un numero di tab: chiede il numero necessario, di evitare i tab di overflow ("More") e di non disabilitare né nascondere i tab anche se vuoti: si spiega perché | barra di navigazione: 3–5 destinazioni di pari importanza (finestra compatta). Con più di 5 il drawer è possibile ma "non ideale" sui compatti, perché l'utente deve raggiungere la barra in alto |
| Schermi grandi | la tab bar può diventare sidebar; su iPad sta in alto | usare navigation rail; sconsigliato riusare la stessa barra in basso su schermi grandi |
| Indietro | pulsante Indietro nella barra superiore. Lo swipe dal bordo è una scorciatoia **in aggiunta** al pulsante, non al suo posto | tasto/gesto Indietro di sistema; il pulsante Su (Up) sta nell'app bar e dentro l'app si comporta come Indietro. Su non esce mai dall'app, Indietro sì. La destinazione iniziale è fissa. Con *predictive back* l'utente vede un'anteprima prima di confermare |
| Barre di sistema | il fondale a tutto schermo si estende sotto sidebar, toolbar e tab bar | barre di stato e di navigazione trasparenti o traslucide; edge-to-edge imposto da Android 15 (per le app che puntano a quella versione); barra dei gesti trasparente (sempre raccomandato) |
| Testo, valori di partenza | Body 17 pt, Headline 17 (semibold), Callout 16, Subhead 15, Footnote 13, Caption 12 e 11 pt (dimensione "Large", predefinita) | Body 16, 14, 12 sp; Title 22, 16, 14; Label 14, 12, 11 sp (Material 3) |
| Titoli grandi | Large Title 34 pt, Title 28, 22, 20 pt | Display 57, 45, 36 sp; Headline 32, 28, 24 sp |
| Aspetto scuro | non offrire un'impostazione di aspetto propria dell'app: si segue quella di sistema; usare colori semantici e sfondi di sistema | (non letto) |
| Gesto "indietro" | swipe dal bordo, come scorciatoia | swipe dal bordo sinistro o destro, con barra dei gesti; da sotto verso l'alto = Home; scorrere e tenere = panoramica |
| Aiuti all'accessibilità | VoiceOver: descrivere interfaccia e contenuti; Reduce Motion: sostituire transizioni su x, y, z con dissolvenze | `contentDescription`: descrivere lo scopo (es. "Invia", non "Pulsante Invia"), univoca, `null` per elementi decorativi |

## 3. Per un progetto che gira su entrambe (React Native, Flutter, web app)
- **Fondamenta uguali, forma di piattaforma. (mia scelta)** Le tue scelte di gusto (font, colori, tono) valgono ovunque; navigazione, indietro, barre di sistema e target seguono la piattaforma. Le fonti non dicono come unire le due piattaforme: la separazione è una decisione di progetto.
- **Navigazione inferiore con 3–5 voci (mia scelta).** Android la prevede espressamente; su iOS la HIG non dà un numero, ma chiede di evitare l'overflow ("More"): con poche voci il rischio si riduce.
- **Pulsante Indietro sempre visibile** (su iOS la HIG dice che le persone se lo aspettano) e comportamento di Indietro di sistema rispettato (Android).
- **Testo scalabile** (Dynamic Type su iOS, `sp` su Android) e prova al 200 %. **(mia scelta)**
- **Safe area e insets** sempre, anche se il framework offre componenti già pronti.
- **Nessun gesto come unica strada.**
- Se la tecnologia non è decisa: parti dalla sezione 1, tratta la 2 come elenco di decisioni da prendere per piattaforma.

## 4. Scheda iOS
- **Layout.** Ordina per importanza dall'alto e dal lato iniziale; allinea, raggruppa; rivelazione progressiva. La pagina Layout non dà margini in numeri per iOS: rispetta safe area, margini e guide di sistema. Decidi in base alle size class, non a dispositivo o orientamento; mantieni le stesse funzioni al variare dello spazio. Con più spazio puoi passare da tab bar a sidebar.
- **Safe area.** Rispettala; il fondale può estendersi sotto sidebar, toolbar e tab bar.
- **Tab bar.** Serve a navigare, non a compiere azioni (per quelle, toolbar); resta visibile; evita l'overflow; non disabilitare né nascondere tab; etichette di una parola quando possibile; badge solo per informazioni critiche; evita colori di etichetta simili allo sfondo del contenuto.
- **Tipografia.** Predefinita 17 pt, minima 11 pt; con font sottile usa corpi più grandi; con Dynamic Type riduci il troncamento e riorganizza il layout (testo sopra gli elementi secondari, meno colonne). Alla dimensione "Large": Large Title 34/41, Title 1 28/34, Title 2 22/28, Title 3 20/25, Headline 17/22 (semibold), Body 17/22, Callout 16/21, Subhead 15/20, Footnote 13/18, Caption 1 12/16, Caption 2 11/13 (pt / interlinea in pt).
- **Controlli.** Predefinito 44×44 pt, minimo 28×28 pt; ~12 pt di spazio attorno a quelli con bordo, ~24 pt senza. Pagina Buttons: "come regola generale" l'area di tocco di un pulsante è almeno 44×44 pt; uno o due pulsanti in evidenza per vista, distinti con lo stile e non con la dimensione; ogni pulsante personalizzato ha uno stato premuto. Ipotesi mia, non letta: un controllo si può disegnare più piccolo, fino a 28 pt, ma la sua area di tocco dovrebbe arrivare a 44.
- **Gesti.** Tap, swipe, trascinamento, tocco prolungato, doppio tap, zoom, rotazione sono i gesti standard: non usarli per azioni inedite, e non creare gesti nuovi per azioni standard. Evita conflitti con i gesti di sistema.
- **Dark Mode.** Segui il sistema, nessuna impostazione propria; i colori scuri non sono l'inverso di quelli chiari; ogni colore personalizzato ha varianti chiara, scura e a contrasto aumentato (Color); sfondi di sistema (base ed elevato); contrasto ≥ 4,5:1 e, per testo piccolo, punta a 7:1; prova con Increase Contrast e Reduce Transparency; ammorbidisci le immagini con fondo bianco.
- **Movimento.** La pagina Motion non dà durate. Con Reduce Motion: riduci le animazioni automatiche e ripetute (zoom, scale, movimento ai bordi), sostituisci le transizioni con dissolvenze, evita blur e animazioni di profondità, restringi le molle. Per il web: `riferimenti/movimento-stati.md`.
- **Tempo.** Riduci al minimo gli elementi che si chiudono da soli con un timer: chi ha bisogno di più tempo o usa tecnologie assistive ne è penalizzato.

## 5. Scheda Android
- **Target.** 48×48 dp; i componenti Material di Jetpack Compose (`Button`, `IconButton`, `ListItem`) lo applicano già, gli elementi personalizzati vanno dimensionati a mano.
- **Navigazione.** Barra di navigazione per 3–5 destinazioni di pari importanza, finestre compatte e destinazioni coerenti tra le schermate; drawer per più di 5; rail su schermi grandi; tab Material e bottom app bar sono navigazione secondaria; un solo FAB e un'azione per volta.
- **Finestra.** Larghezza: compatta < 600 dp; media 600–839; espansa 840–1199; grande 1200–1599; extra-large ≥ 1600. Altezza: compatta < 480 dp; media 480–899; espansa ≥ 900. Partire dalla larghezza; l'altezza conta nei telefoni in orizzontale (larghezza media, altezza compatta, dove i due pannelli non sono pratici). La classe può cambiare a runtime (rotazione, multi-finestra, pieghevoli).
- **Barre di sistema e gesti.** Edge-to-edge, barre trasparenti o traslucide, `WindowInsets` per evitare che le barre coprano contenuti; nessun bersaglio sotto gli insets dei gesti; barra dei gesti trasparente e senza fondo; con navigazione a tre pulsanti, barra trasparente se c'è una bottom bar o il contenuto non scorre sotto, traslucida per contenuto che scorre; da Android 15 (app che puntano a quella versione) edge-to-edge applicato dal sistema.
- **Indietro.** Destinazione iniziale fissa; stack di navigazione; Su e Indietro identici dentro l'app; Su non esce mai dall'app; *predictive back*: anteprima con scala 100→90 % in uscita e 110→100 % in ingresso, dissolvenza con soglia al 35 %; "solo il sistema può chiudere la finestra dell'app"; evitare gesti o bersagli sotto gli insets.
- **Testo.** Unità `sp` per testo e interlinea (`lineHeight`), mai per padding o altezze; sistema fino al 200 % con curva non lineare dal sistema operativo Android 14; testare al massimo. Scala Material 3 (sp): Display 57/45/36, Headline 32/28/24, Title 22/16/14, Body 16/14/12, Label 14/12/11; pesi: Title Medium, Title Small e tutti i Label in Medium, gli altri Regular.
- **Movimento.** Molle di Material 3 (token di Material Components Android 34.0.0): standard con smorzamento 0,9 (un piccolo rimbalzo), espressive 0,6–0,8 (più rimbalzo), 1 per gli effetti di colore e opacità. Durate e curve: `riferimenti/movimento-stati.md` §5.
- **Accessibilità.** `contentDescription` per scopo e risultato, non per aspetto; evitare ridondanze ("Invia", non "Pulsante Invia"); univoca; `Text` non ne ha bisogno; `null` per gli elementi decorativi.

## 6. Soglie in sintesi e stato di verifica
| Valore | Fonte | Stato |
|---|---|---|
| iOS: controllo 44×44 pt (predefinito), 28×28 pt (minimo) | Apple HIG, Accessibility | letto il 16/10/2026, riletto il 18/10/2026 |
| iOS: area di tocco di un pulsante ≥ 44×44 pt "come regola generale" | Apple HIG, Buttons | letto il 18/10/2026; il legame con il minimo di 28 pt è un'ipotesi (§4) |
| iOS: spazio ~12 pt (con bordo) / ~24 pt (senza) | Apple HIG, Accessibility | letto |
| iOS: testo 17 pt (predefinito) / 11 pt (minimo) | Apple HIG, Typography e Accessibility | letto |
| iOS: ingrandimento idealmente ≥ 200 % | Apple HIG, Accessibility | letto |
| iOS: contrasto 4,5:1 / 3:1; Dark Mode ≥ 4,5:1, obiettivo 7:1 per testo piccolo | Apple HIG, Accessibility e Dark Mode | letto |
| Android: touch target ≥ 48×48 dp | Android, Accessibility | letto |
| Android: contrasto 4,5:1 sotto 18 sp (grassetto sotto 14 sp), altrimenti 3:1 | Android, Accessibility | letto |
| Android: barra di navigazione 3–5 destinazioni | Android, Layout e Navigation bar | letto |
| Android: classi di finestra (600, 840, 1200, 1600 dp; 480, 900 dp) | Android, Window size classes | letto |
| Android: scala dei font fino al 200 % da Android 14 | Android 14 features | letto |
| Scala Material 3: dimensioni e pesi | Material Components Android, Typography | letto; interlinea e tracking letti il 17–18/10/2026 dai token ufficiali (`riferimenti/tipografia-spaziatura.md` §3) |
| Numero massimo di tab su iOS | Apple HIG, Tab bars | **non indicato** dalla HIG; non scrivere "5" come regola di Apple. Solo se l'utente può scegliere i tab, la HIG consiglia una lista predefinita di cinque o meno. Non è un massimo generale: in tutti gli altri casi la HIG non dà un numero. |
| Minimo di dimensione del testo su Android | Android, Accessibility | **non indicato** dalla pagina |
| WCAG 2.5.8: 24×24 px CSS (AA); 2.5.5: 44×44 px CSS (AAA) | W3C | 2.5.8 verificato nella sessione precedente; 2.5.5 letto il 18/10/2026 dal repository w3c/wcag |

Una correzione rispetto a quanto circola (e a quanto avevo scritto nell'indice): per Apple 44 pt è la dimensione predefinita e 28 pt il minimo dichiarato nella tabella dell'accessibilità.

## 7. Non letto o non verificato
- **Apple:** pagine Navigation bars (non si è caricata), Liquid Glass, Materials, Haptics, SF Symbols, Sheets e modalità, VoiceOver.
- **Android/Material:** componenti singoli, colore dinamico e ruoli colore, forme, tema scuro, layout canonici, font di sistema predefinito. Le pagine di m3.material.io non sono raggiungibili: interlinea e tracking della scala e token di movimento vengono dai file ufficiali su GitHub (`riferimenti/tipografia-spaziatura.md` §3, `riferimenti/movimento-stati.md` §5; le molle al §5 di questo file); quando usare stili, durate e curve non è letto.
- **Altro:** nessuna prova su dispositivi reali; la conversione delle unità (pt, dp, px CSS, unità dei framework) non è stata verificata.

## Fonti
- Apple HIG: [Layout](https://developer.apple.com/design/human-interface-guidelines/layout) · [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) · [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars) · [Typography](https://developer.apple.com/design/human-interface-guidelines/typography) · [Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures) · [Dark Mode](https://developer.apple.com/design/human-interface-guidelines/dark-mode) · [Color](https://developer.apple.com/design/human-interface-guidelines/color) · [Motion](https://developer.apple.com/design/human-interface-guidelines/motion) · [Buttons](https://developer.apple.com/design/human-interface-guidelines/buttons)
- Android: [Accessibility (app)](https://developer.android.com/guide/topics/ui/accessibility/apps) · [Layout and navigation patterns](https://developer.android.com/design/ui/mobile/guides/layout-and-content/layout-and-nav-patterns) · [Navigation bar (Compose)](https://developer.android.com/develop/ui/compose/components/navigation-bar) · [Window size classes](https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes) · [System bars](https://developer.android.com/design/ui/mobile/guides/foundations/system-bars) · [Predictive back](https://developer.android.com/design/ui/mobile/guides/patterns/predictive-back) · [Navigation principles](https://developer.android.com/guide/navigation/principles) · [Android 14 features](https://developer.android.com/about/versions/14/features)
- Material: [Typography (Material Components Android)](https://github.com/material-components/material-components-android/blob/master/docs/theming/Typography.md) · token di tipografia di Material Components Android (34.0.0) e material-web (v0.192) · [token di movimento (molle) di Material Components Android](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/motion/res/values/tokens.xml) (34.0.0)
