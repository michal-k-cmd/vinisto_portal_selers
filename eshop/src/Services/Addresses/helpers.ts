import isObject from 'lodash-es/isObject';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import { IdField } from 'pages-spa/CartShippingData/interfaces';
import { LocalStorageKeys } from 'Services/StorageService/constants';

export const isObjectType = (
	value: unknown
): value is Record<PropertyKey, unknown> => {
	return isObject(value);
};

export const setShippingId = (
	key: IdField,
	value: string | null | undefined
) => {
	const shippingIds = storageService.getStorageItem(
		LocalStorageKeys.CART_SHIPPING_DATA
	);
	storageService.setItem(LocalStorageKeys.CART_SHIPPING_DATA, {
		...(isObjectType(shippingIds) && shippingIds),
		[key]: value,
	});
};

export const getShippingId = (key: IdField) => {
	const maybeData = storageService.getStorageItem(
		LocalStorageKeys.CART_SHIPPING_DATA
	);
	if (isObjectType(maybeData)) {
		return maybeData[key] ? String(maybeData[key]) : null;
	}
};
