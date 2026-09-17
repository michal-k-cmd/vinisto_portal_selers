import { FIELD_NAME } from './constants';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

export interface PriceFormFields {
	[FIELD_NAME]: number;
	basePrice: number;
	priceLevel: VinistoHelperDllEnumsPriceLevel | undefined;
	platformId: number;
}

export interface PriceFormProps {
	initialValue?: PriceFormFields[typeof FIELD_NAME];
	labelValue?: PriceFormFields[typeof FIELD_NAME];
	onSubmit: (values: PriceFormFields) => void;
	basePrice?: number;
	priceLevel: VinistoHelperDllEnumsPriceLevel | undefined;
	platformId?: number;
}
