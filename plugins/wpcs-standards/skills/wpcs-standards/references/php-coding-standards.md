# PHP coding standards

Summarized from the WordPress PHP Coding Standards and Security handbooks. Canonical source:
https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/

## Formatting

- Indent with real tabs. Use spaces only to align things mid-line (for example, matching
  array values). Never mix leading spaces for indentation.
- Braces open on the same line as the statement and always close on their own line. Use braces
  for every control block, even single statements.
- One statement per line. No closing PHP tag (`?>`) at the end of a pure-PHP file.
- Do not use PHP short open tags (`<?`) or short echo tags (`<?=`). Use `<?php` and
  `<?php echo`.

## Spacing

Put spaces inside the parentheses of control structures and function declarations and calls,
and after every comma:

```php
foreach ( $items as $item ) {
    do_thing( $item, $context );
}
```

- Space on both sides of operators: `$total = $base + $tax;`, `$ready = ( 0 < $count );`.
- No space between a function name and its opening parenthesis; no space before a semicolon.
- Array items: `$args['post_type']` (no spaces for a literal key), `$args[ $key ]` (spaces for a
  variable key).

## Naming

- Functions and variables: `lower_snake_case` (`get_user_orders`, `$order_total`).
- Classes: `Capitalized_Words_With_Underscores` (`class WP_Order_List {}`).
- Constants: `UPPER_SNAKE_CASE` (`define( 'MY_PLUGIN_VERSION', '1.0.0' );`).
- Files: lowercase, words separated by hyphens. Class files are `class-{name}.php`.
- Prefix all global functions, classes, constants, and option keys with a unique plugin/theme
  prefix to avoid collisions.

## Values and structures

- Prefer single-quoted strings; use double quotes only when you need interpolation or an
  embedded single quote.
- Prefer the long array syntax `array( ... )` for the core standard. Multi-line arrays get a
  trailing comma after the last element.
- Use Yoda conditions so an accidental single `=` is a parse error, not a silent assignment:

```php
if ( true === $is_active ) { /* ... */ }
if ( 'publish' === get_post_status( $id ) ) { /* ... */ }
```

- Use strict comparisons (`===`, `!==`) unless loose comparison is genuinely intended.

## Security

Treat these as blocking issues, not style preferences.

### Escape on output (late escaping)

Escape at the point of output with the function that matches the context:

```php
echo esc_html( $title );
printf( '<a href="%s">%s</a>', esc_url( $url ), esc_html( $label ) );
echo wp_kses_post( $rich_content );
<input value="<?php echo esc_attr( $value ); ?>">
```

`esc_html`, `esc_attr`, `esc_url`, `esc_textarea`, `esc_js`, `wp_kses`/`wp_kses_post`. For
translated output use the combined helpers: `esc_html__()`, `esc_attr_e()`, and so on.

### Sanitize and unslash input

WordPress adds slashes to superglobals, so unslash before sanitizing:

```php
$search = isset( $_GET['s'] ) ? sanitize_text_field( wp_unslash( $_GET['s'] ) ) : '';
$id     = isset( $_POST['id'] ) ? absint( $_POST['id'] ) : 0;
$email  = sanitize_email( wp_unslash( $_POST['email'] ?? '' ) );
```

Common sanitizers: `sanitize_text_field`, `sanitize_textarea_field`, `sanitize_key`,
`sanitize_email`, `sanitize_file_name`, `absint`, `intval`, `wp_kses`.

### Authorize state-changing actions

```php
if ( ! current_user_can( 'edit_post', $post_id ) ) {
    wp_die( esc_html__( 'You are not allowed to do this.', 'my-plugin' ) );
}
check_admin_referer( 'my_plugin_save_post', 'my_plugin_nonce' );
```

Pair a capability check (`current_user_can`) with a nonce (`wp_nonce_field` on output,
`check_admin_referer` / `wp_verify_nonce` on handling).

### Query the database safely

Always prepare queries that include variables; never interpolate input directly.

```php
$rows = $wpdb->get_results(
    $wpdb->prepare(
        "SELECT * FROM {$wpdb->posts} WHERE post_status = %s AND post_author = %d",
        $status,
        $author_id
    )
);
```

## Internationalization

- Wrap user-facing text: `__()`, `esc_html__()`, `_e()`, `esc_html_e()`, `_x()`, `_n()`.
- The text domain is a single literal string matching the plugin/theme slug. Never pass a
  variable as the text domain or as the translatable string.
- Build interpolated strings with placeholders and a translators comment:

```php
/* translators: %1$s: user display name, %2$d: order count. */
$message = sprintf(
    esc_html__( '%1$s has %2$d orders.', 'my-plugin' ),
    esc_html( $user_name ),
    absint( $order_count )
);
```
