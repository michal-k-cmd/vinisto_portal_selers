// ! SUPER IMPORTANT: this package does not work well with SSR and tends to break SSR (TypeError: Right-hand side of 'instanceof' is not an object)

import DOMPurify from 'isomorphic-dompurify';

/**
 * @warning This function does not work well with SSR and tends to break SSR (TypeError: Right-hand side of 'instanceof' is not an object)
 */
function sanitizeHTML(html: string) {
	if (!html) {
		return '';
	}

	// Configure DOMPurify to remove scripts and dangerous attributes
	// while preserving most HTML structure for SEO
	const config = {
		ADD_TAGS: ['iframe'],
		ALLOWED_TAGS: [
			'h1',
			'h2',
			'h3',
			'h4',
			'h5',
			'h6',
			'p',
			'a',
			'ul',
			'ol',
			'li',
			'b',
			'i',
			'strong',
			'em',
			'mark',
			'small',
			'del',
			'ins',
			'sub',
			'sup',
			'div',
			'span',
			'br',
			'hr',
			'table',
			'thead',
			'tbody',
			'tr',
			'th',
			'td',
			'img',
			'figure',
			'figcaption',
			'blockquote',
			'pre',
			'code',
		],
		ALLOWED_ATTR: [
			'href',
			'target',
			'rel',
			'src',
			'alt',
			'title',
			'class',
			'id',
			'name',
			'width',
			'height',
			'style',
			'data-*',
			'allow',
			'allowfullscreen',
			'frameborder',
			'scrolling',
		],
		ADD_URI_SAFE_ATTR: ['target'], // Allow target attribute for links
		ALLOW_DATA_ATTR: true, // Allow data-* attributes
		USE_PROFILES: { html: true }, // Use HTML profile
		RETURN_DOM: false, // Return HTML as string
		RETURN_DOM_FRAGMENT: false,
		RETURN_DOM_IMPORT: false,
		SANITIZE_DOM: true,
	};

	// Sanitize the HTML using DOMPurify
	const sanitized = DOMPurify.sanitize(html, config);

	return sanitized;
}

export default sanitizeHTML;
