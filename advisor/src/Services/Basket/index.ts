import { ESHOP_URL } from '../constants';

const addToBasket = async (params: {
	bundleId: string;
	quantity: number;
	bundleMetaForAnalytics: {
		item_name: string;
		item_brand: string;
		price: number;
	};
}) => {
	window.parent.postMessage(params, ESHOP_URL);
};

const BasketService = {
	addToBasket,
};

export default BasketService;
