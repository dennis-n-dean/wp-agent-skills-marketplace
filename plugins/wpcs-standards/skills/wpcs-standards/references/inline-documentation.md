# Inline documentation

Summarized from the WordPress Inline Documentation Standards. Canonical sources:
https://developer.wordpress.org/coding-standards/inline-documentation-standards/php/ and
https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/

## What to document (PHP)

Use DocBlocks for functions and methods, classes, class members, hooks (actions and filters),
files (a file header), constants, and `require`/`include` statements. Every DocBlock has a short
summary; add a longer description only when it adds real information.

## PHP function DocBlock

```php
/**
 * Retrieves the orders for a given user.
 *
 * @since 1.4.0
 *
 * @param int    $user_id User ID.
 * @param string $status  Optional. Order status to filter by. Default 'any'.
 * @return WP_Order[] Array of order objects, empty if none found.
 */
function my_plugin_get_user_orders( $user_id, $status = 'any' ) {}
```

- Summaries are a single sentence in the third person ("Retrieves", not "Retrieve" or "This
  function retrieves").
- `@param` order and names must match the signature exactly. Give the type, the name, then a
  description. For optional parameters, start the description with `Optional.` and end with
  `Default <value>.`.
- Use `@return` for anything that returns a value; omit it for a `void` function. Document mixed
  or multiple types as `Type1|Type2`.
- `@since` records the version a function/hook/class was introduced (and `@since` lines are added
  for later significant changes).

## Documenting hooks

Document a hook immediately above the `do_action()` / `apply_filters()` call:

```php
/**
 * Filters the list of order statuses shown in the admin.
 *
 * @since 1.4.0
 *
 * @param string[] $statuses Array of status labels keyed by status slug.
 * @param int      $user_id  The user the list is being built for.
 */
$statuses = apply_filters( 'my_plugin_order_statuses', $statuses, $user_id );
```

## File header

```php
/**
 * Order list table and its query helpers.
 *
 * @package My_Plugin
 * @since   1.4.0
 */
```

## JavaScript (JSDoc)

WordPress JS uses JSDoc-formatted blocks with the same summary/`@since`/`@param`/`@return`
conventions:

```js
/**
 * Formats an order total for display.
 *
 * @since 1.4.0
 *
 * @param {number} amount   Amount in cents.
 * @param {string} currency ISO 4217 currency code.
 * @return {string} The localized, formatted amount.
 */
function formatTotal( amount, currency ) {}
```

Types go in curly braces before the name. Document `@type`, `@member`, and `@callback` where
relevant, and prefer documenting exported/public functions thoroughly.
