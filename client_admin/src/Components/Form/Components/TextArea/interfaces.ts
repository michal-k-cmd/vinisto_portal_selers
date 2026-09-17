import { FormControlProps } from 'Components/Form/interfaces';

export interface TextAreaProps
	extends FormControlProps,
		Omit<
			React.HTMLProps<HTMLTextAreaElement>,
			'name' | 'label' | 'onChange' | 'onFocus' | 'onBlur'
		> {}
