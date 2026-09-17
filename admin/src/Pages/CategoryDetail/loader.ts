import { LoaderFunction } from 'react-router-dom';
import BundleService from 'Services/Bundle';
import CategoryService from 'Services/Category';
import { ProductSelectionType } from 'Services/Category/constants';

import { CategoryDetailLoader } from './interfaces';

const categoryLoader: LoaderFunction = async ({
	params,
}): Promise<CategoryDetailLoader> => {
	if (params.id === undefined) return {};
	try {
		const category = await CategoryService.get(params.id);
		const bundlesCount = await CategoryService.getBundlesCount(params.id);

		if (category === undefined) return {};

		if (category?.productSelectionType === ProductSelectionType.DYNAMIC)
			return {
				category,
				bundlesCount,
			};

		return {
			category,
			bundlesCount,
			bundles:
				(await BundleService.getBundlesInCategory(
					params.id,
					category.bundleDiscountFilter
				)) ?? [],
		};
	} catch {
		return {};
	}
};

export default categoryLoader;
