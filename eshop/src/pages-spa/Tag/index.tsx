'use client';

import type { InitialListingBundlePage } from 'lib/data/listing-bundles';
import AdmintoolsProvider from 'providers/admintools/admintools-provider';

import TagBundlesWithFilters from './Components/TagBundlesWithFilters';
import BundlesWithFiltersProvider from './Components/TagBundlesWithFilters/context';

import { VinistoProductDllModelsApiTagTag } from '@/api-types/product-api';

const Tag = ({
	tag,
	tagUrl,
	initialBundlePage,
}: {
	tag: VinistoProductDllModelsApiTagTag | null | undefined;
	tagUrl: string;
	initialBundlePage?: InitialListingBundlePage;
}) => {
	return (
		<section id="content-wrapper">
			<AdmintoolsProvider />
			<BundlesWithFiltersProvider
				tag={tag}
				initialBundlePage={initialBundlePage}
			>
				<TagBundlesWithFilters
					tag={tag}
					tagUrl={tagUrl}
				/>
			</BundlesWithFiltersProvider>
		</section>
	);
};

export default Tag;
