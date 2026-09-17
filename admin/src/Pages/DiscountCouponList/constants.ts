import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

const DiscountCouponListTableKeys = {
	ID: 'id',
	CODE: 'code',
	IS_REUSABLE: 'isReusable',
	TYPE: 'type',
	VALID_TO: 'validTo',
	IS_ACTIVE: 'isActive',
	CAN_BE_APPLIED: 'canBeApplied',
	LIMITATION_TYPE: 'limitationDefinition.limitationType',
	LIMITATION_TYPE_SUPPLIER: 'limitationDefinition_limitationType_supplier',
	IS_VISIBLE_ON_PRODUCT_DETAIL: 'isVisibleOnProductDetail',
};

const COLUMN_PROPERTIES = {
	[DiscountCouponListTableKeys.ID]: {
		filter: 'SearchId',
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
	[DiscountCouponListTableKeys.VALID_TO]: {
		filter: '',
		sorting: 'VALID_TO',
	},
	[DiscountCouponListTableKeys.IS_ACTIVE]: {
		filter: 'IsActive',
		sorting: 'IS_ACTIVE',
	},
	[DiscountCouponListTableKeys.IS_VISIBLE_ON_PRODUCT_DETAIL]: {
		filter: 'isVisibleOnProductDetail',
		sorting: '',
	},
	[DiscountCouponListTableKeys.CAN_BE_APPLIED]: {
		filter: 'CanBeApplied',
		sorting: '',
	},
	[DiscountCouponListTableKeys.LIMITATION_TYPE]: {
		filter: 'SearchLimitationType',
		sorting: '',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const discountCouponTypesTranslationMap = {
	[VinistoHelperDllEnumsDiscountCouponDiscountCouponType.AMOUNT]:
		'admin.couponDetail.type.amount',
	[VinistoHelperDllEnumsDiscountCouponDiscountCouponType.PERCENTAGE]:
		'admin.couponDetail.type.percentage',
};

export {
	DiscountCouponListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	discountCouponTypesTranslationMap,
};
