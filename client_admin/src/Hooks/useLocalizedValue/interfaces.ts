import { VinistoHelperDllEnumsLanguage } from '@/api-types/product-api';

export interface LangValuePair {
	language?: VinistoHelperDllEnumsLanguage | undefined;
	value?: string | null | undefined;
}
