import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api';

export const VAT_VALUE = {
	BASE_VAT: 21,
	FIRST_REDUCED_VAT: 12,
	SECOND_REDUCED_VAT: 12,
	NO_VAT: 0,
} as const;

export const getVatValue = (
	vat: VinistoHelperDllEnumsVatRate | null | undefined
) => {
	switch (vat) {
		case VinistoHelperDllEnumsVatRate.BaseVat:
			return VAT_VALUE.BASE_VAT;
		case VinistoHelperDllEnumsVatRate.FirstReducedVat:
			return VAT_VALUE.FIRST_REDUCED_VAT;
		case VinistoHelperDllEnumsVatRate.SecondReducedVat:
			return VAT_VALUE.SECOND_REDUCED_VAT;
		case VinistoHelperDllEnumsVatRate.NoVat:
			return VAT_VALUE.NO_VAT;
		default:
			return VAT_VALUE.BASE_VAT;
	}
};
