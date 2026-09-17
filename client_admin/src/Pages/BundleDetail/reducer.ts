import { BundleDetailAction } from './constants';
import { BundleDetailReducerAction, BundleDetailState } from './interfaces';

export const bundleDetailReducer = (
	state: BundleDetailState,
	[type, payload]: BundleDetailReducerAction
): BundleDetailState => {
	switch (type) {
		case BundleDetailAction.setBundleData: {
			return {
				...state,
				bundle: payload,
			};
		}
		case BundleDetailAction.setDiscountData: {
			return {
				...state,
				discounts: payload,
			};
		}
	}
	return state;
};
