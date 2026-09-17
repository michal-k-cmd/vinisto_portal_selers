export enum COUPON_TYPE {
	AMOUNT = 'AMOUNT',
	PERCENTAGE = 'PERCENTAGE',
}

export const LIMITATION_TYPE = {
	NO_LIMITATION: 'NO_LIMITATION',
	CATEGORY_LIMITATION: 'CATEGORY_LIMITATION',
	SPECIFICATION_LIMITATION: 'SPECIFICATION_LIMITATION',
	SUPPLIER_LIMITATION: 'SUPPLIER_LIMITATION',
} as const;

export const COUPON_CREATION_ACTION_TYPE = {
	MANUAL: 'MANUAL',
	NEW_USER_REGISTRATION: 'NEW_USER_REGISTRATION',
	NEXT_ORDER: 'NEXT_ORDER',
} as const;

export const LIMITATION_TYPE_TRANSLATION_MAP = {
	NO_LIMITATION: 'admin.header.coupon.limitationType.none',
	CATEGORY_LIMITATION: 'admin.header.coupon.limitationType.category',
	SPECIFICATION_LIMITATION: 'admin.header.coupon.limitationType.specification',
	SUPPLIER_LIMITATION: 'admin.header.coupon.limitationType.supplier',
};

export const COUPON_LIMITATION_OPTIONS = [
	{
		label: 'admin.header.coupon.limitationType.none',
		value: LIMITATION_TYPE.NO_LIMITATION,
	},
	{
		label: 'admin.header.coupon.limitationType.category',
		value: LIMITATION_TYPE.CATEGORY_LIMITATION,
	},
	{
		label: 'admin.header.coupon.limitationType.specification',
		value: LIMITATION_TYPE.SPECIFICATION_LIMITATION,
	},
	{
		label: 'admin.header.coupon.limitationType.supplier',
		value: LIMITATION_TYPE.SUPPLIER_LIMITATION,
	},
];

export const COUPON_REUSABILITY_OPTIONS = [
	{
		value: 'false',
		label: 'admin.header.coupon.couponType.oneTime',
	},
	{
		value: 'true',
		label: 'admin.header.coupon.couponType.reusable',
	},
];
