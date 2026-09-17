import { VAT_VALUE } from 'vinisto_shared/src/price';
import { isB2c } from 'Services/IntergationService/helpers';

import {
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundlePricesReturn,
} from '@/api-types/product-api';
import { priceAdapter } from '@/index';

export const transformPlatformPricesToTablePrices = (
	queryData: VinistoProductDllModelsApiBundlePricesReturn,
	inputPlatformId: number
) => {
	const platformStandardPrices =
		queryData?.prices
			?.filter((price) => price.platformId === inputPlatformId)
			?.map((price) => priceAdapter.fromApi(price)) ?? [];

	const platformLevel1Price = platformStandardPrices.find(
		(price) => price.priceType === 'Level1'
	);

	const platformDiscountedPrices =
		queryData?.discountPrices
			?.filter(
				(price) =>
					price.platformId === inputPlatformId &&
					'type' in price &&
					price.type != 'VolumeDiscount'
			)
			?.map((price) => priceAdapter.fromApiWithDiscount(price)) ?? [];

	const platformVolumeDiscount = queryData?.discountPrices
		?.filter(
			(price): price is VinistoCommonDllModelsApiPricesPriceDiscountVolume =>
				price.platformId === inputPlatformId &&
				'type' in price &&
				price.type === 'VolumeDiscount'
		)
		.map((volumeDiscount) => {
			return priceAdapter.fromApiWithVolumeDiscount({
				...volumeDiscount,
				value: Math.max(
					platformLevel1Price?.value ?? inputPlatformId
					// TODO consider edge cases with discount higher than base price?
					//discountedPrice && 'value' in discountedPrice
					//	? discountedPrice?.value
					//	: 0
				),
				valueWithVat: Math.max(
					platformLevel1Price?.valueWithVat ?? inputPlatformId
					// TODO consider edge cases with discount higher than base price?
					//discountedPrice && 'valueWithVat' in discountedPrice
					//	? discountedPrice?.valueWithVat
					//	: 0
				),
				vatValue: platformLevel1Price?.vatValue ?? VAT_VALUE.BASE_VAT,
			});
		})?.[0];

	const platformVolumeDiscountMappedByValues =
		platformVolumeDiscount?.values?.map((price) => {
			const discountDifferenceWithVatAsAmount = Number(
				(Number(price) - Number(platformLevel1Price?.valueWithVat)).toFixed(2)
			);
			const discountDifferenceAsPercentage =
				(discountDifferenceWithVatAsAmount /
					Number(platformLevel1Price?.valueWithVat)) *
				100;

			return {
				...platformLevel1Price,
				validFrom: platformVolumeDiscount?.validFrom,
				validTo: platformVolumeDiscount?.validTo,
				discountedValue: price.value,
				discountedValueWithVat: price.valueWithVat,
				discountDifferenceAsPercentage: discountDifferenceAsPercentage,
				priceType: platformLevel1Price?.priceType,
				discountType: platformVolumeDiscount?.discountType,
				volumeDiscountQuantity: price.quantity,
				isSupplierDiscount: platformVolumeDiscount.isSupplierDiscount,
				priceId: platformVolumeDiscount.priceId,
			};
		}) ?? [];

	const mergedPlatformPrices = [
		...(platformStandardPrices.filter(
			(price) =>
				!platformDiscountedPrices.find(
					(discount) => discount.priceType === price.priceType
				) ||
				// Always display B2cLevel1 price on a separate row, no matter if it has a discount or not
				(isB2c(price.platformId) &&
					price.priceType === VinistoHelperDllEnumsPriceLevel.Level1)
		) ?? []),
		...platformDiscountedPrices.map((discount) => {
			const basePrice = platformStandardPrices.find(
				(basePrice) => basePrice.priceType === discount.priceType
			);
			return {
				...basePrice,
				...(discount
					? {
							validFrom: discount.validFrom,
							validTo: discount.validTo,
							discountedValue: 'value' in discount ? discount.value : undefined,
							discountedValueWithVat:
								'valueWithVat' in discount ? discount.valueWithVat : undefined,
							priceType: discount.priceType,
							discountType: discount.discountType,
							priceId: discount.priceId,
					  }
					: {}),
			};
		}),
		...platformVolumeDiscountMappedByValues,
	]
		.map((price, i) => ({
			...price,
			id: price?.priceId || `${price?.priceType ?? ''}-${i}`,
		}))
		.sort((a, b) => {
			return a?.priceType?.localeCompare(b?.priceType || '') || 0;
		});

	return mergedPlatformPrices;
};
