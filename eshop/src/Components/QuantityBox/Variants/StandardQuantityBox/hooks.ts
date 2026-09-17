import { useContext, useEffect, useState } from 'react';
import { BasketContext } from 'Services/BasketService';
import { WarehouseContext } from 'Services/WarehouseService';
import { useFindBundleInBasket } from 'pages-spa/Bundle/hooks';
import { Bundle } from 'vinisto_api_client/src/domain/bundle';
import { getBundleMetaForAnalytics } from 'Services/BasketService/helpers';

export type UseStandardQuantityBoxMethods = ReturnType<
	typeof useStandardQuantityBox
>;

export const useStandardQuantityBox = (
	bundle: Bundle | null | undefined,
	shouldOpenCrossSellModal = true
) => {
	const { handleOnAddToBasket, handleOnChangeItemQuantity } =
		useContext(BasketContext);
	const { getQuantity } = useContext(WarehouseContext);
	const availableCount = getQuantity(bundle?.id ?? '');
	const [count, setCount] = useState(availableCount ? 1 : 0);

	const itemInBasket = useFindBundleInBasket({ bundleId: bundle?.id });

	const quantityInBasket = itemInBasket?.quantity ?? 0;

	const onCountChange = (value: string) => {
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
		} else if (
			!Number.isNaN(parseInt(value)) &&
			typeof availableCount === 'number' &&
			parseInt(value) < 1
		) {
			setCount(1);
		} else {
			setCount(parseInt(value));
		}
	};

	const onBlur = () => {
		if (
			typeof availableCount === 'number' &&
			availableCount > 0 &&
			count === -1
		) {
			setCount(1);
		}
	};

	const onIncrement = () => {
		if (typeof availableCount === 'number' && count < availableCount) {
			setCount((count) => count + 1);
		}
	};

	const onDecrement = () => {
		if (typeof availableCount === 'number' && count > 1) {
			setCount((count) => count - 1);
		}
	};

	const bundleMetaForAnalytics = getBundleMetaForAnalytics(bundle ?? null);

	const onAddToBasket = async () => {
		if (itemInBasket) {
			return await handleOnChangeItemQuantity({
				quantity: count + quantityInBasket,
				bundleId: String(bundle?.id),
				bundleMetaForAnalytics,
			});
		}
		return await handleOnAddToBasket({
			quantity: count,
			bundleId: String(bundle?.id),
			bundleMetaForAnalytics,
			bundleItem: bundle ?? undefined,
			availableCount,
			openCrossSellModal: shouldOpenCrossSellModal,
		});
	};

	useEffect(() => {
		if (
			typeof availableCount === 'number' &&
			availableCount > 0 &&
			count === 0
		) {
			setCount(1);
		}
		/* That would cause bad things to happen */
		/* eslint-disable-next-line react-hooks/exhaustive-deps */
	}, [availableCount]);

	return {
		count,
		onIncrement,
		onDecrement,
		onCountChange,
		onBlur,
		onAddToBasket,
		availableCount,
		quantityInBasket,
	};
};
