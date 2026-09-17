import {
	SideBarMenuItem,
	SideBarMenuItemLeaf,
	SideBarMenuItemWithUrl,
	SideBarMenuSubitem,
} from '../../interfaces';

export const isSideBarMenuItemLeaf = (
	item: SideBarMenuSubitem
): item is SideBarMenuItemLeaf => {
	return Object.hasOwn(item, 'action') || Object.hasOwn(item, 'route');
};

export const isSideBarMenuItemWithUrl = (
	item: SideBarMenuItem
): item is SideBarMenuItemWithUrl => {
	return Object.hasOwn(item, 'url');
};
