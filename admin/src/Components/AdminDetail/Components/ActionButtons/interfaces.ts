import { IconType } from 'react-icons';

interface ActionItem {
	onClick?: () => void;
	label: string;
	icon?: IconType;
	disableFallbackIcon?: boolean;
	visible?: boolean;
	disabled?: boolean;
	rights?: string[];
	key?: string;
	className?: string;
}

interface ActionButtonSchema {
	rowId: string;
	items: ActionItem[];
}

interface ActionButtonsProps {
	// Record<string, any>[] is a workaround for many errors in usage of this component
	actionButtonsSchema: ActionButtonSchema[] | Record<string, any>[];
}

export type { ActionButtonSchema, ActionButtonsProps, ActionItem };
