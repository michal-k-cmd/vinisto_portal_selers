import { ReactNode } from 'react';

interface IconProps {
	id?: string;
	className?: string;
	alt?: ReactNode;
	title?: ReactNode;
	fill?: string | null;
	stroke?: string | null;
}

export type { IconProps };
