import { Dispatch } from 'react';
import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoProductDllModelsApiBundleBundle,
} from 'vinisto_api_client/src/api-types/product-api';

import { BundleDetailAction } from './constants';

export type BundleDiscounts = (VinistoCommonDllModelsApiPricesPrice & {
	id: string;
})[];

export interface BundleDetailState {
	bundle: VinistoProductDllModelsApiBundleBundle | null;
	discounts: Promise<BundleDiscounts>;
}

export type SetBundleDataAction = [
	BundleDetailAction.setBundleData,
	BundleDetailState['bundle']
];

export type SetDiscountDataAction = [
	BundleDetailAction.setDiscountData,
	BundleDetailState['discounts']
];

export type RefreshDiscountDataAction = [
	BundleDetailAction.refreshDiscountData
];

export type BundleDetailReducerAction =
	| SetBundleDataAction
	| SetDiscountDataAction
	| RefreshDiscountDataAction;

export interface BundleDetailLoaderReturnValue extends Record<string, any> {
	bundlePromise: Promise<BundleDetailState['bundle']>;
}

export interface BundleDetailContextValue extends BundleDetailState {
	dispatch: Dispatch<BundleDetailReducerAction>;
}
