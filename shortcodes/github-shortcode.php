<?php

add_shortcode( 'github_release_download', 'grd_render_github_download_button' );

function grd_render_github_download_button( $atts ) {
	$atts = shortcode_atts( [
		'repo_url'       => '',
		'button_text'    => 'Download from GitHub',
		'custom_classes' => '',
	], $atts, 'github_release_download' );

	if ( empty( $atts['repo_url'] ) ) {
		return '<p><em>Missing GitHub repository URL.</em></p>';
	}

	// The view.js from the block handles the button click via AJAX
	// No need to enqueue separate JS

	$repo_url    = esc_url( $atts['repo_url'] );
	$repo_path   = str_replace( 'https://github.com/', '', $repo_url );
	$api_url     = esc_url( "https://api.github.com/repos/{$repo_path}/releases/latest" );
	$button_text = esc_html( $atts['button_text'] );
	
	// Process custom classes - remove dots and build class string
	$custom_classes = '';
	if ( ! empty( $atts['custom_classes'] ) ) {
		$classes_array = array_filter( array_map( 'trim', explode( ' ', $atts['custom_classes'] ) ) );
		$classes_array = array_map( function( $class ) {
			return ltrim( $class, '.' );
		}, $classes_array );
		$custom_classes = ' ' . implode( ' ', $classes_array );
	}
	
	$button_class = 'github-release-button' . $custom_classes;

	ob_start();
	?>
	<button
		class="<?php echo esc_attr( $button_class ); ?>"
		data-api-url="<?php echo esc_attr( $api_url ); ?>"
		data-original-text="<?php echo $button_text; ?>"
	>
		<?php echo $button_text; ?>
	</button>
	<?php
	return ob_get_clean();
}