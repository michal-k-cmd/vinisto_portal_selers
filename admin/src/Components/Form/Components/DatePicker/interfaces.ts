import { ReactDatePickerProps } from 'react-datepicker';
import { FormControlProps } from 'Components/Form/interfaces';

export interface InputDatePickerProps
	extends FormControlProps<Date | null>,
		Omit<ReactDatePickerProps, 'name' | 'onChange'> {
	monthYearOnly?: boolean;
}
