import {
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderOrderEditAddressesParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { ReactNode } from 'react';

import { OrderAddressType } from './constants';

type OrderAddressProps = {
	shippingAddress: VinistoOrderDllModelsApiOrderAddress;
	billingAddress: VinistoOrderDllModelsApiOrderAddress;
	icon?: ReactNode;
	isStateCreated?: boolean;
	type: OrderAddressType;
	orderId: string;
	handleEditAddressesInOrder: (
		addressData: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters
	) => void;
};

export type { OrderAddressProps };
