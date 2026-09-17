import { SupplierAddressAction } from './constants';
import {
	SupplierAddressReducerAction,
	SupplierAddressState,
} from './interfaces';

export const SupplierAddressReducer = (
	state: SupplierAddressState,
	[type, payload]: SupplierAddressReducerAction
): SupplierAddressState => {
	switch (type) {
		case SupplierAddressAction.setAll: {
			return {
				...state,
				...payload,
			};
		}
		case SupplierAddressAction.setStreet: {
			return {
				...state,
				street: payload,
			};
		}
		case SupplierAddressAction.setLandRegistryNumber: {
			return {
				...state,
				landRegistryNumber: payload,
			};
		}
		case SupplierAddressAction.setHouseNumber: {
			return {
				...state,
				houseNumber: payload,
			};
		}
		case SupplierAddressAction.setZip: {
			return {
				...state,
				zip: payload,
			};
		}
		case SupplierAddressAction.setCity: {
			return {
				...state,
				city: payload,
			};
		}
		case SupplierAddressAction.setPhone: {
			return {
				...state,
				phone: payload,
			};
		}
		case SupplierAddressAction.setEmail: {
			return {
				...state,
				email: payload,
			};
		}
		case SupplierAddressAction.setNote: {
			return {
				...state,
				note: payload,
			};
		}
		case SupplierAddressAction.setTitle: {
			return {
				...state,
				title: payload,
			};
		}
		case SupplierAddressAction.setCountryCode: {
			return {
				...state,
				countryCode: payload,
			};
		}
		case SupplierAddressAction.setAddressee: {
			return {
				...state,
				addressee: payload,
			};
		}
	}
};
