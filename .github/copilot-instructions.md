# GitHub Release Download - AI Coding Assistant Guide

## Project Overview

WordPress block plugin that creates a customizable button for downloading the latest release from any public GitHub repository. The plugin uses client-side JavaScript with WordPress AJAX to fetch releases dynamically, with automatic fallback from release assets to source ZIP archives.

## Architecture

### Core Components

1. **Main Plugin File** ([github-release-download.php](../github-release-download.php))
   - Registers the block via `register_block_type()` pointing to build directory
   - Defines AJAX handlers `grd_handle_github_release_data()` for both logged-in and guest users
   - Implements 1-hour transient caching using `md5($url)` as cache key
   - Falls back from `assets[0].browser_download_url` to constructed source ZIP URL pattern: `https://github.com/{repo}/archive/refs/tags/{tag}.zip`

2. **Auto-Updater** ([github-update.php](../github-update.php))
   - Hooks into `pre_set_site_transient_update_plugins` to check for GitHub releases
   - Uses hardcoded owner `welbinator` and repo `github-release-download` 
   - Strips `v` prefix from tag names for version comparison
   - Requires release to have downloadable assets in `assets[0].browser_download_url`

3. **Block Implementation** (src/github-release-download/)
   - **edit.js**: Uses InspectorControls sidebar with TextControl components for `repoUrl` and `buttonText`
   - **save.js**: Transforms `repoUrl` to API URL by stripping `https://github.com/` prefix, stores as `data-api-url` attribute
   - **view.js**: DOM-ready event listener on `.github-release-button`, fetches via `/wp-admin/admin-ajax.php?action=get_release_data`

## Development Workflow

### Build Process
```bash
npm run start    # Development mode with hot reload
npm run build    # Production build to build/ directory
npm run plugin-zip  # Create distributable .zip with release asset
```

The plugin uses `@wordpress/scripts` (v27.3.0) which handles webpack, babel, and eslint configuration automatically.

### File Structure Pattern
- Source files in `src/github-release-download/`
- Built files in `build/github-release-download/` (referenced by `register_block_type()`)
- Block metadata in `block.json` defines attributes, scripts, and styles

## Critical Conventions

### Version Management
- **Three version numbers must stay in sync**: 
  1. Plugin header in [github-release-download.php](../github-release-download.php#L5) (`Version: 1.0.2`)
  2. Constant in [github-release-download.php](../github-release-download.php#L19) (`GITHUB_RELEASE_DOWNLOAD_VERSION`)
  3. [readme.txt](../readme.txt) `Stable tag` field
- Version mismatch will break WordPress.org listings and auto-updates

### AJAX Pattern
- Uses WordPress AJAX with `wp_ajax_` and `wp_ajax_nopriv_` hooks for public access
- Always uses `wp_send_json_success()` and `wp_send_json_error()` for consistent response format
- Client-side expects `.success` boolean and `.data.download_url` or `.data.message` in response

### URL Transformation Logic
```javascript
// save.js - Converts user-friendly URL to API URL
const repoPath = repoUrl.replace('https://github.com/', '');
// Result: "user/repo" → "https://api.github.com/repos/user/repo/releases/latest"
```

### Caching Strategy
- Transient key pattern: `github_release_` + MD5 of full API URL
- Cache duration: `HOUR_IN_SECONDS` (3600 seconds)
- No cache invalidation mechanism - relies on expiration

## Common Pitfalls

1. **Build vs Source Files**: Never edit files in `build/` directly - they're auto-generated. Always edit `src/` files.

2. **Block Registration**: The main PHP file uses `__DIR__ . '/build/github-release-download'` which requires the exact folder structure. Moving/renaming breaks registration.

3. **AJAX Security**: The plugin uses `esc_url_raw()` but doesn't implement nonce verification - this is intentional for public access but should be noted if adding privileged operations.

4. **Auto-Updater Specificity**: [github-update.php](../github-update.php) is hardcoded for this specific plugin's GitHub repo. To reuse this pattern, update `$owner` and `$repo` variables and the `$plugin_slug` path.

5. **Asset Requirement**: Auto-updater only works if GitHub releases include uploaded assets (not just tags). The main plugin gracefully falls back to source ZIP, but the updater doesn't.

## Testing Scenarios

- **Empty releases**: Plugin falls back to source ZIP using tag name
- **Private repos**: Will fail at GitHub API - only public repos supported  
- **Invalid URLs**: Frontend `alert()` displays error message from AJAX response
- **Cache behavior**: Test by checking transients table or waiting >1 hour between fetches

## WordPress Block API Usage

This plugin uses modern WordPress 6.7+ block registration:
- `apiVersion: 2` in block.json enables modern features
- No `render_callback` PHP function - purely client-side rendering
- `viewScript` handles interactivity separate from editor script
