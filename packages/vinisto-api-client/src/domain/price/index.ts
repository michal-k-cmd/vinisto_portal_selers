import { Dayjs } from 'dayjs';

import {
	VinistoCommonDllModelsApiPricesSetItemPrice,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
} from '../../api-types/product-api';
import { VinistoCommonDllModelsApiPricesPriceDiscountSet } from '@/api-types/order-api';

interface PriceBase {
	priceId: string;
	value: number;
	vat: VinistoHelperDllEnumsVatRate;
	vatValue: number;
	valueWithVat: number;
	currency: VinistoHelperDllEnumsCurrency;
	platformId: number;
}

interface Price extends PriceBase {
	priceType?: VinistoHelperDllEnumsPriceLevel;
	getFormatedValue: (args?: {
		decimalPlaces?: number | undefined;
		displayCurrency?: boolean | undefined;
	}) => string;
	getFormatedValueWithVat: (args?: {
		decimalPlaces?: number | undefined;
		displayCurrency?: boolean | undefined;
	}) => string;
}

interface DiscountedPrice extends PriceBase {
	discountType?: VinistoHelperDllEnumsPriceDiscountType;
	priceType?: VinistoHelperDllEnumsPriceLevel;
	validFrom: Dayjs | null;
	validTo: Dayjs | null;
	values?: undefined;
	getFormatedValue: (args?: {
		decimalPlaces?: number | undefined;
		displayCurrency?: boolean | undefined;
	}) => string;
	getFormatedValueWithVat: (args?: {
		decimalPlaces?: number | undefined;
		displayCurrency?: boolean | undefined;
	}) => string;
	platformId: number;
}

export interface SetDiscount extends Omit<
DiscountedPrice,
 'values' | 'getFormatedValue' | 'getFormatedValueWithVat'
> {
	priceId: string;
	value: number;
	valueWithVat: number;
	values?: VinistoCommonDllModelsApiPricesPriceDiscountSet['values'];
}

export interface VolumeDiscount
	extends Omit<
		DiscountedPrice,
		'value' |  'values' | 'valueWithVat' | 'getFormatedValue' | 'getFormatedValueWithVat'
	> {
	values: VolumeDiscountItem[];
	priceId: string;
	isSupplierDiscount: boolean;
}

export interface VolumeDiscountItem {
	quantity: number;
	value: number;
	totalValue: number;
	valueWithVat: number;
	totalValueWithVat: number;
	totalSavings: number;
	totalSavingsWithVat: number;
}

interface BundlePrice {
	basePrice: Price;
	discountedPrice: DiscountedPrice | null;
	volumeDiscount: VolumeDiscount | null;
	vinistoPlusPriceOrDiscount: Price | null;
	allDiscountedPrices: (DiscountedPrice | VolumeDiscount)[];
	discountDifferenceAsAmount: number;
	discountDifferenceWithVatAsAmount: number;
	discountDifferenceAsPercentage: number;
	isDiscounted: boolean;
	setItemsPrices?: Record<string, VinistoCommonDllModelsApiPricesSetItemPrice>;
	vinistoPlusSetItemPrices?: Record<string, VinistoCommonDllModelsApiPricesSetItemPrice>;
	currency: VinistoHelperDllEnumsCurrency;
}

interface ProductPrice {
	basePrice: Price;
}

export default Price;
export type { BundlePrice, ProductPrice, DiscountedPrice };
