function isPrerender() {
	// Check if navigator is available (client-side)
	if (typeof navigator === 'undefined') {
		// Server-side rendering
		return true;
	}

	const userAgent = navigator.userAgent;

	if (userAgent.match(/Prerender/i)) {
		return true;
	}

	return false;
}

export { isPrerender };
