import { ReactNode } from 'react';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/supplier-api';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';

import { SupplierAddressAction } from './constants';

export interface SupplierAddressContextProps {
	children: ReactNode;
}

export interface SupplierAddressState {
	userLoginHash: NonNullable<IVinistoUser['loginHash']>;
	supplierId: string;
	street: string;
	landRegistryNumber: string;
	houseNumber?: string;
	zip: string;
	city: string;
	phone: string;
	email?: string;
	note?: string;
	title?: string;
	countryCode: VinistoHelperDllEnumsCountryCode;
	addressee: string;
}

export type SetAllAction = [SupplierAddressAction.setAll, SupplierAddressState];

export type SetStreetAction = [
	SupplierAddressAction.setStreet,
	SupplierAddressState['street']
];

export type SetLandRegistryNumberAction = [
	SupplierAddressAction.setLandRegistryNumber,
	SupplierAddressState['landRegistryNumber']
];

export type SetHouseNumberAction = [
	SupplierAddressAction.setHouseNumber,
	SupplierAddressState['houseNumber']
];

export type SetZipAction = [
	SupplierAddressAction.setZip,
	SupplierAddressState['zip']
];

export type SetCityAction = [
	SupplierAddressAction.setCity,
	SupplierAddressState['city']
];

export type SetPhoneAction = [
	SupplierAddressAction.setPhone,
	SupplierAddressState['phone']
];

export type SetEmailAction = [
	SupplierAddressAction.setEmail,
	SupplierAddressState['email']
];

export type SetNoteAction = [
	SupplierAddressAction.setNote,
	SupplierAddressState['note']
];

export type SetTitleAction = [
	SupplierAddressAction.setTitle,
	SupplierAddressState['title']
];

export type SetCountryCodeAction = [
	SupplierAddressAction.setCountryCode,
	SupplierAddressState['countryCode']
];
export type SetAddresseeAction = [
	SupplierAddressAction.setAddressee,
	SupplierAddressState['addressee']
];

export type SupplierAddressReducerAction =
	| SetAllAction
	| SetStreetAction
	| SetLandRegistryNumberAction
	| SetHouseNumberAction
	| SetZipAction
	| SetCityAction
	| SetPhoneAction
	| SetEmailAction
	| SetNoteAction
	| SetTitleAction
	| SetCountryCodeAction
	| SetAddresseeAction;

export interface SupplierAddressContextValues extends SupplierAddressState {
	dispatch: Dispatch<SupplierAddressReducerAction>;
}
