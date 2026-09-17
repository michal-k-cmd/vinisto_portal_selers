import { FC, useContext } from 'react';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { AuthenticationContextValues } from 'Services/AuthenticationService/interfaces';
import { LOGIN } from 'Services/RoutingService/constants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import RouterContext from 'Services/RoutingService/context';
import bundleDetailLoader from 'Pages/BundleDetail/loader';
import stockRequestDetailLoader from 'Pages/StockRequestDetail/loader';
import BillingDetailPage from 'Pages/BillingDetail';
import BillingListPage from 'Pages/BillingList';
import BundleDetailPage from 'Pages/BundleDetail';
import BundleDetailContextProvider from 'Pages/BundleDetail/context';
import BundleListPage from 'Pages/BundleList';
import WarehouseListPage from 'Pages/WarehouseList';
import ContactPage from 'Pages/Contact';
import DashBoardPage from 'Pages/DashBoard';
import FaqPage from 'Pages/Faq';
import LogInPage from 'Pages/LogIn';
import NotFoundPage from 'Pages/NotFound';
import OrderDetailPage from 'Pages/OrderDetail';
import OrderListPage from 'Pages/OrderList';
import OverviewPage from 'Pages/Overview';
import RegisterPage from 'Pages/Register';
import SettingsPage from 'Pages/Settings';
import StockRequestDetailPage from 'Pages/StockRequestDetail';
import StockRequestDetailContextProvider from 'Pages/StockRequestDetail/context';
import StockRequestListPage from 'Pages/StockRequestList';
import DiscountCouponsListPage from 'Pages/DiscountCouponsList';
import RequireAuth from 'Services/AuthenticationService/requireAuth';
import SetListPage from 'Pages/SetList';
import SetDetailPage from 'Pages/SetDetail';
import CommissionsListPage from 'Pages/CommissionsList';

const router = (authenticationContext: AuthenticationContextValues) =>
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
					path={LOGIN}
					element={<LogInPage />}
				/>

				<Route path="/register">
					<Route
						path="step/:step"
						element={<RegisterPage />}
					></Route>
					<Route
						path=""
						element={<Navigate to="step/1" />}
					/>
					<Route
						path="*"
						element={<Navigate to="step/1" />}
					/>
				</Route>

				<Route
					path="/overview"
					element={
						<RequireAuth>
							<OverviewPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/bundle-detail/:id"
					element={
						<RequireAuth>
							<BundleDetailContextProvider>
								<BundleDetailPage />
							</BundleDetailContextProvider>
						</RequireAuth>
					}
					loader={bundleDetailLoader(
						authenticationContext.vinistoUser?.loginHash ?? ''
					)}
				/>
				<Route
					path="/bundle-list"
					element={
						<RequireAuth>
							<BundleListPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/warehouse-list"
					element={
						<RequireAuth>
							<WarehouseListPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/stock-request-list"
					element={
						<RequireAuth>
							<StockRequestListPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/stock-request-detail/:id"
					element={
						<RequireAuth>
							<StockRequestDetailContextProvider>
								<StockRequestDetailPage />
							</StockRequestDetailContextProvider>
						</RequireAuth>
					}
					loader={stockRequestDetailLoader(
						authenticationContext.vinistoUser?.loginHash ?? ''
					)}
				/>

				<Route
					path="/billing"
					element={
						<RequireAuth>
							<BillingListPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/commissions"
					element={
						<RequireAuth>
							<CommissionsListPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/billing/:id"
					element={
						<RequireAuth>
							<BillingDetailPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/order/"
					element={
						<RequireAuth>
							<OrderListPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/order/:id"
					element={
						<RequireAuth>
							<OrderDetailPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/discount-coupons"
					element={
						<RequireAuth>
							<DiscountCouponsListPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/settings"
					element={
						<RequireAuth>
							<SettingsPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/set-list"
					element={
						<RequireAuth>
							<SetListPage />
						</RequireAuth>
					}
				/>

				<Route
					path="/set-detail"
					element={
						<RequireAuth>
							<SetDetailPage mode="CREATE" />
						</RequireAuth>
					}
				/>

				<Route
					path="/set-detail/:id"
					element={
						<RequireAuth>
							<SetDetailPage mode="EDIT" />
						</RequireAuth>
					}
				/>

				<Route
					path="/faq"
					element={<FaqPage />}
				/>
				<Route
					path="/contact"
					element={<ContactPage />}
				/>

				<Route
					path="*"
					element={<NotFoundPage />}
				/>
			</Route>
		)
	);

const RoutingService: FC = () => (
	<RouterProvider router={router(useContext(AuthenticationContext))} />
);

export default RoutingService;
