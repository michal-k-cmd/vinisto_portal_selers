import { useCallback, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash-es';
import { BasketContext } from 'Services/BasketService';
import { WarehouseContext } from 'Services/WarehouseService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { LocalizationContext } from 'Services/LocalizationService';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';
import { usePlatformContext } from 'Services/PlatformService';

export const useDirectQuantityBox = ({
	bundle,
	userOrSystemBasketId,
	parentItemId,
	showStandaloneQuantity,
	baseQuantity = 1,
	shouldOpenCrossSellModal = false,
}: {
	bundle: Bundle | null | undefined;
	userOrSystemBasketId?: string;
	parentItemId?: string;
	showStandaloneQuantity?: boolean;
	baseQuantity?: number;
	shouldOpenCrossSellModal?: boolean;
}) => {
	const { isB2b, getIsInAdminIframe } = usePlatformContext();
	const {
		handleOnAddToBasket,
		handleOnChangeItemQuantity,
		handleOnRemoveFromBasket,
	} = useContext(BasketContext);
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { getQuantity } = useContext(WarehouseContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const availableCount =
		isB2b && getIsInAdminIframe() ? Infinity : getQuantity(bundle?.id ?? '');

	const isUpsellItem = !!parentItemId;

	const itemInBasket = useFindBundleInBasket({
		bundleId: bundle?.id,
		basketId: userOrSystemBasketId,
	});

	const quantityInBasketForRelatedProduct =
		itemInBasket?.relatedOnProductItems?.find(
			(parentItem) => parentItem.itemId === parentItemId
		)?.quantity ?? 0;

	const quantityOfRelatedProducts =
		itemInBasket?.relatedOnProductItems?.reduce(
			(acc, item) => acc + (item.quantity ?? 0),
			0
		) ?? 0;

	const standaloneQuantityInBasket =
		(itemInBasket?.quantity ?? 0) - quantityOfRelatedProducts;

	const quantityInBasket = (() => {
		// Basket upsell item quantity
		if (isUpsellItem) return quantityInBasketForRelatedProduct;
		// Basket item quantity minus upsells - to be displayed in basket
		if (showStandaloneQuantity) return standaloneQuantityInBasket;
		// Overall quantity - to be displayed everywhere outside of basket
		return itemInBasket?.quantity ?? 0;
	})();

	const bundlePrices = bundle?.bundlePrices;

	const { isDiscounted, basePrice, discountedPrice } = bundlePrices ?? {};

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle ?? null);

	const priceWithVat = isDiscounted
		? discountedPrice?.valueWithVat
		: basePrice?.valueWithVat;

	const [count, setCount] = useState(quantityInBasket);

	const addToBasketImmediately = async (
		quantity: number,
		callback?: () => void
	) => {
		const handler =
			quantity > 0 || isUpsellItem
				? handleOnChangeItemQuantity
				: handleOnRemoveFromBasket;

		await handler({
			quantity:
				// Quantity correction is relevant only for standalone items in basket
				quantity + (showStandaloneQuantity ? quantityOfRelatedProducts : 0),
			bundleId: String(bundle?.id),
			bundleMetaForAnalytics,
			userOrSystemBasketId,
			...(parentItemId && {
				relatedOnProductItems: {
					itemId: parentItemId,
					quantity,
				},
			}),
		});
		if (typeof callback === 'function') {
			callback();
		}
	};

	const addToBasket = useCallback(
		debounce((count, callback?: () => void) => {
			addToBasketImmediately(count, callback);
		}, 500),
		[bundle?.id, loginHash, currency]
	);

	const ceilToBaseQuantity = (value: number) => {
		const remainder = value % baseQuantity;
		if (!remainder) return value;
		return value - remainder + baseQuantity;
	};

	const onCountChange = (value: string, callback?: () => void) => {
		if (
			value?.length > 0 &&
			value?.split('')?.some((number: string) => Number.isNaN(parseInt(number)))
		) {
			return;
		} else if (value === '') {
			setCount(-1);
		} else if (
			!Number.isNaN(parseInt(value)) &&
			typeof availableCount === 'number' &&
			parseInt(value) > availableCount
		) {
			setCount(availableCount);
			addToBasket(availableCount, callback);
		} else if (
			!Number.isNaN(parseInt(value)) &&
			typeof availableCount === 'number' &&
			parseInt(value) < 0
		) {
			setCount(0);
			addToBasket(0, callback);
		} else {
			setCount(parseInt(value));
			addToBasket(parseInt(value), callback);
		}
	};

	const onBlur = (callback?: () => void) => {
		if (
			typeof availableCount === 'number' &&
			availableCount > 0 &&
			count === -1
		) {
			setCount(0);
			addToBasket(0, callback);
		}
		if (baseQuantity > 1) {
			setCount(ceilToBaseQuantity(count));
			addToBasket(ceilToBaseQuantity(count), callback);
		}
	};

	const onIncrement = (callback?: () => void) => {
		if (typeof availableCount === 'number' && count < availableCount) {
			setCount((count) => {
				addToBasket(count + 1 * baseQuantity, callback);
				return count + 1 * baseQuantity;
			});
		}
	};

	const onDecrement = (callback?: () => void) => {
		if (typeof availableCount === 'number' && count > 0) {
			setCount((count) => {
				addToBasket(count - 1 * baseQuantity, callback);
				return count - 1 * baseQuantity;
			});
		}
	};

	const onAddToBasket = async (callback?: () => void) => {
		const quantity = 1 * baseQuantity;
		setCount(quantity);

		if (
			shouldOpenCrossSellModal &&
			!isUpsellItem &&
			!userOrSystemBasketId &&
			!itemInBasket
		) {
			handleOnAddToBasket(
				{
					quantity,
					bundleId: String(bundle?.id),
					bundleMetaForAnalytics,
					bundleItem: bundle ?? undefined,
					availableCount,
					openCrossSellModal: true,
				},
				{
					onSettled: () => {
						if (typeof callback === 'function') {
							callback();
						}
					},
				}
			);
			return;
		}

		return await addToBasketImmediately(quantity, callback);
	};

	useEffect(() => {
		if (typeof quantityInBasket === 'number' && count !== quantityInBasket) {
			setCount(quantityInBasket);
		}
		// Adding "count" to the dependency array would cause break the functionality as "count" is synchronously updated
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [quantityInBasket]);

	return {
		count,
		onIncrement,
		onDecrement,
		onCountChange,
		onBlur,
		onAddToBasket,
		availableCount,
		quantityInBasket,
		bundlePriceWithVat: priceWithVat,
	};
};
