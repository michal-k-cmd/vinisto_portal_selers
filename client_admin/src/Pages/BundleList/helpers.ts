import { BUNDLE_STATE } from './constants';

export const getBundleState = (isEnabled: boolean, availableCount: number) => {
	if (!isEnabled) {
		return BUNDLE_STATE.DISABLED;
	} else if (availableCount < 1) {
		return BUNDLE_STATE.OUT_OF_STOCK;
		// } else if (...) {      // TODO: API does not provide info about this
		//   return BUNDLE_STATE.PENDING;
	}

	return BUNDLE_STATE.AVAILABLE;
};
