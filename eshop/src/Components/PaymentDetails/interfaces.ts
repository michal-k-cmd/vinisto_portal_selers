import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

export interface PaymentDetailsProps {
	orderId: string;
	orderNumber: string;
	orderPrice: number;
	orderCurrency: VinistoHelperDllEnumsCurrency;
}
