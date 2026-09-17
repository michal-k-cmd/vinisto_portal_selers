import { GA_EVENT } from 'Hooks/useAnalytics/constants';
import { GaItem } from 'Hooks/useAnalytics/types';
import { TrackEvent } from 'Services/FacebookPixel';
import { useEffect } from 'react';
import useAnalytics from 'Hooks/useAnalytics';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import { initHeurekaProductDetail } from 'Services/Heureka';

import { BundleMeta } from '../interfaces';

import { Bundle } from '@/domain/bundle';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoProductDllModelsApiCategoryCategory,
} from '@/api-types/product-api';

const useSendAnalytics = ({
	bundle,
	bundleMeta,
	isCategoriesDataLoading,
	categoriesData,
	currency,
	quantity,
}: {
	bundle: Bundle;
	bundleMeta: BundleMeta;
	isCategoriesDataLoading: boolean;
	categoriesData: VinistoProductDllModelsApiCategoryCategory[] | undefined;
	currency: VinistoHelperDllEnumsCurrency;
	quantity: number;
}) => {
	const { sendEvent: sendAnalyticsEvent } = useAnalytics();

	useEffect(() => {
		initHeurekaProductDetail();
	}, []);

	useEffect(() => {
		if (!bundle.id || isCategoriesDataLoading) return;

		const {
			isDiscounted,
			basePrice,
			discountedPrice,
			discountDifferenceAsAmount,
		} = bundle.bundlePrices;

		const price =
			(isDiscounted ? discountedPrice?.value : basePrice?.value) ?? 0;
		const eventValue =
			Math.round((price * quantity + Number.EPSILON) * 100) / 100 || 0;

		TrackEvent('track', 'ViewContent', {
			content_type: 'product',
			content_ids: [bundle?.id],
			content_category: categoriesData && (categoriesData[0]?.name ?? ''),
			value: (isDiscounted ? discountedPrice?.value : basePrice?.value) ?? 0,
			content_name: bundleMeta.bundleName,
			currency,
		});

		const gaItems: GaItem[] = [
			{
				item_category:
					getLocalizedValue(categoriesData && categoriesData[0]?.name) ?? '',
				discount: discountDifferenceAsAmount,
				index: 0,
				item_id: bundle.id,
				item_name: bundleMeta.bundleName,
				price,
				quantity,
			},
		];

		sendAnalyticsEvent(GA_EVENT.VIEW_ITEM, {
			currency,
			value: eventValue,
			items: gaItems,
		});
	}, [
		bundle,
		sendAnalyticsEvent,
		categoriesData,
		isCategoriesDataLoading,
		currency,
		bundleMeta.bundleName,
		quantity,
	]);
};

export default useSendAnalytics;
