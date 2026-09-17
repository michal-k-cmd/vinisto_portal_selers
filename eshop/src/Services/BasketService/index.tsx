'use client';

import {
	createContext,
	MouseEvent,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import PromiseWorker from 'promise-worker';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { storageServiceInstance as storageService } from 'Services/StorageService';
import useBroadcastChannel from 'Hooks/useBroadcastChannel';
import {
	BASKET_BROADCAST_MESSAGE_TYPES,
	BROADCAST_CHANNELS,
} from 'Hooks/useBroadcastChannel/constants';
import { OrderContext } from 'Services/OrderService/context';
import { ModalContext } from 'Components/Modal/context';
import { CROSS_SELL_MODAL } from 'Components/Modal/constants';
import { useShippingPackaging } from 'pages-spa/Basket/Components/Packaging/hooks';
import { LocalizationContext } from 'Services/LocalizationService';
import {
	NICE_PACKAGING_ADDON_ID_CZ,
	NICE_PACKAGING_ADDON_ID_SK,
} from 'pages-spa/Basket/Components/BasketSummary/BasketItems';
import { NOT_CONNECTED } from 'Services/AuthenticationService/constants';
import { useGetBundlesByIdsQueries } from 'Hooks/Queries/useGetBundlesByIds';
import {
	usePlatformContext,
	useWithB2bQueryParams,
} from 'Services/PlatformService';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	BundleMetaForAnalytics,
	MultiplatformBasketResponse,
} from './interfaces';
import { BasketModel, BundleIdAndQuantity } from './interfaces';
import {
	diffQuantities,
	getBundleMetaForAnalytics,
	mapCurrencyEnumToCountryCode,
	mapCurrencyEnumToCurrencyCode,
	toValidObjectId,
} from './helpers';
import { createBasket, createUserOrSystemBasket } from './handlers';
import useBasketAnalytics from './useBasketAnalytics';
import useBasketRefresh from './useBasketRefresh';
import { AddonTypes, FOR_LATER_BASKET_NAME } from './constants';
import { updateRelatedProductItem } from './state-reducers';

import {
	BasketCoupon,
	BasketItemType,
	BasketPlatformType,
	BasketResponse,
} from '@/api-types/basket-api';
import {
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition,
	VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition,
} from '@/api-types/order-api';
import api, { BaseResponse } from '@/api';
import {
	ProductApi,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';
import { bundleAdapter, giftAdapter, uxAdapter } from '@/index';
import { Bundle } from '@/domain/bundle';
import {
	ActionType,
	AddonResponse,
	AddonType,
	CountryCode,
	Currency,
	Operation,
	ValidateAddonsRequest,
} from '@/api-types/addons-api';
import AddonsService from '@/addons';
import { AddonUx } from '@/domain/addons';
import { BasketAddon, BasketType } from '@/api-types/basket-api';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

export const defaultBasketContextModel: BasketModel = {
	basketState: null,
	userBaskets: [],
	refetchBasket: () => null,
	refetchUserBaskets: () => null,
	basketBundles: [],
	handleOnAddToBasket: () => Promise.resolve(),
	handleOnRemoveFromBasket: () => Promise.resolve(),
	handleOnMergeBaskets: () => null,
	handleOnChangeItemQuantity: () => Promise.resolve(),
	handleOnClearBasket: () => null,
	handleOnAddCoupon: () => Promise.resolve(),
	handleOnAddBundleWithCoupon: () => Promise.resolve(),
	handleOnRemoveCoupon: () => Promise.resolve(),
	handleChangeAdditionalPercentageDiscount: () => Promise.resolve(),
	bulkUpdate: () => Promise.resolve(),
	possibleGifts: [],
	assignedGifts: [],
	assignedGiftsWeight: 0,
	minimalPriceForFreeDelivery: 2500,
	relatedProductsBundleIdsAndQuantitiesMap: new Map<
		string,
		{ itemId: string; quantity: number }[]
	>(),
	basketItemsGoogleAnalyticsData: [],
	basketPriceMinusOosPrice: 0,
	basketPriceWithVatMinusOosPrice: 0,
	basketStandardPriceMinusOosPrice: 0,
	basketStandardPriceWithVatMinusOosPrice: 0,
	itemsQuantity: 0,
	isLoading: false,
	isSideBasketVisible: true,
	setIsSideBasketVisible: () => null,
	totalBasketWeight: null,
	assignedGiftsIncludingBundles: [],
	possibleGiftsIncludingBundles: [],
	uxAddons: [],
	toggleCountryOfSaleAndCurrency: () => Promise.resolve(),
	selectedGiftsId: undefined,
	setSelectedGiftsId: () => undefined,
	handleSelectGifts: () => Promise.resolve(),
	handleSelectSubscription: () => Promise.resolve(),
	handleReplaceAddons: () => Promise.resolve(),
	handleGoToShippingPayment: () => Promise.resolve(),
	effectivePackagingSelection: { id: '0', addonId: null },
	setLocallySelectedPackagingId: () => null,
	effectiveSelectedPackaging: null,
	effectivePackagingPrice: 0,
	effectivePackagingPriceWithVat: 0,
	basketTotalsWithEffectivePackaging: {
		totalPrice: 0,
		totalPriceWithVat: 0,
		totalStandardPrice: 0,
		totalStandardPriceWithVat: 0,
		totalDiscountedPrice: 0,
		totalDiscountedPriceWithVat: 0,
		totalDiscountedPriceWithGiftCoupons: 0,
		totalDiscountedPriceWithVatWithGiftCoupons: 0,
	},
};

export const BasketContext = createContext(defaultBasketContextModel);

const BasketServiceProvider = ({ children }: { children: ReactNode }) => {
	const {
		isB2b,
		customerId: customerIdFromSearchParams,
		requestedBasketId,
		getIsInAdminIframe,
	} = usePlatformContext();
	const withB2bQueryParams = useWithB2bQueryParams();
	const { getOrderRequestStatus, orderId } = useContext(OrderContext);
	const { handleOpenModal } = useContext(ModalContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = useContext(LocalizationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const router = useRouter();
	const queryClient = useQueryClient();
	const workerRef = useRef<PromiseWorker>();
	const handleShowCrossSellModal = (bundleItem: Bundle, quantity: number) => {
		handleOpenModal(CROSS_SELL_MODAL, {
			bundleItem,
			quantity,
		});
	};
	const orderRequestStatus = getOrderRequestStatus(orderId);

	const { handleShowErrorNotification } = useContext(NotificationsContext);

	const {
		basketId,
		setBasketId,
		isCreatingBasketRef,
		isLoggedIn,
		vinistoUser,
		anonymousUID,
		wsConnectionId,
		handleResetBasketState,
	} = useContext(AuthenticationContext);
	const priceLevel = vinistoUser.priceLevel;

	const bundleBeingDeletedIndexRef = useRef<Record<string, number | null>>({});

	const minimalPriceForFreeDelivery =
		currency === VinistoHelperDllEnumsCurrency.CZK ? 2500 : 20;

	useEffect(() => {
		const worker = new Worker(new URL('./basketWorker.ts', import.meta.url));

		workerRef.current = new PromiseWorker(worker);

		return () => {
			worker.terminate();
		};
	}, []);

	const userId = vinistoUser?.id ?? null;

	const userLoginHash = vinistoUser.loginHash;

	const anonymousUserId = anonymousUID?.anonymousUserId
		? toValidObjectId(anonymousUID.anonymousUserId)
		: null;

	const getAuth = () => {
		if (isLoggedIn) {
			return { op: 'add', path: '/UserId', value: userId };
		}
		return {
			op: 'add',
			path: '/AnonymousUserId',
			value: toValidObjectId(anonymousUID.anonymousUserId),
		};
	};

	const getPlatform = () => {
		if (isB2b) return BasketPlatformType.B2B;
		return BasketPlatformType.B2C;
	};

	const isOrderSentOrRecieved =
		orderRequestStatus === 'sent' || orderRequestStatus === 'received';

	const isB2cBasketQueryEnabled = !!(
		basketId ||
		vinistoUser?.id ||
		isOrderSentOrRecieved
	);

	const isB2bBasketQueryEnabled = !!(isB2b && vinistoUser.id);

	const isBasketQueryEnabled = isB2b
		? isB2bBasketQueryEnabled
		: isB2cBasketQueryEnabled;

	const getWsConnection = () => {
		if (wsConnectionId) {
			return [{ op: 'add', path: '/WebsocketId', value: wsConnectionId }];
		}
		return [];
	};

	const getPlatformId = () => {
		if (isB2b) return B2B_NUMERIC_CODE;
		return B2C_NUMERIC_CODE;
	};

	const isAdminIframe = getIsInAdminIframe();

	const getCustomerId = () => {
		if (!isB2b) return null;
		if (isAdminIframe) return customerIdFromSearchParams;
		return vinistoUser.id;
	};

	const customerId = getCustomerId();

	const {
		data: basketState,
		isFetched: isBasketFetched,
		refetch,
	} = useQuery<MultiplatformBasketResponse | null>({
		queryKey: ['basketByUserOrId'],
		queryFn: async ({ signal }) => {
			if (isAdminIframe && (!vinistoUser.id || !requestedBasketId)) {
				// Should not happen as query should be disabled
				return null;
			}
			if (isAdminIframe && requestedBasketId) {
				return api
					.get<BaseResponse & MultiplatformBasketResponse>(
						`basket-api/Basket/${requestedBasketId}`,
						undefined,
						{
							signal,
						}
					)
					.then((response) => {
						setBasketId(requestedBasketId);
						return response;
					})
					.catch(() => {
						return null;
					});
			}

			if (vinistoUser?.id && !basketId) {
				try {
					const response = await api.get<
						BaseResponse & MultiplatformBasketResponse[]
					>(`basket-api/Basket/user/${vinistoUser.id}`, undefined, { signal });

					const primaryBasket = response.find(
						(basket) => basket.type === BasketType.Primary
					);
					if (!primaryBasket || !primaryBasket.id) {
						return null;
					}

					storageService.setItem(LocalStorageKeys.BASKET_ID, primaryBasket.id);
					setBasketId(primaryBasket.id);
					return primaryBasket;
				} catch (error) {
					return null;
				}
			}
			if (!basketId) return null;

			return (
				api
					// @ts-expect-error BasketResponse does not match constraint of BaseResponse. TODO add option to override this?
					.get<BasketResponse>(`basket-api/Basket/${basketId}`, undefined, {
						signal,
					})
					.catch(() => {
						// Aborting the request will throw an error, but we can ignore it
						if (signal?.aborted) return null;

						storageService.removeItem(LocalStorageKeys.BASKET_ID);
						setBasketId(null);
						return null;
					})
			);
		},

		enabled: isBasketQueryEnabled,
	});

	const { broadcastMessage: broadcastBasketMessage } =
		useBroadcastChannel<string>({
			channelName: BROADCAST_CHANNELS.BASKET_SYNC,
		});

	const {
		data: userBaskets,
		refetch: refetchUserBaskets,
		isSuccess: isUserBasketsSuccess,
	} = useQuery({
		queryKey: ['userAndSystemBaskets'],
		queryFn: async ({ signal }) => {
			if (vinistoUser?.id) {
				try {
					// @ts-expect-error BasketResponse does not match constraint of BaseResponse. TODO add option to override this?
					const response = await api.get<BasketResponse[]>(
						`basket-api/Basket/user/${vinistoUser.id}`,
						undefined,
						{ signal }
					);
					const userBaskets = response.filter(
						(basket) => basket.type === BasketType.UserDefined
					);
					const systemBaskets = response.filter(
						(basket) => basket.type === BasketType.SystemDefined
					);
					return [...(systemBaskets ?? []), ...(userBaskets ?? [])];
				} catch (error) {
					return [];
				}
			}
			return [];
		},
		enabled: !!vinistoUser.id && !isAdminIframe,
	});

	const createForLaterBasketMutationKey = useMemo(
		() => ['createForLaterBasket', vinistoUser.id],
		[vinistoUser.id]
	);

	const {
		mutate: createForLaterBasket,
		reset: resetCreateForLaterBasket,
		isLoading: isCreatingForLaterBasket,
		isError: hasCreatingForLaterBasketFailed,
		isSuccess: hasCreatedForLaterBasket,
	} = useMutation({
		mutationKey: createForLaterBasketMutationKey,
		mutationFn: createUserOrSystemBasket,
		onSettled: () => refetchUserBaskets(),
	});

	useEffect(() => {
		resetCreateForLaterBasket();
	}, [vinistoUser.id, resetCreateForLaterBasket]);

	useEffect(() => {
		if (
			isAdminIframe ||
			!isUserBasketsSuccess ||
			!userBaskets ||
			!vinistoUser.id ||
			isCreatingForLaterBasket ||
			hasCreatingForLaterBasketFailed ||
			hasCreatedForLaterBasket ||
			queryClient.isMutating({
				mutationKey: createForLaterBasketMutationKey,
			}) > 0
		)
			return;

		const hasForLaterBasket = userBaskets.some(
			(basket) =>
				basket.type === BasketType.SystemDefined &&
				basket.name === FOR_LATER_BASKET_NAME
		);

		if (!hasForLaterBasket) {
			createForLaterBasket({
				userId,
				userLoginHash,
				anonymousUserId,
				currency,
				name: FOR_LATER_BASKET_NAME,
				type: BasketType.SystemDefined,
			});
		}
	}, [
		isUserBasketsSuccess,
		userBaskets,
		vinistoUser.id,
		userId,
		anonymousUserId,
		currency,
		queryClient,
		isAdminIframe,
		userLoginHash,
		createForLaterBasket,
		isCreatingForLaterBasket,
		hasCreatingForLaterBasketFailed,
		hasCreatedForLaterBasket,
		createForLaterBasketMutationKey,
	]);

	const wsConnectionFallbackCallback = () => {
		if (wsConnectionId === NOT_CONNECTED) {
			setTimeout(() => {
				refetch();
				refetchUserBaskets();
			}, 750);
		}
	};

	// This is a band aid for basket state SOMETIMES not loading in b2b iframe after first login
	useEffect(() => {
		if (isB2b && vinistoUser.id && requestedBasketId && basketState === null) {
			refetch();
		}
	}, [basketState, isB2b, refetch, requestedBasketId, vinistoUser.id]);

	// Refetch basket if id change (e.g. after login)
	useEffect(() => {
		wsConnectionFallbackCallback();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basketId]);

	useBasketRefresh({
		basketState,
		websocketId: wsConnectionId,
	});

	const { data: shippingPackagingOptions } = useShippingPackaging();

	// Get the effective packaging selection (local override or server state)
	const effectivePackagingSelection = useMemo(() => {
		// Otherwise, determine from server state
		const serverSelectedAddon = basketState?.addons?.find((addon) =>
			shippingPackagingOptions
				?.map((opt) => opt.addonId)
				.includes(addon.addonId!)
		);

		if (serverSelectedAddon) {
			// Find the corresponding shipping option
			const serverSelectedOption = shippingPackagingOptions?.find(
				(opt) => opt.addonId === serverSelectedAddon.addonId
			);
			if (serverSelectedOption) {
				return {
					id: serverSelectedOption.id,
					addonId: serverSelectedOption.addonId,
				};
			}
		}

		// Default to eco packaging
		return { id: '0', addonId: null };
	}, [basketState?.addons, shippingPackagingOptions]);

	// Get the effective selected packaging object (full object or null for eco)
	const effectiveSelectedPackaging = useMemo(() => {
		if (effectivePackagingSelection.id === '0') {
			return null; // Eco packaging
		}
		return (
			shippingPackagingOptions?.find(
				(opt) => opt.id === effectivePackagingSelection.id
			) ?? null
		);
	}, [effectivePackagingSelection.id, shippingPackagingOptions]);

	// Calculate effective packaging prices for manual addition to totals
	const effectivePackagingPrice =
		effectiveSelectedPackaging?.bundlePrices?.basePrice?.value ?? 0;
	const effectivePackagingPriceWithVat =
		effectiveSelectedPackaging?.bundlePrices?.basePrice?.valueWithVat ?? 0;

	// Create basket totals that include effective packaging prices
	const basketTotalsWithEffectivePackaging = useMemo(() => {
		if (!basketState) {
			return {
				totalPrice: 0,
				totalPriceWithVat: 0,
				totalStandardPrice: 0,
				totalStandardPriceWithVat: 0,
				totalDiscountedPrice: 0,
				totalDiscountedPriceWithVat: 0,
				totalDiscountedPriceWithGiftCoupons: 0,
				totalDiscountedPriceWithVatWithGiftCoupons: 0,
			};
		}

		// We have a local override - calculate the difference between current and new packaging
		const serverSelectedAddon = basketState.addons?.find((addon) =>
			shippingPackagingOptions
				?.map((opt) => opt.addonId)
				.includes(addon.addonId!)
		);

		// Get server packaging price (0 if eco, or actual price if premium)
		let serverPackagingPrice = 0;
		let serverPackagingPriceWithVat = 0;

		if (serverSelectedAddon) {
			// Server has some premium packaging selected
			const matchingPackagingOption = shippingPackagingOptions?.find(
				(opt) => opt.addonId === serverSelectedAddon.addonId
			);
			if (matchingPackagingOption) {
				serverPackagingPrice =
					matchingPackagingOption.bundlePrices?.basePrice?.value ?? 0;
				serverPackagingPriceWithVat =
					matchingPackagingOption.bundlePrices?.basePrice?.valueWithVat ?? 0;
			} else {
				const firstPremiumOption = shippingPackagingOptions?.[0];
				if (firstPremiumOption) {
					serverPackagingPrice =
						firstPremiumOption.bundlePrices?.basePrice?.value ?? 0;
					serverPackagingPriceWithVat =
						firstPremiumOption.bundlePrices?.basePrice?.valueWithVat ?? 0;
				}
			}
		}

		// Calculate the price difference: new packaging - current server packaging
		const priceDifference = effectivePackagingPrice - serverPackagingPrice;
		const priceDifferenceWithVat =
			effectivePackagingPriceWithVat - serverPackagingPriceWithVat;

		// Apply the difference to server totals
		return {
			totalPrice: (basketState.totalPrice ?? 0) + priceDifference,
			totalPriceWithVat:
				(basketState.totalPriceWithVat ?? 0) + priceDifferenceWithVat,
			totalStandardPrice:
				(basketState.totalStandardPrice ?? 0) + priceDifference,
			totalStandardPriceWithVat:
				(basketState.totalStandardPriceWithVat ?? 0) + priceDifferenceWithVat,
			totalDiscountedPrice:
				(basketState.totalDiscountedPrice ?? 0) + priceDifference,
			totalDiscountedPriceWithVat:
				(basketState.totalDiscountedPriceWithVat ?? 0) + priceDifferenceWithVat,
			totalDiscountedPriceWithGiftCoupons:
				(basketState.totalDiscountedPriceWithGiftCoupons ?? 0) +
				priceDifference,
			totalDiscountedPriceWithVatWithGiftCoupons:
				(basketState.totalDiscountedPriceWithVatWithGiftCoupons ?? 0) +
				priceDifference,
		};
	}, [
		basketState,
		effectivePackagingPrice,
		effectivePackagingPriceWithVat,
		shippingPackagingOptions,
	]);

	const basketItemsBundleIds =
		basketState?.items
			?.map((item) => item.itemId)
			.filter((id): id is string => id != null) ?? [];

	const addonsQueryRequest: ValidateAddonsRequest = useMemo(
		() => ({
			appliedCouponsIds:
				basketState?.coupons?.map((coupon) => coupon.couponId ?? '') ?? [],
			countryOfSale: basketState?.countryOfSale ?? CountryCode.CZ,
			currency: basketState?.currency ?? Currency.CZK,
			items:
				basketState?.items?.map((item) => ({
					itemId: item.itemId,
					quantity: item.quantity ?? 1,
					type: item.type ?? BasketItemType.Bundle,
				})) ?? [],
			orderPrice: basketState?.totalPriceWithVat ?? 0,
			discountPriceWithVat:
				basketState?.coupons?.reduce(
					(acc, coupon) => acc + (coupon.discountPriceWithVat ?? 0),
					0
				) ?? 0,
			// basketState?.addons?.reduce<Record<string, number>>((acc, addon) => {
			// 	acc[addon.addonId] = addon.quantity ?? 1;
			// 	return acc;
			// }, {}) ?? {},
		}),
		[basketState]
	);

	const orderPrice = basketState?.totalPriceWithVat ?? 0;

	const addonsQuery = useQuery({
		queryKey: ['basket-addons', addonsQueryRequest],
		queryFn: () => AddonsService.validate(addonsQueryRequest),
		select: (data) => ({
			possibleAddons:
				data.possibleAddons
					?.map(giftAdapter.fromApi)
					.filter((item) => item != null && item.orderPriceLimitFrom != null) ??
				[],
			addonsToAdd:
				data.addonsToAdd
					?.map(giftAdapter.fromApi)
					.filter((item) => item != null && item.orderPriceLimitFrom != null) ??
				[],
			uxAddonsToAdd: data.addonsToAdd?.map(uxAdapter.fromApi) ?? [],
			relatedProductsToAdd: data.addonsToAdd?.filter(
				(addon) => addon.type === AddonType.RelatedProduct
			),
		}),
		enabled: orderPrice !== 0,
		keepPreviousData: true,
	});

	const relatedProductsBundleIdsAndQuantitiesMap = useMemo(() => {
		const basketItemIdsToRelatedProductIdsAndQuantitiesMap = new Map<
			string,
			{ itemId: string; quantity: number }[]
		>();

		addonsQuery.data?.relatedProductsToAdd?.forEach((relatedProductAddon) => {
			relatedProductAddon.actions?.forEach((action) => {
				const relatedProductId = ('itemId' in action &&
					action.itemId) as string;
				const relatedProductQuantity =
					'quantity' in action && action.quantity ? action.quantity : 1;
				const applicableToBundlesIds =
					'relatedProductsIds' in action
						? (action.relatedProductsIds as string[])
						: [];

				applicableToBundlesIds.forEach((applicableToBundlesId) => {
					const alreadyExistingMapItem =
						basketItemIdsToRelatedProductIdsAndQuantitiesMap.get(
							applicableToBundlesId
						);
					basketItemIdsToRelatedProductIdsAndQuantitiesMap.set(
						applicableToBundlesId,
						Array.from(
							new Set([
								...(alreadyExistingMapItem ?? []),
								{ itemId: relatedProductId, quantity: relatedProductQuantity },
							])
						)
					);
				});
			});
		});

		return basketItemIdsToRelatedProductIdsAndQuantitiesMap;
	}, [addonsQuery.data?.relatedProductsToAdd]);

	const basketBundlesQuery = useGetBundlesByIdsQueries({
		bundleIds: Array.from(new Set([...(basketItemsBundleIds ?? [])])),
		requestParams: {
			countryOfSale,
		},
		options: {
			enabled: isBasketQueryEnabled,
			keepPreviousData: true,
		},
	});

	const mergedBasketItems = useMemo(() => {
		const basketItems = basketState?.items ?? [];
		const basketBundles = new Map(
			basketBundlesQuery.map((query) => [query.data?.id, query.data])
		);

		return basketItems.map((item) => {
			const bundle = basketBundles.get(item.itemId!);

			return {
				...item,
				bundle: bundle,
			};
		});
	}, [basketState?.items, basketBundlesQuery]);

	const {
		sendAddToCartAnalytics,
		sendRemoveFromCartAnalytics,
		getBundleGoogleAnalyticsData,
	} = useBasketAnalytics();

	const basketItemsGoogleAnalyticsData =
		mergedBasketItems.map((item) =>
			getBundleGoogleAnalyticsData({
				bundleId: item.itemId!,
				quantity: item.quantity ?? 1,
				bundleMeta: getBundleMetaForAnalytics(item.bundle ?? null),
			})
		) ?? [];

	const createBasketMutation = useMutation({
		mutationFn: createBasket,
		onSuccess: (basketId) => {
			storageService.setItem(LocalStorageKeys.BASKET_ID, basketId);
			setBasketId(basketId);
		},
		onError: () => {
			handleShowErrorNotification('notification.message.basketCreate.error');
		},
	});

	const onRemoveBundle = async (params: {
		bundleId: string;
		quantity: number;
		bundleMetaForAnalytics: BundleMetaForAnalytics;
		userOrSystemBasketId?: string;
	}) => {
		const primaryOrUserBasketId = params.userOrSystemBasketId ?? basketId;
		const notNullableBasketId = primaryOrUserBasketId
			? primaryOrUserBasketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const relatedItemsOfItemBeingRemovedInBasket =
			basketState?.items?.find((item) => item.itemId === params.bundleId)
				?.relatedOnProductItems ?? [];

		const relatedItemsOfItemBeingRemovedInBasketQuantity =
			relatedItemsOfItemBeingRemovedInBasket.reduce(
				(acc, item) => acc + (item?.quantity ?? 0),
				0
			);

		const payload: Operation[] = [
			getAuth(),
			{ op: 'add', path: '/WebsocketId', value: wsConnectionId },
			relatedItemsOfItemBeingRemovedInBasketQuantity <= 0
				? {
						op: 'remove',
						path: `/Items/${bundleBeingDeletedIndexRef.current[notNullableBasketId]}`,
				  }
				: {
						op: 'replace',
						path: `/Items/`,
						value:
							basketState?.items?.map((item) =>
								item.itemId === params.bundleId
									? {
											...item,
											quantity: relatedItemsOfItemBeingRemovedInBasketQuantity,
									  }
									: item
							) ?? [],
				  },
		];

		// If the basket is empty, remove the shipping packaging
		if (basketState?.items && basketState.items.length === 1) {
			payload.push({
				op: 'replace',
				path: '/Addons',
				value: selectedGiftsId?.filter(Boolean).map((id) => ({
					AddonId: id,
					Type: 1,
				})),
			});
		}

		await workerRef.current?.postMessage({
			basketId: notNullableBasketId,
			type: 'onRemoveBundle',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const removeBundleMutation = useMutation({
		mutationFn: onRemoveBundle,
		onMutate: async (params) => {
			const { bundleId, userOrSystemBasketId } = params;

			if (userOrSystemBasketId) {
				await queryClient.cancelQueries({
					queryKey: ['userAndSystemBaskets'],
				});

				const bundleIndex =
					userBaskets
						?.find((userBasket) => userBasket.id === userOrSystemBasketId)
						?.items?.findIndex((item) => item.itemId === bundleId) ?? -1;

				if (bundleIndex !== -1) {
					bundleBeingDeletedIndexRef.current[userOrSystemBasketId] =
						bundleIndex;
				}

				// TODO: Create abstraction to enable optimistic update on user baskets as well
				return;
			}

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const bundleIndex = mergedBasketItems.findIndex(
				(item) => item.itemId === bundleId
			);

			if (bundleIndex !== -1 && basketId) {
				bundleBeingDeletedIndexRef.current[basketId] = bundleIndex;
			}

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						items:
							oldBasket?.items?.filter((item) => item.itemId !== bundleId) ??
							[],
					};
				}
			);
			return { previousBasketState };
		},

		onSettled: (_, __, { userOrSystemBasketId }) => {
			if (userOrSystemBasketId ?? basketId) {
				// @ts-expect-error This should be O.K.?!
				bundleBeingDeletedIndexRef.current[userOrSystemBasketId ?? basketId] =
					null;
			}
		},

		onError: (_, __, context) => {
			handleShowErrorNotification('notification.message.basketRemove.error');
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},
		onSuccess: (_, params, context) => {
			wsConnectionFallbackCallback();

			sendRemoveFromCartAnalytics([
				{
					bundleId: params.bundleId,
					quantity:
						context?.previousBasketState?.items?.find(
							(item) => item.itemId === params.bundleId
						)?.quantity ?? 0,
					bundleMeta: params.bundleMetaForAnalytics,
				},
			]);
		},
	});

	const onChangeItemQuantity = async (params: {
		quantity: number;
		bundleId: string;
		bundleMetaForAnalytics: BundleMetaForAnalytics;
		userOrSystemBasketId?: string;
		relatedOnProductItems?: {
			quantity: number;
			itemId: string;
		};
	}) => {
		const primaryOrUserBasketId = params.userOrSystemBasketId ?? basketId;
		const notNullableBasketId = primaryOrUserBasketId
			? primaryOrUserBasketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const { quantity, bundleId, relatedOnProductItems } = params;

		const basketItems = params.userOrSystemBasketId
			? queryClient
					.getQueryState<BasketResponse[]>(['userAndSystemBaskets'])
					?.data?.find(
						(userBasket) => userBasket.id === params.userOrSystemBasketId
					)?.items ?? []
			: queryClient.getQueryState<BasketResponse | null>(['basketByUserOrId'])
					?.data?.items ?? [];

		const updatedItemInBasket = basketItems.find(
			(item) => item.itemId === bundleId
		);

		const updatedItems = [
			...basketItems.map((item) => ({
				...item,
				itemId: item.itemId,
				Type: 0,
				quantity: item.itemId === bundleId ? quantity : item.quantity,
			})),
			...(updatedItemInBasket
				? []
				: [
						{
							itemId: bundleId,
							Type: 0,
							quantity,
							additionalPercentageDiscount: 0,
						},
				  ]),
		]
			.map((item) => {
				if (!relatedOnProductItems || !(item.itemId === bundleId)) return item;

				return updateRelatedProductItem({
					item,
					updatedItemInBasket,
					relatedOnProductItems,
				});
			})
			.filter((item) => !!item.quantity);

		const payload: Operation[] = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Items',
				value: updatedItems.map((item) => ({
					ItemId: item.itemId,
					Type: item.type,
					quantity: item.quantity,
					relatedOnProductItems: item.relatedOnProductItems,
					...('additionalPercentageDiscount' in item && {
						additionalPercentageDiscount: item.additionalPercentageDiscount,
					}),
				})),
			},
		];

		await workerRef.current?.postMessage({
			basketId: notNullableBasketId,
			type: 'onChangeItemQuantity',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const changeQuantityMutation = useMutation({
		mutationFn: onChangeItemQuantity,
		onMutate: async (params) => {
			const {
				quantity,
				bundleId,
				userOrSystemBasketId,
				relatedOnProductItems,
			} = params;

			if (userOrSystemBasketId) {
				await queryClient.cancelQueries({
					queryKey: ['userAndSystemBaskets'],
				});

				// TODO: Create abstraction to enable optimistic update on user baskets as well
				return;
			}

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			const previousBasketItems = previousBasketState?.items ?? [];

			const updatedItemInBasket = previousBasketItems.find(
				(item) => item.itemId === bundleId
			);

			const updatedBasketItems = [
				...previousBasketItems.map((item) => ({
					...item,
					itemId: item.itemId,
					Type: 0,
					quantity: item.itemId === bundleId ? quantity : item.quantity,
				})),
				...(updatedItemInBasket
					? []
					: [
							{
								itemId: bundleId,
								Type: 0,
								quantity,
								relatedOnProductItems: [],
							},
					  ]),
			]
				.map((item) => {
					if (!relatedOnProductItems || !(item.itemId === bundleId))
						return item;

					return updateRelatedProductItem({
						item,
						updatedItemInBasket,
						relatedOnProductItems,
					});
				})
				.filter((item) => !!item.quantity);

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						items: updatedBasketItems,
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, __, context) => {
			handleShowErrorNotification('notification.message.basketChange.error');
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},

		onSuccess: (_, params, context) => {
			wsConnectionFallbackCallback();

			const quantityChanged = diffQuantities({
				bundleId: params.bundleId,
				previousState: context?.previousBasketState,
				newState: basketState,
			});

			return quantityChanged > 0
				? sendAddToCartAnalytics([
						{
							bundleId: params.bundleId,
							quantity: quantityChanged,
							bundleMeta: params.bundleMetaForAnalytics,
						},
				  ])
				: sendRemoveFromCartAnalytics([
						{
							bundleId: params.bundleId,
							quantity: Math.abs(quantityChanged),
							bundleMeta: params.bundleMetaForAnalytics,
						},
				  ]);
		},
	});

	const onChangeAdditionalPercentageDiscount = async (params: {
		bundleId: string | null;
		additionalPercentageDiscount: number;
	}) => {
		const { bundleId, additionalPercentageDiscount } = params;

		if (!bundleId) return;

		const basketItems =
			queryClient.getQueryState<BasketResponse>(['basketByUserOrId'])?.data
				?.items ?? [];

		const updatedItems = basketItems.map((item) =>
			bundleId === item.itemId
				? {
						...item,
						additionalPercentageDiscount,
				  }
				: item
		);

		const payload: Operation[] = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Items',
				value: updatedItems.map((item) => ({
					ItemId: item.itemId,
					Type: item.type,
					quantity: item.quantity,
					relatedOnProductItems: item.relatedOnProductItems,
					...('additionalPercentageDiscount' in item && {
						additionalPercentageDiscount: item.additionalPercentageDiscount,
					}),
				})),
			},
		];

		await workerRef.current?.postMessage({
			basketId,
			type: 'onChangeItemQuantity',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const changePercentageDiscountMutation = useMutation({
		mutationFn: onChangeAdditionalPercentageDiscount,
		onError: () => {
			handleShowErrorNotification('additionalPercentageDiscount.edit.error');
		},
		onSuccess: () => {
			wsConnectionFallbackCallback();
		},
	});

	const onAddBundle = async (params: {
		quantity: number;
		bundleId: string;
		bundleMetaForAnalytics: BundleMetaForAnalytics;
		availableCount?: number;
		openCrossSellModal?: boolean;
		bundleItem?: Bundle;
		userOrSystemBasketId?: string;
		relatedOnProductItems?: {
			quantity: number;
			itemId: string;
		};
	}) => {
		const primaryOrUserBasketId = params.userOrSystemBasketId ?? basketId;

		const notNullableBasketId = primaryOrUserBasketId
			? primaryOrUserBasketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const {
			quantity,
			bundleId,
			bundleItem,
			openCrossSellModal = true,
			relatedOnProductItems,
		} = params;

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'add',
				path: '/Items/-',
				value: {
					ItemId: bundleId,
					Type: 0,
					quantity,
					...(relatedOnProductItems
						? {
								relatedOnProductItems,
						  }
						: {}),
				},
			},
		];

		await workerRef.current
			?.postMessage({
				basketId: notNullableBasketId,
				type: 'onAddBundle',
				vinistoUser,
				platformId: getPlatformId(),
				payload,
			})
			.then(() => {
				if (openCrossSellModal && bundleItem) {
					handleShowCrossSellModal(bundleItem, quantity);
				}
			});
	};

	const addBundleMutation = useMutation({
		mutationFn: onAddBundle,
		onMutate: async (params) => {
			const { quantity, bundleId, userOrSystemBasketId } = params;

			if (userOrSystemBasketId) {
				await queryClient.cancelQueries({
					queryKey: ['userAndSystemBaskets'],
				});

				// TODO: Create abstraction to enable optimistic update on user baskets as well
				return;
			}

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			const previousBasketItems = previousBasketState?.items ?? [];

			const updatedItemInBasket = previousBasketItems.find(
				(item) => item.itemId === bundleId
			);

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						items: [
							...(oldBasket?.items ?? []).map((item) => ({
								...item,
								itemId: item.itemId,
								Type: 0,
								quantity:
									item.itemId === bundleId
										? (item.quantity ?? 0) + quantity
										: item.quantity,
							})),
							...(!updatedItemInBasket
								? [
										{
											itemId: bundleId,
											Type: 0,
											quantity,
										},
								  ]
								: []),
						],
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, __, context) => {
			handleShowErrorNotification('notification.message.basketAdd.error');
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},

		onSuccess: (_, params, context) => {
			wsConnectionFallbackCallback();

			const quantityChanged = diffQuantities({
				bundleId: params.bundleId,
				previousState: context?.previousBasketState,
				newState: basketState,
			});

			sendAddToCartAnalytics([
				{
					bundleId: params.bundleId,
					quantity: quantityChanged,
					bundleMeta: params.bundleMetaForAnalytics,
				},
			]);
		},
	});

	const onAddCoupon = async (couponCode: string) => {
		const notNullableBasketId = basketId
			? basketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'add',
				path: '/Coupons/-',
				value: { Code: couponCode, Type: 2 },
			},
		];

		await workerRef.current
			?.postMessage({
				basketId: notNullableBasketId,
				type: 'onAddCoupon',
				vinistoUser,
				platformId: getPlatformId(),
				payload,
			})
			.catch((error) => {
				throw new Error(error);
			});
	};

	const addCouponMutation = useMutation({
		mutationFn: onAddCoupon,
		onError: () => {
			handleShowErrorNotification(
				`routes.user-section.club-coupons.action-products.coupon-error`
			);
		},
		onSuccess: () => {
			wsConnectionFallbackCallback();
		},
	});

	const handleOnAddBundleWithCoupon = async (params: {
		couponCode: string;
		bundleId: string;
		bundleMetaForAnalytics: BundleMetaForAnalytics;
		quantity?: number;
		openCrossSellModal?: boolean;
		bundleItem?: Bundle;
	}) => {
		const notNullableBasketId = basketId
			? basketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const { couponCode, quantity = 1, openCrossSellModal, bundleItem } = params;

		const optimisticallyUpdatedBasketstate =
			queryClient.getQueryData<MultiplatformBasketResponse | null>([
				'basketByUserOrId',
			]);

		const basketItems = optimisticallyUpdatedBasketstate?.items ?? [];
		const basketCoupons = optimisticallyUpdatedBasketstate?.coupons ?? [];

		const isCouponAlreadyInBasket = basketCoupons.some(
			(coupon) => coupon.code === couponCode
		);

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Items',
				value: basketItems.map((item) => ({
					ItemId: item.itemId,
					Type: item.type,
					quantity: item.quantity,
				})),
			},
			...(isCouponAlreadyInBasket
				? []
				: [
						{
							op: 'add',
							path: '/Coupons/-',
							value: { Code: couponCode, Type: 2 },
						},
				  ]),
		];

		await workerRef.current
			?.postMessage({
				basketId: notNullableBasketId,
				type: 'handleOnAddBundleWithCoupon',
				vinistoUser,
				platformId: getPlatformId(),
				payload,
			})
			.then(() => {
				if (openCrossSellModal && bundleItem) {
					handleShowCrossSellModal(bundleItem, quantity);
				}
			});
	};

	const addBundleWithCouponMutation = useMutation({
		mutationFn: handleOnAddBundleWithCoupon,
		onMutate: async (params) => {
			const { bundleId, quantity = 1 } = params;

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			const previousBasketItems = previousBasketState?.items ?? [];

			const updatedItemInBasket = previousBasketItems.find(
				(item) => item.itemId === bundleId
			);

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						items: [
							...(oldBasket?.items ?? []).map((item) => ({
								...item,
								itemId: item.itemId,
								Type: 0,
								quantity:
									item.itemId === bundleId
										? (item.quantity ?? 0) + quantity
										: item.quantity,
							})),
							...(!updatedItemInBasket
								? [
										{
											itemId: bundleId,
											Type: 0,
											quantity,
										},
								  ]
								: []),
						],
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, __, context) => {
			handleShowErrorNotification(
				'routes.user-section.club-coupons.action-products.coupon-error'
			);
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState
			);
		},

		onSuccess: (_, params) => {
			wsConnectionFallbackCallback();

			sendAddToCartAnalytics([
				{
					bundleId: params.bundleId,
					quantity: params.quantity ?? 1,
					bundleMeta: params.bundleMetaForAnalytics,
				},
			]);
		},
	});

	const onRemoveCoupon = async (
		coupon:
			| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsPercentageDiscountCouponDefinition
			| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsAmountDiscountCouponDefinition
			| VinistoOrderDllModelsApiDiscountCouponDefinitionModelsBaseDiscountCouponDefinition
			| BasketCoupon
	) => {
		const notNullableBasketId = basketId
			? basketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const { code } = coupon;
		const basketCoupons =
			queryClient.getQueryState<MultiplatformBasketResponse | null>([
				'basketByUserOrId',
			])?.data?.coupons ?? [];

		const couponIndex = basketCoupons.findIndex(
			(basketCoupon) => basketCoupon.code === code
		);

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'remove',
				path: `/Coupons/${couponIndex}`,
			},
		];

		await workerRef.current?.postMessage({
			basketId: notNullableBasketId,
			type: 'onRemoveCoupon',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const removeCouponMutation = useMutation({
		mutationFn: onRemoveCoupon,
		onError: () => {
			handleShowErrorNotification('basket.discountCoupon.error.remove');
		},
		onSuccess: () => {
			wsConnectionFallbackCallback();
		},
	});

	const onBulkUpdate = async (
		bundlesAndQuantitiesList: BundleIdAndQuantity[]
	) => {
		const notNullableBasketId = basketId
			? basketId
			: await createBasketMutation.mutateAsync({
					userId,
					userLoginHash,
					anonymousUserId,
					customerId,
					currency,
					isCreatingBasketRef,
					type: BasketType.Primary,
					platform: getPlatform(),
			  });

		const previousBasketState = queryClient.getQueryData<BasketResponse | null>(
			['basketByUserOrId']
		);

		const previousBasketItems = previousBasketState?.items ?? [];

		const mergedBundlesAndQuantitiesMap = new Map<string, number>();

		[...previousBasketItems, ...bundlesAndQuantitiesList].forEach((item) => {
			const bundleId = 'itemId' in item ? item.itemId : item.bundleId;
			if (!bundleId) return;
			const existingRecord = mergedBundlesAndQuantitiesMap.get(bundleId);
			const quantity = 'quantity' in item ? item.quantity : item.quantity;
			if (existingRecord) {
				mergedBundlesAndQuantitiesMap.set(
					bundleId,
					Math.max(existingRecord, quantity ?? 1)
				);
				return;
			}
			mergedBundlesAndQuantitiesMap.set(bundleId, quantity ?? 1);
		});

		const mergedBundlesAndQuantitiesList = Array.from(
			mergedBundlesAndQuantitiesMap.entries()
		).map(([bundleId, quantity]) => ({
			bundleId,
			quantity,
		}));

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Items',
				value: mergedBundlesAndQuantitiesList.map((item) => ({
					ItemId: item.bundleId,
					Type: 0,
					quantity: item.quantity,
				})),
			},
		];

		await workerRef.current?.postMessage({
			basketId: notNullableBasketId,
			type: 'onBulkUpdate',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const bulkUpdateMutation = useMutation({
		mutationFn: onBulkUpdate,
		onMutate: async (bundlesAndQuantitiesList) => {
			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			const previousBasketItems = previousBasketState?.items ?? [];

			const mergedBundlesAndQuantitiesMap = new Map<string, number>();

			[...previousBasketItems, ...bundlesAndQuantitiesList].forEach((item) => {
				const bundleId = 'itemId' in item ? item.itemId : item.bundleId;
				if (!bundleId) return;
				const existingRecord = mergedBundlesAndQuantitiesMap.get(bundleId);
				const quantity = 'quantity' in item ? item.quantity : item.quantity;
				if (existingRecord) {
					mergedBundlesAndQuantitiesMap.set(
						bundleId,
						Math.max(existingRecord, quantity ?? 1)
					);
					return;
				}
				mergedBundlesAndQuantitiesMap.set(bundleId, quantity ?? 1);
			});

			const mergedBundlesAndQuantitiesList = Array.from(
				mergedBundlesAndQuantitiesMap.entries()
			).map(([bundleId, quantity]) => ({
				bundleId,
				quantity,
			}));

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						items: mergedBundlesAndQuantitiesList.map(
							({ bundleId, quantity }) => ({
								itemId: bundleId,
								Type: 0,
								quantity,
							})
						),
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, __, context) => {
			handleShowErrorNotification('notification.message.basketAddMany.error');
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},

		onSuccess: (_, bundlesAndQuantitiesList) => {
			wsConnectionFallbackCallback();

			sendAddToCartAnalytics(
				bundlesAndQuantitiesList.map((item) => ({
					bundleId: item.bundleId,
					quantity: item.quantity,
					bundleMeta: item.bundleMetaForAnalytics,
				}))
			);
		},
	});

	const onSwitchCountryOfSaleAndCurrency = async (params: {
		currency: VinistoHelperDllEnumsCurrency;
	}) => {
		const userBasketIds = userBaskets?.map((userBasket) => userBasket.id);

		const primaryAndUserBasketIds = [basketId, ...(userBasketIds ?? [])].filter(
			(id) => id != null
		);

		if (!primaryAndUserBasketIds.length) return;

		const currencyCode = mapCurrencyEnumToCurrencyCode(params.currency);
		const countryOfSaleCode = mapCurrencyEnumToCountryCode(params.currency);

		const payload = [
			getAuth(),
			...getWsConnection(),
			{ op: 'add', path: '/Currency', value: currencyCode },
			{
				op: 'add',
				path: '/CountryOfSale',
				value: countryOfSaleCode,
			},
		];

		await Promise.all(
			primaryAndUserBasketIds.map(
				async (primaryOrUserBasketId) =>
					await workerRef.current?.postMessage({
						basketId: primaryOrUserBasketId,
						type: 'onSwitchCountryOfSaleAndCurrency',
						vinistoUser,
						platformId: getPlatformId(),
						payload,
					})
			)
		);
	};

	const switchCountryOfSaleAndCurrencyMutation = useMutation({
		mutationFn: onSwitchCountryOfSaleAndCurrency,
		onSuccess: () => {
			wsConnectionFallbackCallback();
		},
	});

	const [isSideBasketVisible, setIsSideBasketVisible] = useState(true);

	const totalItemsQuantity = useMemo(() => {
		return (
			basketState?.items?.reduce(
				(acc, item) => acc + (item.quantity ?? 0),
				0
			) ?? 0
		);
	}, [basketState?.items]);

	const totalBasketWeight = useMemo(() => {
		return (
			(basketState?.items?.reduce(
				(acc, item) => acc + (item.weight ?? 0) * (item.quantity ?? 0),
				0
			) ?? 0) +
			(basketState?.addons?.reduce(
				(acc, addon) => acc + (addon.weight ?? 0) * (addon.quantity ?? 0),
				0
			) ?? 0)
		);
	}, [basketState?.items, basketState?.addons]);

	const applicableAddonsBundlesIds = useMemo(() => {
		return (
			addonsQuery.data?.addonsToAdd
				?.filter((addon) => addon != null && addon.id != null)
				.map((addon) => `${addon?.bundleIds?.[0]}`) ?? []
		);
	}, [addonsQuery.data?.addonsToAdd]);

	const possibleAddonsBundlesIds = useMemo(() => {
		return (
			addonsQuery.data?.possibleAddons
				?.filter((addon) => addon != null && addon.id != null)
				.map((addon) => `${addon?.bundleIds?.[0]}`) ?? []
		);
	}, [addonsQuery.data?.possibleAddons]);

	const applicableAddonBundlesQuery = useQuery({
		queryKey: ['applicable-addon-bundles', applicableAddonsBundlesIds],
		queryFn: () =>
			api
				.get<
					ProductApi.BundlesByIdsList.ResponseBody,
					ProductApi.BundlesByIdsList.RequestQuery
				>(`product-api/bundles/by-ids`, {
					bundleIds: applicableAddonsBundlesIds,
				})
				.then((response) => {
					const bundles =
						response.bundles?.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel: priceLevel,
							})
						) ?? [];
					return new Map(bundles.map((bundle) => [bundle.id, bundle]));
				}),
	});

	const possibleAddonsBundlesQuery = useQuery({
		queryKey: ['possible-addon-bundles', possibleAddonsBundlesIds],
		queryFn: () =>
			api
				.get<
					ProductApi.BundlesByIdsList.ResponseBody,
					ProductApi.BundlesByIdsList.RequestQuery
				>(`product-api/bundles/by-ids`, {
					bundleIds: applicableAddonsBundlesIds,
				})
				.then((response) => {
					const bundles =
						response.bundles?.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel: priceLevel,
							})
						) ?? [];
					return new Map(bundles.map((bundle) => [bundle.id, bundle]));
				}),
	});

	const mergedApplicableAddons = useMemo(() => {
		const basketAddons = addonsQuery.data?.addonsToAdd ?? [];
		const basketBundles =
			applicableAddonBundlesQuery.data ?? new Map<string, Bundle>();

		return basketAddons
			.filter((item): item is Exclude<typeof item, null> => item != null)
			.map((item) => {
				const bundle = basketBundles.get(item?.bundleIds?.[0] ?? '');
				return Object.assign({}, item, { bundle });
			});
	}, [addonsQuery.data, applicableAddonBundlesQuery.data]);

	const mergedPossibleAddons = useMemo(() => {
		const basketAddons = addonsQuery.data?.possibleAddons ?? [];
		const basketBundles =
			possibleAddonsBundlesQuery.data ?? new Map<string, Bundle>();

		return basketAddons
			.filter((item): item is Exclude<typeof item, null> => item != null)
			.map((item) => {
				const bundle = basketBundles.get(item?.bundleIds?.[0] ?? '');
				return Object.assign({}, item, { bundle });
			});
	}, [addonsQuery.data, possibleAddonsBundlesQuery.data]);

	const [selectedGiftsId, setSelectedGiftsId] = useState<
		string[] | null | undefined
	>();

	// TODO consider refactoring to a new 'replace addons' handler that takes the new addons array as a parameter
	// This will be pain to maintain very soon (it already is TBH)
	const onSelectGift = async (params: { giftIds: string[] }) => {
		const { giftIds } = params;

		const previousBasketState =
			queryClient.getQueryData<MultiplatformBasketResponse | null>([
				'basketByUserOrId',
			]);

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Addons',
				value: [
					...(previousBasketState?.addons ?? [])
						.filter(
							(addon) =>
								!(
									addon.type === AddonType.Gift ||
									addon.type === AddonType.Service
								)
						)
						.map((addon) => ({
							AddonId: addon.addonId,
							// @ts-expect-error sadly, type is currently a string
							Type: AddonTypes[addon.type],
						})),
					...giftIds.filter(Boolean).map((id) => ({
						AddonId: id,
						Type: [
							NICE_PACKAGING_ADDON_ID_CZ,
							NICE_PACKAGING_ADDON_ID_SK,
						].includes(id)
							? AddonTypes.Service
							: AddonTypes.Gift,
					})),
				],
			},
		];

		await workerRef.current?.postMessage({
			basketId,
			type: 'onSelectAddons',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const onSelectGiftsMutation = useMutation({
		mutationFn: onSelectGift,
		onError: () => {
			handleShowErrorNotification('addon.gift.apply.error');
		},
		onSuccess: () => {
			wsConnectionFallbackCallback();
		},
	});

	const handleGoToShippingPayment = async (e: MouseEvent) => {
		e.preventDefault();

		if (!basketState?.items?.length) return;

		await queryClient.invalidateQueries({
			queryKey: ['GetDeliveriesByBasket'],
		});

		if (!isB2b) {
			await onSelectGiftsMutation.mutate({
				giftIds: [
					...(selectedGiftsId == null ? [] : selectedGiftsId),
					...(effectivePackagingSelection.addonId == null
						? []
						: [effectivePackagingSelection.addonId]),
				],
			});
		}

		router.push(
			withB2bQueryParams(`/${t({ id: 'routes.cart.shippingPayment.route' })}`)
		);
	};

	// TODO consider refactoring to a 'replace addons' handler that takes new addons array as a parameter
	// Take a look at 'onSelectGifts'
	const onSelectSubscription = async (params: {
		subscription: AddonResponse | null;
	}) => {
		const { subscription } = params;
		const previousBasketState =
			queryClient.getQueryData<MultiplatformBasketResponse | null>([
				'basketByUserOrId',
			]);
		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Addons',
				value: [
					...(previousBasketState?.addons ?? [])
						.filter(
							(addon) =>
								!(
									addon.type === AddonType.SubscriptionMonth ||
									addon.type === AddonType.SubscriptionYear
								)
						)
						.map((addon) => ({
							addonId: addon.addonId,
							// @ts-expect-error addon.type is string!
							type: AddonTypes[addon.type],
						})),
					...(subscription
						? [
								{
									addonId: subscription.id,
									// @ts-expect-error addon.type is string!
									type: AddonTypes[subscription.type],
								},
						  ]
						: []),
				],
			},
		];

		await workerRef.current?.postMessage({
			basketId,
			type: 'onSelectAddons',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const onSelectSubscriptionMutation = useMutation({
		mutationFn: onSelectSubscription,
		onMutate: async (params) => {
			const { subscription } = params;

			const subscriptionPrice = subscription?.actions?.find(
				(action) => action.actionType === ActionType.SetPrice
			)?.price;

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<MultiplatformBasketResponse | null>([
					'basketByUserOrId',
				]);

			const updatedAddons = [
				...(previousBasketState?.addons ?? []).filter(
					(addon) =>
						!(
							addon.type === AddonType.SubscriptionMonth ||
							addon.type === AddonType.SubscriptionYear
						)
				),
				...(subscription
					? [
							{
								...subscription,

								addonId: subscription.id ?? '',
								type: String(subscription.type),
								price: subscriptionPrice?.value,
								priceWithVat: subscriptionPrice?.valueWithVat,
							},
					  ]
					: []),
			];

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						addons: updatedAddons,
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, __, context) => {
			handleShowErrorNotification('notification.message.basketAdd.error');
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},
	});

	const onReplaceAddons = async (params: {
		replacedAddons: BasketAddon[];
		errorMessage?: string;
	}) => {
		const { replacedAddons } = params;

		const payload = [
			getAuth(),
			...getWsConnection(),
			{
				op: 'replace',
				path: '/Addons',
				value: replacedAddons.map((addon) => ({
					addonId: addon.addonId,
					// @ts-expect-error addon.type is string!
					type: AddonTypes[addon.type],
					quantity: addon.quantity,
				})),
			},
		];

		await workerRef.current?.postMessage({
			basketId,
			type: 'onSelectAddons',
			vinistoUser,
			platformId: getPlatformId(),
			payload,
		});
	};

	const onReplaceAddonsMutation = useMutation({
		mutationFn: onReplaceAddons,
		onMutate: async (params) => {
			const { replacedAddons } = params;

			await queryClient.cancelQueries({
				queryKey: ['basketByUserOrId'],
			});

			const previousBasketState =
				queryClient.getQueryData<BasketResponse | null>(['basketByUserOrId']);

			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				(oldBasket) => {
					return {
						...(oldBasket ?? ({} as BasketResponse)),
						addons: replacedAddons,
					};
				}
			);

			return { previousBasketState };
		},
		onError: (_, { errorMessage }, context) => {
			handleShowErrorNotification(
				errorMessage ?? 'notification.message.basketAdd.error'
			);
			queryClient.setQueryData<BasketResponse | null>(
				['basketByUserOrId'],
				context?.previousBasketState ?? null
			);
		},
	});

	const handleOnClearBasket = async () => {
		handleResetBasketState();
		broadcastBasketMessage(
			JSON.stringify({
				type: BASKET_BROADCAST_MESSAGE_TYPES.CLEAR_PRIMARY_BASKET,
			})
		);
	};

	const basketContextModel: BasketModel = {
		...defaultBasketContextModel,
		basketState,
		userBaskets,
		isBasketFetched,
		isBasketQueryEnabled,
		refetchBasket: refetch,
		refetchUserBaskets,
		handleOnAddToBasket: addBundleMutation.mutate,
		handleOnRemoveFromBasket: removeBundleMutation.mutate,
		handleOnChangeItemQuantity: changeQuantityMutation.mutate,
		handleOnAddCoupon: addCouponMutation.mutate,
		handleOnAddBundleWithCoupon: addBundleWithCouponMutation.mutate,
		handleOnRemoveCoupon: removeCouponMutation.mutate,
		handleChangeAdditionalPercentageDiscount:
			changePercentageDiscountMutation.mutate,
		handleOnClearBasket,
		bulkUpdate: bulkUpdateMutation.mutateAsync,
		isSideBasketVisible,
		setIsSideBasketVisible,
		itemsQuantity: totalItemsQuantity,
		totalBasketWeight,
		basketBundles: mergedBasketItems,
		relatedProductsBundleIdsAndQuantitiesMap,
		basketItemsGoogleAnalyticsData,
		minimalPriceForFreeDelivery:
			typeof basketState?.minimalPriceForFreeDelivery === 'number'
				? basketState?.minimalPriceForFreeDelivery
				: minimalPriceForFreeDelivery,
		assignedGiftsIncludingBundles: mergedApplicableAddons,
		possibleGiftsIncludingBundles: mergedPossibleAddons,
		uxAddons:
			addonsQuery.data?.uxAddonsToAdd.filter(
				(addon): addon is AddonUx => addon !== null
			) ?? [],
		toggleCountryOfSaleAndCurrency:
			switchCountryOfSaleAndCurrencyMutation.mutate,
		selectedGiftsId,
		setSelectedGiftsId,
		handleSelectGifts: onSelectGiftsMutation.mutate,
		handleSelectSubscription: onSelectSubscriptionMutation.mutate,
		handleReplaceAddons: onReplaceAddonsMutation.mutate,
		handleGoToShippingPayment,
		// basketBundlesQuery,
		effectivePackagingSelection,
		// Computed selected packaging info for UI display
		effectiveSelectedPackaging,
		// Calculated effective packaging prices for manual addition to totals
		effectivePackagingPrice,
		// Calculated effective packaging prices with VAT for manual addition to totals
		effectivePackagingPriceWithVat,
		// Calculated basket totals that include effective packaging prices
		basketTotalsWithEffectivePackaging,
	};

	return (
		<BasketContext.Provider value={basketContextModel}>
			{children}
		</BasketContext.Provider>
	);
};

export default BasketServiceProvider;
