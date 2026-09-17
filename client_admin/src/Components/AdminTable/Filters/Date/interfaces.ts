import { MouseEvent } from 'react';

export interface DateFilterProps {
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}
