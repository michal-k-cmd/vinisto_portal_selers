// This function extracts the root domain from the current window location.
// It takes the last two parts of the hostname (e.g., vinisto.dev or vinisto.cz).
const getRootDomain = () => {
	const host = window.location.hostname;
	const parts = host.split('.');
	return parts.slice(-2).join('.');
};

export default getRootDomain;
