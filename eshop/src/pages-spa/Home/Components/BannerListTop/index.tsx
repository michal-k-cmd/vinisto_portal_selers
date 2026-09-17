import { useContext, useMemo } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Banner } from 'Services/Banner/interfaces';
import { HOME_PAGE_PROMO_CAROUSEL } from 'Components/CarouselArticles/constants';
import { BANNER_POSITION } from 'Services/Banner/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import BannerService from 'Services/Banner';
import { DeviceServiceContext } from 'Services/DeviceService';

import { BANNERS_QUERY_KEY, LIMIT } from '../BannerListTop/constants';

import TopBanner from './Banner';
import bannerStyles from './Banner/styles.module.css';
import styles from './styles.module.css';
import BannerCarousel from './Banner/BannerCarousel';

const BannerListTop = () => {
	const deviceServiceContext = useContext(DeviceServiceContext);

	const getLocalizedValue = useLocalizedValue();

	const bannerService = useMemo(
		() => new BannerService(getLocalizedValue),
		[getLocalizedValue]
	);

	const bannerQuery = useQuery<Banner[]>(
		[BANNERS_QUERY_KEY],
		bannerService.fetch(BANNER_POSITION.TOP, LIMIT)
	);

	return deviceServiceContext.isMobile || deviceServiceContext.isTablet ? (
		<BannerCarousel
			carouselType={HOME_PAGE_PROMO_CAROUSEL}
			data={bannerQuery.data}
			isLoading={bannerQuery.isLoading}
		/>
	) : (
		<div className="container">
			<div className={styles.topBannerContainer}>
				{bannerQuery.isLoading
					? [...Array(LIMIT)].map((_, i) => (
							<div
								key={'bancarutop' + i}
								className={styles.bannerCardWrapper}
							>
								<Skeleton
									className={cx(styles.skeleton, bannerStyles.card, {
										[bannerStyles.primaryCard]: i === 0,
										[bannerStyles.secondaryCard]: i > 0,
									})}
								/>
							</div>
					  ))
					: bannerQuery.data?.map((banner, index) => (
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

export default BannerListTop;
