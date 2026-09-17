import { ElementType } from 'react';

interface MenuItem {
	title: string;
	icon: ElementType;
	items?: MenuItemItems[];
	route?: string;
}

interface MenuItemItems {
	icon: ElementType;
	title: string;
	route: string;
	action: any;
}

export type { MenuItem, MenuItemItems };
