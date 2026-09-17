import { FormValues } from 'Components/Form/Components/Form/interfaces';

import { EMAIL_FIELD_NAME } from './constants';

export interface ForgottenPasswordFormFields extends FormValues {
	[EMAIL_FIELD_NAME]: string;
}
