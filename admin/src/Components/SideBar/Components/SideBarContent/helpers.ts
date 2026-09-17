import { SideBarItemBase } from './interfaces';

export const getAccessibleItems =
	(combinedPermissions: string[] = []) =>
	(menuItem: SideBarItemBase) =>
		!Array.isArray(menuItem.rights) ||
		menuItem.rights.length === 0 ||
		menuItem.rights.some((requiredPermission) =>
			combinedPermissions.includes(requiredPermission)
		);
