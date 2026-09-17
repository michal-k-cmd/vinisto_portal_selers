import {
	FaFileInvoice,
	FaPercent,
	FaProductHunt,
	FaTable,
	FaUserFriends,
	//FaWarehouse,
} from 'react-icons/fa';
import { FiPackage } from 'react-icons/fi';
import { ImFilesEmpty } from 'react-icons/im';
import { IoMdSettings } from 'react-icons/io';
import {
	MdMenuBook,
	MdOutlineLanguage,
	MdPercent,
	MdShoppingBag,
} from 'react-icons/md';
import { IoStatsChart } from 'react-icons/io5';
import { RiBroadcastFill } from 'react-icons/ri';
import { MenuItem } from 'Components/SideBar/Components/SideBarContent/interfaces';
import { storageServiceInstance } from 'Services/StorageService';
import { LocalStorageKeys } from 'Services/StorageService/constants';

const insertMktPackages = (menuItems: MenuItem[]) => {
	const activeSupplier = storageServiceInstance.getStorageItem(
		LocalStorageKeys.ACTIVE_SUPPLIER
	);
	if (activeSupplier) {
		//@ts-expect-error Rewrites specific line
		menuItems[3].items[1] = {
			icon: MdShoppingBag,
			title: 'admin.sideBar.marketingPlans',
			route: 'https://ads.vinisto.cz/vinisto-mkt/?prodejceId=' + activeSupplier,
			action: null,
		};
	}
	return menuItems;
};

/**
 * !!! Changing order or adding new items breaks insertMktPackages function!!!
 * Update it accordingly
 */
const menuItems: MenuItem[] = [
	{
		title: 'admin.sideBar.overview',
		icon: IoStatsChart,
		route: '/',
	},
	{
		title: 'admin.sideBar.productsManagement',
		icon: FaProductHunt,
		items: [
			{
				icon: FaTable,
				title: 'admin.sideBar.productList',
				route: '/bundle-list',
				action: null,
			},
			/* {
				icon: FaWarehouse,
				title: 'admin.sideBar.warehouse',
				route: '/warehouse-list',
				action: null,
			}, */
			{
				icon: ImFilesEmpty,
				title: 'admin.sideBar.stockRequest',
				route: '/stock-request-list',
				action: null,
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.setList',
				route: '/set-list',
				action: null,
			},
		],
	},
	{
		title: 'admin.sideBar.billing',
		icon: FaFileInvoice,
		items: [
			{
				icon: FaUserFriends,
				title: 'admin.sideBar.billingAndInvoices',
				route: '/billing',
				action: null,
			},
			{
				icon: FaPercent,
				title: 'admin.sideBar.commissions',
				route: '/commissions',
				action: null,
			},
		],
	},
	{
		title: 'admin.sideBar.marketing',
		icon: RiBroadcastFill,
		items: [
			{
				icon: MdPercent,
				title: 'admin.sideBar.discountCoupons',
				route: '/discount-coupons',
				action: null,
			},
			{
				icon: MdShoppingBag,
				title: 'admin.sideBar.marketingPlans',
				route: 'https://ads.vinisto.cz/vinisto-mkt/?prodejceId=',
				action: null,
			},
			{
				icon: MdMenuBook,
				title: 'admin.sideBar.manuals',
				route: 'https://www.vinisto.cz/vinisto-prodejce',
				action: null,
			},
		],
	},
	{
		title: 'admin.sideBar.settings',
		icon: IoMdSettings,
		items: [
			{
				icon: MdOutlineLanguage,
				title: 'admin.sideBar.settings',
				route: '/settings',
				action: null,
			},
		],
	},
];

export { menuItems, insertMktPackages };
