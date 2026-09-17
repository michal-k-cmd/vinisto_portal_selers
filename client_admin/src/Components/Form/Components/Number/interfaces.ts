import { FormControlProps } from 'Components/Form/interfaces';

export type InputNumberProps = Omit<FormControlProps<number>, 'placeholder'>;
