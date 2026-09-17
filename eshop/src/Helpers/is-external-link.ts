const isUrlAbsolute = (url: string = '') =>
	url.indexOf('://') > 0 || url.indexOf('//') === 0;

const isExternalLink = (url: string = '') => {
	// First check if the URL is absolute
	if (!isUrlAbsolute(url)) return false;

	// Get the base URI from environment variables or use a fallback
	// This works in both server and client environments
	let baseUri = 'https://vinisto.dev/';

	// In Next.js, process.env is replaced at build time with the actual values
	// so this is safe to use in both server and client components
	if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_BASE_URI) {
		baseUri = process.env.NEXT_PUBLIC_BASE_URI;
	}

	// Extract the domain from the base URI (without www. prefix if present)
	const baseDomain = baseUri.replace(/https?:\/\/(www\.)?/, '').split('/')[0];

	// Extract the domain from the URL (without www. prefix if present)
	const urlDomain = url.replace(/https?:\/\/(www\.)?/, '').split('/')[0];

	// Compare the domains to determine if the link is external
	return urlDomain !== baseDomain;
};

export default isExternalLink;
