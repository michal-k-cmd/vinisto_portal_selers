import { RefObject } from 'react';

export interface BootstrapContainerProps {
	className?: string;
	containerClassName?: string;
	children: React.ReactNode;
	parentRef?: RefObject<HTMLDivElement>;
}
