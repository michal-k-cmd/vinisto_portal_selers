import { MouseEvent } from 'react';

export interface YesNoFilterProps {
	value: string;
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent<HTMLSelectElement>) => void;
}
