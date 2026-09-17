// @ts-nocheck
// @ts-nocheck todo swagger types are not updated

import { AbstractAdapter } from '../abstract-adapter';
import { DEFAULT_CURRENCY } from '../../shared';

import Price, { DiscountedPrice, SetDiscount, VolumeDiscount } from './index';

import {
	VinistoCommonDllModelsApiPricesPriceDiscountSet,
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoCommonDllModelsApiPricesPriceDiscountVinisto,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsVatRate,
	VinistoCommonDllModelsApiPricesPrice,
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
} from '../../api-types/product-api';
import convertDateToDayjs from '@/utils/convert-date-to-dayjs';
import convertPrice from '@/utils/convert-price';
import { NUMBER_OF_DISPLAYED_VOLUME_DISCOUNTS } from './constants';
import { getLocalizedPrice } from 'vinisto_shared/src/price/get-localized-price';
import { VAT_VALUE } from 'vinisto_shared/src/price/get-vat-value';
import { VinistoHelperDllEnumsPriceDiscountType } from '@/api-types/order-api';

class PriceAdapter extends AbstractAdapter<
	Price,
	VinistoCommonDllModelsApiPricesPrice
> {
	private getFormattedPrice(
		price: number,
		currency: VinistoHelperDllEnumsCurrency
	) {
		return function ({ decimalPlaces = 0, displayCurrency = true } = {}) {
			return getLocalizedPrice({
				price,
				currency,
				decimalPlaces,
				displayCurrency,
			});
		};
	}

	fromApi(apiData: VinistoCommonDllModelsApiPricesPrice): Price {
		const { value, valueWithVat } = apiData ?? {};

		return {
			currency: apiData?.currency as VinistoHelperDllEnumsCurrency,
			value: convertPrice(apiData?.value ?? 0),
			valueWithVat: convertPrice(apiData?.valueWithVat) ?? 0,
			vat: apiData?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat,
			vatValue:
				apiData && 'vatValue' in apiData
					? apiData?.vatValue ?? VAT_VALUE.BASE_VAT
					: VAT_VALUE.BASE_VAT,
			priceType: apiData?.level,
			// TODO: Remove this - not consistent accross types, can't be serialized
			getFormatedValue: this.getFormattedPrice(
				value ?? 0,
				apiData?.currency as VinistoHelperDllEnumsCurrency
			),
			// TODO: Remove this - not consistent accross types, can't be serialized
			getFormatedValueWithVat: this.getFormattedPrice(
				valueWithVat ?? 0,
				apiData?.currency as VinistoHelperDllEnumsCurrency
			),
			platformId: apiData?.platformId,
		};
	}

	fromApiWithDiscount(
		apiData:
			| VinistoCommonDllModelsApiPricesPriceDiscountSet
			| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
			| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
			| undefined
	): DiscountedPrice | SetDiscount {
		const { value, valueWithVat } = apiData ?? {};

		return {
			priceId: apiData?.priceId ?? '',
			priceType: apiData?.level,
			platformId: apiData?.platformId,
			currency:
				(apiData?.currency as VinistoHelperDllEnumsCurrency) ??
				DEFAULT_CURRENCY,
			value: convertPrice(apiData?.value ?? 0),
			valueWithVat: convertPrice(apiData?.valueWithVat) ?? 0,
			...(apiData?.type ===
				VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
				apiData.values && {
					values: Object.fromEntries(
						Object.entries(apiData.values).map(([key, value]) => {
							const { setPrice, originalPrice } = value;
							return [
								key,
								{
									...value,
									setPrice: {
										...setPrice,
										value: convertPrice(setPrice.value),
										valueWithVat: convertPrice(setPrice.valueWithVat),
									},
									originalPrice: {
										...originalPrice,
										value: convertPrice(originalPrice.value),
										valueWithVat: convertPrice(originalPrice.valueWithVat),
									},
								},
							];
						})
					),
				}),
			vat: apiData?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat,
			// @todo: once BE starts sending vatValue, replace with actual data
			vatValue: 0,
			discountType: apiData?.type,
			validFrom: convertDateToDayjs(apiData?.validFrom),
			validTo: convertDateToDayjs(apiData?.validTo),
			getFormatedValue: this.getFormattedPrice(
				value ?? 0,
				apiData?.currency as VinistoHelperDllEnumsCurrency
			),
			getFormatedValueWithVat: this.getFormattedPrice(
				valueWithVat ?? 0,
				apiData?.currency as VinistoHelperDllEnumsCurrency
			),
		};
	}

	fromApiWithVolumeDiscount(
		apiData: VinistoCommonDllModelsApiPricesPriceDiscountVolume & {
			value: number;
			valueWithVat: number;
			vatValue: number;
		}
	): VolumeDiscount {
		const {
			value: baseOrDiscountedValue,
			valueWithVat: baseOrDiscountedValueWithVat,
			vatValue,
		} = apiData;
		// Just to remind these properties comes from the base price...

		return {
			currency:
				(apiData?.currency as VinistoHelperDllEnumsCurrency) ??
				DEFAULT_CURRENCY,

			vat: apiData?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat,
			// @todo: once BE starts sending vatValue, replace with actual data
			vatValue: 0,
			discountType: apiData?.type,
			validFrom: convertDateToDayjs(apiData?.validFrom),
			validTo: convertDateToDayjs(apiData?.validTo),
			priceId: apiData.priceId ?? '',
			isSupplierDiscount: apiData.isSupplierDiscount ?? false,
			values: Object.entries(apiData?.values ?? {})
				.map(([key, value]) => {
					const quantity = Number(key);
					const valueWithVat = value * (1 + vatValue / 100);
					return {
						quantity,
						value: convertPrice(value),
						totalValue: value * quantity,
						valueWithVat: convertPrice(valueWithVat),
						totalValueWithVat: convertPrice(valueWithVat * quantity),
						totalSavings: Math.max(
							convertPrice(baseOrDiscountedValue * quantity - value * quantity),
							0
						),
						totalSavingsWithVat: Math.max(
							convertPrice(
								baseOrDiscountedValueWithVat * quantity -
									valueWithVat * quantity
							),
							0
						),
					};
				})
				.sort((a, b) => a.quantity - b.quantity)
				.slice(0, NUMBER_OF_DISPLAYED_VOLUME_DISCOUNTS),
		};
	}
}

export default PriceAdapter;
