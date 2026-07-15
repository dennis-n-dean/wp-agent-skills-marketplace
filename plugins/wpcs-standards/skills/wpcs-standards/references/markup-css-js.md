# JavaScript, CSS, HTML, and accessibility

Summarized from the WordPress JavaScript, CSS, HTML, and Accessibility coding standards.
Canonical index: https://developer.wordpress.org/coding-standards/wordpress-coding-standards/

## JavaScript

- Indent with tabs. Put spaces inside parentheses, brackets, and before/after operators:
  `if ( condition ) {`, `array.map( function ( item ) {` .
- Use single quotes for strings; use strict equality (`===`, `!==`).
- Braces open on the same line; always use braces. End statements with semicolons.
- Declare variables in the smallest scope; avoid leaking globals. Follow the project's build
  tooling (`@wordpress/scripts` / ESLint) where present — its config is authoritative.
- Name variables and functions in `camelCase`; constructors in `PascalCase`.

## CSS

- Indent with tabs. One selector per line; the opening brace on the same line as the last
  selector; one property per line; closing brace on its own line.
- Lowercase, and use shorthand hex where possible (`#fff`, not `#FFFFFF`). Include a leading
  zero on decimals (`0.5em`), and use a space after each colon.
- Group and order properties consistently (display/positioning, box model, colors and
  typography, then everything else). Comment sections for longer stylesheets.
- Use human-readable, hyphenated class names tied to function, not appearance.

## HTML

- Write valid HTML that passes the W3C validator. Use lowercase element and attribute names and
  always quote attribute values.
- Close all elements; self-close void elements consistently within the project.
- Use semantic elements (`button`, `nav`, `main`, `label`, headings in order) rather than
  generic `div`/`span` where a semantic element exists.
- Indent to reflect nesting, and keep server-side echoes escaped (see the PHP reference).

## Accessibility

WordPress targets WCAG 2.0 AA for all new and updated code.

- Provide text alternatives: meaningful `alt` for informative images, empty `alt=""` for
  decorative ones.
- Associate every form control with a `<label>` (or an appropriate `aria-label`), and keep a
  visible focus state.
- Ensure keyboard operability — anything clickable must be reachable and usable with the
  keyboard, in a logical tab order.
- Do not convey information by color alone; meet AA contrast ratios.
- Prefer native semantic elements over ARIA; add ARIA roles/attributes only to fill genuine
  gaps.
