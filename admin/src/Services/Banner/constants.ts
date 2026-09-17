import {
	VinistoHelperDllEnumsImageImageObjectType,
	VinistoHelperDllEnumsSliderCarouselCarouselType,
} from 'vinisto_api_client/src/api-types/cms-api/';

export const ADD_API_ENDPOINT = 'cms-api/slider-carousels';
export const EDIT_API_ENDPOINT = 'cms-api/slider-carousel';
export const REMOVE_API_ENDPOINT = 'cms-api/slider-carousel';
export const LIST_API_ENDPOINT = 'cms-api/slider-carousels';
export const ADD_IMAGE_API_ENDPOINT = 'image-api/images';
export const REMOVE_IMAGE_API_ENDPOINT = 'image-api/images';
export const ALLOWED_IMG_TYPES_MAP = {
	TOP: ['image/png'],
	BOTTOM: ['image/png'],
	PRODUCT: ['image/png'],
	HP_USP: ['image/png', 'image/svg+xml'],
	PRODUCT_DETAIL_USP: ['image/png'],
	PRODUCT_LIST: ['image/png'],
};

export enum POSITION {
	TOP = 'TOP',
	BOTTOM = 'BOTTOM',
	PRODUCT = 'PRODUCT',
	HP_USP = 'HP_USP',
	PRODUCT_DETAIL_USP = 'PRODUCT_DETAIL_USP',
	PRODUCT_LIST = 'PRODUCT_LIST',
}

export const POSITION_LOCALIZATION_MAP: { [key in POSITION]: string } = {
	[POSITION.TOP]: 'admin.banner.position.top',
	[POSITION.BOTTOM]: 'admin.banner.position.bottom',
	[POSITION.PRODUCT]: 'admin.banner.position.product',
	[POSITION.HP_USP]: 'admin.banner.position.usp',
	[POSITION.PRODUCT_DETAIL_USP]: 'admin.banner.position.productDetailUsp',
	[POSITION.PRODUCT_LIST]: 'admin.banner.position.productList',
};

export const POSITION_VALUES_MAP: {
	[key in POSITION]: VinistoHelperDllEnumsSliderCarouselCarouselType;
} = {
	[POSITION.TOP]: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_TOP,
	[POSITION.BOTTOM]: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_BOTTOM,
	[POSITION.PRODUCT]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_DETAIL,
	[POSITION.HP_USP]: VinistoHelperDllEnumsSliderCarouselCarouselType.HP_USP,
	[POSITION.PRODUCT_DETAIL_USP]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_DETAIL_USP,
	[POSITION.PRODUCT_LIST]:
		VinistoHelperDllEnumsSliderCarouselCarouselType.PRODUCT_LIST,
};

export const POSITION_IMAGE_TYPE_MAP: { [key in POSITION]: string } = {
	[POSITION.TOP]: VinistoHelperDllEnumsImageImageObjectType.CarouselTop,
	[POSITION.BOTTOM]: VinistoHelperDllEnumsImageImageObjectType.CarouselBottom,
	[POSITION.PRODUCT]:
		VinistoHelperDllEnumsImageImageObjectType.CarouselProductDetail,
	[POSITION.HP_USP]: VinistoHelperDllEnumsImageImageObjectType.HP_USP,
	[POSITION.PRODUCT_DETAIL_USP]:
		VinistoHelperDllEnumsImageImageObjectType.ProductDetailUSP,
	[POSITION.PRODUCT_LIST]:
		VinistoHelperDllEnumsImageImageObjectType.CarouselProductList,
};
