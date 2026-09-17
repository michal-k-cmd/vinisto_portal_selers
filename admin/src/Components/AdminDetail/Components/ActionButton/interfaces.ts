import { IconType } from 'react-icons';

export interface ActionButtonProps {
	label: string;
	onClick?: (args: Record<any, any>) => void;
	icon?: IconType;
	disableFallbackIcon?: boolean;
	disabled?: boolean;
	className?: string;
}
