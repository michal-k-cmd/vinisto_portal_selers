import { MultiselectProps } from 'Components/Multiselect/interfaces';
import { FormControlProps } from 'Components/Form/interfaces';

interface InputMultiselectProps
	extends Omit<FormControlProps, 'initialSelected' | 'onSelectionChange'>,
		MultiselectProps {}

export type { InputMultiselectProps };
