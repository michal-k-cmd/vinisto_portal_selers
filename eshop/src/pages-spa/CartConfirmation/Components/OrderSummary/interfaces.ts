import {
	VinistoHelperDllEnumsCurrency,
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderBundle,
	VinistoOrderDllModelsApiOrderDelivery,
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderOrderItem,
	VinistoOrderDllModelsApiOrderPayment,
} from 'vinisto_api_client/src/api-types/order-api';

export interface OrderSummaryProps {
	orderItems: VinistoOrderDllModelsApiOrderOrderItem[] | undefined;
	orderGiftItems:
		| {
				bundle: VinistoOrderDllModelsApiOrderBundle | null | undefined;
				quantity: number | undefined;
		  }[]
		| undefined;
	delivery: VinistoOrderDllModelsApiOrderDelivery | undefined;
	payment: VinistoOrderDllModelsApiOrderPayment | undefined;
	billingAddress: VinistoOrderDllModelsApiOrderAddress | undefined;
	discountCoupons:
		| (
				| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
				| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition
		  )[]
		| null
		| undefined;
	orderCurrency: VinistoHelperDllEnumsCurrency;
	shippingPackaging?: VinistoOrderDllModelsApiOrderOrderItem | null | undefined;
}
