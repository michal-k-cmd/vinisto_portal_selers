import { useContext } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { IAuthenticationContextValues } from 'Services/AuthenticationService/interfaces';
import { PAGE_URL as BLOG_ARTICLE_LIST_PAGE_URL } from 'Pages/BlogArticleList/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import blogArticleLoader from 'Pages/BlogArticleDetail/loader';
import bundleLoader from 'Pages/BundleList/loader';
import categoryLoader from 'Pages/CategoryDetail/loader';
import cmsImageListLoader from 'Pages/ImageList/loader';
import BannerListPage from 'Pages/BannerList';
import BlogArticleDetailPage from 'Pages/BlogArticleDetail';
import BlogArticleDetailContextProvider from 'Pages/BlogArticleDetail/context';
import BlogArticleListPage from 'Pages/BlogArticleList';
import BundleDetailPage from 'Pages/BundleDetail';
import BundleListPage from 'Pages/BundleList';
import DiscountedBundleListPage from 'Pages/DiscountedBundleList';
import CategoryDetailPage from 'Pages/CategoryDetail';
import CategoryHomePageList from 'Pages/CategoryHomePageList';
import CategoryListPage from 'Pages/CategoryList';
import ClearCachePage from 'Pages/ClearCache';
import SyncWarehousePage from 'Pages/SyncWarehouse';
import CustomCarouselsHomePageDetail from 'Pages/CustomCarouselsHomePageDetail';
import CustomCarouselsHomePageList from 'Pages/CustomCarouselsHomePageList';
import LinkWidgetDetailPage from 'Pages/LinkWidgetDetail';
import DashBoardPage from 'Pages/DashBoard';
import DeliveryDetailPage from 'Pages/DeliveryDetail';
import DeliveryListPage from 'Pages/DeliveryList';
import DiscountCouponAutoListPage from 'Pages/DiscountCouponAutoList';
import DiscountCouponDetailPage from 'Pages/DiscountCouponDetail';
import DiscountCouponListPage from 'Pages/DiscountCouponList';
import ExchangeRateListPage from 'Pages/ExchangeRateList';
import ExportInvoicesPage from 'Pages/ExportInvoices';
import ExportInvoicesResellerPage from 'Pages/ExportInvoicesResellers';
import ExportOrdersPage from 'Pages/ExportOrders';
import FeeRecordDetailPage from 'Pages/FeeRecordDetail';
import FeeRecordListPage from 'Pages/FeeRecordList';
import FeeRecordNamedListPage from 'Pages/FeeRecordNamedList';
import ImageListPage from 'Pages/ImageList';
import ImportProductsOrBundlesPage from 'Pages/ImportProductsOrBundles';
import ImportUpgatesContactPage from 'Pages/ImportUpgatesContact';
import ImportWarehousePage from 'Pages/ImportWarehouse';
import LogInPage from 'Pages/LogIn';
import NotFoundPage from 'Pages/NotFound';
import OrderDetailPage from 'Pages/OrderDetail';
import OrderListPage from 'Pages/OrderList';
import PaymentDetailPage from 'Pages/PaymentDetail';
import PaymentListPage from 'Pages/PaymentList';
import ProductDetailPage from 'Pages/ProductDetail';
import ProductListPage from 'Pages/ProductList';
import SpecificationDetailPage from 'Pages/SpecificationDetail';
import SpecificationListPage from 'Pages/SpecificationList';
import SupplierDetailPage from 'Pages/SupplierDetail';
import SupplierListPage from 'Pages/SupplierList';
import StockRequestListPage from 'Pages/StockRequestList';
import StockRequestDetailPage from 'Pages/StockRequestDetail';
import TagDetailPage from 'Pages/TagDetail';
import TagHomePageListPage from 'Pages/TagHomePageList';
import TagListPage from 'Pages/TagList';
import UserDetailPage from 'Pages/UserDetail';
import UserListPage from 'Pages/UserList';
import BlogTagListPage from 'Pages/BlogTagList';
import WarehouseBundleListPage from 'Pages/WarehouseBundleList';
import WarehouseItemDetailPage from 'Pages/WarehouseItemDetail';
import RequirePermissions from 'Services/AuthorizationService/Components/RequirePermissions';
import BlogTagDetailPage from 'Pages/BlogTagDetail';
import { DeliveryListType } from 'Pages/DeliveryList/interfaces';
import ExportUsers from 'Pages/ExportUsers';
import LogListPage from 'Pages/BundleLogList';
import BillingListPage from 'Pages/BillingList';
import BillingDetailPage from 'Pages/BillingDetail';
import ContractWithdrawalRequestDetailPage from 'Pages/ContractWithdrawalRequestDetail';
import ContractWithdrawalRequestListPage from 'Pages/ContractWithdrawalRequestList';
import ExportInvoicesVicomPage from 'Pages/ExportInvoicesVicom';
import ImportSpecificationsPage from 'Pages/ImportSpecifications';
import LinkWidgetListPage from 'Pages/LinkWidgetList';
import BundleHallwayList from 'Pages/BundleHallwayList';
import SellersDashboard from 'Pages/SellersDashboard';
import SellingRulesPage from 'Pages/SellingRules';
import LogisticRulesPage from 'Pages/LogisticRules';
import DynamicSellingRulesPage from 'Pages/DynamicSellingRules';
import BundlesWithoutSellingRulesPage from 'Pages/BundlesWithoutSellingRules';
import GiftsPage from 'Pages/Gifts';
import DeliveryRulesPage from 'Pages/DeliveryRules';
import SubscriptionListPage from 'Pages/SubscriptionList';
import RelatedProductsPage from 'Pages/RelatedProducts';
import VirtualCategoryListPage from 'Pages/VirtualCategoryListPage';
import VoucherListPage from 'Pages/VoucherList';
import VoucherCouponDetailPage from 'Pages/VoucherDetail';
import {
	CREATE_B2B_CUSTOMER,
	CREATE_MERCHANT,
	CREATE_USER,
} from 'Components/Modal/constants';
import B2bCustomerList from 'Pages/B2BCustomerList';
import MerchantList from 'Pages/MerchantList';
import Basket from 'Pages/Basket';
import B2bBasketList from 'Pages/B2bBasketList';
import AllBundleMovementsPage from 'Pages/AllBundleMovements';

import RouterContext from './routerContext';

import {
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserRights,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';

const router = (authenticationContext: IAuthenticationContextValues) =>
	createBrowserRouter(
		createRoutesFromElements(
			<Route
				path="/"
				element={<RouterContext />}
			>
				<Route
					path="/"
					element={
						authenticationContext.isLoggedIn ? (
							<DashBoardPage />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route
					path="/login"
					element={<LogInPage />}
				/>
				<Route
					path="/user-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<UserDetailPage
								userType={VinistoHelperDllEnumsUserUserType.B2C}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/b2b-customer-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
								VinistoHelperDllEnumsUserCompanyMerchantRights.UsersManagement,
							]}
						>
							<UserDetailPage
								userType={VinistoHelperDllEnumsUserUserType.Company}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/merchant-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<UserDetailPage
								userType={VinistoHelperDllEnumsUserUserType.Merchant}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/user-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<UserListPage
								userType={VinistoHelperDllEnumsUserUserType.B2C}
								createModalType={CREATE_USER}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/b2b-customer-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
								VinistoHelperDllEnumsUserCompanyMerchantRights.UsersManagement,
							]}
						>
							<B2bCustomerList
								userType={VinistoHelperDllEnumsUserUserType.Company}
								createModalType={CREATE_B2B_CUSTOMER}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/merchant-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<MerchantList
								userType={VinistoHelperDllEnumsUserUserType.Merchant}
								createModalType={CREATE_MERCHANT}
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/system-admin-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<UserListPage
								userType={VinistoHelperDllEnumsUserUserType.B2C}
								createModalType={CREATE_USER}
								listSuperAdminsOnly
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/sellers-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<UserListPage
								userType={VinistoHelperDllEnumsUserUserType.B2C}
								createModalType={CREATE_USER}
								listSuppliersOnly
							/>
						</RequirePermissions>
					}
				/>
				<Route
					path="/basket"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE,
								VinistoHelperDllEnumsUserUserRights.USER_CSO,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
							]}
						>
							<Basket />
						</RequirePermissions>
					}
				/>
				<Route
					path="/product-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_PRODUCT,
							]}
						>
							<ProductDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/product-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_PRODUCT,
							]}
						>
							<ProductListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/bundle-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<BundleDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/bundle-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<BundleListPage />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path="/discounted-bundle-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<DiscountedBundleListPage />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path="/hallway-bundle-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<BundleHallwayList />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path="/order-to-approve-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_B2B_ORDERS_CREATE,
								VinistoHelperDllEnumsUserUserRights.USER_CSO,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation,
							]}
						>
							<B2bBasketList />
						</RequirePermissions>
					}
				/>
				<Route
					path="/order-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation,
							]}
						>
							<OrderListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/order-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation,
								VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation,
							]}
						>
							<OrderDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/contract-withdrawal-request-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST,
							]}
						>
							<ContractWithdrawalRequestListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/contract-withdrawal-request-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CONTRACT_WITHDRAWAL_REQUEST,
							]}
						>
							<ContractWithdrawalRequestDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/subscription-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SUBSCRIPTION,
							]}
						>
							<SubscriptionListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/virtual-category-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY,
							]}
						>
							<VirtualCategoryListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/billing-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<BillingListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/billing-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<BillingDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/delivery-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<DeliveryDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/delivery-list-eshop"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<DeliveryListPage transportBaseType={DeliveryListType.ESHOP} />
						</RequirePermissions>
					}
				/>
				<Route
					path="/delivery-list-supplier"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING,
							]}
						>
							<DeliveryListPage transportBaseType={DeliveryListType.STOCK} />
						</RequirePermissions>
					}
				/>
				<Route
					path="/discount-coupon-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
							]}
						>
							<DiscountCouponDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/discount-coupon-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
							]}
						>
							<DiscountCouponListPage showOnlySupplierCoupons={false} />
						</RequirePermissions>
					}
				/>
				<Route
					path="/supplier-discount-coupon-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_SELLER_COUPON_EDITOR,
							]}
						>
							<DiscountCouponListPage showOnlySupplierCoupons={true} />
						</RequirePermissions>
					}
				/>
				<Route
					path="/voucher-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
							]}
						>
							<VoucherListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/voucher-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
							]}
						>
							<VoucherCouponDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/discount-coupon-auto-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_COUPON_EDITOR,
							]}
						>
							<DiscountCouponAutoListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/exchange-rate-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<ExchangeRateListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/fee-record-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<FeeRecordListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/fee-record-named-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<FeeRecordNamedListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/gifts"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE,
							]}
						>
							<GiftsPage />
						</RequirePermissions>
					}
				/>

				<Route
					path="/delivery-rule-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE,
							]}
						>
							<DeliveryRulesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/fee-record-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<FeeRecordDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/selling-rules"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
							]}
						>
							<SellingRulesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/logistic-rules"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
							]}
						>
							<LogisticRulesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/dynamic-selling-rules"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_DYNAMIC_FEE_RULE,
							]}
						>
							<DynamicSellingRulesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/bundles-without-selling-rules"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_FEE_RULE,
							]}
						>
							<BundlesWithoutSellingRulesPage />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>

				<Route
					path="/supplier-detail/:id"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER]}
						>
							<SupplierDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/supplier-list"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER]}
						>
							<SupplierListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/stock-request-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING,
							]}
						>
							<StockRequestListPage />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path="/sellers-stats"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_SUPPLIER]}
						>
							<SellersDashboard />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path="/stock-request-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_STOCKING,
							]}
						>
							<StockRequestDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/payment-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<PaymentDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/payment-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_ORDER,
							]}
						>
							<PaymentListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/specification-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SPECIFICATION,
							]}
						>
							<SpecificationDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/specification-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_SPECIFICATION,
							]}
						>
							<SpecificationListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/warehouse-bundle-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_WAREHOUSE,
							]}
						>
							<WarehouseItemDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/warehouse-bundle-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_WAREHOUSE,
							]}
						>
							<WarehouseBundleListPage />
						</RequirePermissions>
					}
					loader={bundleLoader(authenticationContext?.vinistoUser?.loginHash)}
				/>
				<Route
					path={BLOG_ARTICLE_LIST_PAGE_URL}
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS]}
						>
							<BlogArticleListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/blog/article-detail/:id?"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS]}
						>
							<BlogArticleDetailContextProvider>
								<BlogArticleDetailPage />
							</BlogArticleDetailContextProvider>
						</RequirePermissions>
					}
					loader={blogArticleLoader(
						authenticationContext?.vinistoUser?.loginHash
					)}
				/>
				<Route
					path="/banner-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_BANNER_EDITOR,
							]}
						>
							<BannerListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/image-list"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS]}
						>
							<ImageListPage />
						</RequirePermissions>
					}
					loader={cmsImageListLoader(
						authenticationContext?.vinistoUser?.loginHash
					)}
				/>
				<Route
					path="/cms-blog-tags"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CMS_TAGS,
							]}
						>
							<BlogTagListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/cms-blog-tags/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY,
							]}
						>
							<BlogTagDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/tag-detail/:id"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_ADMIN_TAG]}
						>
							<TagDetailPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/tag-list"
					element={
						<RequirePermissions
							permissions={[VinistoHelperDllEnumsUserUserRights.USER_ADMIN_TAG]}
						>
							<TagListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/tag-homepage-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE,
							]}
						>
							<TagHomePageListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/category-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY,
							]}
						>
							<CategoryDetailPage />
						</RequirePermissions>
					}
					loader={categoryLoader}
				/>
				<Route
					path="/category-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CATEGORY,
							]}
						>
							<CategoryListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/category-homepage-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE,
							]}
						>
							<CategoryHomePageList />
						</RequirePermissions>
					}
				/>
				<Route
					path="/custom-carousels-homepage-list"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE,
							]}
						>
							<CustomCarouselsHomePageList />
						</RequirePermissions>
					}
				/>
				<Route
					path="/custom-carousels-homepage-detail/:id"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_HOMEPAGE,
							]}
						>
							<CustomCarouselsHomePageDetail />
						</RequirePermissions>
					}
				/>
				<Route
					path="/link-widget-list"
					element={<LinkWidgetListPage />}
				/>
				<Route
					path="/link-widget-detail/*"
					element={<LinkWidgetDetailPage />}
				/>
				<Route
					path="/related-products"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_GIFT_RULE,
							]}
						>
							<RelatedProductsPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/bundle-movements"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<AllBundleMovementsPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/import-upgates-contact"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER,
							]}
						>
							<ImportUpgatesContactPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/import-warehouse"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER,
							]}
						>
							<ImportWarehousePage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/import-products-or-bundles"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER,
							]}
						>
							<ImportProductsOrBundlesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/import-specifications"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_IMPORTER,
							]}
						>
							<ImportSpecificationsPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/export-invoices"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
							]}
						>
							<ExportInvoicesPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/export-invoices-resellers"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
							]}
						>
							<ExportInvoicesResellerPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/export-billings-vicom"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_FLEXI_BEE_EXPORT_ADMIN,
							]}
						>
							<ExportInvoicesVicomPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/export-orders"
					element={<ExportOrdersPage />}
				/>
				<Route
					path="/export-users"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_USER,
							]}
						>
							<ExportUsers />
						</RequirePermissions>
					}
				/>
				<Route
					path="/bundle-detail/logs/:bundleId"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_BUNDLE,
							]}
						>
							<LogListPage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/clear-cache"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CACHE,
							]}
						>
							<ClearCachePage />
						</RequirePermissions>
					}
				/>
				<Route
					path="/sync-warehouse"
					element={
						<RequirePermissions
							permissions={[
								VinistoHelperDllEnumsUserUserRights.USER_ADMIN_CACHE,
							]}
						>
							<SyncWarehousePage />
						</RequirePermissions>
					}
				/>
				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Route>
		)
	);

const Routing = () => {
	return <RouterProvider router={router(useContext(AuthenticationContext))} />;
};

export default Routing;
