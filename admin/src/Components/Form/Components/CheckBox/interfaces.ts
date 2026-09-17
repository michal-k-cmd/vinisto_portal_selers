import { FormControlProps } from 'Components/Form/interfaces';
import { OmitConstrained } from 'types';

export type CheckBoxProps = OmitConstrained<FormControlProps, 'placeholder'>;
