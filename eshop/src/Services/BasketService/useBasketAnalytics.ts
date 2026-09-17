import useAnalytics from 'Hooks/useAnalytics';
import { useCallback, useContext } from 'react';
import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { getLocalizedCurrency } from 'vinisto_shared/src/price/get-localized-currency';
import { TrackEvent } from 'Services/FacebookPixel';

import { BundleMetaForAnalytics } from './interfaces';

const useBasketAnalytics = () => {
	const {
		activeCurrency: { currency },
	} = useContext(LocalizationContext);
	const { sendEvent: sendAnalyticsEvent } = useAnalytics();

	const getBundleGoogleAnalyticsData = useCallback(
		(params: {
			bundleId: string;
			quantity: number;
			bundleMeta: BundleMetaForAnalytics;
		}) => {
			const { bundleId, quantity, bundleMeta } = params;

			return {
				item_id: bundleId,
				item_name: bundleMeta.item_name,
				item_brand: bundleMeta.item_brand,
				price: bundleMeta.price,
				currency: getLocalizedCurrency(currency),
				quantity,
			};
		},
		[currency]
	);

	const sendAddToCartAnalytics = useCallback(
		async (
			params: {
				bundleId: string;
				quantity: number;
				bundleMeta: BundleMetaForAnalytics;
			}[]
		) => {
			params.forEach(async (param) => {
				const { bundleId, quantity, bundleMeta } = param;

				const bundleData = await getBundleGoogleAnalyticsData({
					bundleId,
					quantity,
					bundleMeta,
				});
				const eventValue =
					Math.round(
						(bundleData.price * bundleData.quantity + Number.EPSILON) * 100
					) / 100 || 0;

				TrackEvent('track', 'AddToCart', {
					content_type: 'product',
					contents: [
						{
							id: bundleData.item_id,
							quantity: bundleData.quantity,
						},
					],
					value: eventValue,
					content_name: bundleData.item_name,
					currency: bundleData.currency,
				});

				sendAnalyticsEvent(GA_EVENT.ADD_TO_CART, {
					items: [bundleData],
					currency: bundleData.currency,
					value: eventValue,
				});
			});
		},
		[getBundleGoogleAnalyticsData, sendAnalyticsEvent]
	);

	const sendRemoveFromCartAnalytics = useCallback(
		(
			params: {
				bundleId: string;
				quantity: number;
				bundleMeta: BundleMetaForAnalytics;
			}[]
		) => {
			params.forEach(async (param) => {
				const { bundleId, quantity, bundleMeta } = param;

				const bundleData = await getBundleGoogleAnalyticsData({
					bundleId,
					quantity,
					bundleMeta,
				});
				const eventValue =
					Math.round(
						(bundleData.price * bundleData.quantity + Number.EPSILON) * 100
					) / 100 || 0;
				sendAnalyticsEvent(GA_EVENT.REMOVE_FROM_CART, {
					items: [bundleData],
					currency: bundleData.currency,
					value: eventValue,
				});
			});
		},
		[getBundleGoogleAnalyticsData, sendAnalyticsEvent]
	);

	return {
		getBundleGoogleAnalyticsData,
		sendAddToCartAnalytics,
		sendRemoveFromCartAnalytics,
	};
};

export default useBasketAnalytics;
