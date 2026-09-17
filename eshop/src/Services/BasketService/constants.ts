import { AddonType } from '@/api-types/addons-api';

// NOTE: These are legacy constants and should be removed when the basket refactor is completed.
export const NOT_ENOUGH_ITEMS_IN_WAREHOUSE_ERROR = 'WarehouseNotEnoughItem';
export const COUPON_USED_ERROR = 'DiscountCouponUsed';

export const WS_FALLBACK_TIMEOUT = 750;

export const BASKET_REFRESH_INTERVAL_IN_MINUTES = 5;

export const FOR_LATER_BASKET_NAME = '__FOR_LATER_SYSTEM_BASKET__';

export const AddonTypes = {
	[AddonType.None]: 0,
	[AddonType.Gift]: 1,
	[AddonType.Service]: 2,
	[AddonType.Upsell]: 3,
	[AddonType.SubscriptionMonth]: 4,
	[AddonType.SubscriptionYear]: 5,
	[AddonType.Ux]: 6,
} as const;

export const ADDITIONAL_PERCENTAGE_DISCOUNT_VALUES = [0, 2, 3, 5];
export const MAX_ADDITIONAL_PERCENTAGE_DISCOUNT_FOR_MERCHANT = 3;
