import { ReactNode } from 'react';

export interface TextElementProps {
	pretitle?: string;
	heading?: string;
	text?: string | ReactNode;
	textAlign?: 'left' | 'center' | 'right' | 'justify';
	isWithContainer?: boolean;
	onlyElementInColumns?: boolean;
	isWithReadMore?: boolean;
}
