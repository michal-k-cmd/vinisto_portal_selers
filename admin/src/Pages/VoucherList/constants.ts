const DiscountCouponListTableKeys = {
	ID: 'id',
	CODE: 'code',
	AMOUNT_VALUE: 'amount.value',
	AMOUNT_CURRENCY: 'amount.currency',
	VALID_FROM: 'validFrom',
	VALID_TO: 'validTo',
	IS_ACTIVE: 'isActive',
	CAN_BE_APPLIED: 'canBeApplied',
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
	[DiscountCouponListTableKeys.VALID_FROM]: {
		filter: '',
		sorting: 'VALID_FROM',
	},
	[DiscountCouponListTableKeys.VALID_TO]: {
		filter: '',
		sorting: 'VALID_TO',
	},
	[DiscountCouponListTableKeys.IS_ACTIVE]: {
		filter: 'IsActive',
		sorting: 'IS_ACTIVE',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export { DiscountCouponListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
