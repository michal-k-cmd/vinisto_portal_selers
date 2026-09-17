import { HTMLProps, ReactNode } from 'react';

export interface ImageLocalProps extends HTMLProps<HTMLImageElement> {
	fileName: string;
	alt?: string;
	title?: string;
	className?: string;
	fallback?: ReactNode | null;
	crossOrigin?: '' | 'anonymous' | 'use-credentials' | undefined;
}
