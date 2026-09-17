export const getRootDomain = (uri: string) => {
	if (!uri) return null;
	const match = uri.match(/([^.]+\.[^.]+)(?=\/|$)/);
	return match ? match[0] : null;
};
