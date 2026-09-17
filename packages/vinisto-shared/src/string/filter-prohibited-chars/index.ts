export const filterProhibitedChars = (
	value: string,
	prohibitedChars: string[]
): string => {
	const regex = new RegExp(`[${prohibitedChars.join('')}]`, 'g');
	return value.replace(regex, '');
};
