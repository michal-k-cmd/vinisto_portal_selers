'use client';

import { GiftPurchaseListView } from 'vinisto_ui';
import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import useCreateGiftMarks from 'vinisto_ui/src/components/gift-progress-bar/hooks';
import { BasketContext } from 'Services/BasketService';
import {
	useGiftsForBundle,
	useGiftsOrderPriceFrom,
} from 'Hooks/useGiftProducts';
import { useQuery } from '@tanstack/react-query';
import useAddons from 'Hooks/useAddons';
import { Gift } from 'vinisto_ui/src/components/gift-progress-bar/types';
import { GiftRuleType } from 'vinisto_ui/src/components/icons/interfaces';
import { useIsB2b } from 'Services/PlatformService';

import styles from './styles.module.css';

import { giftAdapter } from '@/index';
import AddonsService from '@/addons';
import { AddonType } from '@/api-types/addons-api';
import { AddonGift, isAddonGift } from '@/domain/addons';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

interface GiftSectionProps {
	bundleId: string;
}

function mapAddonGiftsToGiftMarks(addonGifts: AddonGift[] | undefined): Gift[] {
	return (addonGifts ?? []).map((addonGift) => ({
		leftToSpent: addonGift.leftToSpent ?? 0,
		orderPriceLimitFrom: addonGift.orderPriceLimitFrom ?? 0,
		isGift: false,
		ruleType: GiftRuleType.GIFT_ORDER_PRICE_FROM,
	}));
}

const GiftSection = ({ bundleId }: GiftSectionProps) => {
	const isB2b = useIsB2b();
	const platformId = isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE;
	const {
		activeCurrency: { currency },
		countryOfSale,
		useFormatMessage,
	} = useContext(LocalizationContext);
	const t = useFormatMessage();
	const { basketState, minimalPriceForFreeDelivery } =
		useContext(BasketContext);
	const basketPriceForDelivery = isB2b
		? basketState?.basketPriceForDelivery ?? 0
		: basketState?.basketPriceWithVatForDelivery ?? 0;

	const giftsForBundleQuery = useQuery({
		queryKey: [
			'addon-gifts',
			bundleId,
			{ currency, countryOfSale, platformId },
		],
		queryFn: () => AddonsService.getGiftsForBundle(bundleId, AddonType.Gift),
		select: (data) =>
			data
				.map(giftAdapter.fromApi)
				.filter(isAddonGift)
				.filter((gift) => gift.availableOnPlatform === platformId),
	});

	const giftsForDisplayOnProductDetail = giftsForBundleQuery.data?.filter(
		(gift) => gift.isVisibleOnDetail
	);

	const gifts_for_bundle_title = `${t({ id: 'giftInfo.heading.productGift' })}`;
	const gifts_for_bundle = useGiftsForBundle(giftsForDisplayOnProductDetail);

	const { basketAddonsQuery: addonsQuery } = useAddons();

	const assignedGifts = addonsQuery.data?.addonsToAdd?.filter(
		(g): g is AddonGift => g != null
	);
	const possibleGifts = addonsQuery.data?.possibleAddons?.filter(
		(g): g is AddonGift => g != null && g.isVisibleOnDetail === true
	);

	const giftPurchaseListViewProducts = useGiftsOrderPriceFrom(
		minimalPriceForFreeDelivery,
		basketPriceForDelivery,
		assignedGifts,
		possibleGifts,
		isB2b
	);

	const GiftProgressBarMarks = useCreateGiftMarks({
		minimalPriceForFreeDelivery,
		currency: currency,
		totalMoneySpent: basketPriceForDelivery,
		assignedGifts: mapAddonGiftsToGiftMarks(assignedGifts) ?? [],
		possibleGifts: mapAddonGiftsToGiftMarks(possibleGifts),
	});

	return (
		<div
			className={cx(styles.component, {
				[styles.withMinHeight]: !isB2b,
			})}
		>
			<GiftPurchaseListView
				giftProgressBarProps={GiftProgressBarMarks}
				translations={{
					title: t({ id: 'bundle.giftsTitle' })?.toString() ?? '',
				}}
				giftPurchaseProps={giftPurchaseListViewProducts}
				giftProductsProps={{
					giftProducts: gifts_for_bundle,
					translations: { title: gifts_for_bundle_title },
				}}
			/>
		</div>
	);
};

export default GiftSection;
