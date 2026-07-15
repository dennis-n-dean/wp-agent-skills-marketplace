#!/usr/bin/env node
/**
 * Deterministically build the wp-agent-skills plugin from a WordPress/agent-skills checkout.
 *
 * Reads the upstream `skills/` directory verbatim and generates a plugin manifest whose
 * version is derived from git history, so the same upstream commit always yields the same
 * plugin. No human judgement is involved.
 *
 * Usage:
 *   node scripts/build-plugin.mjs --src <upstream checkout> --out <plugin dir> --marketplace <marketplace.json>
 */
import { execFileSync } from "node:child_process";
import { cpSync, rmSync, mkdirSync, writeFileSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

/** Read a `--name value` CLI argument, falling back to a default. */
function readArg(name, fallback) {
  const index = process.argv.indexOf(`--${name}`);
  return index !== -1 && process.argv[index + 1] ? process.argv[index + 1] : fallback;
}

const upstreamPath = resolve(readArg("src", "upstream"));
const pluginPath = resolve(readArg("out", "plugins/wp-agent-skills"));
const marketplacePath = resolve(readArg("marketplace", ".claude-plugin/marketplace.json"));

const runGit = (...args) => execFileSync("git", ["-C", upstreamPath, ...args], { encoding: "utf8" }).trim();

/** Recursively delete OS/editor cruft that should never ship in the plugin. */
function removeCruft(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    if (statSync(fullPath).isDirectory()) {
      removeCruft(fullPath);
    } else if (entry === ".DS_Store") {
      rmSync(fullPath);
    }
  }
}

const shortSha = runGit("rev-parse", "--short", "HEAD");
const skillCommitCount = runGit("rev-list", "--count", "HEAD", "--", "skills");
const version = `0.${skillCommitCount}.0`;

const pluginSkillsPath = join(pluginPath, "skills");
rmSync(pluginSkillsPath, { recursive: true, force: true });
mkdirSync(pluginSkillsPath, { recursive: true });
cpSync(join(upstreamPath, "skills"), pluginSkillsPath, { recursive: true });
removeCruft(pluginSkillsPath);

const skillNames = readdirSync(pluginSkillsPath)
  .filter((entry) => statSync(join(pluginSkillsPath, entry)).isDirectory())
  .sort();

const pluginManifest = {
  name: "wp-agent-skills",
  version,
  description:
    `${skillNames.length} WordPress development skills for Claude, synced from ` +
    `WordPress/agent-skills@${shortSha}. Covers Gutenberg blocks, block patterns, block themes, ` +
    `plugin development, REST API, Interactivity API, the Abilities API, WP-CLI, performance, ` +
    `PHPStan, Playground, and the WordPress Design System.`,
  author: { name: "Dennis Dean" },
  homepage: "https://github.com/WordPress/agent-skills",
  repository: "https://github.com/dennis-n-dean/wp-agent-skills-marketplace",
  license: "GPL-2.0-or-later",
  keywords: [
    "wordpress", "gutenberg", "blocks", "block-patterns", "block-themes",
    "plugin-development", "rest-api", "wp-cli", "php", "phpstan", "playground",
  ],
};

mkdirSync(join(pluginPath, ".claude-plugin"), { recursive: true });
writeFileSync(
  join(pluginPath, ".claude-plugin", "plugin.json"),
  JSON.stringify(pluginManifest, null, 2) + "\n",
);

const marketplace = JSON.parse(readFileSync(marketplacePath, "utf8"));
marketplace.plugins = (marketplace.plugins || []).map((plugin) =>
  plugin.name === "wp-agent-skills" ? { ...plugin, version } : plugin,
);
writeFileSync(marketplacePath, JSON.stringify(marketplace, null, 2) + "\n");

console.log(`Built wp-agent-skills v${version} — ${skillNames.length} skills from ${shortSha}`);
