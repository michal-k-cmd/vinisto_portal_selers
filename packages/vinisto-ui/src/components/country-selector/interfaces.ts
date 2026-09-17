import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/supplier-api';

export type TargetOptions = {
	[key in VinistoHelperDllEnumsCountryCode]: string[];
};
