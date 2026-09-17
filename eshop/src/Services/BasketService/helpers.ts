import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { PRODUCERS_SPECIFICATION_UNIVERSAL_ID } from 'pages-spa/Producers/constants';

import { Bundle } from '@/domain/bundle';
import { BasketResponse } from '@/api-types/basket-api';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiBundleBundle,
} from '@/api-types/product-api';
import { BasketType } from '@/api-types/basket-api';

export const toValidObjectId = (id: string | null): string => {
	if (typeof id !== 'string') {
		throw new Error('Invalid ID type, expected a string');
	}
	return id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 24);
};

/*
 * Return negative quantity if the item was removed from the basket,
 * positive quantity if it was added or updated.
 * If the item was not changed, return 0.
 */
export const diffQuantities = (params: {
	bundleId: string;
	previousState: BasketResponse | null | undefined;
	newState: BasketResponse | null | undefined;
}) => {
	const { bundleId, previousState, newState } = params;
	const previousItem = previousState?.items?.find(
		(item) => item.itemId === bundleId
	);
	const newItem = newState?.items?.find((item) => item.itemId === bundleId);
	return (newItem?.quantity ?? 0) - (previousItem?.quantity ?? 0);
};

export const getBundleProducerNames = (
	bundle: Bundle | VinistoProductDllModelsApiBundleBundle | null
) => {
	if (!bundle || !bundle.specificationDetails) {
		return [];
	}
	const producers = bundle?.specificationDetails?.find(
		(specification) =>
			specification.definition.id === PRODUCERS_SPECIFICATION_UNIVERSAL_ID
	);
	const producerNames =
		Object.values(producers?.definition.allowedValues ?? {})?.map((value) =>
			// @ts-expect-error Wrong typing
			getLocalizedValue(value.name)
		) ?? [];

	return producerNames;
};

export const getBundleMetaForAnalytics = (bundle: Bundle | null) => {
	if (!bundle || !bundle.specificationDetails) {
		return {
			item_name: getLocalizedValue(bundle?.name),
			item_brand: getBundleProducerNames(bundle).join(', '),
			price: 0,
		};
	}
	const { basePrice, discountedPrice } = bundle?.bundlePrices ?? {};
	const lowestPrice = discountedPrice?.value ?? basePrice?.value ?? 0;

	return {
		item_name: getLocalizedValue(bundle?.name),
		item_brand: getBundleProducerNames(bundle).join(', '),
		price: lowestPrice,
	};
};

export const mapCurrencyEnumToCurrencyCode = (
	currency: VinistoHelperDllEnumsCurrency
) => {
	const currencyCodeMap = {
		[VinistoHelperDllEnumsCurrency.CZK]: 1,
		[VinistoHelperDllEnumsCurrency.EUR]: 2,
		[VinistoHelperDllEnumsCurrency.USD]: 3,
	};
	return currencyCodeMap[currency];
};

export const mapCurrencyEnumToCountryCode = (
	currency: VinistoHelperDllEnumsCurrency
) => {
	const currencyCodeMap = {
		[VinistoHelperDllEnumsCurrency.CZK]: 1,
		[VinistoHelperDllEnumsCurrency.EUR]: 2,
		[VinistoHelperDllEnumsCurrency.USD]: 3,
	};
	return currencyCodeMap[currency];
};

export const mapBasketTypeEnumToBasketTypeCode = (basketType: BasketType) => {
	const basketTypeMap = {
		[BasketType.Primary]: 0,
		[BasketType.SystemDefined]: 1,
		[BasketType.UserDefined]: 2,
	};
	return basketTypeMap[basketType];
};
