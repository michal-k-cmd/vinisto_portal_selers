import { VinistoOrderDllModelsApiOrderAddress } from 'vinisto_api_client/src/api-types/order-api/';
import { OrderAddressType } from 'Pages/OrderDetail/Components/OrderAddress/constants';

export interface OrderAddressFormValues {
	billingAddress: VinistoOrderDllModelsApiOrderAddress;
	shippingAddress: VinistoOrderDllModelsApiOrderAddress;
	orderAddressType: OrderAddressType;
	isSendEmail?: boolean;
}
