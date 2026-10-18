<p align="center"><a href="README.md">English</a> · <b>Italiano</b></p>

# Design evolutivo

Un plugin per [Claude Code](https://code.claude.com) che progetta, rivede, corregge e valuta interfacce (siti, web app, app iOS e Android) e **impara il tuo gusto** da un progetto all'altro.

<!-- IMMAGINI PRIMA E DOPO -->

## Perché
Le interfacce fatte con l'IA tendono a somigliarsi tutte: titolo centrato, tre card con l'ombra, gradienti viola, gli stessi font ovunque. Design evolutivo lavora in un altro modo:

- **Prima ingegnerizza, poi disegna.** Individua gli stakeholder, decide le priorità e scrive un piano a pezzi, che approvi tu. Poi costruisce un pezzo alla volta e dopo ognuno ti chiede un parere.
- **Propone tre direzioni diverse:** sicura, vicina e lontana. Tu scegli, e la scelta resta in memoria.
- **Guarda ciò che produce.** Fotografa la pagina a 375, 320 e 1440 px, in tema scuro e sfocata. Poi toglie il superfluo e cura i dettagli: spazi, caratteri, colori, immagini, movimento, stati.
- **Controlla con numeri verificati:** WCAG 2.2, Apple Human Interface Guidelines e Material 3. Ogni valore è letto sulla fonte ufficiale; il resto è dichiarato come scelta di progetto.
- **Impara.** Registra le tue correzioni e riconosce lo stesso errore anche in un punto diverso. Dopo una o due correzioni l'errore non torna. Ogni regola nuova te la annuncia, e puoi correggerla o ritirarla.
- **La memoria è tua.** Ciò che impara sta in `~/design-evolutivo-memoria/`, in file di testo che puoi aprire e leggere. Aggiornare o disinstallare il plugin non la tocca.

## Installazione
Da un terminale:

```
claude plugin marketplace add bortoDev/Skill-design-evolutivo
claude plugin install design-evolutivo@bortodev
```

Oppure da una sessione di Claude Code:

```
/plugin install design-evolutivo --marketplace bortoDev/Skill-design-evolutivo
```

Poi permetti a Claude di leggere e scrivere la memoria senza chiedertelo ogni volta. Aggiungi queste regole a `~/.claude/settings.json`:

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

Facoltativo: perché la skill possa fotografare le pagine che costruisce, installa Playwright una volta con `npm i -g playwright && npx playwright install chromium`. Senza, la skill funziona lo stesso e ti dice che non ha potuto guardare la pagina.

La guida completa è qui: [installazione, permessi, aggiornamenti e come impara](plugins/design-evolutivo/skills/design-evolutivo/README.md).

## Uso
Chiedi un design a Claude Code ("progetta la pagina iniziale di…"), oppure chiamala direttamente:

- `/design-evolutivo`: crea (è il modo predefinito);
- `/design-evolutivo rivedi`: rivedi un design;
- `/design-evolutivo migliora`: correggilo;
- `/design-evolutivo valuta`: dagli un voto;
- `/design-evolutivo studia <indirizzo>`: studia un sito che ti piace;
- `/design-evolutivo evolvi`: consolida ciò che ha imparato.

Se un altro plugin usa lo stesso nome, il comando completo è `/design-evolutivo:design-evolutivo`.

## Stato
Versione 0.12, la prima come plugin. È stata provata in sessioni non interattive di Claude Code:
- analisi, tre direzioni e verifiche;
- memoria tra una sessione e l'altra;
- lo stesso errore riconosciuto in un punto diverso;
- le regole valide solo per un progetto;
- "dimentica…".

Non ancora provati: un errore che torna nonostante una regola (escalation) e una lunga sessione interattiva. La storia è in [STORIA.md](plugins/design-evolutivo/skills/design-evolutivo/STORIA.md).

## Licenza
[MIT](LICENSE)
