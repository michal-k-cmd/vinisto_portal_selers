import { FormControlProps } from 'Components/Form/interfaces';

export interface TextAreaProps extends FormControlProps {
	rows?: number;
	maxLength?: number;
}
