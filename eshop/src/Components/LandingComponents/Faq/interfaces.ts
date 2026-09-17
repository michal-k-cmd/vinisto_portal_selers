import { ReactNode } from 'react';

export interface Question {
	question: string | ReactNode;
	answer: string | ReactNode;
}

export interface FaqProps {
	heading?: string;
	subheading?: string;
	questions: Question[];
}
