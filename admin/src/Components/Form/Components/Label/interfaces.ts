import { ReactNode } from 'react';

export interface LabelProps {
	htmlFor?: string;
	children: ReactNode;
	className?: string;
	isRequired?: boolean;
}
