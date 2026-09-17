const PaymentListTableKeys = {
	ID: 'id',
	ORDER: 'order',
	NAME: 'name',
	PAYMENT_TYPE: 'paymentType',
	IS_ACTIVE: 'isActive',
	PLATFORM: 'allowedOnPlatforms',
};

const COLUMN_PROPERTIES = {
	[PaymentListTableKeys.ID]: {
		filter: 'SearchId',
		sorting: 'ID',
	},
	[PaymentListTableKeys.ORDER]: {
		filter: 'SearchOrder',
		sorting: 'ORDER',
	},
	[PaymentListTableKeys.NAME]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[PaymentListTableKeys.PAYMENT_TYPE]: {
		filter: 'PaymentType',
		sorting: 'PAYMENT_TYPE',
	},
	[PaymentListTableKeys.IS_ACTIVE]: {
		filter: 'IsActive',
		sorting: 'IS_ACTIVE',
	},
	//[PaymentListTableKeys.PLATFORM]: {
	//	filter: 'PlatformId',
	//	sorting: '',
	//},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

export { PaymentListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
