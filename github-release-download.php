<?php
/**
 * Plugin Name:       Github Release Download
 * Description:       Block that adds a button users can use to download the latest release from your github repo.
 * Version:           1.0.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            James Welbes
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       github-release-download
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Behind the scenes, it also registers all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_github_release_download_block_init() {
	
	/**
	 * Registers the block type.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	register_block_type(
		__DIR__ . '/build/github-release-download'
	);
}
add_action( 'init', 'create_block_github_release_download_block_init' );

// 🔌 Handle GitHub API AJAX calls
add_action( 'wp_ajax_get_release_data', 'grd_handle_github_release_data' );
add_action( 'wp_ajax_nopriv_get_release_data', 'grd_handle_github_release_data' );

function grd_handle_github_release_data() {
	$url = isset( $_GET['url'] ) ? esc_url_raw( $_GET['url'] ) : '';

	if ( empty( $url ) ) {
		wp_send_json_error( [ 'message' => 'Missing GitHub API URL' ] );
	}

	$cache_key = 'github_release_' . md5( $url );
	$data      = get_transient( $cache_key );

	if ( false === $data ) {
		$response = wp_remote_get( $url, [
			'headers' => [
				'Accept'     => 'application/vnd.github+json',
				'User-Agent' => 'GitHubReleaseDownload/1.0'
			],
		] );

		if ( is_wp_error( $response ) ) {
			wp_send_json_error( [ 'message' => 'GitHub request failed' ] );
		}

		$body = wp_remote_retrieve_body( $response );
		$data = json_decode( $body, true );

		if ( json_last_error() !== JSON_ERROR_NONE || empty( $data ) ) {
			wp_send_json_error( [ 'message' => 'Invalid GitHub response' ] );
		}

		set_transient( $cache_key, $data, HOUR_IN_SECONDS );
	}

	// Check for manually uploaded release assets
	if ( ! empty( $data['assets'][0]['browser_download_url'] ) ) {
		wp_send_json_success( [
			'download_url' => $data['assets'][0]['browser_download_url']
		] );
	}

	// Fallback: construct URL for source zip
	if ( isset( $data['html_url'], $data['tag_name'] ) ) {
		if ( preg_match( '#github\.com/([^/]+/[^/]+)/#', $data['html_url'], $matches ) ) {
			$repo           = $matches[1];
			$tag            = $data['tag_name'];
			$source_zip_url = "https://github.com/{$repo}/archive/refs/tags/{$tag}.zip";

			wp_send_json_success( [
				'download_url' => $source_zip_url,
			] );
		}
	}

	wp_send_json_error( [ 'message' => 'No downloadable assets found' ] );
}
