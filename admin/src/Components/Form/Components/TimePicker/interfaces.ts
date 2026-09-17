import { FormControlProps } from 'Components/Form/interfaces';

export interface InputTimePickerProps extends FormControlProps<Date | null> {
	minDate?: Date;
	maxDate?: Date;
	selected?: Date | null;
	minTime?: Date;
}
