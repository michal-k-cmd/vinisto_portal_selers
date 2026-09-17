import { IconType } from 'react-icons';

export interface IActionButtonProps {
	label?: string;
	onClick?: (args: Record<any, any>) => void;
	icon?: IconType | null | undefined;
}
