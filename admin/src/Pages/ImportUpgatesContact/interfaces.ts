import { VinistoHelperDllBaseError } from 'vinisto_api_client/src/api-types/product-api/';

export interface IUpgatesContactImportState {
	result?: { isError: boolean; error: VinistoHelperDllBaseError };
	loading: boolean;
	error: null | string;
}
