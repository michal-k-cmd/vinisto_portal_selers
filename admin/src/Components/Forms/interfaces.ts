import { OrderAddressType } from 'Pages/OrderDetail/Components/OrderAddress/constants';
import {
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderOrderEditAddressesParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { VinistoAuthDllModelsApiAddressUserAddressEditParameters } from 'vinisto_api_client/src/api-types/user-api/';

interface OrderAddressFormProps {
	initialValues: VinistoAuthDllModelsApiAddressUserAddressEditParameters;
	handleSubmit: (
		formValues: VinistoAuthDllModelsApiAddressUserAddressEditParameters
	) => void;
}

interface OrderAddressModalData {
	orderId: string;
	shippingAddress: VinistoOrderDllModelsApiOrderAddress;
	billingAddress: VinistoOrderDllModelsApiOrderAddress;
	orderAddressType: OrderAddressType;
	handleEditAddressesInOrder: (
		addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
	) => void;
}

export type { OrderAddressFormProps, OrderAddressModalData };
