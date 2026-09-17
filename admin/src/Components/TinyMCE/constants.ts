const TINYMCE_API_KEY = 'xzixuky74ix8oo359b864xmlk58hk7gqxwaum7jpq7t02zet';

const tinymce_plugins = [
	'advlist',
	'autolink',
	'lists',
	'link',
	'image',
	'charmap',
	'preview',
	'anchor',
	'searchreplace',
	'visualblocks',
	'code',
	'fullscreen',
	'insertdatetime',
	'media',
	'table',
	'help',
	'wordcount',
	'emoticons',
];
const tinymce_toolbar = [
	'undo redo | bold italic underline | blocks styles fontsize | link image customInsertImage media table',
	'align lineheight numlist bullist checklist | outdent indent | strikethrough forecolor backcolor  removeformat | charmap emoticons code | fullscreen anchor',
];

const tinymce_content_style =
	'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }';

const tinymce_style_formats = [
	{
		title: 'CTA Button',
		selector: 'a',
		classes: 'blog-button',
	},
	{
		title: 'Image Left',
		selector: 'figure',
		classes: 'blog-image-left',
	},
	{
		title: 'Image Center',
		selector: 'figure',
		classes: 'blog-image-center',
	},
	{
		title: 'Image Right',
		selector: 'figure',
		classes: 'blog-image-right',
	},
	{
		title: 'Highlighted text',
		selector: 'span',
		classes: 'blog-highlighted-text',
	},
];

export {
	TINYMCE_API_KEY,
	tinymce_plugins,
	tinymce_toolbar,
	tinymce_content_style,
	tinymce_style_formats,
};
