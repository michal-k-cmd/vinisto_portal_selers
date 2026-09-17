import { unstable_cache as cache } from 'next/cache';
import api from 'vinisto_api_client/src/api';
import {
	CmsApi,
	VinistoHelperDllEnumsCountryCode,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsSliderCarouselCarouselType,
} from 'vinisto_api_client/src/api-types/cms-api';
import {
	ProductApi,
	VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns,
} from 'vinisto_api_client/src/api-types/product-api';
import {
	BANNER_POSITION,
	GET_BANNERS_ENDPOINT,
} from 'Services/Banner/constants';
import { Banner } from 'Services/Banner/interfaces';
import BlogService from 'Services/ApiService/Cms/Blog';
import type { BlogArticlePreview } from 'Services/ApiService/Cms/Blog/interfaces';
import CmsImageService from 'Services/ApiService/Cms/Image';
import { CarouselData } from 'Types/homepage';
import {
	B2B_NUMERIC_CODE,
	B2C_NUMERIC_CODE,
	DEFAULT_BUNDLE_API_PARAMS,
} from 'vinisto_api_client/src/shared';
import linkWidgetService, {
	linkWidgetAdapter,
} from 'vinisto_api_client/src/link-widget-service';
import { VinistoCmsDllModelsApiReturnCmsImageReturn } from 'vinisto_api_client/src/api-types/cms-api';
import { VinistoHelperDllEnumsCmsArticleSortableColumns } from 'vinisto_api_client/src/api-types/cms-api';
import { Allowed_Sections } from 'vinisto_api_client/src/domain/link-widget/enums';
import { LinkWidget as LinkWidgetType } from 'vinisto_api_client/src/domain/link-widget';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiHomePageHomePageCustomCarousel,
	VinistoProductDllModelsApiHomePageHomePageCustomCarouselsReturn,
} from 'vinisto_api_client/src/api-types/product-api';

const THRESHOLD_TOP_CAROUSELS = 5;
const DEFAULT_BANNER_LIMIT = 4;
const DEFAULT_LINK_WIDGET_LIMIT = 100;
export const DEFAULT_ARTICLE_LIMIT = 4;

function hasDomainUrls(
	image: any
): image is { domainUrls: Record<string, string> } {
	return image && typeof image === 'object' && 'domainUrls' in image;
}

function hasUrl(image: any): image is { url: string } {
	return image && typeof image === 'object' && 'url' in image;
}

export const getHomepageCarousels = async (
	countryOfSale: VinistoHelperDllEnumsCountryCode,
	currency: VinistoHelperDllEnumsCurrency,
	isB2b: boolean
): Promise<CarouselData> => {
	try {
		const response = await api.get<
			ProductApi.HomePageCustomCarouselsList.ResponseBody,
			ProductApi.HomePageCustomCarouselsList.RequestQuery
		>(
			'product-api/home-page/custom-carousels',
			{
				...DEFAULT_BUNDLE_API_PARAMS,
				IsCache: true,
				Limit: 20,
				SortingColumn:
					VinistoHelperDllEnumsHomePageCustomCarouselSortableColumns.SEQUENCE_NUMBER,
				CountryOfSale: countryOfSale,
				Currency: currency,
				AvailableOnPlatform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
			},
			{
				headers: {
					['X-Api-Key']:
						(isB2b
							? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
							: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
				},
			}
		);

		if (response.isError || !response.homePageCustomCarousels) {
			return { topCarousels: [], bottomCarousels: [] };
		}

		const reducedData = reduceHomepageCarouselResponse(response);

		const topCarousels = reducedData?.filter(
			(carousel) => (carousel.sequenceNumber ?? 0) <= THRESHOLD_TOP_CAROUSELS
		);

		const bottomCarousels = reducedData?.filter(
			(carousel) => (carousel.sequenceNumber ?? 0) > THRESHOLD_TOP_CAROUSELS
		);

		return { topCarousels, bottomCarousels };
	} catch (error) {
		return { topCarousels: [], bottomCarousels: [] };
	}
};

export const getHomepageCarouselsCached = cache(
	getHomepageCarousels,
	['home-carousels'],
	{ tags: ['homepage', 'carousels'], revalidate: 3600 }
);

export const getTopBanners = cache(
	async (language: string, isB2b: boolean): Promise<Banner[]> => {
		try {
			const response = await api.get<
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.ResponseBody,
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.RequestQuery
			>(
				GET_BANNERS_ENDPOINT,
				{
					CarouselType: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_TOP,
					IsCache: true,
				},
				{
					headers: {
						['X-Api-Key']:
							(isB2b
								? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
								: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
					},
				}
			);

			if (response.isError || !response.sliderCarousels) {
				return [];
			}

			const banners: Banner[] =
				response.sliderCarousels
					?.slice(0, DEFAULT_BANNER_LIMIT)
					.map((bannerApi) => {
						const getLocalizedOrDefault = (field: typeof bannerApi.title) =>
							field?.find((item) => item.language === language)?.value ??
							field?.[0]?.value ??
							'';

						let imageUrl = '';
						let imageOriginalUrl = '';
						if (hasDomainUrls(bannerApi.image)) {
							imageUrl = bannerApi.image.domainUrls?.thumb_500x500 ?? '';
							imageOriginalUrl = bannerApi.image.domainUrls?.original_png ?? '';
						} else if (hasUrl(bannerApi.image)) {
							imageUrl = bannerApi.image.url;
							imageOriginalUrl = bannerApi.image.url;
						}

						return {
							position: BANNER_POSITION.TOP,
							title: getLocalizedOrDefault(bannerApi.title),
							subtitle: getLocalizedOrDefault(bannerApi.subtitle),
							imageUrl: imageUrl,
							imageOriginalUrl: imageOriginalUrl,
							ctaLabel: getLocalizedOrDefault(bannerApi.textLink),
							order: Number(bannerApi.position ?? 0),
							url: getLocalizedOrDefault(bannerApi.url),
							srcSet: undefined,
							titleColor: bannerApi.titleColor ?? null,
							subtitleColor: bannerApi.subtitleColor ?? null,
							buttonStyle: bannerApi.buttonStyle ?? null,
						};
					}) ?? [];

			return banners;
		} catch (error) {
			return [];
		}
	},
	['home-banners-top'],
	{ tags: ['homepage', 'banners', 'banners-top'], revalidate: 3600 }
);

export const getUspBanners = cache(
	async (language: string, isB2b: boolean): Promise<Banner[]> => {
		try {
			const response = await api.get<
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.ResponseBody,
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.RequestQuery
			>(
				GET_BANNERS_ENDPOINT,
				{
					CarouselType: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_USP,
					IsCache: true,
				},
				{
					headers: {
						['X-Api-Key']:
							(isB2b
								? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
								: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
					},
				}
			);

			if (response.isError || !response.sliderCarousels) {
				return [];
			}

			const banners: Banner[] =
				response.sliderCarousels?.slice(0, 8).map((bannerApi) => {
					const getLocalizedOrDefault = (field: typeof bannerApi.title) =>
						field?.find((item) => item.language === language)?.value ??
						field?.[0]?.value ??
						'';

					let imageUrl = '';
					let imageOriginalUrl = '';
					if (hasDomainUrls(bannerApi.image)) {
						imageUrl = bannerApi.image.domainUrls?.thumb_500x500 ?? '';
						imageOriginalUrl = bannerApi.image.domainUrls?.original_png ?? '';
					} else if (hasUrl(bannerApi.image)) {
						imageUrl = bannerApi.image.url;
						imageOriginalUrl = bannerApi.image.url;
					}

					return {
						position: BANNER_POSITION.HP_USP,
						title: getLocalizedOrDefault(bannerApi.title),
						subtitle: getLocalizedOrDefault(bannerApi.subtitle),
						imageUrl: imageUrl,
						imageOriginalUrl: imageOriginalUrl,
						ctaLabel: getLocalizedOrDefault(bannerApi.textLink),
						order: Number(bannerApi.position ?? 0),
						url: getLocalizedOrDefault(bannerApi.url),
						srcSet: undefined,
						titleColor: bannerApi.titleColor ?? null,
						subtitleColor: bannerApi.subtitleColor ?? null,
						buttonStyle: bannerApi.buttonStyle ?? null,
					};
				}) ?? [];

			return banners;
		} catch (error) {
			return [];
		}
	},
	['home-banners-usp'],
	{ tags: ['homepage', 'banners', 'banners-usp'], revalidate: 3600 }
);

export const getBottomBanners = cache(
	async (language: string, isB2b: boolean): Promise<Banner[]> => {
		try {
			const response = await api.get<
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.ResponseBody,
				CmsApi.SliderCarouselsGetSliderCarouselForTypeList.RequestQuery
			>(
				GET_BANNERS_ENDPOINT,
				{
					CarouselType:
						VinistoHelperDllEnumsSliderCarouselCarouselType.HP_BOTTOM,
					IsCache: true,
				},
				{
					headers: {
						['X-Api-Key']:
							(isB2b
								? process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B
								: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY) ?? '',
					},
				}
			);

			if (response.isError || !response.sliderCarousels) {
				return [];
			}

			const banners: Banner[] =
				response.sliderCarousels
					?.slice(0, DEFAULT_BANNER_LIMIT)
					.map(
						(
							bannerApi: NonNullable<typeof response.sliderCarousels>[number]
						) => {
							const getLocalizedOrDefault = (field: typeof bannerApi.title) =>
								field?.find(
									(item: NonNullable<typeof field>[number]) =>
										item.language === language
								)?.value ??
								field?.[0]?.value ??
								'';

							let imageUrl = '';
							let imageOriginalUrl = '';
							if (hasDomainUrls(bannerApi.image)) {
								imageUrl = bannerApi.image.domainUrls?.thumb_500x500 ?? '';
								imageOriginalUrl =
									bannerApi.image.domainUrls?.original_png ?? '';
							} else if (hasUrl(bannerApi.image)) {
								imageUrl = bannerApi.image.url;
								imageOriginalUrl = bannerApi.image.url;
							}

							return {
								position: BANNER_POSITION.BOTTOM,
								title: getLocalizedOrDefault(bannerApi.title),
								subtitle: getLocalizedOrDefault(bannerApi.subtitle),
								imageUrl: imageUrl,
								imageOriginalUrl: imageOriginalUrl,
								ctaLabel: getLocalizedOrDefault(bannerApi.textLink),
								order: Number(bannerApi.position ?? 0),
								url: getLocalizedOrDefault(bannerApi.url),
								srcSet: undefined,
								titleColor: bannerApi.titleColor ?? null,
								subtitleColor: bannerApi.subtitleColor ?? null,
								buttonStyle: bannerApi.buttonStyle ?? null,
							} as Banner;
						}
					) ?? [];

			return banners;
		} catch (error) {
			return [];
		}
	},
	['home-banners-bottom'],
	{ tags: ['homepage', 'banners', 'banners-bottom'], revalidate: 3600 }
);

export const getLinkWidgets = cache(
	async (
		section: Allowed_Sections,
		isB2b: boolean,
		limit: number = DEFAULT_LINK_WIDGET_LIMIT
	): Promise<LinkWidgetType[]> => {
		const pathId = `/|${section}`;
		try {
			const response = await linkWidgetService.linksList({
				Sort: 'order',
				PathId: pathId,
				AvailableOnPlatform: isB2b ? B2B_NUMERIC_CODE : B2C_NUMERIC_CODE,
			});

			const adaptedLinks = response.data.map(linkWidgetAdapter.fromApi);

			return adaptedLinks.slice(0, limit);
		} catch (error) {
			return [];
		}
	},
	['home-link-widgets'],
	{ revalidate: 3600 }
);

export const getArticles = cache(
	async (): Promise<BlogArticlePreview[]> => {
		try {
			const params: CmsApi.ArticlesArticlesPublishedList.RequestQuery = {
				Limit: DEFAULT_ARTICLE_LIMIT,
				IsSortingDescending: true,
				SortingColumn:
					VinistoHelperDllEnumsCmsArticleSortableColumns.PUBLISH_DATE,
			};

			const response = await BlogService.getPreviewList(params);

			if (response.isError) {
				return [];
			}
			return response.articles ?? [];
		} catch (error) {
			return [];
		}
	},
	['home-articles'],
	{ tags: ['homepage', 'articles'], revalidate: 3600 }
);

export const getArticleTitleImages = cache(
	async (
		imageIds: string[]
	): Promise<Array<VinistoCmsDllModelsApiReturnCmsImageReturn | null>> => {
		if (!imageIds || imageIds.length === 0) {
			return [];
		}

		try {
			const imagePromises = imageIds.map((id) =>
				CmsImageService.getById(id).catch((_err) => {
					return null;
				})
			);
			const results = await Promise.all(imagePromises);
			return results;
		} catch (error) {
			return imageIds.map(() => null);
		}
	},
	['article-images']
);

export const reduceHomepageCarouselResponse = (
	response: VinistoProductDllModelsApiHomePageHomePageCustomCarouselsReturn
): VinistoProductDllModelsApiHomePageHomePageCustomCarousel[] => {
	return response.homePageCustomCarousels
		? response.homePageCustomCarousels?.map(
				(
					carousel
				): VinistoProductDllModelsApiHomePageHomePageCustomCarousel => {
					return {
						...carousel,
						bundles: carousel.bundles?.map(
							(bundle): VinistoProductDllModelsApiBundleBundle => {
								return {
									...bundle,
									productsDetail: [],
									description: [],
									tagsDetail: bundle.tagsDetail.map((tag) => {
										return {
											color: tag.color,
											id: tag.id,
											name: tag.name,
											specificationDetails: tag.specificationDetails,
											isEnabled: tag.isEnabled,
											isOnHomepage: tag.isOnHomepage,
											isDisplayBundles: tag.isDisplayBundles,
											bundles: tag.bundles,
											slugs: tag.slugs,
										};
									}),
								};
							}
						),
					};
				}
		  )
		: [];
};
