# wp-agent-skills marketplace

A Claude plugin marketplace of WordPress development tooling. It packages the official
[WordPress/agent-skills](https://github.com/WordPress/agent-skills) skill set as an installable
plugin (kept in sync automatically) and adds a companion WordPress Coding Standards skill.

## Plugins in this marketplace

- **wp-agent-skills** — 18 skills mirrored from
  [WordPress/agent-skills](https://github.com/WordPress/agent-skills): Gutenberg blocks, block
  themes and patterns, plugin development, the REST, Interactivity, and Abilities APIs, WP-CLI,
  performance, PHPStan, WordPress Playground, and the WordPress Design System.
- **wpcs-standards** — the official WordPress Coding Standards (naming, formatting, security,
  internationalization, and PHPDoc/JSDoc inline documentation) as a single skill, adapted from the
  WordPress Coding Standards Handbook.

## Install in the Claude

### in Coworks

1. Open the Claude desktop app and select the **Cowork** tab at the top.
2. In the left sidebar, open **Customize**, then **Plugins**.
3. Click **Add marketplace** and enter the repository:

   ```
   dennis-n-dean/wp-agent-skills-marketplace
   ```

   The full `https://github.com/dennis-n-dean/wp-agent-skills-marketplace` URL works too.
4. Both plugins from this marketplace now appear in the plugin list. Select **wp-agent-skills**,
   **wpcs-standards**, or both, and click **Install**.
5. Open an installed plugin to see its skills, and enable or disable individual skills as needed.

To update later, open **Customize → Plugins**, find this marketplace, and click **Update**. 

To remove a plugin, open it and click **Uninstall**.

## in Claude Code

```
/plugin marketplace add dennis-n-dean/wp-agent-skills-marketplace
/plugin install wp-agent-skills@wp-agent-skills-marketplace
/plugin install wpcs-standards@wp-agent-skills-marketplace
```

## How wp-agent-skills stays current

A GitHub Action (`.github/workflows/sync-plugin.yml`) runs daily. It clones upstream, 
rebuilds the plugin with `scripts/build-plugin.mjs`, and commits the result only when
the bundled skills change. The plugin version is `0.<number-of-upstream-commits-touching-skills/>.0`. 

The `wpcs-standards` plugin is curated and versioned by hand (since the coding standards rarely change).

## Attribution and license

The `wp-agent-skills` skills are authored and maintained by the WordPress project and its
contributors at [WordPress/agent-skills](https://github.com/WordPress/agent-skills). The
`wpcs-standards` skill is derived from the WordPress Coding Standards Handbook and
[WordPress/wpcs-docs](https://github.com/WordPress/wpcs-docs). This repository is an independent
redistribution and is not affiliated with or endorsed by the WordPress project. Licensed under
GPL-2.0-or-later, matching upstream. See [LICENSE](LICENSE).
