import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/product-api/';

export const ENV_DEVELOPMENT = 'development';

export const ERR_MSG_500 = 'Něco se nepovedlo.';

export const OBJECT_ALREADY_EXISTS_ERROR = 'ObjectAlreadyExists';

export const LANGUAGE_CODE_MAP = {
	[VinistoHelperDllEnumsLanguage.CZECH]: 'CZ',
	[VinistoHelperDllEnumsLanguage.SLOVAK]: 'SK',
	[VinistoHelperDllEnumsLanguage.ENGLISH]: 'EN',
	[VinistoHelperDllEnumsLanguage.GERMAN]: 'DE',
};
