import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { buttonText, repoUrl, customClasses } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="WordPress.org Settings">
					<TextControl
						label="WordPress.org URL"
						value={repoUrl}
						onChange={(value) => setAttributes({ repoUrl: value })}
						help="Example: https://wordpress.org/plugins/your-plugin or https://wordpress.org/themes/your-theme"
					/>
					<TextControl
						label="Button Text"
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<TextControl
						label="Custom Classes"
						value={customClasses}
						onChange={(value) => setAttributes({ customClasses: value })}
						help="Add custom CSS classes (e.g., .my-class .another-class)"
					/>
				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				<button className="wordpress-repo-button">{buttonText}</button>
			</div>
		</>
	);
}
