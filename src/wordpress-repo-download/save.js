export default function save({ attributes }) {
	const { buttonText, repoUrl, customClasses } = attributes;

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
	
	// Process custom classes - remove dots and trim
	const processedClasses = customClasses 
		? customClasses.split(/\s+/).map(cls => cls.replace(/^\./, '')).filter(Boolean).join(' ')
		: '';
	
	const buttonClassName = processedClasses 
		? `wordpress-repo-button ${processedClasses}`
		: 'wordpress-repo-button';

	return (
		<button
			className={buttonClassName}
			data-slug={slug}
			data-type={type}
			data-original-text={buttonText}
		>
			{buttonText}
		</button>
	);
}
