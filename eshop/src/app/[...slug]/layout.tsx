import React from 'react';
import LinkWidgetBar from 'pages-spa/LinkWidgetBar';
import Navbar from 'Components/Navbar';
import BottomNavigation from 'Components/BottomNavigation';
import ScrollToTop from 'Services/RoutingService/Components/ScrollToTop';
import StorageUTM from 'Services/RoutingService/Components/StorageUTM';
import AppFooter from 'Components/Footer';

const EshopLayout = async ({ children }: { children: React.ReactNode }) => {
	return (
		<LinkWidgetBar>
			<Navbar />
			<BottomNavigation />
			<ScrollToTop />
			<StorageUTM />
			{children}
			<AppFooter />
		</LinkWidgetBar>
	);
};

export default EshopLayout;
