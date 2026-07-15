# wp-agent-skills marketplace

A Claude plugin marketplace that packages the official
[WordPress/agent-skills](https://github.com/WordPress/agent-skills) skill set as a single
installable Claude plugin, `wp-agent-skills`, and keeps it in sync with upstream automatically.

## What this is

[WordPress/agent-skills](https://github.com/WordPress/agent-skills) is a collection of Agent
Skills that teach AI coding assistants how to build WordPress the right way: Gutenberg blocks,
block themes, plugin development, the REST, Interactivity, and Abilities APIs, WP-CLI,
performance, PHPStan, WordPress Playground, block patterns, and the WordPress Design System.

This repository repackages those skills as a Claude plugin and serves them through a plugin
marketplace, so you can install the whole set in Claude with one command instead of copying
folders by hand. It currently bundles 18 skills.

## Install in the Claude desktop app

Plugins are available in the Cowork and Code experiences (not in Chat).

1. Open the Claude desktop app and select the **Cowork** tab at the top.
2. In the left sidebar, open **Customize**, then **Plugins**.
3. Click **Add marketplace** and enter the repository:

   ```
   dennis-n-dean/wp-agent-skills-marketplace
   ```

   The full `https://github.com/dennis-n-dean/wp-agent-skills-marketplace` URL works too.
4. The **wp-agent-skills** plugin now appears in the plugin list. Select it and click **Install**.
5. Open the installed plugin to see its 18 skills. Enable or disable individual skills as needed.

To update later, open **Customize → Plugins**, find this marketplace, and click **Update** — Cowork
re-pulls the latest from GitHub, and the daily sync keeps the repository current. To remove the
plugin, open it and click **Uninstall**.

## Install in Claude Code (CLI)

```
/plugin marketplace add dennis-n-dean/wp-agent-skills-marketplace
/plugin install wp-agent-skills@wp-agent-skills-marketplace
```

## How it stays current

A GitHub Action (`.github/workflows/sync-plugin.yml`) runs daily and on demand. It clones
upstream, rebuilds the plugin with `scripts/build-plugin.mjs`, and commits the result only when
the bundled skills change. The build is deterministic: the plugin version is
`0.<number-of-upstream-commits-touching-skills/>.0`, so a given upstream state always produces
the same plugin, and the version advances only when the skills themselves change.

## Layout

- `.claude-plugin/marketplace.json` — the marketplace manifest.
- `plugins/wp-agent-skills/` — the generated plugin (`.claude-plugin/plugin.json` and `skills/`).
- `scripts/build-plugin.mjs` — deterministic build from an upstream checkout.
- `.github/workflows/sync-plugin.yml` — the daily upstream sync.

## Attribution and license

The skills are authored and maintained by the WordPress project and its contributors at
[WordPress/agent-skills](https://github.com/WordPress/agent-skills). This repository is an
independent redistribution and is not affiliated with or endorsed by the WordPress project.
Licensed under GPL-2.0-or-later, matching upstream. See [LICENSE](LICENSE).
