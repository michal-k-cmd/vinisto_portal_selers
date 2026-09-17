import { VinistoHelperDllEnumsSliderCarouselCarouselType } from 'vinisto_api_client/src/api-types/cms-api';

export const GET_BANNERS_ENDPOINT =
	'cms-api/slider-carousels/GetSliderCarouselForType';

export enum BANNER_POSITION {
	TOP = 'HP_TOP',
	BOTTOM = 'HP_BOTTOM',
	PRODUCT_DETAIL = 'PRODUCT_DETAIL',
	HP_USP = 'HP_USP',
	PRODUCT_DETAIL_USP = 'PRODUCT_DETAIL_USP',
	PRODUCT_LIST = 'PRODUCT_LIST',
}

// What is this?! This is literally mapping values to exactly the same values!!!
export const POSITION_VALUES_MAP: Record<
	BANNER_POSITION,
	VinistoHelperDllEnumsSliderCarouselCarouselType
> = {
	[BANNER_POSITION.TOP]: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_TOP,
	[BANNER_POSITION.BOTTOM]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.HP_BOTTOM,
	[BANNER_POSITION.PRODUCT_DETAIL]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_DETAIL,
	[BANNER_POSITION.HP_USP]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.HP_USP,
	[BANNER_POSITION.PRODUCT_DETAIL_USP]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_DETAIL_USP,
	[BANNER_POSITION.PRODUCT_LIST]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_LIST,
};

export const DEFAULT_RENDER_LIMIT = 4;
