import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export type InputBankAccountProps = OmitConstrained<
	FormControlProps,
	'placeholder'
>;
