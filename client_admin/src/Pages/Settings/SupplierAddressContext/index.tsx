import { createContext, FC, useCallback, useContext, useEffect } from 'react';
import { isEqual } from 'lodash-es';
import { Middleware } from 'Hooks/useMiddlewareReducer/types';
import { VinistoHelperDllEnumsCountryCode } from 'vinisto_api_client/src/api-types/supplier-api';
import { IVinistoUser } from 'Services/AuthenticationService/interfaces';
import {
	SupplierAddress,
	SupplierUpdateAddressData,
} from 'Services/SupplierService/interfaces';
import { AuthenticationAction } from 'Services/AuthenticationService/constants';
import useMiddlewareReducer from 'Hooks/useMiddlewareReducer';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import SupplierService from 'Services/SupplierService';

import { FALLBACK_COUNTRY_CODE, SupplierAddressAction } from './constants';
import {
	SupplierAddressContextProps,
	SupplierAddressContextValues,
	SupplierAddressReducerAction,
	SupplierAddressState,
} from './interfaces';
import { SupplierAddressReducer } from './reducer';

const defaultContextValue: SupplierAddressContextValues = {
	userLoginHash: '',
	supplierId: '',
	street: '',
	landRegistryNumber: '',
	zip: '',
	city: '',
	phone: '',
	countryCode: VinistoHelperDllEnumsCountryCode.CZ,
	addressee: '',
	dispatch: () => null,
};

export const SupplierAddressContext =
	createContext<SupplierAddressContextValues>(defaultContextValue);

const SupplierAddressContextProvider: FC<SupplierAddressContextProps> = ({
	children,
}) => {
	const autheticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const createContextValue = useCallback(
		(user: IVinistoUser | null, activeSupplierId: string) => {
			if (user === null) return defaultContextValue;
			const supplierData = user.suppliers?.find(
				(supplier) => supplier.id === activeSupplierId
			);
			const address =
				(supplierData?.address as SupplierAddress) ?? defaultContextValue;
			return {
				userLoginHash: user.loginHash ?? '',
				supplierId: activeSupplierId,
				...address,
				countryCode:
					//@ts-expect-error requires pre-defined constant/enum
					VinistoHelperDllEnumsCountryCode[
						address.countryCode ?? FALLBACK_COUNTRY_CODE
					],
			};
		},
		[]
	);

	const update = async (
		supplierId: string,
		data: SupplierUpdateAddressData
	) => {
		return SupplierService.updateAddress(supplierId, data)
			.then((address) => {
				autheticationContext.dispatch({
					type: AuthenticationAction.updateSingleSupplier,
					payload: {
						id: supplierId,
						//@ts-expect-error either narrow property types on address or use a type guard.. or just ignore this
						address: {
							...address,
							countryCode:
								//@ts-expect-error requires pre-defined constant/enum
								VinistoHelperDllEnumsCountryCode[
									data.countryCode ?? FALLBACK_COUNTRY_CODE
								],
						},
					},
				});
				notificationsContext.handleShowSuccessNotification(
					'settings.contact.success'
				);
			})
			.catch(() => {
				// TODO: Handle different errors returned from server
				return 'settings.contact.error.general';
			});
	};

	const supplierDataMiddleware: Middleware<
		SupplierAddressState,
		SupplierAddressReducerAction
	> =
		({ getState }) =>
		(next) =>
		(action) => {
			const [type, payload] = action;
			const state = getState();
			switch (type) {
				case SupplierAddressAction.setStreet:
					update(state.supplierId, {
						...state,
						street: payload,
					});
					break;
				case SupplierAddressAction.setLandRegistryNumber:
					update(state.supplierId, {
						...state,
						landRegistryNumber: payload,
					});
					break;
				case SupplierAddressAction.setHouseNumber:
					update(state.supplierId, {
						...state,
						houseNumber: payload,
					});
					break;
				case SupplierAddressAction.setZip:
					update(state.supplierId, {
						...state,
						zip: payload,
					});
					break;
				case SupplierAddressAction.setCity:
					update(state.supplierId, {
						...state,
						city: payload,
					});
					break;
				case SupplierAddressAction.setPhone:
					update(state.supplierId, {
						...state,
						phone: payload,
					});
					break;
				case SupplierAddressAction.setEmail:
					update(state.supplierId, {
						...state,
						email: payload,
					});
					break;
				case SupplierAddressAction.setNote:
					update(state.supplierId, {
						...state,
						note: payload,
					});
					break;
				case SupplierAddressAction.setTitle:
					update(state.supplierId, {
						...state,
						title: payload,
					});
					break;
				case SupplierAddressAction.setCountryCode:
					update(state.supplierId, {
						...state,
						countryCode: payload,
					});
					break;
				case SupplierAddressAction.setAddressee:
					update(state.supplierId, {
						...state,
						addressee: payload,
					});
					break;
			}
			return next(action);
		};

	const [state, dispatch] = useMiddlewareReducer(
		SupplierAddressReducer,
		//@ts-expect-error either narrow property types on address or use a type guard.. or just ignore this
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
		//@ts-expect-error either narrow property types on address or use a type guard.. or just ignore this
		dispatch([SupplierAddressAction.setAll, newContext]);
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
		<SupplierAddressContext.Provider value={contextValues}>
			{children}
		</SupplierAddressContext.Provider>
	);
};

export default SupplierAddressContextProvider;
