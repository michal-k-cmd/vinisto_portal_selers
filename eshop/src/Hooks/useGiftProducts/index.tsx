import { GiftPurchaseProps } from 'vinisto_ui/src/components/gift-purchase/types';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext, useMemo } from 'react';
import { PURCHASE_GIFT_TYPES } from 'vinisto_ui/src/components/gift-progress-bar/types';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { GiftType } from 'Hooks/useGiftProducts/types';
import createCurrencyValue from 'Helpers/createCurrencyValue';
import { GiftProductProps } from 'vinisto_ui/src/components/gift-product/types';
import type { AddonGift } from 'vinisto_api_client/src/domain/addons/index';
import { useQueries } from '@tanstack/react-query';
import { BundleService } from 'vinisto_api_client';

import { Bundle } from '@/domain/bundle';

function useBundlesByIds(bundleIds: string[]): Bundle[] {
	const queries = useQueries({
		queries: bundleIds.map((bundleId) => ({
			queryKey: ['gift-bundle', bundleId],
			// TO CONSIDER: This is a problematic function, as it uses adapter, but does not pass customer price level nor platformId
			// Consider replacing, or calling the adapter afterwards (but is is likely being used in other apps)
			queryFn: () => BundleService.getBundleById(bundleId),
			enabled: Boolean(bundleId),
		})),
	});

	return useMemo(
		() =>
			queries
				.map((q) => q.data)
				.filter((bundle): bundle is Bundle => bundle !== undefined),
		[queries]
	);
}

const useGiftsOrderPriceFrom = (
	minimalPriceForFreeDelivery: number,
	totalMoneySpent: number,
	assignedGifts?: AddonGift[],
	possibleGifts?: AddonGift[],
	isPriceWithoutVat = false
): GiftPurchaseProps[] => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const assignedGiftsProducts = useGiftPurchaseProps(
		assignedGifts,
		GiftType.ASSIGNED_GIFT
	);
	const possibleGiftsProducts = useGiftPurchaseProps(
		possibleGifts,
		GiftType.POSSIBLE_GIFT
	);

	const isDeliveryFree = totalMoneySpent - minimalPriceForFreeDelivery > 0;

	const deliveryFreeMark: GiftPurchaseProps[] = [
		{
			isFulfilled: isDeliveryFree,
			type: PURCHASE_GIFT_TYPES.transport,
			//@ts-expect-error if this error happens, specified translation key has no value.
			text: !isDeliveryFree
				? t(
						{ id: 'giftInfo.description.deliveryFree' },
						{
							orderPriceLimitFrom: `${createCurrencyValue(
								minimalPriceForFreeDelivery - totalMoneySpent
							)} ${localizationContext.activeCurrency.title}${
								isPriceWithoutVat
									? ` ${t({ id: 'basket.priceWithoutVAT' })}`
									: ''
							}`,
						}
				  )
				: t({ id: 'giftInfo.description.deliveryFree.complete' }),
			orderPriceLimitFrom: minimalPriceForFreeDelivery,
		},
	];

	function useGiftPurchaseProps(
		gifts: AddonGift[] | undefined,
		giftType: GiftType
	): GiftPurchaseProps[] {
		const bundleIds = useMemo(
			() =>
				gifts?.flatMap((gift) =>
					Array.isArray(gift.bundleIds) ? gift.bundleIds : []
				) ?? [],
			[gifts]
		);

		const bundles = useBundlesByIds(bundleIds);

		return (gifts ?? []).map((gift) => {
			const bundle =
				bundles.find((b) => gift.bundleIds?.includes(b.id)) ?? undefined;
			const giftName = getLocalizedValue(bundle?.name);

			return {
				isFulfilled: giftType === GiftType.ASSIGNED_GIFT,
				type: PURCHASE_GIFT_TYPES.bundle,
				imageUrl: bundle?.images?.[0]?.domainUrls?.thumb_64x80 ?? '',
				text:
					(giftType === GiftType.ASSIGNED_GIFT
						? giftName
						: `${t(
								{ id: 'giftInfo.description' },
								{
									orderPriceLimitFrom: `${createCurrencyValue(
										gift.leftToSpent ?? 0
									)} ${localizationContext.activeCurrency.title}`,
								}
						  )} ${giftName}`
					)?.toString() ?? '',
				orderPriceLimitFrom: gift.orderPriceLimitFrom ?? 0,
			};
		});
	}

	const progressMarks = [
		...deliveryFreeMark,
		...assignedGiftsProducts,
		...possibleGiftsProducts,
	];

	return progressMarks.sort(
		(a, b) => (a.orderPriceLimitFrom ?? 0) - (b.orderPriceLimitFrom ?? 0)
	);
};

const useGiftsForBundle = (addonGifts?: AddonGift[]): GiftProductProps[] => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const getLocalizedValue = useLocalizedValue();

	const bundleIds = useMemo(
		() =>
			addonGifts?.flatMap((gift) =>
				Array.isArray(gift.bundleIds) ? gift.bundleIds : []
			) ?? [],
		[addonGifts]
	);

	const bundles = useBundlesByIds(bundleIds);

	return useMemo(
		() =>
			bundles.map((bundle) => {
				const giftName = getLocalizedValue(bundle.name);
				return {
					imageUrl: bundle.images?.[0]?.domainUrls?.thumb_64x80 ?? '',
					bundleName:
						t(
							{ id: 'giftInfo.description.productGift' },
							{ value: giftName }
						)?.toString() ?? '',
				};
			}),
		[bundles, getLocalizedValue, t]
	);
};

export { useGiftsOrderPriceFrom, useGiftsForBundle };
