import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryParamProvider } from 'Helpers/query-params';
import ModalProvider from 'Components/Modal/context';
import AuthorizationService from 'Services/AuthorizationService';
import Modal from 'Components/Modal';
import Layout from 'Pages/Layout';
import ErrorPage from 'Pages/Error';
import { useEffect, useState } from 'react';
import ScrollToTop from 'Helpers/scrollToTop';

const RouterContext = () => {
	const location = useLocation();

	const [locationKey, setLocationKey] = useState(location.key);

	useEffect(() => {
		setLocationKey(location.key);
	}, [location]);

	return (
		<AuthorizationService>
			<QueryParamProvider>
				<ScrollToTop />
				<ModalProvider>
					<Layout pathname={location.pathname}>
						<Modal />
						<ErrorBoundary
							fallback={<ErrorPage />}
							resetKeys={[locationKey]}
						>
							<Outlet />
						</ErrorBoundary>
					</Layout>
				</ModalProvider>
			</QueryParamProvider>
		</AuthorizationService>
	);
};

export default RouterContext;
