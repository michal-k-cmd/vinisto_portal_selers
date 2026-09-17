import { useContext, useMemo } from 'react';
import { BasketContext } from 'Services/BasketService';
import { useQuery } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { PACKAGING_BUNDLE_ID } from 'pages-spa/Basket/Components/Packaging/hooks';

import AddonsService from '@/addons';
import {
	ActionType,
	CountryCode,
	Currency,
	ValidateAddonsRequest,
} from '@/api-types/addons-api';
import { BasketItemType } from '@/api-types/basket-api';
import { giftAdapter, uxAdapter } from '@/index';

const useAddons = () => {
	const basketContext = useContext(BasketContext);
	const {
		countryOfSale,
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	//
	//const orderPrice = basketContext.basketState?.totalPriceWithVat ?? 0;
	const basketAddonsQueryRequest: ValidateAddonsRequest = useMemo(
		() => ({
			appliedCouponsIds:
				basketContext.basketState?.coupons?.map(
					(coupon) => coupon.couponId ?? ''
				) ?? [],
			// Using basket country / currency would not need to manually typecast and seems to be more logical,
			// but it seems to be causing bugs: switching country/currency with nice packing selected breaks the basket
			// (the currency is not being updated)
			countryOfSale: countryOfSale as unknown as CountryCode,
			currency: currency as unknown as Currency,
			items:
				basketContext.basketState?.items?.map((item) => ({
					itemId: item.itemId,
					quantity: item.quantity ?? 1,
					type: item.type ?? BasketItemType.Bundle,
				})) ?? [],
			orderPrice: basketContext.basketState?.totalPriceWithVat ?? 0,
			discountPriceWithVat:
				basketContext.basketState?.coupons?.reduce(
					(acc, coupon) => acc + (coupon.discountPriceWithVat ?? 0),
					0
				) ?? 0,
			// basketState?.addons?.reduce<Record<string, number>>((acc, addon) => {
			// 	acc[addon.addonId] = addon.quantity ?? 1;
			// 	return acc;
			// }, {}) ?? {},
		}),
		[
			basketContext.basketState?.coupons,
			basketContext.basketState?.items,
			basketContext.basketState?.totalPriceWithVat,
			countryOfSale,
			currency,
		]
	);

	const basketAddonsQuery = useQuery({
		queryKey: ['basket-addons', basketAddonsQueryRequest],
		queryFn: () => AddonsService.validate(basketAddonsQueryRequest),
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
			uxAddonsToAdd:
				data.addonsToAdd
					?.map(uxAdapter.fromApi)
					.filter((item) => item != null) ?? [],
			// This is neccessary for getting the nice packaging addon as the service addon query does return empty array for EUR/SK
			// Also, we need to keep actions, hence no mapping here
			packagingAddons: data.addonsToAdd?.filter((item) => {
				return item?.actions?.some(
					(action) =>
						action.actionType === ActionType.SetService &&
						'itemId' in action &&
						action.itemId === PACKAGING_BUNDLE_ID
				);
			}),
		}),
		keepPreviousData: true,
	});

	return {
		basketAddonsQuery,
	};
};

export default useAddons;
