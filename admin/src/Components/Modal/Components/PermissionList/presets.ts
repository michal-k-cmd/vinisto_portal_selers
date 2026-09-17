import { VinistoHelperDllEnumsUserUserRights } from 'vinisto_api_client/src/api-types/user-api/';

const R = VinistoHelperDllEnumsUserUserRights;

/** All permissions except UNKNOWN */
const ALL_PERMISSIONS = Object.values(R).filter((p) => p !== R.UNKNOWN);

export interface PermissionPreset {
	id: string;
	label: string;
	permissions: VinistoHelperDllEnumsUserUserRights[];
}

export const PERMISSION_PRESETS: PermissionPreset[] = [
	{
		id: 'customer',
		label: 'E-shop Customer',
		permissions: [],
	},
	{
		id: 'superadmin',
		label: 'Superadmin',
		permissions: ALL_PERMISSIONS,
	},
	{
		id: 'marketing',
		label: 'Marketing',
		permissions: [
			R.USER_ADMIN_USER,
			R.USER_SUPPLIER,
			R.USER_CUSTOMER,
			R.USER_ADMIN_CATEGORY,
			R.USER_ADMIN_EVALUATION,
			R.USER_ADMIN,
			R.USER_ADMIN_PRODUCT,
			R.USER_ADMIN_BUNDLE,
			R.USER_ADMIN_HOMEPAGE,
			R.USER_ADMIN_TAG,
			R.USER_ADMIN_SPECIFICATION,
			R.USER_ADMIN_IMAGE,
			R.USER_ADMIN_ORDER,
			R.USER_ADMIN_WAREHOUSE,
			R.USER_ADMIN_CACHE,
			R.USER_ADMIN_SUPPLIER_CERTIFICATES,
			R.USER_ADMIN_DISCOUNT,
			R.USER_FLEXI_BEE_EXPORT_ADMIN,
			R.USER_BANNER_EDITOR,
			R.USER_COUPON_EDITOR,
			R.USER_ADMIN_CMS,
			R.USER_ADMIN_STOCKING,
			R.USER_ADMIN_CMS_TAGS,
			R.USER_ADMIN_GIFT_RULE,
			R.USER_ADMIN_SUPPLIER_TAGS,
			R.USER_ADMIN_SUBSCRIPTION,
			R.USER_ESHOP_ADMIN_TOOLBAR,
		],
	},
	{
		id: 'sales',
		label: 'Sales (TODO)',
		permissions: [],
	},
	{
		id: 'podpora',
		label: 'Podpora',
		permissions: [
			R.USER_ADMIN_USER,
			R.USER_SUPPLIER,
			R.USER_CUSTOMER,
			R.USER_ADMIN_CATEGORY,
			R.USER_ADMIN,
			R.USER_ADMIN_PRODUCT,
			R.USER_ADMIN_BUNDLE,
			R.USER_ADMIN_TAG,
			R.USER_ADMIN_SPECIFICATION,
			R.USER_ADMIN_ORDER,
			R.USER_ADMIN_WAREHOUSE,
			R.USER_ADMIN_CACHE,
			R.USER_ADMIN_FEE_RECORD,
			R.USER_ADMIN_DISCOUNT,
			R.USER_ADMIN_BILLING,
			R.USER_ADMIN_IMPORTER,
			R.USER_COUPON_EDITOR,
			R.USER_ORDER_STORNO,
			R.USER_ADMIN_STOCKING,
			R.USER_RUN_CRON,
			R.USER_ADMIN_ORDER_FEES,
			R.USER_ADMIN_SUBSCRIPTION,
			R.USER_ESHOP_ADMIN_TOOLBAR,
		],
	},
];
