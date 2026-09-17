import type Image from '.';

import { VinistoImageDllModelsApiImageImage } from '../../api-types/product-api';
import { AbstractAdapter } from '../../domain/abstract-adapter';

class ImageAdapter extends AbstractAdapter<
	Image,
	VinistoImageDllModelsApiImageImage
> {
	fromApi(apiData: VinistoImageDllModelsApiImageImage): Image {
		const { domainUrls, id, isMain, objectId, objectType } = apiData;

		if (!objectId || !objectType || !domainUrls) return {} as Image;

		// TODO: this breaks the whole adapter layer; needs another solution
		// if (!objectId) throw new Error('No objectId in image');
		// if (!objectType) throw new Error('No objectType in image');
		// if (!domainUrls) throw new Error('No domainUrls in image');

		return {
			id: id ?? '',
			isMain: isMain ?? false,
			objectId: objectId,
			objectType: objectType,
			domainUrls: domainUrls,
		};
	}
}

export default ImageAdapter;
