import { PAGE_URL as BLOG_ARTICLE_LIST_PAGE_URL } from 'Pages/BlogArticleList/constants';
import { BiCart, BiExport, BiImport } from 'react-icons/bi';
import {
	BsFileEarmarkImageFill,
	BsLayoutTextWindowReverse,
	BsReception4,
} from 'react-icons/bs';
import {
	FaCreditCard,
	FaFax,
	FaFileContract,
	FaList,
	FaListAlt,
	FaProductHunt,
	FaRegNewspaper,
	FaRunning,
	FaTags,
	FaUsers,
	FaUserShield,
} from 'react-icons/fa';
import { FiDatabase, FiGift, FiPackage, FiSettings } from 'react-icons/fi';
import {
	GiCarousel,
	GiCubes,
	GiFarmer,
	GiGunStock,
	GiPapers,
	GiWineBottle,
} from 'react-icons/gi';
import { ImBin } from 'react-icons/im';
import {
	MdApproval,
	MdBusiness,
	MdDeliveryDining,
	MdOutlineBusinessCenter,
} from 'react-icons/md';
import {
	RiCoupon2Fill,
	RiExchangeDollarFill,
	RiFlashlightLine,
	RiMoneyDollarBoxFill,
	RiTruckLine,
	RiWallet3Line,
} from 'react-icons/ri';
import { FaMoneyBill } from 'react-icons/fa';
import { IoMdRepeat } from 'react-icons/io';
import { TbCirclesRelation } from 'react-icons/tb';

import { SideBarMenuItemTopLevel } from './interfaces';
import GrVirtualMachineFixed from './Components/FixedIcons/GrVirtualMachineFixed';

import {
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserRights,
} from '@/api-types/user-api';

export const menuItems: SideBarMenuItemTopLevel[] = [
	{
		title: 'admin.sideBar.users',
		icon: FaUsers,
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
			VinistoHelperDllEnumsUserCompanyMerchantRights.UsersManagement,
		],
		chart: {
			mainLabel: 'charts.label.users',
			endpoints: [
				{
					url: 'user-api/users',
					label: 'charts.label.allUsers',
					backgroundColor: 'rgba(250, 4, 0, 0.4)',
					borderColor: 'rgba(250, 4, 0, 1)',
					secured: true,
				},
			],
		},
		items: [
			{
				icon: FaUsers,
				title: 'admin.sideBar.b2cCustomers',
				route: '/user-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER],
			},
			{
				icon: MdBusiness,
				title: 'admin.sideBar.b2bCustomers',
				route: '/b2b-customer-list',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
					VinistoHelperDllEnumsUserCompanyMerchantRights.UsersManagement,
				],
			},
			{
				icon: MdOutlineBusinessCenter,
				title: 'admin.sideBar.merchants',
				route: '/merchant-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER],
			},
			{
				icon: FaUserShield,
				title: 'admin.sideBar.systemAdmin',
				route: '/system-admin-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER],
			},
			{
				icon: GiFarmer,
				title: 'admin.sideBar.sellers',
				route: '/sellers-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER],
			},
		],
	},
	{
		title: 'admin.sideBar.basket',
		icon: BiCart,
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE,
			VinistoHelperDllEnumsUserUserRights.USER_CSO,
			VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
		],
		url: '/basket',
	},
	{
		title: 'admin.sideBar.itemsMangement',
		icon: FaProductHunt,
		chart: {
			mainLabel: 'charts.label.products',
			endpoints: [
				{
					url: 'product-api/products',
					label: 'charts.label.allProducts',
					backgroundColor: 'rgba(0, 201, 14, 0.4)',
					borderColor: 'rgba(0, 201, 14, 1)',
					secured: true,
					customQueryArguments: [
						{ key: 'IncludeDeleted', value: true },
						{ key: 'IncludeDisabled', value: true },
					],
					handler: null,
				},
				{
					url: 'product-api/products',
					label: 'charts.label.activeProducts',
					backgroundColor: 'rgba(0, 141, 14, 0.4)',
					borderColor: 'rgba(0, 141, 14, 1)',
					secured: true,
					customQueryArguments: [
						{ key: 'IncludeDeleted', value: false },
						{ key: 'IncludeDisabled', value: false },
					],
					handler: (item: { count: number }) => {
						return item.count ?? 0;
					},
				},
				{
					url: 'product-api/bundles/get-bundles',
					label: 'charts.label.allBundles',
					backgroundColor: 'rgba(255, 99, 132, 0.4)',
					borderColor: 'rgba(255, 99, 132, 1)',
					secured: false,
					handler: null,
					method: 'post',
					customQueryArguments: {
						IncludeDeleted: true,
						IncludeDisabled: true,
						limit: 1,
						offset: 0,
					},
				},
				{
					url: 'product-api/bundles/get-bundles',
					label: 'charts.label.allActiveBundles',
					backgroundColor: 'rgba(115, 99, 132, 0.4)',
					borderColor: 'rgba(115, 99, 132, 1)',
					secured: false,
					handler: null,
					method: 'post',
					customQueryArguments: {
						IncludeDeleted: false,
						IncludeDisabled: false,
						limit: 1,
						offset: 0,
					},
				},
				{
					url: 'user-api/users',
					label: 'charts.label.allUsers',
					backgroundColor: 'rgba(255, 99, 132, 0.4)',
					borderColor: 'rgba(255, 99, 132, 1)',
					secured: true,
					handler: null,
				},
			],
		},
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_PRODUCT,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_WAREHOUSE,
		],
		items: [
			{
				icon: GiWineBottle,
				title: 'admin.sideBar.productList',
				route: '/product-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_PRODUCT],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.bundleList',
				route: '/bundle-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.discountedBundleList',
				route: '/discounted-bundle-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.warehouseBundleList',
				route: '/warehouse-bundle-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_WAREHOUSE],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.hallwayBundleList',
				route: '/hallway-bundle-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE],
			},
			{
				icon: IoMdRepeat,
				title: 'admin.allBundleMovements.title',
				route: '/bundle-movements',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE],
			},
		],
	},
	{
		title: 'admin.sideBar.financeManagement',
		icon: RiCoupon2Fill,
		chart: {
			mainLabel: 'charts.label.feeRecords',
			endpoints: [
				{
					url: 'supplier-api/fee-records',
					label: 'charts.label.allFeeRecord',
					backgroundColor: 'rgba(99, 99, 99, 0.4)',
					borderColor: 'rgba(99, 99, 99, 1)',
					secured: true,
					handler: null,
				},
			],
		},
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST,
			VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RECORD,
			VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE,
			VinistoHelperDllEnumsUserUserRights.USER_CSO,
			VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
		],
		items: [
			{
				icon: MdApproval,
				title: 'admin.sideBar.orderToApproveList',
				route: '/order-to-approve-list',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE,
					VinistoHelperDllEnumsUserUserRights.USER_CSO,
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation,
				],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.orderList',
				route: '/order-list',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
					VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation,
				],
			},
			{
				icon: FaFileContract,
				title: 'admin.sideBar.contractWithdrawalRequestList',
				route: '/contract-withdrawal-request-list',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST,
				],
			},
			{
				icon: RiCoupon2Fill,
				title: 'admin.sideBar.couponList',
				route: '/discount-coupon-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR],
			},

			{
				icon: RiCoupon2Fill,
				title: 'admin.sideBar.supplierCouponList',
				route: '/supplier-discount-coupon-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_SELLER_COUPON_EDITOR],
			},

			{
				icon: FaMoneyBill,
				title: 'admin.sideBar.voucherList',
				route: '/voucher-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR],
			},

			{
				icon: FaFax,
				title: 'admin.sideBar.automaticCouponList',
				route: '/discount-coupon-auto-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR],
			},
			{
				icon: RiMoneyDollarBoxFill,
				title: 'admin.sideBar.fees',
				route: '/fee-record-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RECORD],
			},
			{
				icon: RiMoneyDollarBoxFill,
				title: 'admin.sideBar.feesNamed',
				route: '/fee-record-named-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RECORD],
			},
			{
				icon: RiCoupon2Fill,
				title: 'admin.sideBar.exchangeRateList',
				route: '/exchange-rate-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER],
			},
		],
	},
	{
		title: 'admin.sideBar.rules',
		icon: FiGift,
		rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE],
		items: [
			{
				icon: FiGift,
				title: 'admin.sideBar.gifts',
				route: '/gifts',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE],
			},
			{
				icon: RiTruckLine,
				title: 'admin.sideBar.deliveryRules',
				route: '/delivery-rule-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE],
			},
			{
				icon: TbCirclesRelation,
				title: 'admin.sideBar.relatedProducts',
				route: '/related-products',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE],
			},
		],
	},
	{
		title: 'VinistoPlus',
		icon: RiExchangeDollarFill,
		rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SUBSCRIPTION],
		url: '/subscription-list',
	},
	{
		title: 'admin.sideBar.provisions',
		icon: RiExchangeDollarFill,
		chart: {
			mainLabel: 'admin.sideBar.provisions',
			endpoints: [
				{
					url: 'supplier-api/fee-records',
					label: 'charts.label.allFeeRecord',
					backgroundColor: 'rgba(99, 99, 99, 0.4)',
					borderColor: 'rgba(99, 99, 99, 1)',
					secured: true,
					handler: null,
				},
			],
		},
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
		],
		items: [
			{
				icon: RiWallet3Line,
				title: 'admin.sideBar.sellingRules',
				route: '/selling-rules',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
				],
			},
			{
				icon: RiTruckLine,
				title: 'admin.sideBar.logisticRules',
				route: '/logistic-rules',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
				],
			},

			{
				icon: RiFlashlightLine,
				title: 'admin.sideBar.dynamicSellingRules',
				route: '/dynamic-selling-rules',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
					VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
				],
			},
		],
	},

	{
		title: 'admin.sideBar.supplierManagement',
		icon: GiFarmer,
		chart: {
			mainLabel: 'charts.label.suppliers',
			endpoints: [
				{
					url: 'supplier-api/suppliers',
					label: 'charts.label.allSuppliers',
					backgroundColor: 'rgba(132, 132, 132, 0.4)',
					borderColor: 'rgba(132, 132, 132, 1)',
					secured: true,
					handler: null,
				},
			],
		},
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
		],
		items: [
			{
				icon: GiFarmer,
				title: 'admin.sideBar.supplierList',
				route: '/supplier-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER],
			},
			{
				icon: FiPackage,
				title: 'admin.sideBar.billingList',
				route: '/billing-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER],
			},
			{
				icon: GiGunStock,
				title: 'admin.sideBar.stockRequestList',
				route: '/stock-request-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING],
			},
			{
				icon: BsReception4,
				title: 'admin.sideBar.sellersStats',
				route: '/sellers-stats',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER],
			},
		],
	},
	{
		title: 'admin.sideBar.cms',
		icon: BsLayoutTextWindowReverse,
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS,
			VinistoHelperDllEnumsUserUserRights.USER_BANNER_EDITOR,
		],
		items: [
			{
				icon: FaRegNewspaper,
				title: 'admin.sideBar.cms.blog',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS],
				items: [
					{
						icon: GiPapers,
						title: 'admin.sideBar.cms.articleList',
						route: BLOG_ARTICLE_LIST_PAGE_URL,
					},
					{
						icon: FaTags,
						rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS_TAGS],
						title: 'admin.sideBar.tagList',
						route: '/cms-blog-tags',
					},
					{
						icon: BsFileEarmarkImageFill,
						rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS],
						title: 'admin.sideBar.imageList',
						route: '/image-list',
					},
				],
			},
			{
				icon: BsFileEarmarkImageFill,
				title: 'admin.sideBar.bannerList',
				route: '/banner-list',
			},
		],
	},
	{
		title: 'admin.sideBar.lists',
		icon: GiCubes,
		chart: {
			mainLabel: 'charts.label.users',
			endpoints: [
				{
					url: 'user-api/users',
					label: 'charts.label.allUsers',
					backgroundColor: 'rgba(255, 99, 132, 0.4)',
					borderColor: 'rgba(255, 99, 132, 1)',
					secured: true,
					handler: null,
				},
				{
					url: 'order-api/deliveries',
					label: 'charts.label.allDeliveries',
					backgroundColor: 'rgba(255, 255, 132, 0.4)',
					borderColor: 'rgba(255, 255, 132, 1)',
					secured: false,
					handler: null,
				},
				{
					url: 'order-api/payments',
					label: 'charts.label.allPayments',
					backgroundColor: 'rgba(255, 99, 0, 0.4)',
					borderColor: 'rgba(255, 99, 0, 1)',
					secured: true,
					handler: null,
				},
				{
					url: 'product-api/admin/specifications',
					label: 'charts.label.allSpecifications',
					backgroundColor: 'rgba(32, 199, 132, 0.4)',
					borderColor: 'rgba(32, 199, 132, 1)',
					secured: true,
					handler: null,
				},
			],
		},
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_TAG,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SPECIFICATION,
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING,
		],
		items: [
			{
				icon: MdDeliveryDining,
				title: 'admin.sideBar.deliveryListEshop',
				route: '/delivery-list-eshop',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER],
			},
			{
				icon: MdDeliveryDining,
				title: 'admin.sideBar.deliveryListSupplier',
				route: '/delivery-list-supplier',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING],
			},
			{
				icon: FaCreditCard,
				title: 'admin.sideBar.paymentList',
				route: '/payment-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER],
			},
			{
				icon: FaList,
				title: 'admin.sideBar.specificationsList',
				route: '/specification-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SPECIFICATION],
			},
			{
				icon: FaTags,
				title: 'admin.sideBar.tagList',
				route: '/tag-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_TAG],
			},
			/* {
				icon: BsFillTagsFill,
				title: 'admin.sideBar.tagHomepageList',
				route: '/tag-homepage-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE],
			}, */
			{
				icon: FaListAlt,
				title: 'admin.sideBar.categoryList',
				route: '/category-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY],
			},
			/* {
				icon: FaRegListAlt,
				title: 'admin.sideBar.categoryHomePageList',
				route: '/category-homepage-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE],
			}, */
			{
				icon: GiCarousel,
				title: 'admin.sideBar.customCarouselsHomePageList',
				route: '/custom-carousels-homepage-list',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE],
			},
			{
				icon: FaRunning,
				title: 'admin.sideBar.linkWidgetList',
				route: '/link-widget-list',
			},
			{
				icon: GrVirtualMachineFixed,
				title: 'admin.virtualCategory.title',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY],
				url: '/virtual-category-list',
			},
		],
	},
	{
		title: 'admin.sideBar.importExport',
		icon: FiDatabase,
		rights: [
			VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER,
			VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
		],
		items: [
			{
				icon: BiImport,
				title: 'admin.sideBar.importUpgatesContact',
				route: '/import-upgates-contact',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER],
			},
			{
				icon: BiImport,
				title: 'admin.sideBar.importWarehouse',
				route: '/import-warehouse',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER],
			},
			{
				icon: BiImport,
				title: 'admin.sideBar.importProductsOrBundles',
				route: '/import-products-or-bundles',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER],
			},
			{
				icon: BiImport,
				title: 'admin.sideBar.importSpecifications',
				route: '/import-specifications',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER],
			},
			{
				icon: BiExport,
				title: 'admin.sideBar.exportInvoices',
				route: '/export-invoices',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
				],
			},
			{
				icon: BiExport,
				title: 'admin.sideBar.exportInvoicesResellers',
				route: '/export-invoices-resellers',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
				],
			},
			{
				icon: BiExport,
				title: 'admin.sideBar.exportBillingsVicom',
				route: '/export-billings-vicom',
				rights: [
					VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
				],
			},
			{
				icon: BiExport,
				title: 'admin.sideBar.exportOrders',
				route: '/export-orders',
			},
			{
				icon: BiExport,
				title: 'admin.sideBar.exportUsers',
				route: '/export-users',
			},
		],
	},
	{
		title: 'admin.sideBar.settings',
		icon: FiSettings,
		chart: {
			mainLabel: 'admin.sideBar.settings',
			endpoints: [],
		},
		rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CACHE],
		items: [
			{
				icon: ImBin,
				title: 'admin.sideBar.clearCache',
				route: '/clear-cache',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CACHE],
			},
			{
				icon: IoMdRepeat,
				title: 'admin.sideBar.sync',
				route: '/sync-warehouse',
				rights: [VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CACHE],
			},
		],
	},
];
