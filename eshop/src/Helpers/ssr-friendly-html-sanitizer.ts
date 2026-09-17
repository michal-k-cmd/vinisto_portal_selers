import DOMPurify from 'isomorphic-dompurify';

// const config = {
// 	ALLOWED_TAGS: [
// 		'h1',
// 		'h2',
// 		'h3',
// 		'h4',
// 		'h5',
// 		'h6',
// 		'p',
// 		'a',
// 		'ul',
// 		'ol',
// 		'li',
// 		'b',
// 		'i',
// 		'strong',
// 		'em',
// 		'mark',
// 		'small',
// 		'del',
// 		'ins',
// 		'sub',
// 		'sup',
// 		'div',
// 		'span',
// 		'br',
// 		'hr',
// 		'table',
// 		'thead',
// 		'tbody',
// 		'tr',
// 		'th',
// 		'td',
// 		'img',
// 		'figure',
// 		'figcaption',
// 		'blockquote',
// 		'pre',
// 		'code',
// 	],
// 	ALLOWED_ATTR: [
// 		'href',
// 		'target',
// 		'rel',
// 		'src',
// 		'alt',
// 		'title',
// 		'class',
// 		'id',
// 		'name',
// 		'width',
// 		'height',
// 		'style',
// 		'data-*',
// 	],
// 	ADD_URI_SAFE_ATTR: ['target'], // Allow target attribute for links
// 	ALLOW_DATA_ATTR: true, // Allow data-* attributes
// 	USE_PROFILES: { html: true }, // Use HTML profile
// 	RETURN_DOM: false, // Return HTML as string
// 	RETURN_DOM_FRAGMENT: false,
// 	RETURN_DOM_IMPORT: false,
// 	SANITIZE_DOM: true,
// };

export const sanitizeHTML = (html: string | undefined) => {
	return DOMPurify.sanitize(html ?? '');
};
