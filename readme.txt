=== Github Release Download ===
Contributors:      James Welbes  
Tags:              block, shortcode  
Tested up to:      6.7  
Stable tag:        1.0.4  
License:           GPL-2.0-or-later  
License URI:       https://www.gnu.org/licenses/gpl-2.0.html  

Block that adds a button users can use to download the latest release from your github repo.

== Description ==

GitHub Release Download is a simple block plugin for WordPress that allows you to create a customizable button that downloads the latest release from any public GitHub repository.

Just enter the repository URL (e.g. https://github.com/user/repo) and customize the button text in the editor. On the front end, the button dynamically fetches the latest release using the GitHub API. If the release has downloadable assets, the first one is downloaded. If not, the plugin automatically falls back to the auto-generated source ZIP for the release tag.

No PHP rendering is required for the block — everything is handled via JavaScript using the WordPress block system and AJAX.

**Shortcode Support:**  
In addition to the block, the plugin now supports a `[github_release_download]` shortcode.  
You can use it like this:

[github_release_download repo_url="https://github.com/user/repo" button_text="Download Plugin"]


This allows embedding a GitHub download button anywhere shortcodes are supported. The button behaves the same as the block, using a separate JavaScript handler optimized for shortcode usage.

== Installation ==

If you don't know how to install a plugin, this plugin isn't for you.

== Changelog ==

= 1.0.4 =
* Added `[github_release_download]` shortcode with `repo_url` and `button_text` attributes
* Shortcode uses a separate JavaScript file to handle download logic
* Minor code cleanup
