import { createContext, FC, useCallback, useContext, useEffect } from 'react';
import { isEqual } from 'lodash-es';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { Middleware } from 'Hooks/useMiddlewareReducer/types';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsLanguage,
	VinistoHelperDllEnumsSupplierSupplierType,
	VinistoSupplierDllModelsApiSupplierSupplier,
} from 'vinisto_api_client/src/api-types/supplier-api';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
import { SupplierUpdateData } from 'Services/SupplierService/interfaces';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import SupplierService from 'Services/SupplierService';

import { FALLBACK_COUNTRY_CODE, SupplierDataAction } from './constants';
import {
	SupplierDataContextProps,
	SupplierDataContextValues,
	SupplierDataReducerAction,
	SupplierDataState,
} from './interfaces';
import { SupplierDataReducer } from './reducer';

const defaultContextValue: SupplierDataContextValues = {
	userLoginHash: '',
	supplierId: '',
	nameBilling: '',
	ico: '',
	dic: '',
	countryCode: VinistoHelperDllEnumsCountryCode.CZ,
	supplierType: VinistoHelperDllEnumsSupplierSupplierType.IMPORTER,
	isShipping: true,
	web: '',
	companyDescription: '',
	mainProfile: '',
	wineRegion: '',
	pickupAddress: {
		street: '',
		landRegistryNumber: '',
		zip: '',
		city: '',
		phone: '',
		addressee: '',
	},
	bankAccountNumber: '',
	dispatch: () => {},
};

export const SupplierDataContext =
	createContext<SupplierDataContextValues>(defaultContextValue);

const SupplierDataContextProvider: FC<SupplierDataContextProps> = ({
	children,
}) => {
	const autheticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const localizationContext = useContext(LocalizationContext);

	const getLocalizedValue = useLocalizedValue();

	const createContextValue = useCallback(
		(user: IVinistoUser | null, activeSupplierId: string) => {
			if (user === null) return defaultContextValue;
			const supplierData = user.suppliers?.find(
				(supplier) => supplier.id === activeSupplierId
			);

			return {
				userLoginHash: user.loginHash ?? '',
				supplierId: supplierData?.id ?? '',
				nameBilling: supplierData?.nameBilling ?? '',
				ico: supplierData?.ico ?? '',
				dic: supplierData?.dic ?? '',
				countryCode:
					VinistoHelperDllEnumsCountryCode[
						supplierData?.countryCode ?? FALLBACK_COUNTRY_CODE
					],
				supplierType:
					VinistoHelperDllEnumsSupplierSupplierType[
						supplierData?.supplierType ??
							VinistoHelperDllEnumsSupplierSupplierType.IMPORTER
					],
				isShipping: supplierData?.isShipping ?? false,
				nameWeb: supplierData?.nameWeb ?? '',
				web: getLocalizedValue((supplierData?.web as LangValuePair[]) ?? []),
				companyDescription: getLocalizedValue(
					(supplierData?.companyDescription as LangValuePair[]) ?? []
				),
				mainProfile: getLocalizedValue(
					(supplierData?.mainProfile as LangValuePair[]) ?? []
				),
				wineRegion: getLocalizedValue(
					(supplierData?.wineRegion as LangValuePair[]) ?? []
				),
				pickupAddress: {
					street: supplierData?.pickupAddress?.street ?? '',
					landRegistryNumber:
						supplierData?.pickupAddress?.landRegistryNumber ?? '',
					houseNumber: supplierData?.pickupAddress?.houseNumber ?? '',
					zip: supplierData?.pickupAddress?.zip ?? '',
					city: supplierData?.pickupAddress?.city ?? '',
					phone: supplierData?.pickupAddress?.phone ?? '',
					email: supplierData?.pickupAddress?.email ?? '',
					note: supplierData?.pickupAddress?.note ?? '',
					title: supplierData?.pickupAddress?.title ?? '',
					countryCode:
						VinistoHelperDllEnumsCountryCode[
							supplierData?.pickupAddress?.countryCode ?? FALLBACK_COUNTRY_CODE
						],
					addressee: supplierData?.pickupAddress?.addressee ?? '',
				},
				bankAccountNumber: supplierData?.bankAccountNumber ?? '',
			};
		},
		[getLocalizedValue]
	);

	const update = async (
		supplierId: string,
		data: Omit<SupplierUpdateData, 'language'>,
		successMessage: string,
		generalErrorMessage: string
	) => {
		return SupplierService.update(supplierId, {
			...data,
			language:
				VinistoHelperDllEnumsLanguage[
					localizationContext.activeLanguageKey as VinistoHelperDllEnumsLanguage
				],
		})
			.then((updatedSupplier) => {
				notificationsContext.handleShowSuccessNotification(successMessage);
				autheticationContext.dispatch({
					type: AuthenticationAction.updateSingleSupplier,
					payload:
						updatedSupplier as VinistoSupplierDllModelsApiSupplierSupplier,
				});
			})
			.catch(() => {
				// TODO: Handle different errors returned from server
				return generalErrorMessage;
			});
	};

	const supplierDataMiddleware: Middleware<
		SupplierDataState,
		SupplierDataReducerAction
	> =
		({ getState }) =>
		(next) =>
		(action) => {
			const [type, payload] = action;
			const state = getState();
			switch (type) {
				case SupplierDataAction.setSupplierName:
					return update(
						state.supplierId,
						{
							...state,
							nameBilling: payload,
						},
						'settings.invoice.success',
						'settings.invoice.error.general'
					);
				case SupplierDataAction.setIdNumber:
					return update(
						state.supplierId,
						{
							...state,
							ico: payload,
						},
						'settings.invoice.success',
						'settings.invoice.error.general'
					);
				case SupplierDataAction.setVatin:
					return update(
						state.supplierId,
						{
							...state,
							dic: payload,
						},
						'settings.invoice.success',
						'settings.invoice.error.general'
					);
				case SupplierDataAction.setIsShipping:
					return update(
						state.supplierId,
						{
							...state,
							isShipping: payload,
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setStreet:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								street: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setLandRegistryNumber:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								landRegistryNumber: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setHouseNumber:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								houseNumber: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setZip:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								zip: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setCity:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								city: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setPhone:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								phone: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setEmail:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								email: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setNote:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								note: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setTitle:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								title: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setCountryCode:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								countryCode: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setAddressee:
					return update(
						state.supplierId,
						{
							...state,
							pickupAddress: {
								...state.pickupAddress,
								addressee: payload,
							},
						},
						'settings.delivery.success',
						'settings.delivery.error.general'
					);
				case SupplierDataAction.setWebsite:
					return update(
						state.supplierId,
						{
							...state,
							web: payload,
						},
						'settings.profile.success',
						'settings.profile.error.general'
					);
				case SupplierDataAction.setCompanyDescription:
					return update(
						state.supplierId,
						{
							...state,
							companyDescription: payload,
						},
						'settings.profile.success',
						'settings.profile.error.general'
					);
				case SupplierDataAction.setMainProfile:
					return update(
						state.supplierId,
						{
							...state,
							mainProfile: payload,
						},
						'settings.profile.success',
						'settings.profile.error.general'
					);
				case SupplierDataAction.setWineRegion:
					return update(
						state.supplierId,
						{
							...state,
							wineRegion: payload,
						},
						'settings.profile.success',
						'settings.profile.error.general'
					);
				case SupplierDataAction.setBankAccountNumber:
					return update(
						state.supplierId,
						{
							...state,
							bankAccountNumber: payload,
						},
						'settings.bank.success',
						'settings.bank.error.general'
					);
				case SupplierDataAction.setSupplierNameWeb:
					return update(
						state.supplierId,
						{
							...state,
							nameWeb: payload,
						},
						'settings.invoice.success',
						'settings.invoice.error.general'
					);
			}
			return next(action);
		};

	const [state, dispatch] = useMiddlewareReducer(
		SupplierDataReducer,
		createContextValue(
			autheticationContext.vinistoUser,
			autheticationContext.activeSupplierId
		),
		[supplierDataMiddleware]
	);

	useEffect(() => {
		const newContext = createContextValue(
			autheticationContext.vinistoUser,
			autheticationContext.activeSupplierId
		);
		if (isEqual(newContext, state)) return;
		dispatch([SupplierDataAction.setAll, newContext]);
	}, [
		autheticationContext.vinistoUser,
		autheticationContext.activeSupplierId,
		createContextValue,
		state,
	]);

	const contextValues = {
		...state,
		dispatch,
	};

	return (
		<SupplierDataContext.Provider value={contextValues}>
			{children}
		</SupplierDataContext.Provider>
	);
};

export default SupplierDataContextProvider;
