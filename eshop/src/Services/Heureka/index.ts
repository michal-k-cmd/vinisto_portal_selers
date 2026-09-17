import {
	VinistoHelperDllEnumsCurrency,
	VinistoOrderDllModelsApiOrderOrder,
} from 'vinisto_api_client/src/api-types/order-api';
import { getDiscountPriceValues } from 'vinisto_shared/src/price/get-discount-prices';

declare global {
	interface Window {
		heureka?: any;
		ROIDataObject?: string;
	}
}

export const HeurekaPageType = {
	PRODUCT_DETAIL: 'product_detail',
	THANK_YOU: 'thank_you',
};

type HeurekaPageTypeType =
	(typeof HeurekaPageType)[keyof typeof HeurekaPageType];

const initHeureka = (page: HeurekaPageTypeType) => {
	if (typeof window === 'undefined') return null;
	if (!process.env.NEXT_PUBLIC_HEUREKA_API_KEY) return null;
	if (window.heureka) return window.heureka;

	(function (t: any, r: any, a: any, c: any, k: any, i: any, n?: any, g?: any) {
		t['ROIDataObject'] = k;
		t[k] =
			t[k] ||
			function () {
				// eslint-disable-next-line prefer-rest-params
				(t[k].q = t[k].q || []).push(arguments);
			};
		t[k].c = i;
		n = r.createElement(a);
		g = r.getElementsByTagName(a)[0];
		n.async = 1;
		n.src = c;
		if (g && g.parentNode) {
			g.parentNode.insertBefore(n, g);
		} else {
			r.head.appendChild(n);
		}
	})(
		window,
		document,
		'script',
		`//www.heureka.cz/ocm/sdk.js?version=2&page=${page}`,
		'heureka',
		'cz'
	);

	return window.heureka;
};

export const initHeurekaProductDetail = () => {
	return initHeureka(HeurekaPageType.PRODUCT_DETAIL);
};

export const initHeurekaThankYou = () => {
	return initHeureka(HeurekaPageType.THANK_YOU);
};

export const trackHeurekaOrder = (
	orderData: VinistoOrderDllModelsApiOrderOrder
) => {
	const apiKey = process.env.NEXT_PUBLIC_HEUREKA_API_KEY;

	if (!apiKey || !orderData) {
		return;
	}

	const heureka = initHeureka(HeurekaPageType.THANK_YOU);

	if (!heureka) {
		return;
	}

	heureka('authenticate', apiKey);
	heureka('set_order_id', orderData.orderNumber || '');

	let totalItemsPrice = 0;

	(orderData.orderItems || []).forEach((item) => {
		const bundle = item.bundle;
		const quantity = item.quantity || 1;

		const { discountedPriceWithoutVat } = getDiscountPriceValues({
			quantityInBasket: quantity,
			basePrice: bundle?.price,
			discountedPrice: bundle?.discountPrice,
		});

		const price = discountedPriceWithoutVat ?? bundle?.price?.value ?? 0;
		totalItemsPrice += price * quantity;

		heureka(
			'add_product',
			bundle?.id || '',
			bundle?.name || '',
			price,
			quantity
		);
	});

	heureka('set_total_vat', totalItemsPrice || 0);
	heureka(
		'set_currency',
		orderData.orderCurrency || VinistoHelperDllEnumsCurrency.CZK
	);
	heureka('send', 'Order');
};
