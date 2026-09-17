import { ReactNode, SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
	className?: string;
	alt?: ReactNode;
	title?: ReactNode;
	onClick?: () => void;
}
