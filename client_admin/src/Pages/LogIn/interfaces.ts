import { FormValues } from 'Components/Form/Components/Form/interfaces';

import { EMAIL_FIELD_NAME, PASSWORD_FIELD_NAME } from './constants';

export interface LogInFormFields extends FormValues {
	[EMAIL_FIELD_NAME]: string;
	[PASSWORD_FIELD_NAME]: string;
}
