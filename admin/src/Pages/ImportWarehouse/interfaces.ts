import { VinistoHelperDllBaseError } from 'vinisto_api_client/src/api-types/product-api/';

export interface IWarehouseImportState {
	csv?: { isError: boolean; error: VinistoHelperDllBaseError };
	loading: boolean;
	error: null | string;
}
