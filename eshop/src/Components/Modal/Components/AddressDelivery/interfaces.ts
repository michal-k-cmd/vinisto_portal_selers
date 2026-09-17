import {
	VinistoAuthDllModelsApiAddressAddress,
	VinistoHelperDllEnumsCountryCode,
} from 'vinisto_api_client/src/api-types/user-api';

import { ADDRESS_DELIVERY_MODAL_TYPE } from './constants';

export type ModalData = {
	modalType: ADDRESS_DELIVERY_MODAL_TYPE;
	address: VinistoAuthDllModelsApiAddressAddress;
	onCreateCallback: (id: string | null | undefined) => void;
};

export interface AddressAddress {
	street: string;
	landRegistryNumber: string;
	numberHouse?: string | null;
	zip: string;
	city: string;
	phone: string;
	email?: string | null;
	note?: string | null;
	title?: string | null;
	id?: string | null;
	name: string;
	lastname: string;
	organization?: string | null;
	countryCode: VinistoHelperDllEnumsCountryCode;
}

export type FormValues = Omit<AddressAddress, 'street'> & {
	street: { value: string; selectedItem: any };
};
