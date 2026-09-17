import type Product from 'vinisto_api_client/src/domain/product';
import {
	VinistoHelperDllBaseItemsAssignParameters,
	VinistoProductDllModelsApiTagTagsReturn,
} from 'vinisto_api_client/src/api-types/product-api/';

export interface AddTagToProductModalFormValues {
	tagId: Array<AddTagToProductModalFormValuesTagItem>;
}

export interface AddTagToProductModalContextData {
	onModalClose: () => void;
	product: Product;
	productIds: string[];
}

export interface AddTagToProductModalFormValuesTagItem {
	label: string;
	value: string;
}

export type AddTagToProductModalRequestData =
	VinistoHelperDllBaseItemsAssignParameters;

export type AddTagToProductModalTagsReturn =
	VinistoProductDllModelsApiTagTagsReturn;
