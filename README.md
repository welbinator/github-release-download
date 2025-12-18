# Remote Download

A WordPress plugin that adds customizable download buttons for releases from GitHub repositories and WordPress.org plugins/themes.

## Features

### Blocks

- **GitHub Release Download Block** - Creates a button that downloads the latest release from any public GitHub repository
- **WordPress Repo Download Block** - Creates a button that downloads plugins or themes from WordPress.org

### Shortcodes

- **`[github_release_download]`** - Shortcode version of the GitHub download button
- **`[wordpress_repo_download]`** - Shortcode version of the WordPress.org download button

### Key Features

- ✅ Automatic fallback from release assets to source ZIP for GitHub releases
- ✅ 1-hour transient caching for improved performance
- ✅ Works with both plugins and themes from WordPress.org
- ✅ Customizable button text
- ✅ Clean, modern button styling
- ✅ No PHP rendering required - JavaScript handles everything client-side via AJAX

## Installation

1. Download the plugin ZIP file
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the ZIP file and click "Install Now"
4. Activate the plugin

## Usage

### Using Blocks

#### GitHub Release Download Block

1. Add the "GitHub Release Download" block to your page/post
2. In the block settings sidebar, enter:
   - **GitHub Repo URL**: e.g., `https://github.com/user/repository`
   - **Button Text**: Custom text for your button (default: "Download from GitHub")
3. Publish your page

#### WordPress Repo Download Block

1. Add the "WordPress Repo Download" block to your page/post
2. In the block settings sidebar, enter:
   - **WordPress.org URL**: e.g., `https://wordpress.org/plugins/plugin-slug` or `https://wordpress.org/themes/theme-slug`
   - **Button Text**: Custom text for your button (default: "Download from WordPress.org")
3. Publish your page

### Using Shortcodes

#### GitHub Release Download Shortcode

```
[github_release_download repo_url="https://github.com/user/repository" button_text="Download Latest Release"]
```

**Attributes:**
- `repo_url` (required) - Full GitHub repository URL
- `button_text` (optional) - Custom button text (default: "Download from GitHub")

**Example:**
```
[github_release_download repo_url="https://github.com/welbinator/roadmap-wp" button_text="Get Roadmap WP"]
```

#### WordPress Repo Download Shortcode

```
[wordpress_repo_download repo_url="https://wordpress.org/plugins/plugin-slug" button_text="Download Plugin"]
```

**Attributes:**
- `repo_url` (required) - Full WordPress.org plugin or theme URL
- `button_text` (optional) - Custom button text (default: "Download from WordPress.org")

**Examples:**
```
[wordpress_repo_download repo_url="https://wordpress.org/plugins/roadmap-wp" button_text="Download Now"]

[wordpress_repo_download repo_url="https://wordpress.org/themes/twentytwentyfive" button_text="Get Theme"]
```

## How It Works

### GitHub Downloads

1. User clicks the download button
2. Plugin fetches latest release data from GitHub API
3. If the release has uploaded assets, downloads the first asset
4. If no assets exist, falls back to the auto-generated source ZIP
5. Results are cached for 1 hour to reduce API calls

### WordPress.org Downloads

1. User clicks the download button
2. Plugin detects if it's a plugin or theme from the URL
3. Fetches download link from WordPress.org API
4. Initiates download of the latest stable version
5. Results are cached for 1 hour

## API Endpoints

The plugin uses:
- **GitHub API**: `https://api.github.com/repos/{owner}/{repo}/releases/latest`
- **WordPress.org Plugins API**: `https://api.wordpress.org/plugins/info/1.2/`
- **WordPress.org Themes API**: `https://api.wordpress.org/themes/info/1.2/`

## Requirements

- WordPress 6.7 or higher
- PHP 7.4 or higher

## Development

### Build Process

```bash
npm install          # Install dependencies
npm run start        # Development mode with hot reload
npm run build        # Production build
npm run plugin-zip   # Create distributable ZIP
```

### File Structure

```
remote-download/
├── build/                          # Compiled block assets
│   ├── github-release-download/
│   └── wordpress-repo-download/
├── src/                            # Source files for blocks
│   ├── github-release-download/
│   └── wordpress-repo-download/
├── shortcodes/                     # Shortcode implementations
│   ├── github-shortcode.php
│   └── wordpress-shortcode.php
├── remote-download.php             # Main plugin file
├── github-update.php               # Auto-updater from GitHub
└── package.json                    # Build dependencies
```

## Author

**James Welbes**

## License

GPL-2.0-or-later

## Changelog

### 1.1.0
- Added WordPress Repo Download block and shortcode
- Improved button styling consistency
- Fixed editor preview styles

### 1.0.2
- Initial release with GitHub Release Download functionality
