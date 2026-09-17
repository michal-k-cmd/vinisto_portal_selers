import { VinistoHelperDllEnumsBundleBundleState } from '@/api-types/product-api';

export const SET_STATE_LOCALIZATION_MAP = {
	[VinistoHelperDllEnumsBundleBundleState.Concept]: 'bundle.state.concept',
	[VinistoHelperDllEnumsBundleBundleState.ToConfirm]: 'bundle.state.toconfirm',
	[VinistoHelperDllEnumsBundleBundleState.Confirmed]: 'bundle.state.confirmed',
	[VinistoHelperDllEnumsBundleBundleState.Rejected]: 'bundle.state.rejected',
};
