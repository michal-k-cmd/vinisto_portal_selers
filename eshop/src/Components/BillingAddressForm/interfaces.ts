import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';

export interface BillingAddress {
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

export type FormValues = Omit<BillingAddress, 'street'> & {
	street: { value: string; selectedItem: any };
};
