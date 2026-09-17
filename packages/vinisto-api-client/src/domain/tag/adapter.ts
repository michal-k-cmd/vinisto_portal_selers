import { AbstractAdapter } from '../abstract-adapter';

import ProductTag from '.';

import { VinistoProductDllModelsApiTagTag } from '../../api-types/product-api';
import { dayjsInstance as dayjs } from 'vinisto_shared';

const getUrlFromSlugs = (
	slugs: VinistoProductDllModelsApiTagTag['slugs']
): string | null => {
	if (!slugs) return null;
	const mainSlug = slugs.find((slug) => slug.isMain === true);
	return mainSlug?.value ? mainSlug.value : null;
};

class TagAdapter extends AbstractAdapter<
	ProductTag,
	VinistoProductDllModelsApiTagTag
> {
	fromApi(apiData: VinistoProductDllModelsApiTagTag): ProductTag {
		const id = apiData.id;

		if (!id) throw new Error('No id in tag');

		return {
			id,
			name: apiData.name,
			description: apiData.description,
			metaDescription: apiData.metaDescription,
			color: apiData.color,
			isEnabled: apiData.isEnabled ?? false,
			isOnHomepage: apiData.isOnHomepage ?? false,
			isDisplayBundles: apiData.isDisplayBundles ?? true,
			isVisibleInFilters: apiData.isVisibleInFilters ?? false,
			orderInFilters: apiData.orderInFilters ?? null,
			type: apiData.type ?? null,
			validFrom: apiData.validFrom ? dayjs.unix(apiData.validFrom) : null,
			validTo: apiData.validTo ? dayjs.unix(apiData.validTo) : null,
			url: getUrlFromSlugs(apiData.slugs ?? null),
		};
	}
}

export default TagAdapter;
