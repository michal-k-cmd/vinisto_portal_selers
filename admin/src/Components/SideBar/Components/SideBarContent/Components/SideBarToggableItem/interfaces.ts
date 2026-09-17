import { IconType } from 'react-icons';

import { SideBarMenuItemTopLevel } from '../../interfaces';

export interface ISideBarToogableItemProps {
	title: string;
	items: SideBarMenuItemTopLevel[];
	icon?: IconType;
	delay?: number;
	action?: any;
}
