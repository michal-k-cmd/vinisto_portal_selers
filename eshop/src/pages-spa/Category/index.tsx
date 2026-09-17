'use client';

import type { InitialListingBundlePage } from 'lib/data/listing-bundles';
import AdmintoolsProvider from 'providers/admintools/admintools-provider';

import CategoryBundlesWithFilters from './Components/CategoryBundlesWithFilters';
import BundlesWithFiltersProvider from './Components/CategoryBundlesWithFilters/context';

import './styles.css';
import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';
import { LinkWidget } from '@/domain/link-widget';

const Category = ({
	category,
	categoryWithVirtualData,
	linkWidgets,
	initialBundlePage,
}: {
	category: VinistoProductDllModelsApiCategoryCategory;
	categoryWithVirtualData?: VinistoProductDllModelsApiCategoryCategory | null;
	linkWidgets: LinkWidget[];
	initialBundlePage?: InitialListingBundlePage;
}) => {
	return (
		<section id="content-wrapper">
			<AdmintoolsProvider />
			<BundlesWithFiltersProvider
				category={category}
				initialBundlePage={initialBundlePage}
			>
				<CategoryBundlesWithFilters
					category={category}
					categoryWithVirtualData={categoryWithVirtualData}
					linkWidgets={linkWidgets}
				/>
			</BundlesWithFiltersProvider>
		</section>
	);
};

export default Category;
