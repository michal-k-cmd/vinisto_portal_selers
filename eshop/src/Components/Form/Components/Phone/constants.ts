import { PHONE_CODES } from 'Components/Form/constants';

import { IPhoneCode } from './Components/InputPhoneCode/interfaces';

export const phoneCodes: IPhoneCode[] = [
	{ flag: 'cz', code: PHONE_CODES.CZ },
	{ flag: 'svk', code: PHONE_CODES.SK },
];

export const NOT_FOUND = -1;
