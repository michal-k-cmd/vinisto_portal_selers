const removeInlineStyles = (html: string): string => {
	if (typeof window === 'undefined') {
		return html;
	}
	const parser = new window.DOMParser();
	const doc = parser.parseFromString(html, 'text/html');

	const elementsWithStyles = doc.querySelectorAll('[style]');
	elementsWithStyles.forEach((element) => {
		element.removeAttribute('style');
	});

	return doc.body.innerHTML;
};

export default removeInlineStyles;
