import { IPhoneCode } from './InputPhoneCode/interfaces';

export const FALLBACK_PHONE_CODE = 420;
export const PHONE_PREFIX = '+';
export const CODE_NUMBER_SEPARATOR = ' ';

export const phoneCodes: IPhoneCode[] = [
	{ flag: 'cz', code: FALLBACK_PHONE_CODE },
	{ flag: 'svk', code: 421 },
	{ flag: 'deu', code: 49 },
];
