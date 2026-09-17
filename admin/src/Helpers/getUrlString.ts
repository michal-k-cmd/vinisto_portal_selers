export const removeDiacritics = (text: string) => {
	const stringFormD = text.normalize('NFD');
	let retVal = '';
	for (let index = 0; index < stringFormD.length; index++) {
		if (/\p{M}/u.test(stringFormD[index]) === false) {
			retVal += stringFormD[index];
		}
	}
	return retVal.normalize('NFC');
};

export const getUrlString = (url: string): string => {
	/**
	 * corresponds to the way it's done on BE:
	 * 1) převedeme název na malá písmena
	 * 2) metodou RemoveDiacritics nahradíme všechny znaky s diakritikou na znaky bez diakritiky
	 *    https://www.dotnetportal.cz/blogy/4/Tomas-Jecha/663/NET-Tip-6-Ciste-odstraneni-diakritiky
	 * 3) všechny znaky kromě a-z a 0-9 převedeme na pomlčku
	 * 4) ořízneme pomlčky zepředu a zezadu
	 */
	return (
		removeDiacritics(url.toLocaleLowerCase())
			.replace(/[^a-zA-Z0-9]/g, '-')
			// eslint-disable-next-line no-useless-escape
			.replace(/(^\-+|\-+$)/g, '')
	);
};

export default getUrlString;
