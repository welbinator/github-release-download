<?php

add_shortcode( 'wordpress_repo_download', 'wprd_render_wordpress_download_button' );

function wprd_render_wordpress_download_button( $atts ) {
	$atts = shortcode_atts( [
		'repo_url'    => '',
		'button_text' => 'Download from WordPress.org',
	], $atts, 'wordpress_repo_download' );

	if ( empty( $atts['repo_url'] ) ) {
		return '<p><em>Missing WordPress.org repository URL.</em></p>';
	}

	// Extract slug and type from WordPress.org URL
	$repo_url = $atts['repo_url'];
	$slug = '';
	$type = '';

	if ( strpos( $repo_url, '/plugins/' ) !== false ) {
		$type = 'plugin';
		$slug = preg_replace( '/.*\/plugins\/([^\/]+)\/?.*/', '$1', $repo_url );
	} elseif ( strpos( $repo_url, '/themes/' ) !== false ) {
		$type = 'theme';
		$slug = preg_replace( '/.*\/themes\/([^\/]+)\/?.*/', '$1', $repo_url );
	}

	if ( empty( $slug ) || empty( $type ) ) {
		return '<p><em>Invalid WordPress.org URL. Please use a plugin or theme URL.</em></p>';
	}

	$button_text = esc_html( $atts['button_text'] );

	ob_start();
	?>
	<div class="wordpress-repo-download-shortcode">
		<button
			class="wordpress-repo-button"
			data-slug="<?php echo esc_attr( $slug ); ?>"
			data-type="<?php echo esc_attr( $type ); ?>"
			data-original-text="<?php echo $button_text; ?>"
		>
			<?php echo $button_text; ?>
		</button>
	</div>
	<?php
	return ob_get_clean();
}
