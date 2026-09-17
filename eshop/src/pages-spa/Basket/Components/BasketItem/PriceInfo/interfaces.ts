import { Currency } from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export interface PriceInfoProps {
	originalPrice?: number | null;
	priceWithoutVat: number;
	priceWithVat: number;
	currency: VinistoHelperDllEnumsCurrency | Currency;
	quantity?: number;
}
