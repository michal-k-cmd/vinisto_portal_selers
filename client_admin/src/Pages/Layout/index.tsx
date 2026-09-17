import { FC } from 'react';
import { includes } from 'lodash-es';
import { useLocation } from 'react-router-dom';
import {
	publicRoutes,
	registerRoutes,
} from 'Services/RoutingService/constants';
import Footer from 'Components/Footer';
import NavBar from 'Components/NavBar';
import RegisterNavBar from 'Components/RegisterNavBar';
import SideBar from 'Components/SideBar';

import { ILayoutProps } from './interfaces';

import './styles.css';

const Layout: FC<ILayoutProps> = ({ children }) => {
	const location = useLocation();

	const isPublicRoute = includes(publicRoutes, location.pathname);
	const isRegisterRoute = includes(registerRoutes, location.pathname);

	return (
		<div className="vca-layout">
			{(isPublicRoute || isRegisterRoute) && <RegisterNavBar />}
			{!isPublicRoute && !isRegisterRoute && <NavBar />}

			<div className="vca-content">
				<SideBar />
				<div className="vca-page-content">
					<div className="vca-page-content-wrap">{children}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Layout;
