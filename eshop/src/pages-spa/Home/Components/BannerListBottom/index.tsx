import { useMemo } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { BANNER_POSITION } from 'Services/Banner/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import BannerService from 'Services/Banner';

import { BANNERS_QUERY_KEY, LIMIT } from './constants';
import BottomBanner from './Banner';
import bannerStyles from './Banner/styles.module.css';
import styles from './styles.module.css';

const BannerListBottom = () => {
	const getLocalizedValue = useLocalizedValue();

	const bannerService = useMemo(
		() => new BannerService(getLocalizedValue),
		[getLocalizedValue]
	);

	const bannerQuery = useQuery(
		[BANNERS_QUERY_KEY],
		bannerService.fetch(BANNER_POSITION.BOTTOM, LIMIT)
	);
	return (
		<div className="container">
			<div className="row row--my-shop">
				{bannerQuery.isLoading
					? [...Array(LIMIT)].map((_, i) => (
							<Skeleton
								containerClassName="col--my-shop"
								className={cx(
									'vinisto-card',
									bannerStyles.card,
									styles.skeleton
								)}
								key={'banlistbtmskl' + i}
							/>
					  ))
					: bannerQuery.data?.map((banner, index) => (
							<div
								className="col--my-shop"
								key={
									banner.title + banner.subtitle + banner.position ||
									'banlistbtmi' + index
								}
							>
								<BottomBanner {...banner} />
							</div>
					  ))}
			</div>
		</div>
	);
};

export default BannerListBottom;
