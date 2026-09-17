import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export type InputColorPickerProps = OmitConstrained<
	FormControlProps,
	'identifier' | 'placeholder' | 'disabled'
>;
