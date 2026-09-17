import { ReactNode } from 'react';

import {
	VinistoOrderDllModelsApiOrderOrder,
	VinistoOrderDllModelsApiOrderOrderWithInvoice,
} from '@/api-types/order-api';
import { Order } from '@/domain/order';

export interface IGoPayPaymentStatusState {
	loadingPaymentStatus: boolean;
	loadedPaymentStatus: boolean;
	paymentStatusData: Record<any, any>;
	paymentStatusError: null | Record<any, any>;
}

export interface HandleOnPayOnlineParams {
	order:
		| VinistoOrderDllModelsApiOrderOrder
		| Order
		| VinistoOrderDllModelsApiOrderOrderWithInvoice
		| null
		| undefined;
	returnUrl: string;
	notificationUrl: string;
}

export interface IGoPayServiceContextModel {
	handleGetGoPayPaymentStatus: (goPayPaymentId: number) => void;
	handleOnPayOnline: (params: HandleOnPayOnlineParams) => void;
	goPayPaymentStatusState: IGoPayPaymentStatusState;
}

export interface IGoPayServiceProviderProps {
	children: ReactNode;
}

export type GetGoPayPaymentStatusMethod = (goPayPaymentId: number) => void;

export interface IGoPayService {
	getGoPayPaymentStatus: GetGoPayPaymentStatusMethod;
}
