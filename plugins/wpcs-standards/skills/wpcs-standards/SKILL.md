---
name: wpcs-standards
description: "Use when writing, reviewing, or fixing WordPress PHP, JavaScript, CSS, or HTML to follow the official WordPress Coding Standards (WPCS): naming conventions, spacing and formatting, Yoda conditions, brace style, security (escaping, sanitization, nonces, $wpdb->prepare), internationalization (i18n), and PHPDoc/JSDoc inline documentation. Also use before submitting a plugin or theme to the WordPress.org directory, or when configuring phpcs with the WordPress ruleset."
license: GPL-2.0-or-later
compatibility: "WordPress-Core, WordPress-Extra, and WordPress-Docs rulesets. PHP 7.2.24+ (WordPress.org minimum PHP 7.4+)."
---

# WordPress Coding Standards (WPCS)

Apply the official WordPress Coding Standards when producing or reviewing WordPress PHP,
JavaScript, CSS, or HTML. Match existing conventions in the project first; where a project has
no local override, follow the standards below. These are the same rules the `WordPress` phpcs
ruleset enforces.

This skill is self-contained: the rules and examples here and in `references/` are enough to
write and review compliant code. Do not web-fetch the WordPress handbook pages linked at the
bottom unless the user explicitly asks for the current upstream wording — the links are for
attribution and human reference only.

## When to use

- Writing or editing plugin, theme, or WordPress-core-facing code.
- Reviewing a diff or file for standards compliance.
- Preparing code for the WordPress.org plugin or theme directory (its reviewers run WPCS).
- Setting up or interpreting `phpcs` with the `WordPress` standard.

## How to apply

1. Detect the language and load the matching reference in `references/`.
2. Write code that conforms as you go rather than reformatting afterward.
3. Pay special attention to the security and internationalization rules — reviewers and the
   directory guidelines treat these as blocking issues, not style nits.
4. When possible, verify with `phpcs` (see Verify below) instead of eyeballing.

## PHP essentials

Full detail and examples are in `references/php-coding-standards.md`. The rules that matter most:

- Indent with real tabs, not spaces. Use spaces only for mid-line alignment.
- Naming: functions and variables are `lower_snake_case`; class names are
  `Capitalized_Words_With_Underscores`; constants are `UPPER_SNAKE_CASE`. Class files are named
  `class-{name}.php`.
- Braces open on the same line and are always used, even for single-statement blocks.
- Spacing: space after control keywords and inside parentheses of control structures and
  function declarations/calls, e.g. `if ( true === $ready ) {` and `do_thing( $a, $b )`. Space
  after every comma and around operators.
- Use Yoda conditions in comparisons: `if ( 'publish' === $status )`, not
  `if ( $status === 'publish' )`.
- Prefer single quotes; use double quotes only when interpolating.
- Prefer long array syntax `array( ... )` for the core standard, with a trailing comma on the
  last item of a multi-line array.
- Never use PHP short tags or short echo tags; do not add a closing `?>` in pure-PHP files.

## Security (treat as blocking)

Detail in `references/php-coding-standards.md`.

- Escape late, on output, with the context-correct function: `esc_html()`, `esc_attr()`,
  `esc_url()`, `esc_textarea()`, `wp_kses_post()`, and the `esc_*__()` i18n variants.
- Sanitize and unslash input: `wp_unslash()` then `sanitize_text_field()`, `absint()`,
  `sanitize_email()`, `sanitize_key()`, etc. Never trust `$_GET`, `$_POST`, `$_REQUEST`,
  `$_SERVER`.
- Authorize writes: check a capability with `current_user_can()` and verify a nonce with
  `check_admin_referer()` / `wp_verify_nonce()`.
- Query safely: always run variable-bearing SQL through `$wpdb->prepare()`; never interpolate
  input into a query string.

## Internationalization

- Wrap user-facing strings in `__()`, `esc_html__()`, `_e()`, `esc_html_e()`, `_n()`, `_x()`.
- Use a single, literal text domain that matches the plugin/theme slug — never a variable, and
  never a variable as the string itself.
- Use `printf`/`sprintf` with placeholders for interpolated strings, and add
  `/* translators: ... */` comments to explain placeholders.

## JavaScript, CSS, and HTML

See `references/markup-css-js.md`. Highlights: JS follows a WordPress-flavored jQuery/ESLint
style (tabs, spaces inside parens, `===`, single quotes); CSS uses tabs, one selector per line,
lowercase hex, and ordered properties; HTML must be valid and, for anything user-facing, meet
the accessibility guidance (semantic elements, labels, and WCAG 2.0 AA per the handbook).

## Inline documentation

See `references/inline-documentation.md`. Document files, classes, functions/methods, hooks,
and constants with properly formatted DocBlocks: a summary, `@since`, typed `@param` and
`@return` for PHP (PHPDoc) and JS (JSDoc), and `@param` entries that match the signature exactly.

## Verify

When a runnable environment is available, check with PHP_CodeSniffer instead of relying on
inspection:

```
composer global require squizlabs/php_codesniffer wp-coding-standards/wpcs \
  dealerdirect/phpcodesniffer-composer-installer
phpcs --standard=WordPress path/to/code
phpcbf --standard=WordPress path/to/code   # auto-fix what can be fixed
```

`WordPress-Core` covers formatting and naming, `WordPress-Extra` adds best-practice and
security-adjacent sniffs, and `WordPress-Docs` checks inline documentation.

## Attribution

Derived from the WordPress Coding Standards Handbook
(https://developer.wordpress.org/coding-standards/) and
[WordPress/wpcs-docs](https://github.com/WordPress/wpcs-docs), licensed GPL-2.0-or-later. These
links are provided for provenance and human reference, not as a prompt to fetch.
