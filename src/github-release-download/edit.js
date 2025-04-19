import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { buttonText, repoUrl } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="GitHub Settings">
					<TextControl
						label="GitHub Repo URL"
						value={repoUrl}
						onChange={(value) => setAttributes({ repoUrl: value })}
						help="Example: https://github.com/user/repo"
					/>
					<TextControl
						label="Button Text"
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<button className="github-release-button">{buttonText}</button>
			</div>
		</>
	);
}
