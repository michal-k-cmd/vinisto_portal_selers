const UserListListTableKeys = {
	ID: 'id',
	EMAIL: 'email',
	REGISTRATION_COUNTRY: 'registrationCountry',
	CREATED_AT: 'createdAt',
	LAST_LOGIN_TIME: 'lastLoginTime',
	IS_IN_SUPPLIER: 'isSupplier',
	IS_SUPER_ADMIN: 'isSuperAdmin',
	HAS_PERMISSION: 'HasPermission',
	// Company (b2b customer):
	COMPANY: 'company',
	ICO: 'billingAddress.ico',
	COMPANY_EMAIL: 'companyEmail',
	PRICE_LEVEL: 'priceLevel',
	MERCHANT_ID: 'merchantId',
	STATE: 'state',
	CREDIT: 'credit',
	CREDIBILITY: 'credibility',
	ACTIONS: 'actions',
};

const COLUMN_PROPERTIES = {
	[UserListListTableKeys.ID]: {
		filter: 'SearchId',
		sorting: 'ID',
	},
	[UserListListTableKeys.EMAIL]: {
		filter: 'SearchEmail',
		sorting: 'EMAIL',
	},
	[UserListListTableKeys.CREATED_AT]: {
		filter: '',
		sorting: 'CREATED_AT',
	},
	[UserListListTableKeys.LAST_LOGIN_TIME]: {
		filter: '',
		sorting: 'LAST_LOGIN_TIME',
	},
	[UserListListTableKeys.IS_IN_SUPPLIER]: {
		filter: 'SearchIsSupplier',
		sorting: 'IS_IN_SUPPLIER',
	},
	[UserListListTableKeys.IS_SUPER_ADMIN]: {
		filter: '',
		sorting: 'IS_SUPER_ADMIN',
	},
	[UserListListTableKeys.REGISTRATION_COUNTRY]: {
		filter: 'RegistrationCountry',
		sorting: '',
	},
	[UserListListTableKeys.ICO]: {
		filter: 'SearchByCompanyIco',
		sorting: '',
	},
	[UserListListTableKeys.COMPANY]: {
		filter: 'SearchByCompanyName',
		sorting: 'COMPANY_NAME',
	},
	[UserListListTableKeys.COMPANY_EMAIL]: {
		filter: 'SearchByCompanyEmail',
		sorting: '',
	},
	[UserListListTableKeys.MERCHANT_ID]: {
		filter: 'SearchCompaniesByMerchantId',
		sorting: '',
	},
	[UserListListTableKeys.STATE]: {
		filter: 'SearchByUserState',
		sorting: '',
	},
};

const FILTER_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.filter])
);

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

//change sorting to is super admin
const DEFAULT_SORT = [
	{
		id: UserListListTableKeys.COMPANY,
		desc: false,
	},
];

export {
	UserListListTableKeys,
	FILTER_COLUMN_MAP,
	SORTING_COLUMN_MAP,
	DEFAULT_SORT,
};
