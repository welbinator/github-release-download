export default function save({ attributes }) {
	const { buttonText, repoUrl, customClasses } = attributes;

	const repoPath = repoUrl.replace('https://github.com/', '');
	
	// Process custom classes - remove dots and trim
	const processedClasses = customClasses 
		? customClasses.split(/\s+/).map(cls => cls.replace(/^\./, '')).filter(Boolean).join(' ')
		: '';
	
	const buttonClassName = processedClasses 
		? `github-release-button ${processedClasses}`
		: 'github-release-button';

	return (
		<button
			className={buttonClassName}
			data-api-url={`https://api.github.com/repos/${repoPath}/releases/latest`}
			data-original-text={buttonText}
		>
			{buttonText}
		</button>
	);
}
