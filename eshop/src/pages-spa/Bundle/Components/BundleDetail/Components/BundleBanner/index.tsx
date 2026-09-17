import { useMemo } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useQuery } from '@tanstack/react-query';
import { Banner } from 'Services/Banner/interfaces';
import { BANNER_POSITION } from 'Services/Banner/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import BannerService from 'Services/Banner';
import USPBanner from 'pages-spa/Home/Components/BannerListUSP/Components/Banner';
import { VARIANTS } from 'pages-spa/Home/Components/BannerListUSP/Components/Banner/constants';

import {
	BANNERS_LIMIT,
	BANNERS_QUERY_KEY,
	USP_BANNERS_LIMIT,
	USP_BANNERS_QUERY_KEY,
	USP_BANNERS_SKELETON_COUNT,
} from '../BundleBanner/constants';

import BundleBanner from './Banner';
import styles from './styles.module.css';

const BannerListProduct = () => {
	const getLocalizedValue = useLocalizedValue();

	const bannerService = useMemo(
		() => new BannerService(getLocalizedValue),
		[getLocalizedValue]
	);

	const bannerQuery = useQuery<Banner[]>(
		[BANNERS_QUERY_KEY],
		bannerService.fetch(BANNER_POSITION.PRODUCT_DETAIL)
	);

	const uspBannerQuery = useQuery<Banner[]>(
		[USP_BANNERS_QUERY_KEY],
		bannerService.fetch(BANNER_POSITION.PRODUCT_DETAIL_USP, USP_BANNERS_LIMIT)
	);

	const uspBannersPlaceholder = useMemo(() => {
		return new Array(
			Math.max(USP_BANNERS_SKELETON_COUNT, uspBannerQuery.data?.length ?? 0)
		)
			.fill(null)
			.map((_, i) => ({
				isLoading: uspBannerQuery.isLoading,
				...(uspBannerQuery.data ? { ...uspBannerQuery.data[i] } : {}),
			}));
	}, [uspBannerQuery.data, uspBannerQuery.isLoading]);

	const shouldRenderUspBanners = uspBannersPlaceholder.some(
		({ isLoading, title }) => isLoading || title
	);

	return (
		<>
			{bannerQuery.isLoading
				? [...Array(BANNERS_LIMIT)].map((_, i) => (
						<Skeleton
							className="vinisto-card"
							key={'banload' + i}
						/>
				  ))
				: bannerQuery.data?.map((banner: Banner, index) => (
						<div
							className={styles.bundleBanner}
							key={banner.title + banner.position || 'banload2' + index}
						>
							<BundleBanner {...banner} />
						</div>
				  ))}
			{shouldRenderUspBanners && (
				<div className={styles.uspBannersContainer}>
					{uspBannersPlaceholder.map(
						(
							{
								isLoading,
								url = '',
								subtitle = '',
								title = '',
								imageUrl = '',
								srcSet = '',
							},
							i
						) =>
							isLoading || title ? (
								<USPBanner
									isNext
									isLoading={isLoading}
									url={url}
									subtitle={subtitle}
									title={title}
									imageUrl={imageUrl}
									srcSet={srcSet}
									variant={VARIANTS.PRODUCT_DETAIL}
									key={'banlistusp' + i}
								/>
							) : null
					)}
				</div>
			)}
		</>
	);
};

export default BannerListProduct;
