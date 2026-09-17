import { FormControlProps } from 'Components/Form/interfaces';

export interface InputTimePickerProps extends FormControlProps<Date | null> {
	minDate?: Date;
	placeholderText?: string;
	showTimeInput?: boolean;
	forceHideError?: boolean;
	afterInputSlot?: React.ReactNode;
	hideErrors?: string[];
}
