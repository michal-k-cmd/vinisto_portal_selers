import { VinistoHelperDllEnumsCountryCode } from '@/api-types/supplier-api';

export type TargetOptions = {
	[key in VinistoHelperDllEnumsCountryCode]: string[];
};
