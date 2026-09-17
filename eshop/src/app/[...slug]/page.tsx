import { type Metadata } from 'next';
import StrapiService from 'vinisto_api_client/src/strapi-service';
import NotFoundPage from 'pages-spa/NotFound';
import StrapiPage from 'pages-spa/StrapiPage';
import getIntl from 'app/intl';
import { OpenGraphItemType } from 'Components/DocumentHeader/constants';
import Config from 'Config';
import StrapiLandingPage from 'pages-spa/StrapiLandingPage';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import {
	availableLanguage,
	DEFAULT_LANGUAGE,
} from 'Services/LocalizationService/constants';

const MAX_TIMESTAMP = 8_640_000_000_000_000;

const getLocale = (topLevelDomain: string) => {
	if (topLevelDomain == availableLanguage.sk) return 'sk';
	return availableLanguage.cs;
};

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
	const h = await headers();
	const topLevelDomain = h.get('host')?.split('.').pop() || DEFAULT_LANGUAGE;
	const intl = await getIntl();
	const slugParams = await params;
	const slug = slugParams.slug.join('/').toLowerCase();

	// Ignore Next.js static asset requests
	if (slug.startsWith('_next/')) {
		return {};
	}

	let strapiLanding = null;
	let strapiPage = null;

	try {
		const landingResponse = await StrapiService.getLanding(
			slug,
			getLocale(topLevelDomain)
		);
		if (landingResponse?.data?.data && landingResponse.data.data.length > 0) {
			const post = landingResponse.data.data[0];

			if (post.Publication_date_from || post.Publication_date_to) {
				const now = new Date();
				const fromDate = new Date(post.Publication_date_from ?? new Date(0));
				const toDate = new Date(
					post.Publication_date_to ?? new Date(MAX_TIMESTAMP)
				);

				if (now < fromDate || now > toDate) {
					return {};
				}
			}
			strapiLanding = post;
		} else {
			const pageResponse = await StrapiService.getPage(slug);
			if (pageResponse?.data?.data && pageResponse.data.data.length > 0) {
				strapiPage = pageResponse.data.data[0];
			}
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error fetching page data:', error);
	}

	const page = strapiLanding || strapiPage;

	if (!page) {
		return {};
	}

	const t = intl.formatMessage;

	let OG_title = page.Title;
	let OG_description = page.Description;

	//there is no OG title or description/title in old page structure
	if (strapiLanding) {
		OG_title = strapiLanding.OG_title
			? strapiLanding.OG_title
			: strapiLanding.Title;
		OG_description = strapiLanding.OG_description
			? strapiLanding.OG_description
			: strapiLanding.Description;
	}

	return {
		title: `${t({ id: 'app.title.page' }, { title: page.Title })}`,
		description: page.Description,
		twitter: {
			title: page.Title,
			description: page.Description,
			images: page.Social_media_image
				? `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${page.Social_media_image?.url}`
				: `${Config.baseUrl}og.jpg`,
		},
		openGraph: {
			type: OpenGraphItemType.article,
			title: OG_title ? OG_title : page.Title,

			description: OG_description ? OG_description : page.Description,
			url: `${Config.baseUrl}${slug}`,

			images: page.Social_media_image
				? `${process.env.NEXT_PUBLIC_STRAPI_API_IMAGE_URI}${page.Social_media_image?.url}`
				: `${Config.baseUrl}og.jpg`,
		},
		alternates: {
			canonical: `/${slug}`,
		},
	};
}

interface ProxyPageProps {
	params: Promise<{
		slug: string[];
	}>;
}

const ProxyPage = async ({ params }: ProxyPageProps) => {
	const h = await headers();
	const topLevelDomain = h.get('host')?.split('.').pop() || DEFAULT_LANGUAGE;
	const slugParams = await params;
	const slug = slugParams.slug.join('/').toLowerCase();

	// Ignore Next.js static asset requests
	if (slug.startsWith('_next/')) {
		return <NotFoundPage />;
	}

	let strapiLanding = null;
	let strapiPage = null;
	let redirectUrl = null;

	try {
		const landingResponse = await StrapiService.getLanding(
			slug,
			getLocale(topLevelDomain)
		);
		if (landingResponse?.data?.data && landingResponse.data.data.length > 0) {
			const post = landingResponse.data.data[0];
			if (post.Publication_date_from || post.Publication_date_to) {
				const now = new Date();
				const fromDate = new Date(post.Publication_date_from ?? new Date(0));
				const toDate = new Date(
					post.Publication_date_to ?? new Date(MAX_TIMESTAMP)
				);

				if (now < fromDate || now > toDate) {
					redirectUrl = post.Redirect_url;
				} else {
					strapiLanding = post;
				}
			} else {
				strapiLanding = post;
			}
		} else {
			const pageResponse = await StrapiService.getPage(slug);
			if (pageResponse?.data?.data && pageResponse.data.data.length > 0) {
				strapiPage = pageResponse.data.data[0];
			}
		}
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error fetching page data:', error);
	} finally {
		if (redirectUrl) {
			redirect(redirectUrl);
		}
	}

	if (strapiPage) {
		return (
			<StrapiPage
				page={strapiPage}
				slug={slug}
			/>
		);
	}

	if (strapiLanding) {
		return (
			<StrapiLandingPage
				page={strapiLanding}
				slug={slug}
			/>
		);
	}

	return <NotFoundPage />;
};

export default ProxyPage;
