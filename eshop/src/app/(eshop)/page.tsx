import { type Metadata } from 'next';
import getIntl from 'app/intl';
import Config from 'Config';
import {
	OpenGraphItemType,
	XCardType,
} from 'Components/DocumentHeader/constants';
import { cookies, headers } from 'next/headers';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import {
	getServerIsB2b,
	type ServerSearchParams,
} from 'Services/PlatformService/server';

import HomeViewServer from '../../Components/HomeViewServer';

import {
	getArticles,
	getArticleTitleImages,
	getBottomBanners,
	getHomepageCarouselsCached,
	getLinkWidgets,
	getTopBanners,
	getUspBanners,
} from './helpers';

import { Allowed_Sections } from '@/domain/link-widget/enums';
import {
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsLanguage,
} from '@/api-types/product-api';

export const generateMetadata = async (): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	return {
		title: `${t({ id: 'app.title.name' })}`,
		description: `${t({ id: 'app.description' })}`,
		twitter: {
			card: XCardType.summary,
			title: Config.domainName,
			description: `${t({ id: 'app.description' })}`,
		},
		openGraph: {
			type: OpenGraphItemType.website,
			title: Config.domainName,
			description: `${t({ id: 'app.description' })}`,
			url: Config.baseUrl,
			images: `${Config.baseUrl}og.jpg`,
		},
		alternates: {
			canonical: `/`,
		},
	} satisfies Metadata;
};

const Home = async ({
	searchParams,
}: {
	searchParams?: Promise<ServerSearchParams>;
}) => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const h = await headers();
	const isB2b = await getServerIsB2b(searchParams);
	const deviceType = h.get('x-device-type') as 'desktop' | 'mobile';

	const cookie = await cookies();

	const currency =
		(cookie.get(prefix(LocalStorageKeys.ACTIVE_CURRENCY))
			?.value as VinistoHelperDllEnumsCurrency) ??
		VinistoHelperDllEnumsCurrency.CZK;

	const countryOfSale =
		currency === VinistoHelperDllEnumsCurrency.EUR
			? VinistoHelperDllEnumsCountryCode.SK
			: VinistoHelperDllEnumsCountryCode.CZ;

	const language = VinistoHelperDllEnumsLanguage.CZECH;

	const [
		carouselData,
		topBannerData,
		uspBannerData,
		bottomBannerData,
		linkWidgetsMobileData,
		linkWidgetsDesktopData,
		articleData,
	] = await Promise.all([
		getHomepageCarouselsCached(countryOfSale, currency, isB2b),
		getTopBanners(language, isB2b),
		getUspBanners(language, isB2b),
		getBottomBanners(language, isB2b),
		getLinkWidgets(Allowed_Sections.HOMEPAGE_MOBILE, isB2b),
		getLinkWidgets(Allowed_Sections.HOMEPAGE_DESKTOP, isB2b),
		getArticles(),
	]);

	const articleImageIds = articleData
		.map((article) => article.titleImageId)
		.filter((id: string | undefined | null): id is string => !!id);
	const articleImageData = await getArticleTitleImages(articleImageIds);

	const serverContext = {
		language,
		countryOfSale,
		currency,
		isMobile: deviceType === 'mobile',
		isDesktop: deviceType !== 'mobile',
		isB2b,
	};

	return (
		<HomeViewServer
			serverContext={serverContext}
			carouselData={carouselData}
			topBannerData={topBannerData}
			uspBannerData={uspBannerData}
			bottomBannerData={bottomBannerData}
			linkWidgetsMobileData={linkWidgetsMobileData}
			linkWidgetsDesktopData={linkWidgetsDesktopData}
			articleData={articleData}
			articleImageData={articleImageData}
			homepageTitle={t({ id: 'app.title.name' })}
			homepageDescription={t({ id: 'homepage.seo.description' })}
		/>
	);
};

export default Home;
