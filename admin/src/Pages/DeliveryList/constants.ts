import { createColumnMaps } from 'Components/AdminTable/helpers';

const DeliveryListTableKeys = {
	ID: 'id',
	ORDER: 'order',
	NAME: 'name',
	DESCRIPTION: 'description',
	PRICE: 'prices',
	DELIVERY_TYPE: 'deliveryType',
	PAYMENTS: 'payments',
	IS_ACTIVE: 'isActive',
	MIN_ALLOWED_WEIGHT: 'minAllowedWeight',
	MAX_ALLOWED_WEIGHT: 'maxAllowedWeight',
	PLATFORM: 'allowedOnPlatforms',
};

const COLUMN_PROPERTIES = {
	[DeliveryListTableKeys.ID]: {
		filter: '',
		sorting: 'ID',
	},
	[DeliveryListTableKeys.ORDER]: {
		filter: '',
		sorting: 'ORDER',
	},
	[DeliveryListTableKeys.NAME]: {
		filter: 'SearchName',
		sorting: 'NAME',
	},
	[DeliveryListTableKeys.DELIVERY_TYPE]: {
		filter: 'DeliveryType',
		sorting: 'DELIVERY_TYPE',
	},
	[DeliveryListTableKeys.IS_ACTIVE]: {
		filter: 'isActive',
		sorting: 'IS_ACTIVE',
	},
	[DeliveryListTableKeys.PLATFORM]: {
		filter: 'PlatformId',
		sorting: '',
	},
};

const {
	filterColumnMap: FILTER_COLUMN_MAP,
	sortingColumnMap: SORTING_COLUMN_MAP,
} = createColumnMaps(COLUMN_PROPERTIES);

export { DeliveryListTableKeys, FILTER_COLUMN_MAP, SORTING_COLUMN_MAP };
