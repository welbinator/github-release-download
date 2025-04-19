import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import save from './save';
import './style.scss';

registerBlockType('github-release-download/block', {
	edit,
	save,
});
