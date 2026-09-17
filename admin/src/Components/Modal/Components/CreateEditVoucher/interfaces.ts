import {
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoImageDllModelsApiImageImage,
} from 'vinisto_api_client/src/api-types/order-api/';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/user-api/';

import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
} from '@/api-types/product-api';

export interface CreateVoucherFormValues {
	amountDiscount: {
		value: number | undefined;
		vat: VinistoHelperDllEnumsVatRate;
		currency: VinistoHelperDllEnumsCurrency;
		level: VinistoHelperDllEnumsPriceLevel;
		platformId: number;
	};
	amountCurrency: VinistoHelperDllEnumsCurrency;
	amountPrice: number;
	amountVat: string;
	code: string | null | undefined;
	discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	validFrom: Date;
	validTo: Date;
	unitLanguage: VinistoHelperDllEnumsLanguage;
	unitValue: string;
	name?: string;
	shortDescription?: string;
	description?: string;
	images?: VinistoImageDllModelsApiImageImage[] | null;
	unit: { language: VinistoHelperDllEnumsLanguage; value: string };
}
