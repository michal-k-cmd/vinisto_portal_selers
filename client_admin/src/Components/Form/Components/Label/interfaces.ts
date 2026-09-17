import { ReactNode } from 'react';

export interface ILabelProps {
	htmlFor?: string;
	children: ReactNode;
	className?: string;
	isRequired?: boolean;
}
