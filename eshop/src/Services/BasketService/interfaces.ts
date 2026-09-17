import { Dispatch, MouseEvent, SetStateAction } from 'react';
import {
	UseMutateAsyncFunction,
	UseMutateFunction,
} from '@tanstack/react-query';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';

import {
	BasketAddon,
	BasketCoupon,
	BasketItem,
	BasketItemB2B,
	BasketResponse,
	BasketResponseB2B,
	BasketResponseB2C,
	SpecificError,
} from '@/api-types/basket-api';
import {
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
} from '@/api-types/order-api';
import { AddonGift, AddonUx } from '@/domain/addons';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { AddonResponse } from '@/api-types/addons-api';

export interface MultiplatformBasketResponse
	extends BasketResponse,
		BasketResponseB2B,
		BasketResponseB2C {}

export interface MultiplatformBasketItem extends BasketItem, BasketItemB2B {}

export interface BundleIdAndQuantity {
	bundleId: string;
	quantity: number;
	bundleMetaForAnalytics: BundleMetaForAnalytics;
}

export interface BasketModel {
	basketState: MultiplatformBasketResponse | null | undefined;
	userBaskets: MultiplatformBasketResponse[] | undefined;
	isBasketFetched?: boolean;
	isBasketQueryEnabled?: boolean;
	refetchBasket: () => void;
	refetchUserBaskets: () => void;
	handleOnAddToBasket: UseMutateFunction<
		void,
		unknown,
		{
			quantity: number;
			bundleId: string;
			bundleMetaForAnalytics: BundleMetaForAnalytics;
			bundleItem?: Bundle;
			availableCount?: number;
			openCrossSellModal?: boolean;
			userOrSystemBasketId?: string;
			relatedOnProductItems?: {
				itemId: string;
				quantity: number;
			};
		},
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;
	handleOnRemoveFromBasket: UseMutateFunction<
		void,
		unknown,
		{
			bundleId: string;
			quantity: number;
			bundleMetaForAnalytics: BundleMetaForAnalytics;
			userOrSystemBasketId?: string;
		},
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;
	handleOnMergeBaskets: (
		userLoginHash: string,
		anonymousUserId: string
	) => void;
	handleOnChangeItemQuantity: UseMutateFunction<
		void,
		unknown,
		{
			quantity: number;
			bundleId: string;
			bundleMetaForAnalytics: BundleMetaForAnalytics;
			relatedOnProductItems?: {
				itemId: string;
				quantity: number;
			};
		},
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;
	handleOnClearBasket: () => void;
	handleOnAddCoupon: UseMutateFunction<void, unknown, string, unknown>;
	handleOnAddBundleWithCoupon: UseMutateFunction<
		void,
		unknown,
		{
			couponCode: string;
			bundleId: string;
			bundleMetaForAnalytics: BundleMetaForAnalytics;
			quantity?: number;
			openCrossSellModal?: boolean;
			bundleItem?: Bundle;
		},
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;
	handleOnRemoveCoupon: UseMutateFunction<
		void,
		unknown,
		| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition
		| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
		| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
		| BasketCoupon,
		unknown
	>;
	handleChangeAdditionalPercentageDiscount: UseMutateFunction<
		void,
		unknown,
		{
			bundleId: string | null;
			additionalPercentageDiscount: number;
		},
		unknown
	>;
	bulkUpdate: UseMutateAsyncFunction<
		void,
		unknown,
		BundleIdAndQuantity[],
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;

	possibleGifts: (AddonGift | null)[];
	assignedGifts: (AddonGift | null)[];
	assignedGiftsWeight: number;
	minimalPriceForFreeDelivery: number;
	basketItemsGoogleAnalyticsData: {
		item_id: string;
		item_name: string;
		item_brand: string;
		price: number;
		currency: string;
		quantity: number;
	}[];
	basketPriceMinusOosPrice: number;
	basketPriceWithVatMinusOosPrice: number;
	basketStandardPriceMinusOosPrice: number;
	basketStandardPriceWithVatMinusOosPrice: number;
	itemsQuantity: number;
	isLoading: boolean;
	isSideBasketVisible: boolean;
	setIsSideBasketVisible: Dispatch<SetStateAction<boolean>>;
	totalBasketWeight: number | null;
	basketBundles:
		| (BasketItem & {
				bundle: Bundle | undefined;
		  })[]
		| null
		| undefined;
	relatedProductsBundleIdsAndQuantitiesMap: Map<
		string,
		{ itemId: string; quantity: number }[]
	>;
	assignedGiftsIncludingBundles: (AddonGift & { bundle: Bundle | undefined })[];
	possibleGiftsIncludingBundles: (AddonGift & { bundle: Bundle | undefined })[];
	uxAddons: AddonUx[];
	toggleCountryOfSaleAndCurrency: UseMutateFunction<
		void,
		unknown,
		{
			currency: VinistoHelperDllEnumsCurrency;
		},
		unknown
	>;
	selectedGiftsId: string[] | null | undefined;
	setSelectedGiftsId: Dispatch<SetStateAction<string[] | null | undefined>>;
	handleSelectGifts: UseMutateFunction<
		void,
		unknown,
		{
			giftIds: string[];
		},
		unknown
	>;
	handleSelectSubscription: UseMutateFunction<
		void,
		unknown,
		{
			subscription: AddonResponse | null;
		},
		unknown
	>;
	handleReplaceAddons: UseMutateFunction<
		void,
		unknown,
		{
			replacedAddons: BasketAddon[];
			errorMessage?: string;
		},
		{
			previousBasketState: MultiplatformBasketResponse | null | undefined;
		}
	>;
	handleGoToShippingPayment: (e: MouseEvent) => Promise<void>;
	effectivePackagingSelection: {
		id: string;
		addonId: string | null;
	};
	setLocallySelectedPackagingId: Dispatch<SetStateAction<string | null>>;
	effectiveSelectedPackaging: Bundle | null; // Full packaging object or null for eco
	effectivePackagingPrice: number;
	effectivePackagingPriceWithVat: number;
	basketTotalsWithEffectivePackaging: {
		totalPrice: number;
		totalPriceWithVat: number;
		totalStandardPrice: number;
		totalStandardPriceWithVat: number;
		totalDiscountedPrice: number;
		totalDiscountedPriceWithVat: number;
		totalDiscountedPriceWithGiftCoupons: number;
		totalDiscountedPriceWithVatWithGiftCoupons: number;
	};
}

export interface BundleMetaForAnalytics {
	item_name: string;
	item_brand: string;
	price: number;
}

export interface SignalRError {
	itemId: string;
	type: SignalRErrorType;
	generalError: string;
	specificError: SpecificError[number];
	message: string;
}

export enum SignalRErrorType {
	Bundle = 'Bundle',
	Coupon = 'Coupon',
	Addon = 'Addon',
}

export interface SignalRErrorResponse {
	Errors: SignalRError[];
}

export interface UniqueSignalRError extends SignalRError {
	id: string;
}

export type TransformedSignalRErrors = Record<
	SignalRErrorType,
	UniqueSignalRError[]
>;
