import { size } from 'lodash-es';

/**
 * Helper function for removing dicritics and accents from text
 * @param text Text to be converted
 * @returns text without diacritics
 */
function removeDiacritics(text: string): string {
	if (size(text) === 0) return '';
	return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export default removeDiacritics;
