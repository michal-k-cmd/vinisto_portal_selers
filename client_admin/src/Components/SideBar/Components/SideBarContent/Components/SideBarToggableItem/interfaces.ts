import { IconType } from 'react-icons';

import { ISideBarItem } from '../SideBarItem/interfaces';

export interface ISideBarToogableItemProps {
	title: string;
	items: ISideBarItem[];
	icon?: IconType;
	delay?: number;
	action?: any;
	route?: string;
}
