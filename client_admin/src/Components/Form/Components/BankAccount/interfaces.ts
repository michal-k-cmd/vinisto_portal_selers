import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export interface InputBankAccountProps
	extends OmitConstrained<FormControlProps, 'placeholder' | 'validate'> {
	isRequired?: boolean;
}
