import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export interface IPaymentInfoProps {
	orderId: string;
	orderNumber: string;
	isCreditPayment?: boolean;
	orderPrice: number;
	orderEmail?: string;
	orderCurrency: VinistoHelperDllEnumsCurrency;
}
