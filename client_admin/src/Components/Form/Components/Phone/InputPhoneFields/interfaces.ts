import { FieldRenderProps } from 'react-final-form';

import { InputPhoneProps } from '../interfaces';

export interface InputPhoneCodeProps extends InputPhoneProps {
	input: FieldRenderProps<string>['input'];
	meta: FieldRenderProps<string>['meta'];
}
