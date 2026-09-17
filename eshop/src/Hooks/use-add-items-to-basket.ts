'use client';

import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BasketContext } from 'Services/BasketService';
import { LocalizationContext } from 'Services/LocalizationService';
import { BundleIdAndQuantity } from 'Services/BasketService/interfaces';
import {
	VinistoHelperDllEnumsOrderOrderState,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderWithInvoice,
} from 'vinisto_api_client/src/api-types/order-api';

export const showBuyAgainButton = (
	order?:
		| VinistoOrderDllModelsApiOrderOrder
		| VinistoOrderDllModelsApiOrderOrderWithInvoice
) => {
	if (!order || !('orderItems' in order) || !order.orderItems?.length)
		return false;

	const orderState = order.state;

	if (
		orderState === VinistoHelperDllEnumsOrderOrderState.CANCELLED ||
		orderState === VinistoHelperDllEnumsOrderOrderState.DELIVERED ||
		orderState === VinistoHelperDllEnumsOrderOrderState.DONE ||
		orderState === VinistoHelperDllEnumsOrderOrderState.LOSS_EVENT ||
		orderState === VinistoHelperDllEnumsOrderOrderState.REFUNDED ||
		orderState === VinistoHelperDllEnumsOrderOrderState.RETURNED ||
		orderState === VinistoHelperDllEnumsOrderOrderState.RETURNING_GOODS ||
		orderState === VinistoHelperDllEnumsOrderOrderState.REVERT_FINANCE_AND_FEES
	) {
		return true;
	}
	return false;
};

const useAddItemsToBasket = () => {
	const { bulkUpdate } = useContext(BasketContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const router = useRouter();
	const isAddingItemsToBasketRef = useRef(false);
	const [isAddingItemsToBasket, setIsAddingItemsToBasket] = useState(false);

	const addItemsToBasket = async (items: BundleIdAndQuantity[]) => {
		if (isAddingItemsToBasketRef.current) return;

		isAddingItemsToBasketRef.current = true;
		setIsAddingItemsToBasket(true);

		try {
			await bulkUpdate(items);

			router.push(`/${t({ id: 'routes.cart.route' })}`);
		} catch {
			return;
		} finally {
			isAddingItemsToBasketRef.current = false;
			setIsAddingItemsToBasket(false);
		}
	};

	return { addItemsToBasket, isAddingItemsToBasket };
};

export default useAddItemsToBasket;
