import { ReactNode } from 'react';
import { FormControlProps } from 'Components/Form/interfaces';

export interface InputProps extends FormControlProps {
	type?: string;
	customKey?: string | number | undefined | null;
	min?: number;
	max?: number;
	prefix?: ReactNode;
	suffix?: ReactNode;
	prohibitedChars?: string[];
}
