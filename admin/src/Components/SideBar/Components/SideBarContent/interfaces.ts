import { IconType } from 'react-icons';

export interface SideBarItemBase {
	title: string;
	icon: IconType;
	rights?: string[];
	className?: string;
}

export interface SideBarMenuItemLeaf extends SideBarItemBase {
	route: string;
	action?: string;
}

export interface SideBarMenuItemWithUrl extends SideBarItemBase {
	url: string;
	items?: never;
}

export interface SideBarMenuItemWithoutUrl extends SideBarItemBase {
	url?: never;
	items: SideBarMenuSubitem[];
}

export type SideBarMenuItem =
	| SideBarMenuItemWithUrl
	| SideBarMenuItemWithoutUrl;

export type SideBarMenuSubitem = SideBarMenuItemLeaf | SideBarMenuItem;

export type SideBarMenuItemTopLevel = SideBarMenuItem & {
	delay?: number;
	chart?: Record<any, any>;
};
