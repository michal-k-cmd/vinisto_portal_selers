function purgeHTML(html: string): string {
	return html
		.replace(/<\/?[^>]+(>|$)/g, '')
		.replace(/\s+/g, ' ')
		.trim();
}

export default purgeHTML;
