import { BUNDLE_STATE, bundleStateLabel } from 'Pages/BundleList/constants';

export const FIELD_NAME = 'state';
export const FORM_KEY = 'state';

export const options = [
	{
		label: bundleStateLabel[BUNDLE_STATE.AVAILABLE],
		value: BUNDLE_STATE.AVAILABLE,
	},
	{
		label: bundleStateLabel[BUNDLE_STATE.DISABLED],
		value: BUNDLE_STATE.DISABLED,
	},
];
