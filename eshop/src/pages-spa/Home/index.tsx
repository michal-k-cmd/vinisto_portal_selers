'use client';

import cx from 'classnames';
import CarouselSection from 'Components/CarouselSection';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import {
	ProductApi,
	VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns,
} from 'vinisto_api_client/src/api-types/product-api';
import { LocalizationContext } from 'Services/LocalizationService';
import { WarehouseContext } from 'Services/WarehouseService';
import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { DeviceServiceContext } from 'Services/DeviceService';
import { HorizontalRule } from 'vinisto_ui';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import { DEFAULT_BUNDLE_API_PARAMS } from 'vinisto_api_client/src/shared';
import api from 'vinisto_api_client/src/api';
import { bundleAdapter } from 'vinisto_api_client/src/index';
import ArticleTabs from 'pages-spa/Home/Components/ArticleTabs';
import BannerListBottom from 'pages-spa/Home/Components/BannerListBottom';
import BannerListTop from 'pages-spa/Home/Components/BannerListTop';
import BannerListUSP from 'pages-spa/Home/Components/BannerListUSP';
import LinkWidget from 'pages-spa/Home/Components/LinkWidget';
import { THRESHOLD_TOP_CAROUSELS } from 'pages-spa/Home/constants';
import styles from 'pages-spa/Home/styles.module.css';
import { useUrlControlledModal } from 'Hooks/use-url-controlled-modal';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useIsB2b } from 'Services/PlatformService';

const HomePage = () => {
	const _ = useUrlControlledModal();
	const isB2b = useIsB2b();

	const { isMobile, isTablet, isDesktop } = useContext(DeviceServiceContext);
	const localizationContext = useContext(LocalizationContext);
	const {
		activeCurrency: { currency },
		countryOfSale,
	} = localizationContext;
	const warehouseContext = useContext(WarehouseContext);
	const getLocalizedValue = useLocalizedValue();
	const { priceLevel } = useContext(AuthenticationContext).vinistoUser;

	const customCarouselsQuery = useQuery(
		['customCarousels', { countryOfSale, currency, priceLevel }],
		async () => {
			const response = await api.get<
				ProductApi.HomePageCustomCarouselsList.ResponseBody,
				ProductApi.HomePageCustomCarouselsList.RequestQuery
			>('product-api/home-page/custom-carousels', {
				...DEFAULT_BUNDLE_API_PARAMS,
				IsCache: true,
				Limit: 20,
				SortingColumn:
					VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns.SEQUENCE_NUMBER,
				CountryOfSale: countryOfSale,
				Currency: currency,
			});

			if (response.isError) return Promise.reject(response.error);

			const uniqueIds = Array.from(
				new Set(
					(response.homePageCustomCarousels ?? [])
						.flatMap((carousel) => carousel.bundles ?? [])
						.map((bundle) => bundle.id)
				)
			).filter((id): id is string => Boolean(id));

			warehouseContext.fetchQuantity(uniqueIds);

			const topCarousels = response.homePageCustomCarousels
				?.filter(
					(carousel) =>
						(carousel.sequenceNumber ?? 0) <= THRESHOLD_TOP_CAROUSELS
				)
				.map((carousel) => ({
					...carousel,
					bundles:
						carousel.bundles?.map((bundle) =>
							bundleAdapter.fromApi(bundle, {
								currency,
								customerPriceLevel: priceLevel,
							})
						) ?? [],
				}));

			const bottomCarousels = response.homePageCustomCarousels
				?.filter(
					(carousel) => (carousel.sequenceNumber ?? 0) > THRESHOLD_TOP_CAROUSELS
				)
				.map((carousel) => ({
					...carousel,
					bundles:
						carousel.bundles?.map(
							(bundle) =>
								bundleAdapter.fromApi(bundle, {
									currency,
									customerPriceLevel: priceLevel,
								}),
							{
								currency,
							}
						) ?? [],
				}));

			return { topCarousels, bottomCarousels };
		}
	);

	return (
		<section id="content-wrapper">
			<BannerListTop />
			<div className="container mt-2">
				<HorizontalRule className="mb-0 mt-0" />
			</div>

			{(isTablet || isMobile) && (
				<>
					<div className={cx('container', styles.linkWidgetContainer)}>
						<LinkWidget section={Allowed_Sections.HOMEPAGE_MOBILE} />
					</div>
					<div className="container">
						<HorizontalRule />
					</div>
				</>
			)}

			<BannerListUSP />
			<div className="container mt-2">
				<HorizontalRule className="mt-0" />
			</div>
			{isDesktop && (
				<>
					<div className={cx('container', styles.linkWidgetContainer)}>
						<LinkWidget section={Allowed_Sections.HOMEPAGE_DESKTOP} />
					</div>
					<div className="container">
						<HorizontalRule />
					</div>
				</>
			)}

			{!!customCarouselsQuery?.data?.topCarousels?.length && (
				<>
					{customCarouselsQuery?.data?.topCarousels?.map((carousel, index) => (
						<CarouselSection
							key={`topCarousels-${carousel?.id}-${index}`}
							data={carousel?.bundles ?? []}
							title={getLocalizedValue(carousel?.name)}
							isLoading={customCarouselsQuery.isLoading}
							analyticsListId={`homepage_top_carousel_${carousel?.id}`}
							analyticsListName={getLocalizedValue(carousel?.name)}
						/>
					))}
					<div className="container">
						<HorizontalRule />
					</div>
				</>
			)}

			<BannerListBottom />
			<div className="container">
				<HorizontalRule />
			</div>
			{!!customCarouselsQuery?.data?.bottomCarousels?.length && (
				<>
					{customCarouselsQuery?.data?.bottomCarousels?.map(
						(carousel, index) => (
							<CarouselSection
								key={`bottomCarousels-${carousel?.id}-${index}`}
								data={carousel?.bundles ?? []}
								title={getLocalizedValue(carousel?.name)}
								// TODO: Enable loading state (this never happens now due to line 195)
								isLoading={customCarouselsQuery.isLoading}
								analyticsListId={`homepage_bottom_carousel_${carousel?.id}`}
								analyticsListName={getLocalizedValue(carousel?.name)}
							/>
						)
					)}
					<div className="container">
						<HorizontalRule />
					</div>
				</>
			)}

			{!isB2b && (
				<div className="container">
					<div className="row">
						<ArticleTabs />
					</div>
				</div>
			)}
		</section>
	);
};

export default HomePage;
