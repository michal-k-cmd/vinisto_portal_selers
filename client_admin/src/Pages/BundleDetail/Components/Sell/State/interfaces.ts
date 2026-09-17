import { BUNDLE_STATE } from 'Pages/BundleList/constants';

import { FIELD_NAME } from './constants';

export interface StateFormFields {
	[FIELD_NAME]: string;
}

export interface StateFormProps {
	initialValue: BUNDLE_STATE;
	onSubmit: (values: StateFormFields) => void;
}
