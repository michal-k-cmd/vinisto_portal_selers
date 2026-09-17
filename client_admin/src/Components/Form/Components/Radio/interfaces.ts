import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export interface IRadioProps
	extends OmitConstrained<FormControlProps, 'placeholder' | 'validate'> {
	value: string;
}
