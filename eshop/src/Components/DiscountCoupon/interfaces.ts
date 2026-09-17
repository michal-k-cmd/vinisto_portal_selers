import {
	VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition,
	VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoHelperDllEnumsCurrency } from 'vinisto_api_client/src/api-types/product-api';

export enum DiscountCouponPageType {
	ORDER_SUMMARY = 'ORDER_SUMMARY',
	USER_SECTION = 'USER_SECTION',
}

export interface DiscountCouponProps {
	discountCoupon:
		| VinistoOrderDllModelsApiOrderDiscountCouponAmountDiscountCouponDefinition
		| VinistoOrderDllModelsApiOrderDiscountCouponPercentageDiscountCouponDefinition;
	discountCouponPage?: DiscountCouponPageType;
	className?: string;
	orderCurrency: VinistoHelperDllEnumsCurrency;
}
