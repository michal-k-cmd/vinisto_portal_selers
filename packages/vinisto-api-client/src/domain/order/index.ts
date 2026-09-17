import {
	VinistoHelperDllEnumsOrderOrderState,
	VinistoOrderDllModelsApiOrderAddonItem,
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderDelivery,
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponGiftCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderExchangeRate,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderPayment,
} from '@/api-types/order-api';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsLanguage,
} from '../../api-types/product-api';
import { Dayjs } from 'dayjs';

interface Order {
	id: string;
	states: VinistoHelperDllEnumsOrderOrderState[];
	state: VinistoHelperDllEnumsOrderOrderState;
	stateChangeRecords: {
		state: VinistoHelperDllEnumsOrderOrderState;
		changeTime: Dayjs | null;
	}[];
	orderItems: VinistoOrderDllModelsApiOrderOrderItem[];
	user: {
		id: string;
		anonymousId: string;
		email: string;
	};
	delivery: VinistoOrderDllModelsApiOrderDelivery;
	payment: VinistoOrderDllModelsApiOrderPayment;
	language?: VinistoHelperDllEnumsLanguage;
	discountCoupons?:
		| (
				| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponGiftCouponDefinition
		  )[]
		| null;
	orderTotalDiscount: number | null;
	specSymbol: string;
	customerOrderNumber: string;
	orderNumber: string;
	isNewsletterActive: boolean;
	billingAddress: VinistoOrderDllModelsApiOrderAddress;
	orderPrice: number;
	orderPriceWithVat: number;
	orderCurrency: VinistoHelperDllEnumsCurrency;
	orderNote: string;
	trackingId: string;
	utm: {
		source: string;
		medium: string;
		campaign: string;
		gad: string;
		gclId: string;
	};
	internalOrderNote: string;
	hasFeeGenerated: boolean;
	sumOrderFee?: number;
	sumOrderFeeWithVat?: number;
	countryOfSale?: VinistoHelperDllEnumsCountryCode;
	orderExchangeRate?: VinistoOrderDllModelsApiOrderExchangeRate | null;
	shippingPackagingBundle?: VinistoOrderDllModelsApiOrderOrderItem | null;
	addons?: VinistoOrderDllModelsApiOrderAddonItem[] | null;
	giftCouponPayment: number;
	giftCouponPaymentWithVat: number;
	platformId: number | undefined,
}

export type { Order };
