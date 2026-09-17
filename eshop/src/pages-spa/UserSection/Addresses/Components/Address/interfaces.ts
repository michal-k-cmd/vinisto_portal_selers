import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoAuthDllModelsApiBillingInfoBillingInfo,
} from 'vinisto_api_client/src/api-types/user-api';

export enum ADDRESS_TYPE {
	DELIVERY = 'DELIVERY',
	INVOICE = 'INVOICE',
}

export interface IAddressProps {
	address: Partial<
		VinistoAuthDllModelsApiAddressAddress &
			VinistoAuthDllModelsApiBillingInfoBillingInfo
	>;
	addressType: ADDRESS_TYPE;
	isLoading?: boolean;
}
