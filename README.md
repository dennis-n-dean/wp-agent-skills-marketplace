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

## Install

In Claude, add this marketplace and install the plugin:

```
/plugin marketplace add dennis-n-dean/wp-agent-skills-marketplace
/plugin install wp-agent-skills@wp-agent-skills-marketplace
```

In the Claude desktop app you can also add the same repository from the plugins and marketplace
settings.

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
