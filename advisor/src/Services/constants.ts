const location = document.location;
const isSlovak = location.hostname.includes('.sk');

const API_URL = isSlovak
	? import.meta.env.VITE_APP_API_URI_SK
	: import.meta.env.VITE_APP_API_URI;
const ESHOP_URL = isSlovak
	? import.meta.env.VITE_APP_ESHOP_URI_SK
	: import.meta.env.VITE_APP_ESHOP_URI;

const PRODUCT_API_URI = `${API_URL}/product-api`;
const BASKET_API_URI = `${API_URL}/basket-api`;

const BUNDLE_URI = `${PRODUCT_API_URI}/bundles`;
const BASKET_URI = `${BASKET_API_URI}/basket`;

export { API_URL, ESHOP_URL, BUNDLE_URI, BASKET_URI };
