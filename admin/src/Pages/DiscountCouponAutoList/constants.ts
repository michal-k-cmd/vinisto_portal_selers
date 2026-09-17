import { VinistoHelperDllEnumsDiscountCouponDiscountCouponType } from '@/api-types/order-api';

const DiscountCouponAutoListTableKeys = {
	ID_COLUMN: 'id',
	NAME_COLUMN: 'name',
	TRIGGER_COLUMN: 'trigger',
	TYPE_COLUMN: 'discountType',
	DISCOUNT_VALUE_COLUMN: 'discountValue',
	CURRENCY_COLUMN: 'currency',
	PRICE_FROM_COLUMN: 'applicableFrom',
	LANGUAGE_COLUMN: 'language',
	VALID_FOR_COLUMN: 'expirationDays',
};

const COLUMN_PROPERTIES = {
	[DiscountCouponAutoListTableKeys.NAME_COLUMN]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[DiscountCouponAutoListTableKeys.TRIGGER_COLUMN]: {
		filter: 'SearchTrigger',
		sorting: 'TRIGGER',
	},
	[DiscountCouponAutoListTableKeys.TYPE_COLUMN]: {
		filter: 'SearchType',
		sorting: 'TYPE',
	},
	[DiscountCouponAutoListTableKeys.DISCOUNT_VALUE_COLUMN]: {
		filter: 'SearchDiscountValue',
		sorting: 'DISCOUNT_VALUE',
	},
	[DiscountCouponAutoListTableKeys.CURRENCY_COLUMN]: {
		filter: 'SearchCurrency',
		sorting: 'CURRENCY',
	},
	[DiscountCouponAutoListTableKeys.PRICE_FROM_COLUMN]: {
		filter: 'SearchApplicableFrom',
		sorting: 'APPLICABLE_FROM',
	},
	[DiscountCouponAutoListTableKeys.LANGUAGE_COLUMN]: {
		filter: 'SearchLanguage',
		sorting: 'LANGUAGE',
	},
	[DiscountCouponAutoListTableKeys.VALID_FOR_COLUMN]: {
		filter: 'SearchExpirationDays',
		sorting: 'EXPIRATION_DAYS',
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
	[VinistoHelperDllEnumsDiscountCouponDiscountCouponType.GIFT]:
		'admin.voucherList.voucher',
};

export {
	DiscountCouponAutoListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	discountCouponTypesTranslationMap,
};
