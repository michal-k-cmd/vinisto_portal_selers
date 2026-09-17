import {
	VinistoOrderDllModelsApiOrderAddress,
	VinistoOrderDllModelsApiOrderPostalAddress,
} from 'vinisto_api_client/src/api-types/order-api';

interface CommonAddress
	extends VinistoOrderDllModelsApiOrderAddress,
		VinistoOrderDllModelsApiOrderPostalAddress {}

export interface IAddressProps {
	addressPhone: string | null | undefined;
	addressEmail: string | null | undefined;
	addressData: Partial<CommonAddress> | undefined;
	addressType: AddressType;
}

export enum AddressType {
	DELIVERY = 'DELIVERY',
	BILLING = 'BILLING',
}
