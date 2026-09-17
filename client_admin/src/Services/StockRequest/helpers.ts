import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoHelperDllEnumsStockingRequestDeliveryType } from 'vinisto_api_client/src/api-types/supplier-api';

import {
	STOCK_REQUEST_DELIVERY_TYPE,
	STOCK_REQUEST_STATE,
	STOCK_REQUEST_STATE_API_MAP,
} from './constants';

export const mapLangValuePairs = (values: unknown): LangValuePair[] => {
	if (!Array.isArray(values)) return [];
	return values
		.map((pair) => ({
			language: pair.language,
			value: pair.value,
		}))
		.filter((pair) => pair.language !== '');
};

export const getCorrespondingApiStates = (state: STOCK_REQUEST_STATE) => {
	const keys = Object.keys(
		STOCK_REQUEST_STATE_API_MAP
	) as (keyof typeof STOCK_REQUEST_STATE_API_MAP)[];
	return keys.filter((key) => STOCK_REQUEST_STATE_API_MAP[key] === state);
};

export const convertDeliveryType = (
	deliveryType: STOCK_REQUEST_DELIVERY_TYPE
) =>
	deliveryType as unknown as VinistoHelperDllEnumsStockingRequestDeliveryType;
