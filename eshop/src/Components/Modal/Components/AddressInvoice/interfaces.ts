import { VinistoAuthDllModelsApiBillingInfoBillingInfo } from 'vinisto_api_client/src/api-types/user-api';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/product-api';

import { ADDRESS_INVOICE_MODAL_TYPE } from './constants';

export type ModalData = {
	modalType: ADDRESS_INVOICE_MODAL_TYPE;
	billingInfo: VinistoAuthDllModelsApiBillingInfoBillingInfo;
	onCreateCallback: (id: string | null | undefined) => void;
};

export interface billingAddress {
	street: string;
	landRegistryNumber: string;
	numberHouse?: string | null;
	zip: string;
	city: string;
	phone: string;
	email?: string | null;
	note?: string | null;
	title?: string | null;
	id: string;
	name: string;
	lastname: string;
	organization?: string | null;
	ico?: string | null;
	dic?: string | null;
	accountNumber?: string | null;
	bankCode?: string | null;
	countryCode?: VinistoHelperDllEnumsCountryCode | null;
}

export type FormValues = Omit<billingAddress, 'street'> & {
	street: { value: string; selectedItem: any };
};
