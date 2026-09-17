import { FormControlProps } from 'Components/Form/interfaces';

export interface InputProps extends FormControlProps {
	type?: string;
	customKey?: string | number | undefined | null;
	min?: number;
	max?: number;
	prohibitedChars?: string[];
	step?: string;
}
