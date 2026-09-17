import { MutableRefObject, ReactNode } from 'react';
import { CartShippingDataFormSchema } from 'pages-spa/CartShippingData/schema';
import {
	VinistoHelperDllEnumsOrderPaymentType,
	VinistoHelperDllEnumsOrderPickupPointType,
	VinistoOrderDllModelsApiOrderUtmParameters,
	VinistoOrderDllModelsApiReturnDataDeliveriesReturn,
	VinistoOrderDllModelsApiReturnDataOrderReturn,
} from 'vinisto_api_client/src/api-types/order-api';

import { VinistoHelperDllBaseError } from '@/api-types/product-api';

export type DeliveryMethod = {
	id: string;
	pickupPoint?: {
		code: string;
		title: string;
		type: VinistoHelperDllEnumsOrderPickupPointType;
		street: string;
		landRegistryNumber: string;
		houseNumber?: null | string;
		city: string;
		zip: string;
		countryCode: string;
		email: string;
	};
};

export type PaymentMethod = {
	id: string;
	paymentType?: VinistoHelperDllEnumsOrderPaymentType;
};
export interface OrderRequestStatus {
	orderId: string;
	status: 'none' | 'sent' | 'received';
	basketId: string | null;
}
export interface IOrderServiceModel {
	formValues: { current: Record<any, any> };
	createOrder: (
		_: CartShippingDataFormSchema,
		__: string,
		___: () => void
	) =>
		| Promise<VinistoOrderDllModelsApiReturnDataOrderReturn | void>
		| undefined;
	clearDeliveryPayment: () => void;
	deliveryMethod: null | DeliveryMethod;
	setDeliveryMethod: React.Dispatch<
		React.SetStateAction<null | DeliveryMethod>
	>;
	paymentMethod: null | PaymentMethod;
	setPaymentMethod: React.Dispatch<React.SetStateAction<null | PaymentMethod>>;
	utmPostData: OrderUtmParameters | null;
	getDeliveries?: (
		isForCustomerDelivery: boolean,
		isForStocking: boolean
	) => Promise<
		VinistoOrderDllModelsApiReturnDataDeliveriesReturn | null | undefined
	>;
	wsConnectionId: string | null;
	orderId: string;
	setOrderId: React.Dispatch<React.SetStateAction<string | string>>;
	getOrderRequestStatus: (orderId: string) => OrderRequestStatus['status'];
	orderRequestStatus: OrderRequestStatus[];
	isCreatingOrderRef: MutableRefObject<boolean>;
	orderErrorsFromWs: Record<string, VinistoHelperDllBaseError[]>;
}

export interface IOrderServiceProps {
	children?: ReactNode;
}

export interface OrderUtmParameters
	extends VinistoOrderDllModelsApiOrderUtmParameters {
	expires?: string;
}
