import { SupplierDataAction } from './constants';
import { SupplierDataReducerAction, SupplierDataState } from './interfaces';

export const SupplierDataReducer = (
	state: SupplierDataState,
	[type, payload]: SupplierDataReducerAction
): SupplierDataState => {
	switch (type) {
		case SupplierDataAction.setAll: {
			return {
				...state,
				...payload,
			};
		}
	}
	return state;
};
