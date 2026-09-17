import { IMAGE_SIZE_ORIGINAL_PNG } from './constants';
import { ImageSize } from './interfaces';

import Image from '@/domain/image';
import { VinistoImageDllModelsApiImageImage } from '@/api-types/image-api';

const default_image_original_png = '/assets/images/default.webp';
const default_thumb_64x80_webp = '/assets/images/default_thumb_64x80.webp';
const default_thumb_80x80_webp = '/assets/images/default_thumb_80x80.webp';
const default_thumb_88x138_webp = '/assets/images/default_thumb_88x138.webp';
const default_thumb_208x240_webp = '/assets/images/default_thumb_208x240.webp';
const default_thumb_330x260_webp = '/assets/images/default_thumb_330x260.webp';
const default_thumb_368x490_webp = '/assets/images/default_thumb_368x490.webp';

const defaultImageUrls = {
	original_png: default_image_original_png,
	thumb_64x80: default_thumb_64x80_webp,
	thumb_80x80: default_thumb_80x80_webp,
	thumb_88x138: default_thumb_88x138_webp,
	thumb_208x240: default_thumb_208x240_webp,
	thumb_330x260: default_thumb_330x260_webp,
	thumb_368x490: default_thumb_368x490_webp,
};

const getBundleImage = (
	images: VinistoImageDllModelsApiImageImage[] | Image[],
	imageSize: ImageSize = IMAGE_SIZE_ORIGINAL_PNG
): string => {
	const mainImage = (images ?? []).find((image) => image.isMain);
	return mainImage
	// @ts-expect-error TODO investigate and fix this
		? mainImage.domainUrls?.[imageSize] ?? ''
		: defaultImageUrls[imageSize] ?? '';
};

export * from './constants';
export * from './interfaces';

export { getBundleImage };
