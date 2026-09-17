import { VinistoHelperDllEnumsUserUserRights } from "@/api-types/product-api";

export function hasAdminToolbarAccess(
	permissions: VinistoHelperDllEnumsUserUserRights[] = []
) {
	return permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_ESHOP_ADMIN_TOOLBAR
	);
}

export function canCreateOrderAsSupport(
	permissions: VinistoHelperDllEnumsUserUserRights[] = []
) {
	return permissions.includes(
		VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE
	);
}


export function canCreateOrderAsCSO(
	permissions: VinistoHelperDllEnumsUserUserRights[] = []
) {
	return permissions.includes(VinistoHelperDllEnumsUserUserRights.USER_CSO);
}