import { IconType } from 'react-icons';

export interface IUserDetailItemProps {
	label: string;
	value: string;
	icon?: IconType;
	type?: any;
}

export interface IAdminDetailProps {
	detailSchema: Record<any, any>[];
	actionButtonsSchema?: Record<any, any>[];
	customComponentRender?: React.FC<Record<any, any>>;
	customData?: Record<any, any>;
	customMethods?: Record<any, any>;
}
