<p align="center"><b>English</b> · <a href="README.it.md">Italiano</a></p>

# Design evolutivo

A [Claude Code](https://code.claude.com) plugin that designs, reviews, fixes and rates user interfaces (websites, web apps, iOS and Android apps) and **learns your taste** from one project to the next.

> **Language:** the skill speaks Italian. It talks to you and writes its files in Italian.

<!-- IMMAGINI PRIMA E DOPO -->

## Why
AI-generated interfaces tend to look the same: centred hero, three cards with shadows, purple gradients, the same fonts everywhere. Design evolutivo works differently:

- **It engineers before it draws.** It maps stakeholders, sets priorities and writes a plan, which you approve. Then it builds one piece at a time and asks for your feedback after each piece.
- **It proposes three different directions:** safe, near and far. You choose, and your choice is remembered.
- **It looks at its own work.** It takes screenshots at 375, 320 and 1440 px, in dark mode and blurred. Then it removes what isn't needed and polishes the details: spacing, typography, colour, images, motion, states.
- **It checks with verified numbers:** WCAG 2.2, Apple Human Interface Guidelines and Material 3. It reads each value from the official source and labels everything else as a project choice.
- **It learns.** It records your corrections and recognises the same mistake in a different place. After one or two corrections the mistake doesn't come back. Every new rule is announced, and you can correct it or withdraw it.
- **Your memory is yours.** Everything it learns lives in `~/design-evolutivo-memoria/`, as plain Markdown files you can open and read. Updating or uninstalling the plugin doesn't touch it.

## Install
In a terminal:

```
claude plugin marketplace add bortoDev/Skill-design-evolutivo
claude plugin install design-evolutivo@bortodev
```

Or from inside a Claude Code session:

```
/plugin install design-evolutivo --marketplace bortoDev/Skill-design-evolutivo
```

Then let Claude read and write its memory without asking every time, by adding these rules to `~/.claude/settings.json`:

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

Optional: to let the skill take screenshots of the pages it builds, install Playwright once with `npm i -g playwright && npx playwright install chromium`. Without it, the skill still works and tells you it couldn't look at the page.

The full guide is in Italian: [installation, permissions, updates and how it learns](plugins/design-evolutivo/skills/design-evolutivo/README.md).

## Use
Just ask for a design in Claude Code ("progetta la pagina iniziale di…"), or call it directly:

- `/design-evolutivo`: create (the default);
- `/design-evolutivo rivedi`: review;
- `/design-evolutivo migliora`: fix;
- `/design-evolutivo valuta`: rate;
- `/design-evolutivo studia <url>`: study a site you like;
- `/design-evolutivo evolvi`: consolidate what it learned.

With other plugins that use the same name, the full command is `/design-evolutivo:design-evolutivo`.

## Status
Version 0.12, the first plugin release. It has been tested in non-interactive Claude Code sessions:
- the analysis, the three directions and the checks;
- memory across sessions;
- recognising the same mistake in a different place;
- rules that apply to one project only;
- "forget this".

Not yet tested: a mistake that keeps coming back despite a rule (escalation), and a long interactive session. The history is in [STORIA.md](plugins/design-evolutivo/skills/design-evolutivo/STORIA.md), in Italian.

## License
[MIT](LICENSE)
