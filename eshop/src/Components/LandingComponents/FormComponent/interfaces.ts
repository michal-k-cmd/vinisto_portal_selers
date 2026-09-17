import { ReactNode } from 'react';

export interface FormComponentProps {
	heading?: string;
	imageUrl?: string;
	imageAlt?: string;
	imageTitle?: string;
	text?: string | ReactNode;
}
