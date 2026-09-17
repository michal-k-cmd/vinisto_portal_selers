import { ReactNode } from 'react';

export interface SpecificationExplanationViewProps {
	data: SpecificationExplanationProps[] | undefined;
	className?: string;
}

interface SpecificationExplanationProps {
	position?: 'left' | 'right' | 'full';
	imageUrl: string;
	heading: string;
	text: string | ReactNode;
	anchorLink?: string;
	anchorText?: string;
}
