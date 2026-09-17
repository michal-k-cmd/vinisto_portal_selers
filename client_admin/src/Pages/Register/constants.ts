import { VinistoHelperDllEnumsSupplierSupplierType } from 'vinisto_api_client/src/api-types/supplier-api';

import { RegistrationStep } from './interfaces';

export const AUTOSAVE_TIMEOUT = 2000;
export const REGISTER_API_ENDPOINT =
	'supplier-api/suppliers/CreateSupplierAndUser';

export enum STEP_STATUS {
	ACTIVE = 'active',
	SUCCESS = 'success',
	WARNING = 'warning',
	ERROR = 'error',
	DISABLED = 'disabled',
}

export const STEP_CREDENTIALS = {
	order: 1,
	id: 'credentials',
	title: 'register.credentials.title',
	fields: {
		EMAIL: 'email',
		PASSWORD: 'password',
		IS_AGREEMENT_CC: 'isAgreementCC',
	},
};

export enum SUPPLIER_TYPE {
	IMPORTER = VinistoHelperDllEnumsSupplierSupplierType.IMPORTER,
	PRODUCER = VinistoHelperDllEnumsSupplierSupplierType.PRODUCER,
}

export const STEP_INVOICE_CONTACT = {
	order: 2,
	id: 'form',
	title: 'register.invoiceContact.title',
	fields: {
		SUPPLIER_TYPE: 'supplierType',
		SUPPLIER_TYPE_PRODUCER: 'PRODUCER',
		SUPPLIER_TYPE_IMPORTER: 'IMPORTER',
		ICO: 'ico',
		DIC: 'dic',
		COMPANY: 'company',
		STREET: 'address.street',
		LAND_REGISTRY_NUMBER: 'address.landRegistryNumber',
		HOUSE_NUMBER: 'address.houseNumber',
		ADDRESSEE: 'address.addressee',
		CITY: 'address.city',
		ZIP: 'address.zip',
		BANK_ACCOUNT: 'address.bank_account',
		CONTACT_NAME_SURNAME: 'address.name_surname',
		CONTACT_EMAIL: 'address.email',
		CONTACT_PHONE: 'address.phone',
		IS_AGREEMENT_VOP: 'isAgreementVOP',
	},
};

export const STEP_SERVICES = {
	order: 3,
	id: 'services',
	title: 'register.services.title',
	fields: {
		IS_SHIPPING: 'isShipping',
		IS_SHIPPING_TRUE_STREET: 'isShippingTrue.street',
		IS_SHIPPING_TRUE_LAND_REGISTRY_NUMBER: 'isShippingTrue.landRegistryNumber',
		IS_SHIPPING_TRUE_HOUSE_NUMBER: 'isShippingTrue.houseNumber',
		IS_SHIPPING_TRUE_CITY: 'isShippingTrue.city',
		IS_SHIPPING_TRUE_ZIP: 'isShippingTrue.zip',
		IS_SHIPPING_TRUE_PHONE: 'isShippingTrue.phone',
		IS_SHIPPING_TRUE_ADDRESSEE: 'isShippingTrue.addressee',
		IS_SHIPPING_FALSE_ADDRESS: 'isShippingFalse.address',
	},
};

export const STEP_SUPPLIER = {
	order: 4,
	id: 'supplier',
	title: 'register.profile.title',
	fields: {
		NAME: 'name',
		WEB: 'web',
		COMPANY_DESCRIPTION: 'companyDescription',
		MAIN_PROFILE: 'mainProfile',
		WINE_REGION: 'wineRegion',
		IS_AGREEMENT_FILL_OUT: 'isAgreementFillOut',
	},
};

export const STEP_SUMMARY = {
	order: 5,
	id: 'products',
	title: 'register.summary.title',
	fields: {},
};

export const registrationSteps: RegistrationStep[] = [
	STEP_CREDENTIALS,
	STEP_INVOICE_CONTACT,
	STEP_SERVICES,
	STEP_SUPPLIER,
	STEP_SUMMARY,
];
