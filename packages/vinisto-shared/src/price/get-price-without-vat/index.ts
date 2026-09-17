import { VinistoHelperDllEnumsVatRate } from 'vinisto_api_client/src/api-types/product-api';

import { getVatValue } from '../get-vat-value';

export const getPriceWithoutVAT = (
	price: number,
	vat: VinistoHelperDllEnumsVatRate
) => price / (1 + getVatValue(vat) / 100);
