import type { VinistoCmsDllModelsApiReturnCmsImageReturn } from 'vinisto_api_client/src/api-types/cms-api';
import type { LinkWidget as LinkWidgetType } from 'vinisto_api_client/src/domain/link-widget';
import type { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';
import { Banner } from 'Services/Banner/interfaces';
import type { CarouselData } from 'Types/homepage';
import cx from 'classnames';
import LinkWidgetList from 'Components/link-widget';
import BannerUSP from 'pages-spa/Home/Components/BannerListUSP/Components/Banner';
import uspStyles from 'pages-spa/Home/Components/BannerListUSP/styles.module.css';
import BottomBanner from 'pages-spa/Home/Components/BannerListBottom/Banner';
import AdmintoolsProvider from 'providers/admintools/admintools-provider';

import CustomCarouselsClient from './CustomCarouselsClient';
import BannerListTopClient from './BannerListTopClient';
import ArticleTabsClient from './ArticleTabsClient';
import ModalRedirectHandler from './ModalRedirectHandler';
import HomeSectionDivider from './HomeSectionDivider';

import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
} from '@/api-types/product-api';

interface ArticleWithImage extends BlogArticlePreview {
	imageData: VinistoCmsDllModelsApiReturnCmsImageReturn | null;
}

interface ServerContext {
	language: string;
	countryOfSale: VinistoHelperDllEnumsCountryCode;
	currency: VinistoHelperDllEnumsCurrency;
	isMobile: boolean;
	isDesktop: boolean;
	isB2b: boolean;
}

interface HomeViewServerProps {
	serverContext: ServerContext;
	carouselData: CarouselData;
	topBannerData: Banner[];
	uspBannerData: Banner[];
	bottomBannerData: Banner[];
	linkWidgetsMobileData: LinkWidgetType[];
	linkWidgetsDesktopData: LinkWidgetType[];
	articleData: BlogArticlePreview[];
	articleImageData: Array<VinistoCmsDllModelsApiReturnCmsImageReturn | null>;
	homepageTitle: string;
	homepageDescription: string;
}

const mapLinkWidgets = (linkWidgets: LinkWidgetType[]) =>
	linkWidgets.map((link) => ({
		id: link.id,
		name: link.name,
		imageLocator: link.imageLocator,
		to: link.url,
		type: link.type,
	}));

const HomeViewServer = ({
	serverContext,
	carouselData,
	topBannerData,
	uspBannerData,
	bottomBannerData,
	linkWidgetsMobileData,
	linkWidgetsDesktopData,
	articleData,
	articleImageData,
	homepageTitle,
	homepageDescription,
}: HomeViewServerProps) => {
	const { isMobile, isDesktop, countryOfSale, currency, isB2b } = serverContext;

	const articlesWithImages: ArticleWithImage[] = articleData.map(
		(article, index) => ({
			...article,
			imageData: articleImageData[index],
		})
	);

	return (
		<section id="content-wrapper">
			<AdmintoolsProvider />

			<ModalRedirectHandler />
			{/* Top Banners Section */}
			<BannerListTopClient initialData={topBannerData} />

			{/* Mobile Link Widget Section */}
			{isMobile && linkWidgetsMobileData.length > 0 && (
				<>
					<HomeSectionDivider />
					<div className={cx('container', 'linkWidgetContainer-placeholder')}>
						<LinkWidgetList
							isLoading={false}
							linkWidgets={mapLinkWidgets(linkWidgetsMobileData)}
						/>
					</div>
				</>
			)}

			{/* USP Banner Section */}
			{uspBannerData.length > 0 && (
				<>
					<HomeSectionDivider />
					<div className={cx('container mt-1', uspStyles.container)}>
						{uspBannerData.map((banner, index, banners) => (
							<BannerUSP
								key={`${banner.title}-${index}`}
								title={banner.title}
								subtitle={banner.subtitle}
								url={banner.url}
								imageUrl={banner.imageUrl}
								itemsCount={banners.length}
								isLoading={false}
							/>
						))}
					</div>
				</>
			)}

			<h1 className="sr-only">{homepageTitle}</h1>
			<p className="sr-only">{homepageDescription}</p>

			{/* Desktop Link Widget Section */}
			{isDesktop && linkWidgetsDesktopData.length > 0 && (
				<>
					<HomeSectionDivider />
					<div className={cx('container', 'linkWidgetContainer-placeholder')}>
						<LinkWidgetList
							isLoading={false}
							linkWidgets={mapLinkWidgets(linkWidgetsDesktopData)}
						/>
					</div>
				</>
			)}

			{/* Top Carousels Section */}
			{!!carouselData.topCarousels.length && (
				<CustomCarouselsClient
					initialData={carouselData.topCarousels}
					countryOfSale={countryOfSale}
					currency={currency}
					position="topCarousels"
				/>
			)}

			{/* Bottom Banner Section */}
			{bottomBannerData.length > 0 && (
				<>
					<HomeSectionDivider />
					<div className="container">
						<div className="row row--my-shop">
							{bottomBannerData.map((banner, index) => (
								<div
									className="col--my-shop"
									key={
										banner.title + banner.subtitle + banner.position ||
										'bannerListBottom' + index
									}
								>
									<BottomBanner {...banner} />
								</div>
							))}
						</div>
					</div>
				</>
			)}

			{/* Bottom Carousels Section */}
			{!!carouselData.bottomCarousels.length && (
				<CustomCarouselsClient
					initialData={carouselData.bottomCarousels}
					countryOfSale={countryOfSale}
					currency={currency}
					position="bottomCarousels"
				/>
			)}

			{/* Article Tabs Section */}
			{!isB2b && <ArticleTabsClient initialData={articlesWithImages} />}
		</section>
	);
};

export default HomeViewServer;
