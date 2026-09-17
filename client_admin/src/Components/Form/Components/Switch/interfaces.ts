import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export type InputSwitchProps = OmitConstrained<
	FormControlProps<boolean>,
	'placeholder'
>;
