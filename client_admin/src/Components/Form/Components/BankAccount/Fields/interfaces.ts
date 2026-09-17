import { FieldRenderProps } from 'react-final-form';

import { InputBankAccountProps } from '../interfaces';

export interface FieldsProps extends InputBankAccountProps {
	input: FieldRenderProps<string>['input'];
	meta: FieldRenderProps<string>['meta'];
}
