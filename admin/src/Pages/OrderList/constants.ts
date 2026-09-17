import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api';

import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	type PlatformIdType,
	VICOM_NUMERIC_CODE,
} from '@/shared';

export const PRICE_LESS = 'LESS';
export const PRICE_EQUALS = 'EQUALS';
export const PRICE_GREATER = 'GREATER';
export const PRICE_FILTER = {
	MIN: 0,
	MAX: Number.MAX_SAFE_INTEGER,
};

export const platformIdLabelMap: Record<PlatformIdType, string> = {
	[B2C_NUMERIC_CODE]: 'B2C',
	[B2B_NUMERIC_CODE]: 'B2B',
	[VICOM_NUMERIC_CODE]: 'EXT',
};

const getPlatformIdLabel = (
	platformId: PlatformIdType | number | null | undefined
) => {
	if (platformId === null || typeof platformId === 'undefined') return '';

	return platformIdLabelMap[Number(platformId) as PlatformIdType] ?? '';
};

const platformIdFilterOptions: [value: string, label: string][] = [
	...Object.entries(platformIdLabelMap).map(
		([value, label]) => [value, label] as [string, string]
	),
];
const platformIdFilterValues = platformIdFilterOptions.map(([value]) => value);

const OrderListTableKeys = {
	ID: 'id',
	PRICE: 'price',
	TIME: 'time',
	EMAIL: 'email',
	TRACKING_ID: 'trackingId',
	DELIVERY_TYPE: 'deliveryType',
	PAYMENT_TYPE: 'paymentType',
	STATE: 'state',
	PHONE: 'phone',
	COUNTRY_OF_SALE: 'countryOfSale',
	DELIVERY_ADDRESS: 'deliveryAddress',
	PLATFORM_ID: 'platformId',
};

const COLUMN_PROPERTIES = {
	[OrderListTableKeys.ID]: {
		sorting: 'ID',
	},
	[OrderListTableKeys.PRICE]: {
		sorting: 'PRICE',
	},
	[OrderListTableKeys.TIME]: {
		sorting: 'TIME',
	},
	[OrderListTableKeys.EMAIL]: {
		sorting: 'EMAIL',
		filter: 'UserEmail',
	},
	[OrderListTableKeys.TRACKING_ID]: {
		sorting: 'TRACKING_ID',
	},
	[OrderListTableKeys.DELIVERY_TYPE]: {
		sorting: 'DELIVERY_TYPE',
	},
	[OrderListTableKeys.PAYMENT_TYPE]: {
		sorting: 'PAYMENT_TYPE',
	},
	[OrderListTableKeys.STATE]: {
		filter: 'SearchStockingState',
		sorting: 'STATE',
	},
	[OrderListTableKeys.PHONE]: {
		filter: 'DeliveryPhone',
		sorting: '',
	},
	[OrderListTableKeys.COUNTRY_OF_SALE]: {
		filter: 'CountryOfSale',
		sorting: 'COUNTRY_OF_SALE',
	},
};

const SORTING_COLUMN_MAP = Object.fromEntries(
	Object.entries(COLUMN_PROPERTIES).map(([key, value]) => [key, value.sorting])
);

const DEFAULT_SORT = [
	{
		id: OrderListTableKeys.TIME,
		desc: true,
	},
];

const stateTranslationKeys = {
	[VinistoHelperDllEnumsOrderOrderState.NONE]: 'admin.orderList.state.none',
	[VinistoHelperDllEnumsOrderOrderState.CREATED]:
		'admin.orderList.state.created',
	[VinistoHelperDllEnumsOrderOrderState.PAID]: 'admin.orderList.state.paid',
	[VinistoHelperDllEnumsOrderOrderState.IN_WMS]: 'admin.orderList.state.inWms',
	[VinistoHelperDllEnumsOrderOrderState.WMS_ACCEPTED]:
		'admin.orderList.state.wmsAccepted',
	[VinistoHelperDllEnumsOrderOrderState.WMS_INCOMPLETE]:
		'admin.orderList.state.wmsIncomplete',
	[VinistoHelperDllEnumsOrderOrderState.WMS_READY]:
		'admin.orderList.state.wmsReady',
	[VinistoHelperDllEnumsOrderOrderState.SENT]: 'admin.orderList.state.sent',
	[VinistoHelperDllEnumsOrderOrderState.DELIVERED]:
		'admin.orderList.state.delivered',
	[VinistoHelperDllEnumsOrderOrderState.CANCELLED]:
		'admin.orderList.state.cancelled',
	[VinistoHelperDllEnumsOrderOrderState.RETURNED]:
		'admin.orderList.state.returned',
	[VinistoHelperDllEnumsOrderOrderState.REFUNDED]:
		'admin.orderList.state.refunded',
	[VinistoHelperDllEnumsOrderOrderState.REVERT_FINANCE_AND_FEES]:
		'admin.orderList.state.revertFinanceAndFees',
	[VinistoHelperDllEnumsOrderOrderState.RETURNING_GOODS]:
		'admin.orderList.state.returningGoods',
	[VinistoHelperDllEnumsOrderOrderState.LOSS_EVENT]:
		'admin.orderList.state.lossEvent',
	[VinistoHelperDllEnumsOrderOrderState.DONE]: 'admin.orderList.state.done',
};

export {
	OrderListTableKeys,
	SORTING_COLUMN_MAP,
	DEFAULT_SORT,
	stateTranslationKeys,
	getPlatformIdLabel,
	platformIdFilterOptions,
	platformIdFilterValues,
};
