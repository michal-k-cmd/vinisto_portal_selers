import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoImageDllModelsApiImageImage,
} from 'vinisto_api_client/src/api-types/product-api/';

//TODO: this interface isn't correct, it can cause unexpected type errors
/**
 * @deprecated
 */
export interface BundleType {
	id: string;
	name: LangValuePair[];
	description: LangValuePair[];
	metaDescription: LangValuePair[];
	images: VinistoImageDllModelsApiImageImage[];
	prices: VinistoCommonDllModelsApiPricesPrice[];
}

export interface SetFlagInput {
	bundleId: string;
	userLoginHash: string;
	desiredState: boolean;
}
export interface SetOrderLimitationInput {
	bundleId: string;
	userLoginHash: string;
	limit: number;
	from: Date;
	to: Date | null;
}

export type RemoveOrderLimitationInput = Pick<
	SetOrderLimitationInput,
	'bundleId' | 'userLoginHash'
>;

export interface GetAutocompleteBundlesParams {
	[key: string]: string | number | boolean;
}

export interface SetIsBundleClearanceSaleInput {
	bundleId: string;
	userLoginHash: string;
	desiredState: boolean;
}

export interface BundleCanSendToWmsParameters {
	userLoginHash: string;
	canSendToWms: boolean;
}
