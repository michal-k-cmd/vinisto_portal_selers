import { ReactNode } from 'react';

export interface TopBarItem {
	label: ReactNode;
	value: ReactNode;
	className?: string;
}

export interface TopBarButton {
	label: ReactNode;
	to?: string;
	onClick?: () => void;
	className?: string;
}

export interface TopBarProps {
	items: TopBarItem[];
	buttons: TopBarButton[];
	className?: string;
}
