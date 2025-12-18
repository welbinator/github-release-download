import { getBlockDefaultClassName } from '@wordpress/blocks';

export default function save({ attributes }) {
	const { buttonText, repoUrl } = attributes;

	const blockProps = {
		className: getBlockDefaultClassName('wordpress-repo-download/block'),
	};

	// Extract slug and type from WordPress.org URL
	// Example: https://wordpress.org/plugins/plugin-slug or https://wordpress.org/themes/theme-slug
	let slug = '';
	let type = '';

	if (repoUrl.includes('/plugins/')) {
		type = 'plugin';
		slug = repoUrl.replace(/.*\/plugins\/([^\/]+)\/?.*/, '$1');
	} else if (repoUrl.includes('/themes/')) {
		type = 'theme';
		slug = repoUrl.replace(/.*\/themes\/([^\/]+)\/?.*/, '$1');
	}

	return (
		<div {...blockProps}>
			<button
				className="wordpress-repo-button"
				data-slug={slug}
				data-type={type}
				data-original-text={buttonText}
			>
				{buttonText}
			</button>
		</div>
	);
}
