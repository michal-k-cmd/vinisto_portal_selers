import { useCallback, useContext, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DiscountCouponService } from 'vinisto_api_client';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { BasketContext } from 'Services/BasketService';
import { getPriceWithoutVAT } from 'vinisto_shared/src/price/get-price-without-vat';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory,
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification,
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsDiscountCouponLimitationType,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
} from 'vinisto_api_client/src/api-types/order-api';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsVatRate,
} from 'vinisto_api_client/src/api-types/product-api';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';
import { useIsB2b } from 'Services/PlatformService';

const productDetailDiscountDouponsQueryParams = {
	CanBeApplied: true,
	IsCache: true,
	IsActive: true,
	isVisibleOnProductDetail: true,
	isReusable: true,
	limit: 30,
};

const { isPercentageTypeDiscountCoupon, isAmountTypeDiscountCoupon } =
	DiscountCouponService;

export const useGetDiscountCoupons = ({
	bundleId,
	currency,
	countryOfSale,
	isB2b = false,
}: {
	bundleId: string | undefined;
	currency: VinistoHelperDllEnumsCurrency;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	isB2b?: boolean;
}) =>
	useQuery(
		[
			'discountCoupons',
			{
				...productDetailDiscountDouponsQueryParams,
				currency,
				countryOfSale,
				isB2b,
			},
		],
		async () => {
			if (isB2b) return { supplierCoupons: [], vinistoCoupons: [] };

			const [supplierCoupons, vinistoCoupons] = await Promise.all([
				DiscountCouponService.GetSupplierCoupons({
					...productDetailDiscountDouponsQueryParams,
				}),
				DiscountCouponService.getAll({
					...productDetailDiscountDouponsQueryParams,
					Currency: currency,
					CountryOfSale: countryOfSale,
					IsSupplierDiscount: false,
				}),
			]);
			return { supplierCoupons, vinistoCoupons };
		},
		{
			enabled: Boolean(bundleId),
			refetchOnMount: false,
		}
	);

export const useDiscountCoupons = ({
	bundle,
	showAmountCoupons = true,
	showCouponsForRegisterdUsersIfUserIsNotLoggedIn = false,
}: {
	bundle: Bundle | null;
	showAmountCoupons?: boolean;
	showCouponsForRegisterdUsersIfUserIsNotLoggedIn?: boolean;
}) => {
	const isB2b = useIsB2b();
	const { basketState, handleOnAddBundleWithCoupon } =
		useContext(BasketContext);
	const discountCouponsInBasket = basketState ? basketState.coupons : null;
	const { isLoggedIn, vinistoUser } = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
		convertToActiveCurrencyIfPriceCurrencyIsDifferent,
	} = localizationContext;

	const {
		isDiscounted,
		basePrice,
		discountedPrice,
		vinistoPlusPriceOrDiscount,
	} = bundle?.bundlePrices ?? {};

	const isUserVinistoPlusSubscriber =
		vinistoUser.priceLevel === VinistoHelperDllEnumsPriceLevel.VinistoPlus;

	const getRelevantBasePriceWithVat = useCallback(
		(
			coupon:
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
		) => {
			if (
				isUserVinistoPlusSubscriber &&
				coupon.isForDiscountedItems &&
				typeof vinistoPlusPriceOrDiscount?.valueWithVat === 'number'
			) {
				return vinistoPlusPriceOrDiscount.valueWithVat;
			}
			if (isDiscounted && typeof discountedPrice?.valueWithVat === 'number') {
				return discountedPrice?.valueWithVat;
			}

			return basePrice?.valueWithVat ?? 0;
		},
		[
			basePrice?.valueWithVat,
			discountedPrice?.valueWithVat,
			isDiscounted,
			isUserVinistoPlusSubscriber,
			vinistoPlusPriceOrDiscount?.valueWithVat,
		]
	);

	const { data: discountCouponsData, isLoading: isDiscountCouponsLoading } =
		useGetDiscountCoupons({
			bundleId: bundle?.id,
			currency,
			countryOfSale,
			isB2b,
		});

	const discountCouponsDataExceptAlreadyAppliedAmountCoupons = useMemo(() => {
		const appliedAmountCouponsIds = new Set(
			discountCouponsInBasket?.map((coupon) => coupon.code)
		);

		return {
			supplierCoupons:
				discountCouponsData?.supplierCoupons.filter((coupon) => {
					if (isAmountTypeDiscountCoupon(coupon)) {
						if (appliedAmountCouponsIds.has(`${coupon.code}`)) return false;
					}
					return true;
				}) ?? [],
			vinistoCoupons:
				discountCouponsData?.vinistoCoupons.filter((coupon) => {
					if (isAmountTypeDiscountCoupon(coupon)) {
						if (appliedAmountCouponsIds.has(`${coupon.code}`)) return false;
					}
					return true;
				}) ?? [],
		};
	}, [
		discountCouponsData?.supplierCoupons,
		discountCouponsData?.vinistoCoupons,
		discountCouponsInBasket,
	]);

	const discountCouponsDataFilteredByLimitationsAndAuth = useMemo(() => {
		const filterByLimitation = (
			coupons: (
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
			)[]
		) =>
			coupons
				?.filter((coupon) => {
					if (!showCouponsForRegisterdUsersIfUserIsNotLoggedIn) {
						if (coupon.isForRegisteredUsers && !isLoggedIn) {
							return false;
						}
					}
					return true;
				})
				.filter((coupon) => {
					if (isDiscounted && !coupon.isForDiscountedItems) {
						return false;
					}
					return true;
				})
				.filter((coupon) => {
					if (!coupon || !coupon.code) return false;

					if (
						coupon.limitationDefinition?.limitationType ===
						VinistoHelperDllEnumsDiscountCouponLimitationType.CATEGORY_LIMITATION
					) {
						return bundle?.categoryIds?.includes(
							(
								coupon.limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionCategory
							)?.categoryId ?? ''
						);
					}

					if (
						coupon.limitationDefinition?.limitationType ===
						'SPECIFICATION_LIMITATION'
					) {
						const couponSpecificationId = (
							coupon.limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
						)?.specification?.definitionId;

						const bundleSpecificationWithMatchingId =
							bundle?.specificationDetails?.find(
								(detail) => detail.definition.id === couponSpecificationId
							);

						if (!bundleSpecificationWithMatchingId) return false;

						for (const allowedValue of (
							coupon.limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification
							/* prettier-ignore */
						)?.specification
							?.allowedValues ?? []) {
							if (
								bundleSpecificationWithMatchingId.value.selectedValueName ===
									allowedValue ||
								// @ts-expect-error Sadly, this is the actual shape of specification object (value.value)
								bundleSpecificationWithMatchingId.value?.value ===
									allowedValue ||
								// @ts-expect-error dtto (selectedValueName and selectedValuesName here)
								bundleSpecificationWithMatchingId.selectedValuesName?.includes(
									allowedValue
								) ||
								Object.keys(
									// @ts-expect-error dtto
									bundleSpecificationWithMatchingId.definition?.allowedValues ??
										{}
								)?.includes(String(allowedValue))
							) {
								return true;
							}
						}
						return false;
					}

					if (
						coupon.limitationDefinition?.limitationType ===
						'SUPPLIER_LIMITATION'
					) {
						return (
							(
								coupon.limitationDefinition as VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSupplier
							)?.supplierId === bundle?.supplier?.id
						);
					}

					return true;
				});
		return {
			supplierCoupons: filterByLimitation(
				discountCouponsDataExceptAlreadyAppliedAmountCoupons?.supplierCoupons ??
					[]
			),
			vinistoCoupons: filterByLimitation(
				discountCouponsDataExceptAlreadyAppliedAmountCoupons?.vinistoCoupons ??
					[]
			),
		};
	}, [
		bundle?.categoryIds,
		bundle?.specificationDetails,
		bundle?.supplier?.id,
		discountCouponsDataExceptAlreadyAppliedAmountCoupons?.supplierCoupons,
		discountCouponsDataExceptAlreadyAppliedAmountCoupons?.vinistoCoupons,
		isDiscounted,
		isLoggedIn,
		showCouponsForRegisterdUsersIfUserIsNotLoggedIn,
	]);

	const getDiscountCouponAbsoluteValue = useCallback(
		(
			coupon:
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
			benchmarkPrice: number
		) => {
			if (isPercentageTypeDiscountCoupon(coupon)) {
				return benchmarkPrice * (Number(coupon.percentageDiscount) / 100);
			}
			if (isAmountTypeDiscountCoupon(coupon)) {
				return convertToActiveCurrencyIfPriceCurrencyIsDifferent({
					price: coupon.amountDiscount?.value ?? 0,
					priceCurrency: coupon.amountDiscount?.currency ?? currency,
					activeCurrency: currency,
					rate: 'valueDiscountCoupons',
				});
			}
			return 0;
		},
		[convertToActiveCurrencyIfPriceCurrencyIsDifferent, currency]
	);

	const absoluteDiscountValuesByCoupon = useMemo(() => {
		const result: Record<string, number> = {};

		if (isDiscountCouponsLoading) return result;

		[
			...discountCouponsDataFilteredByLimitationsAndAuth.supplierCoupons,
			...discountCouponsDataFilteredByLimitationsAndAuth.vinistoCoupons,
		].forEach((coupon) => {
			if (!coupon || !coupon.code) return;

			const absoluteValue = getDiscountCouponAbsoluteValue(
				coupon,
				// priceWithVat
				getRelevantBasePriceWithVat(coupon)
			);

			result[coupon.code] = absoluteValue;
		});
		return result;
	}, [
		discountCouponsDataFilteredByLimitationsAndAuth.supplierCoupons,
		discountCouponsDataFilteredByLimitationsAndAuth.vinistoCoupons,
		getDiscountCouponAbsoluteValue,
		getRelevantBasePriceWithVat,
		isDiscountCouponsLoading,
	]);

	const bestMatchingDiscountCoupon = useMemo(() => {
		if (isDiscountCouponsLoading) return null;

		const sortedCoupons = [
			discountCouponsDataFilteredByLimitationsAndAuth.supplierCoupons,
			discountCouponsDataFilteredByLimitationsAndAuth.vinistoCoupons,
		].flatMap((coupons) =>
			coupons
				?.filter((coupon) => {
					{
						if (!coupon || !coupon.code) return false;

						const fivePercentOfPrice =
							getRelevantBasePriceWithVat(coupon) * 0.05;
						const fiftyPercentOfPrice =
							getRelevantBasePriceWithVat(coupon) * 0.5;

						if (
							isAmountTypeDiscountCoupon(coupon) &&
							(absoluteDiscountValuesByCoupon[String(coupon.code)] <
								fivePercentOfPrice ||
								absoluteDiscountValuesByCoupon[String(coupon.code)] >
									fiftyPercentOfPrice)
						) {
							return false;
						}
						if (coupon.allowedFrom) {
							const convertedPriceWithVat =
								convertToActiveCurrencyIfPriceCurrencyIsDifferent({
									price: getRelevantBasePriceWithVat(coupon) ?? 0,
									priceCurrency:
										basePrice?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
									activeCurrency: currency,
								});

							const convertedAllowedFrom =
								convertToActiveCurrencyIfPriceCurrencyIsDifferent({
									price: coupon.allowedFrom?.value ?? 0,
									priceCurrency:
										coupon?.currency ?? VinistoHelperDllEnumsCurrency.CZK,
									activeCurrency: currency,
									rate: 'valueDiscountCoupons',
								});

							return convertedAllowedFrom <= convertedPriceWithVat;
						}
						return true;
					}
				})
				.sort((a, b) => {
					const aDiscountAbsoluteValue =
						absoluteDiscountValuesByCoupon[String(a.code)];

					const bDiscountAbsoluteValue =
						absoluteDiscountValuesByCoupon[String(b.code)];

					const aCreatedAt = a.createdAt ?? 0;
					const bCreatedAt = b.createdAt ?? 0;

					return (
						bDiscountAbsoluteValue - aDiscountAbsoluteValue ||
						bCreatedAt - aCreatedAt
					);
				})
		);
		const result = sortedCoupons?.[0] ?? null;
		if (
			!showAmountCoupons &&
			result?.discountCouponType ===
				VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT
		)
			return null;
		return result;
	}, [
		absoluteDiscountValuesByCoupon,
		basePrice?.currency,
		convertToActiveCurrencyIfPriceCurrencyIsDifferent,
		currency,
		discountCouponsDataFilteredByLimitationsAndAuth.supplierCoupons,
		discountCouponsDataFilteredByLimitationsAndAuth.vinistoCoupons,
		getRelevantBasePriceWithVat,
		isDiscountCouponsLoading,
		showAmountCoupons,
	]);

	const isCouponAvailable = Boolean(bestMatchingDiscountCoupon);

	const relevantPriceWithVatForBestMatchingCoupon = bestMatchingDiscountCoupon
		? getRelevantBasePriceWithVat(bestMatchingDiscountCoupon)
		: 0;

	const priceWhenCouponApplied = bestMatchingDiscountCoupon
		? relevantPriceWithVatForBestMatchingCoupon -
		  getDiscountCouponAbsoluteValue(
				bestMatchingDiscountCoupon,
				relevantPriceWithVatForBestMatchingCoupon
		  )
		: null;

	const priceWhenCouponAppliedWithoutVat = bestMatchingDiscountCoupon
		? getPriceWithoutVAT(
				relevantPriceWithVatForBestMatchingCoupon -
					getDiscountCouponAbsoluteValue(
						bestMatchingDiscountCoupon,
						relevantPriceWithVatForBestMatchingCoupon
					),
				basePrice?.vat ?? VinistoHelperDllEnumsVatRate.BaseVat
		  )
		: null;

	const bestMatchingDiscountCouponCode =
		bestMatchingDiscountCoupon?.code ?? null;

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle);

	const handleOnAddToBasketWithDiscountCoupon = useCallback(
		async ({ openCrossSellModal = true }) =>
			await handleOnAddBundleWithCoupon({
				bundleId: String(bundle?.id),
				bundleMetaForAnalytics,
				couponCode: String(bestMatchingDiscountCouponCode),
				openCrossSellModal,
				bundleItem: bundle ?? undefined,
			}),
		[
			handleOnAddBundleWithCoupon,
			bundle,
			bundleMetaForAnalytics,
			bestMatchingDiscountCouponCode,
		]
	);

	return {
		mostValuableDiscountCoupon: bestMatchingDiscountCoupon,
		isCouponAvailable,
		priceWhenCouponApplied,
		priceWhenCouponAppliedWithoutVat,
		mostValuableDiscountCouponCode: bestMatchingDiscountCouponCode,
		handleOnAddToBasketWithDiscountCoupon,
	};
};
