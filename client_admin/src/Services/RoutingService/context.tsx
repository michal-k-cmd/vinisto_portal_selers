import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import ModalProvider from 'Components/Modal/context';
import AuthorizationService from 'Services/AuthorizationService';
import Modal from 'Components/Modal';
import Layout from 'Pages/Layout';
import ScrollToTop from 'Helpers/scrollToTop';

// TODO: refactor - for now following needs to be in react-router context to use its data
const RouterContext: FC = () => {
	return (
		<AuthorizationService>
			<QueryParamProvider adapter={ReactRouter6Adapter}>
				<ModalProvider>
					<ScrollToTop />
					<Layout>
						<Modal />
						<Outlet />
					</Layout>
				</ModalProvider>
			</QueryParamProvider>
		</AuthorizationService>
	);
};

export default RouterContext;
