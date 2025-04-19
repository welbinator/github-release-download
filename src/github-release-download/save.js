import { getBlockDefaultClassName } from '@wordpress/blocks';

export default function save({ attributes }) {
	const { buttonText, repoUrl } = attributes;

	const blockProps = {
		className: getBlockDefaultClassName('github-release-download/block'),
	};

	const repoPath = repoUrl.replace('https://github.com/', '');

	return (
		<div {...blockProps}>
			<button
				className="github-release-button"
				data-api-url={`https://api.github.com/repos/${repoPath}/releases/latest`}
				data-original-text={buttonText}
			>
				{buttonText}
			</button>
		</div>
	);
}
