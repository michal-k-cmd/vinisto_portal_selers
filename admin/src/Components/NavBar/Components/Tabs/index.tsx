import { useContext } from 'react';
import { includes } from 'Helpers/lodash';
import { Params, useLocation, useParams } from 'react-router-dom';
import { NavPath } from 'Components/NavBar/interfaces';
import { PAGE_URL as BLOG_ARTICLE_LIST_PAGE_URL } from 'Pages/BlogArticleList/constants';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';

import './styles.css';

const getLocalizedPath = (
	pathname: string,
	params: Params<string>
): NavPath => {
	if (includes(pathname, 'warehouse-bundle-detail')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.warehouseBundle.subTab.detail',
		};
	}
	if (includes(pathname, 'warehouse-bundle-list')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.warehouseBundle.subTab.list',
		};
	}
	if (includes(pathname, 'bundle-detail')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.bundle.subTtab.detail',
		};
	}
	if (includes(pathname, 'discounted-bundle-list')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.discountedBundle.subTtab.list',
		};
	}
	if (includes(pathname, 'hallway-bundle-list')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.sideBar.hallwayBundleList',
		};
	}
	if (includes(pathname, 'bundle-movements')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.allBundleMovements.title',
		};
	}
	if (includes(pathname, 'bundle-list')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.bundle.subTtab.list',
		};
	}
	if (includes(pathname, 'product-detail')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.product.subTtab.detail',
		};
	}
	if (includes(pathname, 'product-list')) {
		return {
			main: 'admin.header.items.tab',
			sub: 'admin.header.product.subTtab.list',
		};
	}
	if (includes(pathname, 'tag-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.tag.subTtab.detail',
		};
	}
	if (includes(pathname, 'tag-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.tag.subTtab.list',
		};
	}
	if (includes(pathname, 'tag-homepage-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.tagHp.subTtab.list',
		};
	}
	if (includes(pathname, 'user-list')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.b2cCustomer.tab',
		};
	}
	if (includes(pathname, 'b2b-customer-list')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.b2bCustomer.tab',
		};
	}
	if (includes(pathname, 'merchant-list')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.merchant.tab',
		};
	}
	if (includes(pathname, 'user-detail')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.user.subTtab.detail',
		};
	}
	if (includes(pathname, 'b2b-customer-detail')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.b2bCustomer.subTtab.detail',
		};
	}
	if (includes(pathname, 'merchant-detail')) {
		return {
			main: 'admin.sideBar.users',
			sub: 'admin.header.merchant.subTtab.detail',
		};
	}
	if (includes(pathname, 'basket')) {
		return {
			main: 'admin.sideBar.basket',
		};
	}
	if (includes(pathname, 'order-to-approve-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.orderToApproval.subTtab.list',
		};
	}
	if (includes(pathname, 'contract-withdrawal-request')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.sideBar.contractWithdrawalRequestList',
		};
	}
	if (includes(pathname, 'order-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.order.subTtab.list',
		};
	}
	if (includes(pathname, 'exchange-rate-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.exchangeRate.subTtab.list',
		};
	}
	if (includes(pathname, 'order-detail')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.order.subTtab.detail',
		};
	}
	if (includes(pathname, 'gifts')) {
		return {
			main: 'admin.sideBar.rules',
			sub: 'admin.sideBar.gifts',
		};
	}
	if (includes(pathname, 'delivery-rule-list')) {
		return {
			main: 'admin.sideBar.rules',
			sub: 'admin.sideBar.deliveryRules',
		};
	}
	if (includes(pathname, 'related-products')) {
		return {
			main: 'admin.sideBar.rules',
			sub: 'admin.sideBar.relatedProducts',
		};
	}
	if (includes(pathname, 'gift-rule-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.sideBar.gifts',
		};
	}
	if (includes(pathname, 'gift-rule-detail')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.sideBar.giftDetail',
		};
	}
	if (includes(pathname, 'virtual-category-list')) {
		return {
			main: 'admin.sideBar.lists',
			sub: 'admin.virtualCategory.title',
		};
	}
	if (includes(pathname, 'category-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.category.subTtab.list',
		};
	}
	if (includes(pathname, 'category-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.category.subTtab.detail',
		};
	}
	if (includes(pathname, 'category-homepage-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.categoryHp.subTtab.list',
		};
	}
	if (includes(pathname, 'delivery-list-supplier')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.sideBar.deliveryListSupplier',
		};
	}
	if (includes(pathname, 'delivery-list-eshop')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.sideBar.deliveryListEshop',
		};
	}
	if (includes(pathname, 'delivery-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.delivery.subTtab.detail',
		};
	}
	if (includes(pathname, 'supplier-discount-coupon-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.supplierCoupon.subTtab.list',
		};
	}
	if (includes(pathname, 'voucher-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.voucher.subTtab.list',
		};
	}
	if (includes(pathname, 'voucher-detail')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.voucher.subTtab.detail',
		};
	}
	if (includes(pathname, 'discount-coupon-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.coupon.subTtab.list',
		};
	}
	if (includes(pathname, 'discount-coupon-detail')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.coupon.subTtab.detail',
		};
	}
	if (includes(pathname, 'discount-coupon-auto-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.couponAuto.subTtab.list',
		};
	}
	if (includes(pathname, 'fee-record-list')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.feeRecords.subTab.list',
		};
	}
	if (includes(pathname, 'fee-record-detail')) {
		return {
			main: 'admin.header.finance.tab',
			sub: 'admin.header.feeRecords.subTab.detail',
		};
	}
	if (includes(pathname, 'supplier-list')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.supplier.subTab.list',
		};
	}
	if (includes(pathname, 'dynamic-selling-rules')) {
		return {
			main: 'admin.sideBar.provisions',
			sub: 'admin.sideBar.dynamicSellingRules',
		};
	}
	if (includes(pathname, 'bundles-without-selling-rules')) {
		return {
			main: 'admin.sideBar.provisions',
			sub: 'admin.sideBar.bundlesWithoutSellingRules',
		};
	}
	if (includes(pathname, 'selling-rules')) {
		return {
			main: 'admin.sideBar.provisions',
			sub: 'admin.sideBar.sellingRules',
		};
	}
	if (includes(pathname, 'logistic-rules')) {
		return {
			main: 'admin.sideBar.provisions',
			sub: 'admin.sideBar.logisticRules',
		};
	}
	if (includes(pathname, 'supplier-detail')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.supplier.subTab.detail',
		};
	}
	if (includes(pathname, 'fee-rule-list')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.feeRules.subTab.list',
		};
	}
	if (includes(pathname, 'fee-rule-detail')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.feeRules.subTab.detail',
		};
	}
	if (includes(pathname, 'stock-request-list')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.stockRequest.subTab.list',
		};
	}
	if (includes(pathname, 'stock-request-detail')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.stockRequest.subTab.detail',
		};
	}
	if (includes(pathname, 'sellers-stats')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.stats',
		};
	}
	if (includes(pathname, 'custom-carousels-homepage-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.sideBar.customCarouselsHomePageList',
		};
	}
	if (includes(pathname, 'custom-carousels-homepage-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.sideBar.customCarouselsHomePageList.detail',
		};
	}
	if (includes(pathname, 'link-widget-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.sideBar.linkWidgetList',
		};
	}
	if (includes(pathname, 'link-widget-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.linkWidgetDetail',
		};
	}
	if (includes(pathname, 'payment-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.payment.subTtab.list',
		};
	}
	if (includes(pathname, 'payment-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.payment.subTtab.detail',
		};
	}
	if (includes(pathname, 'specification-list')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.specifications.subTab.list',
		};
	}
	if (includes(pathname, 'specification-detail')) {
		return {
			main: 'admin.header.listings.tab',
			sub: 'admin.header.specifications.subTab.detail',
		};
	}
	if (includes(pathname, 'custom-carousels-homepage-list')) {
		return {
			main: 'admin.header.customCarousels.tab',
			sub: 'admin.header.customCarousels.subTab.homepage',
		};
	}
	if (includes(pathname, BLOG_ARTICLE_LIST_PAGE_URL)) {
		return {
			main: 'admin.header.cms.tab',
			sub: 'admin.header.cms.subTab.article.list',
		};
	}
	if (includes(pathname, 'blog/article-detail')) {
		return {
			main: 'admin.header.cms.tab',
			sub:
				params?.id === undefined
					? 'admin.header.cms.subTab.article.create'
					: 'admin.header.cms.subTab.article.detail',
		};
	}
	if (includes(pathname, 'banner-list')) {
		return {
			main: 'admin.header.cms.tab',
			sub: 'admin.header.cms.subTab.banner.list',
		};
	}
	if (includes(pathname, 'image-list')) {
		return {
			main: 'admin.header.cms.tab',
			sub: 'admin.header.cms.subTab.fileManager',
		};
	}
	if (includes(pathname, 'import-warehouse')) {
		return {
			sub: 'admin.header.importExport.subTab.importWarehouse',
		};
	}
	if (includes(pathname, 'import-products-or-bundles')) {
		return {
			sub: 'admin.header.importExport.subTab.importProductsOrBundles',
		};
	}
	if (includes(pathname, 'import-specifications')) {
		return {
			sub: 'admin.header.importExport.subTab.importSpecifications',
		};
	}
	if (includes(pathname, 'export-invoices-resellers')) {
		return {
			sub: 'admin.header.importExport.subTab.exportInvoicesResellers',
		};
	}
	if (includes(pathname, 'export-invoices')) {
		return {
			sub: 'admin.header.importExport.subTab.exportInvoices',
		};
	}
	if (includes(pathname, 'export-billings-vicom')) {
		return {
			sub: 'admin.header.importExport.subTab.exportBillingsVicom',
		};
	}
	if (includes(pathname, 'export-orders')) {
		return {
			sub: 'admin.header.importExport.subTab.exportOrders',
		};
	}
	if (includes(pathname, 'billing-list')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.header.billingList',
		};
	}
	if (includes(pathname, 'billing-detail')) {
		return {
			main: 'admin.header.supplier.tab',
			sub: 'admin.billing.billingDetail',
		};
	}
	if (includes(pathname, 'subscription-list')) {
		return {
			main: 'VinistoPlus',
			sub: 'overview',
		};
	}

	return {
		main: 'admin.header.dashboard.tab',
	};
};

const NavTabs = () => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const deviceServiceContext = useContext(DeviceServiceContext);

	const params = useParams();
	const { pathname } = useLocation();
	const t = useFormatMessage();

	const { main, sub } = getLocalizedPath(pathname, params);

	return (
		<div className="main-nav-tabs">
			<div className="main-nav-tab">
				{!deviceServiceContext.isMobile &&
					main &&
					`${t({ id: main })}${sub ? ` / ` : ''}`}
				{typeof sub === 'string' ? `${t({ id: sub })}` : sub}
			</div>
		</div>
	);
};

export default NavTabs;
