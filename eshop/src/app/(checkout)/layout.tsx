import React from 'react';
import Navbar from 'Components/Navbar';
import BottomNavigation from 'Components/BottomNavigation';
import ScrollToTop from 'Services/RoutingService/Components/ScrollToTop';
import StorageUTM from 'Services/RoutingService/Components/StorageUTM';
import AppFooter from 'Components/Footer';

const EshopLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<Navbar />
			<BottomNavigation />
			<ScrollToTop />
			<StorageUTM />
			{children}
			<AppFooter />
		</>
	);
};

export default EshopLayout;
