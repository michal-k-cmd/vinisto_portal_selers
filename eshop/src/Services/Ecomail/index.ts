import api from 'vinisto_api_client/src/api';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';

import { ecomailBasketItemType, ecomailEventType } from './types';

import { BasketItem } from '@/api-types/basket-api';
import { Bundle } from '@/domain/bundle';

const ECOMAIL_ENDPOINT = 'services-api/ecomail';

export type TrackEventType = 'Basket';

export const TrackBasket = (
	email: string,
	bundles:
		| (BasketItem & {
				bundle: Bundle | undefined;
		  })[]
		| null
) => {
	const products: ecomailBasketItemType[] =
		bundles
			?.filter((item) => item?.bundle)
			?.map((item) => {
				const images = item?.bundle?.images ?? [];
				const firstImage = images[0]?.domainUrls?.thumb_208x240 || '';
				const price = item.discountPriceWithVat ?? item.priceWithVat ?? 0;
				return {
					productId: item.bundle?.id ?? '',
					price: Math.round(price),
					img_url: firstImage || '',
					url: getLocalizedValue(item.bundle?.url),
					name: getLocalizedValue(item.bundle?.name),
					description: getLocalizedValue(item.bundle?.description).substring(
						0,
						100
					),
				};
			}) ?? [];

	const data = {
		email: email ?? '',
		category: 'ue',
		action: 'Basket',
		label: 'Basket',
		value: JSON.stringify({
			data: {
				data: {
					action: 'Basket',
					products: products ?? [],
				},
			},
		}),
	};
	sendEcomailRequest(data);
};

const sendEcomailRequest = async (data: ecomailEventType) => {
	return api.post(ECOMAIL_ENDPOINT + '/add-event/', undefined, data);
};

export const EcomailService = {
	TrackBasket,
};
