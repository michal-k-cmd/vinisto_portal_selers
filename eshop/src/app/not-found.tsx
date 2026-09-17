'use client';

import LinkWidgetBar from 'pages-spa/LinkWidgetBar';
import Navbar from 'Components/Navbar';
import BottomNavigation from 'Components/BottomNavigation';
import ScrollToTop from 'Services/RoutingService/Components/ScrollToTop';
import AppFooter from 'Components/Footer';
import NotFound from 'pages-spa/NotFound';

const NotFoundPage = () => (
	<LinkWidgetBar>
		<Navbar />
		<BottomNavigation />
		<ScrollToTop />
		<NotFound />
		<AppFooter />
	</LinkWidgetBar>
);

export default NotFoundPage;
