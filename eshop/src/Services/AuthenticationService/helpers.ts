import { v4 as uuidv4 } from 'uuid';
import { dayjsInstance as dayjs } from 'Services/Date';
import {
	SignalRError,
	TransformedSignalRErrors,
} from 'Services/BasketService/interfaces';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { VinistoHelperDllEnumsUserUserRights } from '@/api-types/user-api';
import User from '@/domain/user';

export const generateUniqueUserHash = () => {
	return {
		anonymousUserId: `${uuidv4()}-${uuidv4()}-${dayjs().format(
			'YYYY-MM-DD-HH:mm:ss'
		)}`,
		initial_timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
		expiresOn: dayjs().add(365, 'days').format('YYYY-MM-DD HH:mm:ss'),
	};
};

export const hashString = (s: string) => {
	let i, h;
	for (i = 0, h = 0xdeadbeef; i < s.length; i++)
		h = Math.imul(h ^ s.charCodeAt(i), 2654435761);
	return String((h ^ (h >>> 16)) >>> 0);
};

export const mergeWebsocketErrors = (
	newErrors: SignalRError[] = [],
	oldErrors: TransformedSignalRErrors
): TransformedSignalRErrors => {
	const mergedErrors: TransformedSignalRErrors = {
		Bundle: [...(oldErrors.Bundle ?? [])],
		Coupon: [...(oldErrors.Coupon ?? [])],
		Addon: [...(oldErrors.Addon ?? [])],
	};

	newErrors.forEach((error) => {
		const errorHash = hashString(JSON.stringify(error));
		if (!mergedErrors[error.type])
			/*eslint-disable-next-line no-console */
			console.warn(`Unrecognized SignalR error type: ${error.type}`);

		const isAlreadyPresent = mergedErrors[error.type].some(
			(existingError) => existingError.id === errorHash
		);
		if (isAlreadyPresent) return;
		mergedErrors[error.type].push({ ...error, id: errorHash });
	});

	return mergedErrors;
};

export function canCreateOrderAsSupport(
	permissions: VinistoHelperDllEnumsUserUserRights[] = []
) {
	return permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE
	);
}

export function canCreateOrderAsCSO(
	permissions: VinistoHelperDllEnumsUserUserRights[] = []
) {
	return permissions.includes(VinistoHelperDllEnumsUserUserRights.USER_CSO);
}

export const setPriceLevelCookie = (user: User) => {
	document.cookie = `${prefix(LocalStorageKeys.USER_PRICE_LEVEL)}=${
		user.priceLevel
	}; path=/ ;max-age=31536000`;
};

export const deletePriceLevelCookie = () => {
	document.cookie = `${prefix(
		LocalStorageKeys.USER_PRICE_LEVEL
	)}=; path=/ ;max-age=0`;
};
