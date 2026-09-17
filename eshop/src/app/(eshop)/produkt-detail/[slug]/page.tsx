import api from 'vinisto_api_client/src/api';
import BundleDetail from 'pages-spa/Bundle/Components/BundleDetail';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import getIntl from 'app/intl';
import {
	OpenGraphItemType,
	XCardType,
} from 'Components/DocumentHeader/constants';
import Config from 'Config';
import { getBundleMetaServerSide } from 'pages-spa/Bundle/hooks/use-bundle-detail';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';
import { getLocalizedValue } from 'Hooks/useLocalizedValue';
import {
	getServerIsB2b,
	type ServerSearchParams,
} from 'Services/PlatformService/server';

import { convertMultiLangValues } from './helpers-server';

import {
	ProductApi,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsPriceLevel,
	VinistoProductDllModelsApiBundleBundleReturn,
} from '@/api-types/product-api';
import { bundleAdapter } from '@/index';
import { B2B_NUMERIC_CODE, B2C_NUMERIC_CODE } from '@/shared';

export const generateMetadata = async ({
	params,
	searchParams,
}: PagePropsWithSlug): Promise<Metadata> => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const isB2b = await getServerIsB2b(searchParams);

	const { slug } = await params;

	const cookie = await cookies();

	const currency =
		(cookie.get(prefix(LocalStorageKeys.ACTIVE_CURRENCY))
			?.value as VinistoHelperDllEnumsCurrency) ??
		VinistoHelperDllEnumsCurrency.CZK;

	const countryOfSale =
		currency === VinistoHelperDllEnumsCurrency.EUR
			? VinistoHelperDllEnumsCountryCode.SK
			: VinistoHelperDllEnumsCountryCode.CZ;

	const { bundle: bundleResponse } = await api
		.get<
			ProductApi.BundlesGetBundleByUrlList.ResponseBody,
			ProductApi.BundlesGetBundleByUrlList.RequestQuery
		>(
			`product-api/bundles/${slug}/get-bundle-by-url`,
			{
				IsCache: true,
				currency,
				countryOfSale,
				priceLevels: isB2b
					? []
					: [
							VinistoHelperDllEnumsPriceLevel.Level1,
							VinistoHelperDllEnumsPriceLevel.VinistoPlus,
					  ],
				showHiddenSpecification: false,
			},
			{
				headers: {
					['X-Api-Key']:
						(isB2b
							? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
							: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
				},
			}
		)
		.catch(() => {
			return {} as VinistoProductDllModelsApiBundleBundleReturn;
		});

	if (!bundleResponse) {
		return {};
	}

	const { bundleName, bundleMetaDescription, bundleUrl } =
		getBundleMetaServerSide(bundleResponse);

	const sortedBundleImagesInOriginalFormatAndResolution =
		bundleResponse.images
			?.sort((a) => (a.isMain ? -1 : 1))
			.map((image) => {
				return {
					src: image?.domainUrls?.original_png ?? '',
				};
			}) ?? [];

	const {
		isDiscounted,
		basePrice,
		discountedPrice,
		currency: bundlePriceCurrency,
	} = bundleAdapter.fromApi(bundleResponse, {
		currency,
		platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
		// TO FIX LATER: customerPriceLevel is not available here due to client side auth
	}).bundlePrices;

	const keywords = bundleResponse.keywords
		? getLocalizedValue(convertMultiLangValues(bundleResponse.keywords)) ||
		  undefined
		: undefined;

	return {
		title: `${t({ id: 'app.title.page' }, { title: bundleName })}`,
		description: bundleMetaDescription,
		keywords,
		twitter: {
			card: XCardType.summary,
			title: bundleName,
			description: bundleMetaDescription,
			images:
				'/cdn-cgi/image/format=jpeg/'.concat(
					sortedBundleImagesInOriginalFormatAndResolution[0]?.src
				) ?? `${Config.baseUrl}og.jpg`,
		},
		openGraph: {
			//type: OpenGraphItemType.product,
			// @ts-expect-error https://github.com/vercel/next.js/discussions/48314
			other: {
				['og:type']: OpenGraphItemType.product,
			},
			title: bundleName,
			url: `${Config.baseUrl}${t({
				id: 'routes.product.route',
			})}/${bundleUrl}`,
			description: bundleMetaDescription,
			images:
				'/cdn-cgi/image/format=jpeg/'.concat(
					sortedBundleImagesInOriginalFormatAndResolution[0]?.src
				) ?? `${Config.baseUrl}og.jpg`,
			productPriceAmount:
				(isDiscounted
					? basePrice?.valueWithVat
					: discountedPrice?.valueWithVat) ?? 0,
			productPriceCurrency: bundlePriceCurrency,
		},
		alternates: {
			canonical: `/${t({
				id: 'routes.product.route',
			})}/${bundleUrl}`,
		},
	};
};

export interface PagePropsWithParams<T> {
	params: Promise<T>;
	searchParams?: Promise<ServerSearchParams>;
}
export type PagePropsWithSlug = PagePropsWithParams<{ slug: string }>;

const ProductDetailSlugPage = async ({
	params,
	searchParams,
}: PagePropsWithSlug) => {
	const intl = await getIntl();
	const t = intl.formatMessage;

	const { slug } = await params;
	const cookie = await cookies();

	const isB2b = await getServerIsB2b(searchParams);

	const currency =
		(cookie.get(prefix(LocalStorageKeys.ACTIVE_CURRENCY))
			?.value as VinistoHelperDllEnumsCurrency) ??
		VinistoHelperDllEnumsCurrency.CZK;

	const countryOfSale =
		currency === VinistoHelperDllEnumsCurrency.EUR
			? VinistoHelperDllEnumsCountryCode.SK
			: VinistoHelperDllEnumsCountryCode.CZ;

	const { bundle: bundleResponse } = await api
		.get<
			ProductApi.BundlesGetBundleByUrlList.ResponseBody,
			ProductApi.BundlesGetBundleByUrlList.RequestQuery
		>(
			`product-api/bundles/${slug}/get-bundle-by-url`,
			{
				IsCache: true,
				currency,
				countryOfSale,
				priceLevels: isB2b
					? []
					: [
							VinistoHelperDllEnumsPriceLevel.Level1,
							VinistoHelperDllEnumsPriceLevel.VinistoPlus,
					  ],
				showHiddenSpecification: false,
			},
			{
				headers: {
					['X-Api-Key']:
						(isB2b
							? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
							: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
				},
			}
		)
		.catch(notFound);

	if (!bundleResponse) {
		return notFound();
	}

	const {
		isDiscounted,
		basePrice,
		discountedPrice,
		currency: bundlePriceCurrency,
	} = bundleAdapter.fromApi(bundleResponse, {
		currency,
		platformId: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
		// TO FIX LATER: customerPriceLevel is not available here due to client side auth
	}).bundlePrices;

	const { bundleName, bundleMetaDescription, bundleUrl } =
		getBundleMetaServerSide(bundleResponse);
	const productUrl = `${Config.baseUrl}${t({
		id: 'routes.product.route',
	})}/${bundleUrl}`;

	const sortedBundleImagesInOriginalFormatAndResolution =
		bundleResponse.images
			?.sort((a) => (a.isMain ? -1 : 1))
			.map((image) => {
				return {
					src: image?.domainUrls?.original_png ?? '',
				};
			}) ?? [];

	const evaluation = bundleResponse.bundleEvaluation;

	const keywords = bundleResponse.keywords
		? getLocalizedValue(convertMultiLangValues(bundleResponse.keywords)) ||
		  undefined
		: undefined;

	const breadcrumbs: Record<string, any> = [
		{
			'@type': 'ListItem',
			position: 1,
			name: Config.domainName,
			item: Config.baseUrl,
		},
	];

	//if (category) {
	//	breadcrumbs.push({
	//		'@type': 'ListItem',
	//		position: 2,
	//		name: getLocalizedValue(category?.name ?? []),
	//		item: `${Config.baseUrl}${t({
	//			id: 'routes.category.route',
	//		})}/${getLocalizedValue(category?.url ?? []) ?? ''}`,
	//	});
	//}
	breadcrumbs.push({
		'@type': 'ListItem',
		position: breadcrumbs.length + 1,
		name: bundleName,
	});

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: breadcrumbs,
		},
		{
			'@context': 'https://schema.org/',
			'@type': 'Product',
			name: bundleName,
			url: productUrl,
			image:
				sortedBundleImagesInOriginalFormatAndResolution[0]?.src ??
				`${Config.baseUrl}og.jpg`,
			description: bundleMetaDescription,
			keywords,
			aggregateRating: evaluation
				? {
						'@type': 'AggregateRating',
						ratingValue: evaluation?.averageStarsDecimal ?? 0,
						ratingCount: evaluation?.totalEvaluationCount ?? 0,
				  }
				: undefined,
			sku: bundleResponse.id ?? '',
			brand: {
				'@type': 'Brand',
				name: bundleName,
			},
			offers: {
				'@type': 'Offer',
				price:
					(isDiscounted && discountedPrice?.valueWithVat
						? discountedPrice.valueWithVat
						: basePrice?.valueWithVat) ?? 0,
				priceCurrency: bundlePriceCurrency,
				itemCondition: 'https://schema.org/NewCondition',
			},
		},
	];

	return (
		<>
			<script
				id="jsonLd/product"
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
			/>
			<BundleDetail bundleData={bundleResponse} />
		</>
	);
};

export default ProductDetailSlugPage;
