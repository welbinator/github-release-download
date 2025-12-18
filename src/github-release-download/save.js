export default function save({ attributes }) {
	const { buttonText, repoUrl } = attributes;

	const repoPath = repoUrl.replace('https://github.com/', '');

	return (
		<button
			className="github-release-button"
			data-api-url={`https://api.github.com/repos/${repoPath}/releases/latest`}
			data-original-text={buttonText}
		>
			{buttonText}
		</button>
	);
}
