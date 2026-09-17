import { VinistoHelperDllEnumsCountryCode } from '@/api-types/supplier-api';

export type TargetOptions = Partial<{
	[key in VinistoHelperDllEnumsCountryCode]: string[];
}>;
