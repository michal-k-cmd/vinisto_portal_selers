import { ReactNode } from 'react';

type IconVariants = 'light' | 'dark' | 'green';

export interface IIconProps {
	id?: string;
	className?: string;
	alt?: ReactNode;
	title?: ReactNode;
	fill?: string | null;
	stroke?: string | null;
	variant?: IconVariants | null;
	onClick?: () => void;
	width?: number;
	height?: number;
}
