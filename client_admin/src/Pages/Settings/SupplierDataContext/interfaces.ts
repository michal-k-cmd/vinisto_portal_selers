import { ReactNode } from 'react';
import { Dispatch } from 'Hooks/useMiddlewareReducer/types';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsSupplierSupplierType,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
import { SupplierAddress } from 'Services/SupplierService/interfaces';

import { SupplierDataAction } from './constants';

export interface SupplierDataContextProps {
	children: ReactNode;
}

export interface SupplierDataState {
	userLoginHash: NonNullable<IVinistoUser['loginHash']>;
	supplierId: string;
	nameBilling: string;
	ico: string;
	dic?: string;
	countryCode: VinistoHelperDllEnumsCountryCode;
	supplierType: VinistoHelperDllEnumsSupplierSupplierType;
	isShipping?: boolean;
	nameWeb?: string;
	web?: string;
	companyDescription: string;
	mainProfile?: string;
	wineRegion?: string;
	pickupAddress: SupplierAddress;
	bankAccountNumber?: string;
}

export type SetAllAction = [SupplierDataAction.setAll, SupplierDataState];

export type SetSupplierNameAction = [
	SupplierDataAction.setSupplierName,
	SupplierDataState['nameBilling']
];

export type SetSupplierNameWebAction = [
	SupplierDataAction.setSupplierNameWeb,
	SupplierDataState['nameWeb']
];

export type SetIdNumberAction = [
	SupplierDataAction.setIdNumber,
	SupplierDataState['ico']
];

export type SetVatinAction = [
	SupplierDataAction.setVatin,
	SupplierDataState['dic']
];

export type SetIsShippingAction = [
	SupplierDataAction.setIsShipping,
	SupplierDataState['isShipping']
];

export type SetStreetAction = [
	SupplierDataAction.setStreet,
	SupplierDataState['pickupAddress']['street']
];

export type SetLandRegistryNumberAction = [
	SupplierDataAction.setLandRegistryNumber,
	SupplierDataState['pickupAddress']['landRegistryNumber']
];

export type SetHouseNumberAction = [
	SupplierDataAction.setHouseNumber,
	SupplierDataState['pickupAddress']['houseNumber']
];

export type SetZipAction = [
	SupplierDataAction.setZip,
	SupplierDataState['pickupAddress']['zip']
];

export type SetCityAction = [
	SupplierDataAction.setCity,
	SupplierDataState['pickupAddress']['city']
];

export type SetPhoneAction = [
	SupplierDataAction.setPhone,
	SupplierDataState['pickupAddress']['phone']
];

export type SetEmailAction = [
	SupplierDataAction.setEmail,
	SupplierDataState['pickupAddress']['email']
];

export type SetNoteAction = [
	SupplierDataAction.setNote,
	SupplierDataState['pickupAddress']['note']
];

export type SetTitleAction = [
	SupplierDataAction.setTitle,
	SupplierDataState['pickupAddress']['title']
];

export type SetCountryCodeAction = [
	SupplierDataAction.setCountryCode,
	SupplierDataState['pickupAddress']['countryCode']
];

export type SetAddresseeAction = [
	SupplierDataAction.setAddressee,
	SupplierDataState['pickupAddress']['addressee']
];

export type SetWebsiteAction = [
	SupplierDataAction.setWebsite,
	SupplierDataState['web']
];

export type SetCompanyDescriptionAction = [
	SupplierDataAction.setCompanyDescription,
	SupplierDataState['companyDescription']
];

export type SetMainProfileAction = [
	SupplierDataAction.setMainProfile,
	SupplierDataState['mainProfile']
];

export type SetWineRegionAction = [
	SupplierDataAction.setWineRegion,
	SupplierDataState['wineRegion']
];

export type SetBankAccountNumberAction = [
	SupplierDataAction.setBankAccountNumber,
	SupplierDataState['bankAccountNumber']
];

export type SupplierDataReducerAction =
	| SetAllAction
	| SetSupplierNameAction
	| SetSupplierNameWebAction
	| SetIdNumberAction
	| SetVatinAction
	| SetIsShippingAction
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
	| SetAddresseeAction
	| SetWebsiteAction
	| SetCompanyDescriptionAction
	| SetMainProfileAction
	| SetWineRegionAction
	| SetBankAccountNumberAction;

export interface SupplierDataContextValues extends SupplierDataState {
	dispatch: Dispatch<SupplierDataReducerAction>;
}
