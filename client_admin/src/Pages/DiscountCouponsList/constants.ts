export const LIST_API_ENDPOINT = 'order-api/discount-coupons';

const DiscountCouponListTableKeys = {
	ID: 'id',
	CODE: 'code',
	IS_REUSABLE: 'isReusable',
	TYPE: 'discountCouponType',
	DISCOUNT_VALUE: 'amountDiscount',
	VALID_TO: 'validTo',
	CREATION_DATE: 'createdAt',
	IS_ACTIVE: 'isActive',
	CAN_BE_APPLIED: 'canBeApplied',
	APPLICABLE_VALUE_FROM: 'allowedFrom',
	LIMITATION_TYPE: 'SearchLimitationType',
} as const;

const COLUMN_PROPERTIES = {
	[DiscountCouponListTableKeys.ID]: {
		filter: '',
		sorting: 'ID',
	},
	[DiscountCouponListTableKeys.CODE]: {
		filter: 'SearchCode',
		sorting: 'CODE',
	},
	[DiscountCouponListTableKeys.IS_REUSABLE]: {
		filter: 'IsReusable',
		sorting: 'IS_REUSABLE',
	},
	[DiscountCouponListTableKeys.TYPE]: {
		filter: 'SearchDiscountCouponType',
		sorting: 'DISCOUNT_COUPON_TYPE',
	},
	[DiscountCouponListTableKeys.DISCOUNT_VALUE]: {
		filter: '',
		sorting: 'DISCOUNT_VALUE',
	},
	[DiscountCouponListTableKeys.CREATION_DATE]: {
		filter: '',
		sorting: 'CREATION_DATE',
	},
	[DiscountCouponListTableKeys.VALID_TO]: {
		filter: '',
		sorting: 'EXPIRATION_DATE',
	},
	[DiscountCouponListTableKeys.IS_ACTIVE]: {
		filter: 'IsActive',
		sorting: 'IS_ACTIVE',
	},
	[DiscountCouponListTableKeys.CAN_BE_APPLIED]: {
		filter: 'CanBeApplied',
		sorting: '',
	},
	[DiscountCouponListTableKeys.APPLICABLE_VALUE_FROM]: {
		filter: '',
		sorting: 'APPLICABLE_VALUE_FROM',
	},
	[DiscountCouponListTableKeys.LIMITATION_TYPE]: {
		filter: 'SearchLimitationType',
		sorting: '',
	},
} as const;

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export const CRUD_MODE = {
	CREATE: 'CREATE',
	UPDATE: 'UPDATE',
} as const;

export { DiscountCouponListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
