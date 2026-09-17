import { IQueryArgument } from 'Services/ApiService/interfaces';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import {
	VinistoHelperDllBaseError,
	VinistoHelperDllEnumsBillingBillingState,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsLanguage,
	VinistoHelperDllEnumsOrderDeliveryBaseType,
	VinistoHelperDllEnumsOrderDeliveryType,
	VinistoHelperDllEnumsVatRate,
	VinistoOrderDllModelsApiBillingBundle,
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderStateChangeRecord,
} from 'vinisto_api_client/src/api-types/order-api/';

import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

interface Price {
	currency: VinistoHelperDllEnumsCurrency;
	type: VinistoHelperDllEnumsPriceLevel;
	validFrom: number; //TODO: dayjs object
	validTo: number; //TODO: dayjs object
	value: number;
	valueWithVat: number;
	vat: VinistoHelperDllEnumsVatRate;
	vatValue: number;
}

interface Unit {
	language: VinistoHelperDllEnumsLanguage;
	value: string;
}

interface PercentageDiscountCoupon {
	id: string;
	allowedFrom?: Price;
	canBeApplied: boolean;
	code: string;
	discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	validTo: number; //TODO: dayjs object
	isActive: boolean;
	isReusable: boolean;
	isUsed: boolean;
	order: any; //TODO: order object
	percentageDiscount: number;
}

interface AmountDiscountCoupon {
	id: string;
	allowedFrom: Price;
	amountDiscount: Price;
	canBeApplied: boolean;
	code: string;
	discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	validTo: number; //TODO: dayjs object
	isActive: boolean;
	isreuseable: boolean;
	isUsed: boolean;
	order: any; //TODO: order object
	unit: Unit;
}

type DiscountCoupon = PercentageDiscountCoupon | AmountDiscountCoupon;

interface Delivery {
	id: string;
	name?: LangValuePair[];
	description?: LangValuePair[];
	isActive?: boolean;
	deliveryTime?: number;
	minAllowedWeight?: number;
	maxAllowedWeight?: number;
	deliveryType: VinistoHelperDllEnumsOrderDeliveryType | undefined;
	deliveryBaseType?: VinistoHelperDllEnumsOrderDeliveryBaseType;
	deliveryCode?: string | null;
	trackingUrl?: string | null;
	order?: number;
	costs?: number | null;
	isForStocking?: boolean;
	isForCustomerDelivery?: boolean;
}

interface DeliveryListQueryArgument extends IQueryArgument {
	key:
		| 'SearchName'
		| 'AllowedWeight'
		| 'AllowedCountry'
		| 'DeliveryType'
		| 'IsActive'
		| 'SortingColumn'
		| 'IsSortingDescending'
		| 'IsSortingDescending'
		| 'Limit'
		| 'Offset'
		| 'IsForStocking'
		| 'IsForCustomerDelivery'
		| 'IsCache';
}

interface GetOrdersWithDiscountCodeQueryArgument extends IQueryArgument {
	key: 'UserLoginHash' | 'discountCouponId';
}

interface Billing {
	id: string;
	billingNumber: string;
	invoiceNumber: string;
	timeFrom?: Date;
	timeTo?: Date;
	createdAt: Date;
	supplierId: string;
	state?: VinistoHelperDllEnumsBillingBillingState;
	totalSum: number;
	feeRecords: string[];
	billingPdf: string;
	invoicePdf: string;
	bundles: VinistoOrderDllModelsApiBillingBundle[];
	supplierName: string;
}

interface BillingListQueryArgument extends IQueryArgument {
	key:
		| 'TimeFrom'
		| 'TimeTo'
		| 'SupplierId'
		| 'Limit'
		| 'Offset'
		| 'SortingColumn'
		| 'IsSortingDescending'
		| 'IsSortingDescending'
		| 'UserLoginHash';
}

interface BillingOrder {
	id: string;
	stateChangeRecords: VinistoOrderDllModelsApiOrderStateChangeRecord[];
	orderItems: VinistoOrderDllModelsApiOrderOrderItem[];
	orderNumber: string | null;
	sumOrderFee: number;
	sumOrderFeeWithVat: number;
	sumOrderSaleFee: number;
	sumOrderSaleFeeWithVat: number;
	sumOrderLogisticFee: number;
	sumOrderLogisticFeeWithVat: number;
}

interface VinistoOrderDllModelsApiReturnDataBillingOrdersReturn {
	ordersBilling?: VinistoOrderDllModelsApiOrderOrder[] | null;
	count?: number;
	isError?: boolean;
	error?: VinistoHelperDllBaseError[] | null;
}

export type {
	Delivery,
	DeliveryListQueryArgument,
	GetOrdersWithDiscountCodeQueryArgument,
	DiscountCoupon,
	PercentageDiscountCoupon,
	AmountDiscountCoupon,
	Price,
	Billing,
	BillingListQueryArgument,
	BillingOrder,
	VinistoOrderDllModelsApiReturnDataBillingOrdersReturn,
};
