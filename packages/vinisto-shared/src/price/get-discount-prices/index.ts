import {
	VinistoCommonDllModelsApiPricesPrice,
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoOrderDllModelsApiOrderBundle } from 'vinisto_api_client/src/api-types/order-api';
import {
	VinistoCommonDllModelsApiPricesPriceDiscountSet,
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoCommonDllModelsApiPricesPriceDiscountVinisto,
} from 'vinisto_api_client/src/api-types/product-api';

type PriceWithValues =
	| VinistoCommonDllModelsApiPricesPriceDiscountSet
	| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
	| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
	| VinistoCommonDllModelsApiPricesPrice
	| null;

export const getDiscountPriceValues = ({
	quantityInBasket,
	basePrice,
	discountedPrice,
}: {
	quantityInBasket: number;
	basePrice: VinistoOrderDllModelsApiOrderBundle['price'];
	discountedPrice: VinistoOrderDllModelsApiOrderBundle['discountPrice'];
}) => {
	const defaultValues = {
		isDiscounted: false,
		volumeDiscountVolume: null,
		discountedPriceWithoutVat: null,
		discountedPriceWithVat: null,
	};

	if (!basePrice || !discountedPrice) return defaultValues;

	const getIsDiscounted = () =>
		'valueWithVat' in basePrice &&
		typeof basePrice.valueWithVat === 'number' &&
		'valueWithVat' in discountedPrice &&
		typeof discountedPrice.valueWithVat === 'number' &&
		basePrice.valueWithVat > discountedPrice.valueWithVat;

	const isVolumeDiscount = (
		discountedPrice = {}
	): discountedPrice is VinistoCommonDllModelsApiPricesPriceDiscountVolume =>
		discountedPrice &&
		'type' in discountedPrice &&
		discountedPrice.type === 'VolumeDiscount';

	if (isVolumeDiscount(discountedPrice)) {
		const values = discountedPrice.values ?? {};
		const volumeDiscountQuantities = Object.keys(values);

		const volumeDiscountVolume = volumeDiscountQuantities
			.slice(0)
			.reverse()
			.find((quantity) => quantityInBasket >= Number(quantity));

		if (!volumeDiscountVolume) return defaultValues;

		const volumeDiscountPriceWithoutVat = values[volumeDiscountVolume];

		const volumeDiscountPriceWithVat =
			volumeDiscountPriceWithoutVat * (1 + (basePrice?.vatValue ?? 0) / 100);

		return {
			// Changed from 'true' after this edge-case has been reported: https://vinisto.atlassian.net/browse/VWA-2634
			isDiscounted: (basePrice.valueWithVat ?? 0) > volumeDiscountPriceWithVat,
			volumeDiscountVolume: Number(volumeDiscountVolume),
			discountedPriceWithoutVat: volumeDiscountPriceWithoutVat,
			discountedPriceWithVat: volumeDiscountPriceWithVat,
		};
	}
	return {
		isDiscounted: getIsDiscounted(),
		volumeDiscountVolume: null,
		discountedPriceWithoutVat:
			(discountedPrice as PriceWithValues)?.value ?? null,
		discountedPriceWithVat:
			(discountedPrice as PriceWithValues)?.valueWithVat ?? null,
	};
};
