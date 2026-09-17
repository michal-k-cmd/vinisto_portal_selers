import { FormControlProps } from 'Components/Form/interfaces';

export interface InputNumberProps
	extends Omit<FormControlProps<number>, 'placeholder'> {
	precision?: number;
	min?: number;
	max?: number;
	step?: number;
}
