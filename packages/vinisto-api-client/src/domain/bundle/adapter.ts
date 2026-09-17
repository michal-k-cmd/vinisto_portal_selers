import { dayjsInstance as dayjs } from 'vinisto_shared';
import { AbstractAdapter } from '../abstract-adapter';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE, languages } from '../../shared';
import {
	bundleAdapter,
	bundleEvaluationAdapter,
	bundleItemAdapter,
	bundleSpecificationDetailAdapter,
	imageAdapter,
	orderLimitationAdapter,
	priceAdapter,
	productAdapter,
	supplierAdapter,
	tagAdapter,
} from '../../index';

import { Bundle } from '.';

import {
	VinistoCommonDllModelsApiPricesPriceDiscountSet,
	VinistoCommonDllModelsApiPricesPriceDiscountSupplier,
	VinistoCommonDllModelsApiPricesPriceDiscountVinisto,
	VinistoCommonDllModelsApiPricesPriceDiscountVolume,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceDiscountType,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundle,
} from '../../api-types/product-api';

import convertDateToDayjs from '@/utils/convert-date-to-dayjs';
import Price, { DiscountedPrice, VolumeDiscount } from '../price';
import { VAT_VALUE } from 'vinisto_shared/src/price/get-vat-value';
import { VinistoCommonDllModelsApiPricesPrice } from '@/api-types/order-api';
import isClientSideB2b from '@/utils/is-client-side-b2b';

const isPriceActive = (
	price:
		| VinistoCommonDllModelsApiPricesPriceDiscountSet
		| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
		| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
) => {
	if (!price) return false;
	// @ts-expect-error This is wrongly typed on BE - these properties exists
	if (price.validFrom === null && price.validTo === null) return true;

	// @ts-expect-error This is wrongly typed on BE - these properties exists
	const validFrom = convertDateToDayjs(price.validFrom);
	// @ts-expect-error This is wrongly typed on BE - these properties exists
	const validTo = convertDateToDayjs(price.validTo);
	const isActive = dayjs().isBetween(validFrom, validTo, undefined, '[]');

	return isActive;
};

const isVolumeDiscount = (
	price:
		| VinistoCommonDllModelsApiPricesPriceDiscountSet
		| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
		| VinistoCommonDllModelsApiPricesPriceDiscountVinisto
		| VinistoCommonDllModelsApiPricesPriceDiscountVolume
): price is VinistoCommonDllModelsApiPricesPriceDiscountVolume => {
	return (
		!!price &&
		'type' in price &&
		price.type === VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount
	);
};

export const showVinistoPlusPrice = (
	vinistoPlusPriceOrDiscount: Price | null | undefined,
	priceWhenCouponApplied: number | null,
	canBeCouponApplied: boolean,
	priceLevel: VinistoHelperDllEnumsPriceLevel | null | undefined
) => {
	// vinisto+ price not set
	if (!vinistoPlusPriceOrDiscount)
		return {
			showPossibleVinistoPlusPrice: false,
			canBuyForVinistoPlusPrice: false,
		};

	// coupon price is lower than vinisto+ price
	if (
		canBeCouponApplied &&
		(vinistoPlusPriceOrDiscount.valueWithVat ?? Infinity) >
			(priceWhenCouponApplied ?? Infinity)
	) {
		return {
			showPossibleVinistoPlusPrice: false,
			canBuyForVinistoPlusPrice: false,
		};
	}

	return {
		showPossibleVinistoPlusPrice:
			priceLevel !== VinistoHelperDllEnumsPriceLevel.VinistoPlus,
		canBuyForVinistoPlusPrice:
			priceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus,
	};
};

export const getPriceForCustomerPriceLevel = (
	prices: VinistoCommonDllModelsApiPricesPrice[],
	customerPriceLevel: VinistoHelperDllEnumsPriceLevel | undefined,
	apiData: VinistoProductDllModelsApiBundleBundle
) => {
	// VinistoPlus+ prices are handled separately - we do want base level here
	const basePrice = prices.find(
		(price) => price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	if (
		!customerPriceLevel ||
		customerPriceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	) {
		return basePrice;
	}
	const specificCustomerLevelPrice = prices.find(
		(price) => price.level === customerPriceLevel
	);
	return specificCustomerLevelPrice ?? basePrice;
};

const mapApiPricesToBundlePrices = (
	apiData: VinistoProductDllModelsApiBundleBundle,
	request?: {
		currency?:
			| VinistoHelperDllEnumsCurrency
			| keyof typeof VinistoHelperDllEnumsCurrency;
		platformId: number;
		customerPriceLevel?: VinistoHelperDllEnumsPriceLevel;
	}
) => {
	const customerPriceLevel = request?.customerPriceLevel;
	// TO CONSIDER This should probably don't have fallback and throw or log an error if currency is not provided
	const activeCurrency = request?.currency ?? VinistoHelperDllEnumsCurrency.CZK;
	const activePlatformId = request?.platformId ?? B2C_NUMERIC_CODE;
	const { isSet } = apiData;
	const prices =
		apiData.prices?.filter((price) => price.currency === activeCurrency) ?? [];

	const priceDiscounts =
		apiData.priceDiscounts?.filter(
			(price) => price.currency === activeCurrency
		) ?? [];

	const activePriceDiscounts = priceDiscounts.filter(isPriceActive);

	const activePriceDiscountsForPlatform = activePriceDiscounts.filter(
		(price) => price.platformId === activePlatformId
	);

	const activePriceVinistoPlusDiscount = activePriceDiscounts.find(
		(price) => price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	);

	const platformSpecificPrices = prices.filter(
		(price) => price.platformId === activePlatformId
	);

	const basePriceForCustomerPriceLevel = getPriceForCustomerPriceLevel(
		platformSpecificPrices,
		customerPriceLevel,
		apiData
	);

	const basePrice = basePriceForCustomerPriceLevel;

	const vinistoPlusPrice = prices.find(
		(price) => price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	);

	const vinistoPlusPriceOrDiscount =
		activePriceVinistoPlusDiscount ?? vinistoPlusPrice
			? // @ts-expect-error Lot of typesctipt issues lately - this is not an error!
			  priceAdapter.fromApi(activePriceVinistoPlusDiscount ?? vinistoPlusPrice)
			: null;

	const activeDiscountsForPlatformSortedByPrice =
		activePriceDiscountsForPlatform
			.slice()
			.sort((a, b) =>
				'value' in a && 'value' in b ? (a.value ?? 0) - (b.value ?? 0) : 0
			);

	const baseLevelVinistoOrSupplierDiscount =
		activeDiscountsForPlatformSortedByPrice.find(
			(
				price
			): price is
				| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
				| VinistoCommonDllModelsApiPricesPriceDiscountVinisto =>
				price &&
				'type' in price &&
				(price.type ===
					VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount ||
					price.type ===
						VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount) &&
				price.level === VinistoHelperDllEnumsPriceLevel.Level1
		);

	const customerLevelVinistoOrSupplierDiscount =
		activeDiscountsForPlatformSortedByPrice.find(
			(
				price
			): price is
				| VinistoCommonDllModelsApiPricesPriceDiscountSupplier
				| VinistoCommonDllModelsApiPricesPriceDiscountVinisto =>
				price &&
				'type' in price &&
				(price.type ===
					VinistoHelperDllEnumsPriceDiscountType.SupplierDiscount ||
					price.type ===
						VinistoHelperDllEnumsPriceDiscountType.VinistoDiscount) &&
				price.level === customerPriceLevel &&
				// VinistoPlus+ price is handled separately
				price.level !== VinistoHelperDllEnumsPriceLevel.VinistoPlus
		);

	const vinistoOrSupplierDiscount =
		customerLevelVinistoOrSupplierDiscount ??
		baseLevelVinistoOrSupplierDiscount;

	const baseLevelsetDiscount = activePriceDiscountsForPlatform.find(
		(price): price is VinistoCommonDllModelsApiPricesPriceDiscountSet =>
			price &&
			'type' in price &&
			price.type === VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
			price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	const customerPriceLevelSetDiscount = activePriceDiscountsForPlatform.find(
		(price): price is VinistoCommonDllModelsApiPricesPriceDiscountSet =>
			price &&
			'type' in price &&
			price.type === VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
			price.level === customerPriceLevel
	);

	const setDiscount = customerPriceLevelSetDiscount ?? baseLevelsetDiscount;

	const vinistoPlusSetDiscount = activePriceDiscountsForPlatform.find(
		(price): price is VinistoCommonDllModelsApiPricesPriceDiscountSet =>
			price &&
			'type' in price &&
			price.type === VinistoHelperDllEnumsPriceDiscountType.SetDiscount &&
			price.level === VinistoHelperDllEnumsPriceLevel.VinistoPlus
	);

	const baseLevelVolumeDiscount = activePriceDiscountsForPlatform.find(
		(price): price is VinistoCommonDllModelsApiPricesPriceDiscountVolume =>
			price &&
			'type' in price &&
			price.type === VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount &&
			price.level === VinistoHelperDllEnumsPriceLevel.Level1
	);

	const customerPriceLevelVolumeDisount = activePriceDiscountsForPlatform.find(
		(price): price is VinistoCommonDllModelsApiPricesPriceDiscountVolume =>
			price &&
			'type' in price &&
			price.type === VinistoHelperDllEnumsPriceDiscountType.VolumeDiscount &&
			price.level === customerPriceLevel
	);

	const volumeDiscount =
		customerPriceLevelVolumeDisount ?? baseLevelVolumeDiscount;

	if (
		!basePriceForCustomerPriceLevel &&
		!vinistoOrSupplierDiscount &&
		!setDiscount
	) {
		// eslint-disable-next-line no-console
		console.warn('Missing at least one price or discount');
	}

	const discountedPrice = (() => {
		if (isSet && setDiscount) {
			return {
				...priceAdapter.fromApiWithDiscount(setDiscount),
				vatValue: basePrice?.vatValue ?? VAT_VALUE.BASE_VAT,
			};
		}
		if (vinistoOrSupplierDiscount) {
			return {
				...priceAdapter.fromApiWithDiscount(vinistoOrSupplierDiscount),
				vatValue: basePrice?.vatValue ?? VAT_VALUE.BASE_VAT,
			};
		}
		return null;
	})();

	const volumeDiscountWithCalculatedPricesAndSavings = volumeDiscount
		? priceAdapter.fromApiWithVolumeDiscount({
				...volumeDiscount,
				value: Math.max(
					basePrice?.value ?? 0,
					discountedPrice && 'value' in discountedPrice
						? discountedPrice?.value
						: 0
				),
				valueWithVat: Math.max(
					basePrice?.valueWithVat ?? 0,
					discountedPrice && 'valueWithVat' in discountedPrice
						? discountedPrice?.valueWithVat
						: 0
				),
				vatValue: basePrice?.vatValue ?? VAT_VALUE.BASE_VAT,
		  })
		: null;

	// @ts-expect-error TODO remove this property entirely, use api data if you need all discounts (it is currenctly used in Admin on 2 places)
	const allDiscountedPrices: (DiscountedPrice | VolumeDiscount)[] =
		priceDiscounts.map((price) => {
			if (isVolumeDiscount(price)) {
				return priceAdapter.fromApiWithVolumeDiscount({
					...price,
					value: basePrice?.value ?? 0,
					valueWithVat: basePrice?.valueWithVat ?? 0,
					vatValue: basePrice?.vatValue ?? VAT_VALUE.BASE_VAT,
				});
			}
			return {
				...priceAdapter.fromApiWithDiscount(price),
				vatValue: basePrice?.vatValue ?? VAT_VALUE.BASE_VAT,
			};
		});

	const relevantDecimalsForDiscount =
		activeCurrency === VinistoHelperDllEnumsCurrency.CZK ? 0 : 2;

	const discountDifferenceAsAmount = Number(
		(Number(discountedPrice?.value) - Number(basePrice?.value)).toFixed(
			relevantDecimalsForDiscount
		)
	);
	const discountDifferenceWithVatAsAmount = Number(
		(
			Number(discountedPrice?.valueWithVat) - Number(basePrice?.valueWithVat)
		).toFixed(relevantDecimalsForDiscount)
	);
	const discountDifferenceAsPercentage =
		(discountDifferenceWithVatAsAmount / Number(basePrice?.valueWithVat)) * 100;
	const isDiscounted =
		!Number.isNaN(discountDifferenceWithVatAsAmount) &&
		discountDifferenceWithVatAsAmount < 0;

	// Controversial - should prevent displaying lower prices than actual selling prices,
	// but it is not an ideal solution. Maybe set a flag and handle it in the UI?
	if (!isDiscounted && discountedPrice && basePrice) {
		basePrice.value = discountedPrice.value;
		basePrice.valueWithVat = discountedPrice.valueWithVat;
	}

	const nonVinistoPlusPrice = isDiscounted
		? discountedPrice?.valueWithVat ?? Infinity
		: basePrice?.valueWithVat ?? Infinity;
	const hasVinistoPlusPriceThatIsLowerThanOtherPrices =
		vinistoPlusPriceOrDiscount &&
		vinistoPlusPriceOrDiscount.valueWithVat < +nonVinistoPlusPrice.toFixed(2);

	return {
		// Important: this call has to take place after the basePrice is potentially updated
		// Otherwise the formatting function would't have the correct values
		basePrice: basePrice ? priceAdapter.fromApi(basePrice) : null,
		discountedPrice,
		volumeDiscount: volumeDiscountWithCalculatedPricesAndSavings,
		vinistoPlusPriceOrDiscount: hasVinistoPlusPriceThatIsLowerThanOtherPrices
			? vinistoPlusPriceOrDiscount
			: null,
		// To consider: allDiscountedPrices, b2b prices and externalPrices
		// probably should not be here: they are not used on eshop
		// and for admin usage, all of the unfiltered prices are necessary to have
		allDiscountedPrices,
		discountDifferenceAsAmount: Number.isNaN(discountDifferenceAsAmount)
			? 0
			: discountDifferenceAsAmount,
		discountDifferenceWithVatAsAmount: Number.isNaN(
			discountDifferenceWithVatAsAmount
		)
			? 0
			: discountDifferenceWithVatAsAmount,
		discountDifferenceAsPercentage: Number.isNaN(discountDifferenceAsPercentage)
			? 0
			: discountDifferenceAsPercentage,
		isDiscounted,
		...(setDiscount ? { setItemsPrices: setDiscount.values } : {}),
		...(vinistoPlusSetDiscount
			? { vinistoPlusSetItemPrices: vinistoPlusSetDiscount.values }
			: {}),
		currency: activeCurrency as VinistoHelperDllEnumsCurrency,
	};
};

class BundleAdapter extends AbstractAdapter<
	Bundle,
	VinistoProductDllModelsApiBundleBundle
> {
	fromApi(
		apiData: VinistoProductDllModelsApiBundleBundle,
		request: {
			currency:
				| VinistoHelperDllEnumsCurrency
				| keyof typeof VinistoHelperDllEnumsCurrency;
			// TODO PlatformId should be handled as a required param
			platformId?: number;
			customerPriceLevel?: VinistoHelperDllEnumsPriceLevel | null | undefined;
		}
	): Bundle {
		const isB2b = isClientSideB2b();

		const id = apiData?.id;

		if (!id) throw new Error('No id in bundle');

		const orderLimitation =
			apiData.orderLimitation && apiData.orderLimitation.limit !== undefined
				? orderLimitationAdapter.fromApi(apiData.orderLimitation ?? {})
				: undefined;

		return {
			id,
			name: this.convertMultiLangValue(apiData.name),
			description: this.convertMultiLangValue(apiData.description),
			metaDescription: this.convertMultiLangValue(apiData.metaDescription),
			shortDescription: this.convertMultiLangValue(apiData.shortDescription),
			keywords: this.convertMultiLangValue(apiData.keywords),
			text: this.convertMultiLangValue(apiData.text),
			url: this.convertMultiLangValue(apiData.url),
			language: apiData.language ?? languages[0],
			prices: apiData.prices?.map((price) => priceAdapter.fromApi(price)) ?? [],
			lowestInternetPrice: apiData.lowestInternetPrice,
			discountedPrices:
				apiData.priceDiscounts?.map((price) =>
					priceAdapter.fromApiWithDiscount(price)
				) ?? [],
			// @ts-expect-error This should hopefully pass when allDiscountedPrices are removed
			bundlePrices: mapApiPricesToBundlePrices(apiData, {
				...request,
				platformId:
					request.platformId ?? (isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE),
			}),
			items: apiData.items?.map((item) => bundleItemAdapter.fromApi(item)),
			categoryIds: apiData.categories,
			products: apiData.productsDetail?.map((product) =>
				productAdapter.fromApi(product)
			),
			setBundles: apiData.setBundles?.map((bundle) =>
				bundleAdapter.fromApi(bundle, {
					currency: request?.currency,
					platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
				})
			),
			alternativeBundles: apiData.alternativeBundleObjects?.map((bundle) =>
				bundleAdapter.fromApi(bundle, {
					currency: request?.currency,
					platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
				})
			),
			tags: apiData.tagsDetail?.map((tag) => tagAdapter.fromApi(tag)),
			images: apiData.images
				?.map((image) => imageAdapter.fromApi(image))
				.filter((images) => Object.keys(images).length),
			supplier: apiData.supplier
				? supplierAdapter.fromApi(apiData.supplier)
				: null,
			specificationDetails: apiData.specificationDetails?.map((spec) =>
				bundleSpecificationDetailAdapter.fromApi(spec)
			),
			bundleEvaluation: bundleEvaluationAdapter.fromApi(
				apiData.bundleEvaluation ?? {}
			),
			orderLimitation,

			scoring: apiData.scoring ?? 0,
			scoringWarehouse: apiData.scoringWarehouse ?? 0,
			scoringDiscount: apiData.scoringDiscount ?? 0,
			scoringAdmin: apiData.scoringAdmin ?? 0,
			piecesPerPackage: apiData.piecesPerPackage ?? 0,
			packagesOnPallet: apiData.packagesOnPallet ?? 0,
			setType: apiData.setType ?? null,
			warehouseId: apiData.warehouseId ?? [],
			// @ts-expect-error TODO BE should return either states or state, but not both
			state: apiData.state ? apiData.state : apiData.states?.[0],
			flags: {
				isSet: apiData.isSet ?? false,
				isClearanceSale: apiData.isClearanceSale ?? false,
				isDeliveryFree: apiData.isDeliveryFree ?? false,
				isDeleted: apiData.isDeleted ?? false,
				isEnabled: apiData.isEnabled ?? false,
				isForLogged: apiData.isForLogged ?? false,
				isGift: apiData.isGift ?? false,
				isTemporaryUnavailable: apiData.temporaryUnavailable ?? false,
				isIntangible: apiData.flags?.isIntangible ?? false,
				canSendToWms: apiData.canSendToWms ?? false,
				isSaleOver: apiData.isSaleOver ?? false,
				isApproved: apiData.isApproved ?? false,
				// Default to true for backward compatibility
				CanSendToWms: apiData.canSendToWms ?? true,
			},
			allowedCountries: apiData.allowedCountries ?? [],
			availableCount: apiData.availableCount ?? 0,
			availableOnPlatforms: apiData.availableOnPlatforms ?? [],
		};
	}
}

export default BundleAdapter;
