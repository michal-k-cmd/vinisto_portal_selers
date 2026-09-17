/**
 * Helper function for removing dicritics and accents from text
 * @param text Text to be converted
 * @returns text without diacritics
 */
function removeDiacritics(text: string): string {
	if (text.length === 0) return '';
	return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Helper function to sanitize string for icon file name
 * @param unsanitizedString string to be converted
 * @returns sanitized string
 */
export const getIconFileName = (unsanitizedString: string): string => {
	return (
		removeDiacritics(unsanitizedString.toLocaleLowerCase())
			.replace(/[^a-zA-Z0-9]/g, '-')
			// eslint-disable-next-line no-useless-escape
			.replace(/(^\-+|\-+$)/g, '')
			.replace('--', '-') + '.svg'
	);
};

export default removeDiacritics;
