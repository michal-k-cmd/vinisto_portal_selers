export const IS_B2B = 'isB2b';
export const CUSTOMER_ID = 'customerId';
export const REQUESTED_BASKET_ID = 'requestedBasketId';
export const BUILD_BASE_URL = process.env.NEXT_PUBLIC_BASE_URI;

export const IS_B2B_FORCED_BY_ENV =
	process.env.NEXT_PUBLIC_FORCE_B2B === 'true';
