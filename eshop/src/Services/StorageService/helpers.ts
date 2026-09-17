import { ENVIRONMENT } from 'Config/environments';
import Config from 'Config';

import { STORAGE_PREFIX } from './constants';

const ENV = Config.environment ?? ENVIRONMENT.DEVELOPMENT;

// TO CONSIDER use this function to prefix values in StorageService class
// (the patterna is the same)
export const prefix = (itemName: string) => {
	return `${STORAGE_PREFIX}_${ENV}_${itemName}`;
};

// TO CONSIDER use some library to get cookie by name
// TO CONSIDER validate the cookie value
export const getCookieByName = (name: string) => {
	if (typeof document === 'undefined') return;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${prefix(name)}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift();
};
