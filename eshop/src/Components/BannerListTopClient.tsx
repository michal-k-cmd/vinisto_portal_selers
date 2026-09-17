'use client';

import { useContext } from 'react';
import { Banner } from 'Services/Banner/interfaces';
import { DeviceServiceContext } from 'Services/DeviceService';
import BannerCarousel from 'pages-spa/Home/Components/BannerListTop/Banner/BannerCarousel';
import TopBanner from 'pages-spa/Home/Components/BannerListTop/Banner';
import styles from 'pages-spa/Home/Components/BannerListTop/styles.module.css';
import { HOME_PAGE_PROMO_CAROUSEL } from 'Components/CarouselArticles/constants';

interface BannerListTopClientProps {
	initialData: Banner[];
}

const BannerListTopClient = ({ initialData }: BannerListTopClientProps) => {
	const { isMobile, isTablet } = useContext(DeviceServiceContext);

	// Data is already fetched on the server, no need for useQuery or isLoading checks here.

	if (!initialData || initialData.length === 0) {
		// Optionally render nothing or a placeholder if no data is passed
		return null;
	}

	return isMobile || isTablet ? (
		// Mobile/Tablet View: Use BannerCarousel
		<BannerCarousel
			carouselType={HOME_PAGE_PROMO_CAROUSEL}
			data={initialData}
			// isLoading={false} // No loading state needed here
		/>
	) : (
		// Desktop View: Use Grid Layout
		<div className="container">
			<div className={styles.topBannerContainer}>
				{initialData.map((banner, index) => (
					<div
						key={`${banner.title}-${banner.position}-${index}`}
						className={styles.bannerCardWrapper}
					>
						<TopBanner
							{...banner}
							cardOrder={index + 1}
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default BannerListTopClient;
