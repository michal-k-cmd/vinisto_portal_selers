import {
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderOrderEditAddressesParameters,
} from 'vinisto_api_client/src/api-types/order-api/';

import { OrderAddressType } from './constants';

type EditAddressesProps = {
	shippingAddress: VinistoOrderDllModelsApiOrderAddress;
	billingAddress: VinistoOrderDllModelsApiOrderAddress;
	isStateCreated?: boolean;
	type: OrderAddressType;
	orderId: string;
	handleEditAddressesInOrder: (
		addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
	) => void;
};

export type { EditAddressesProps };
