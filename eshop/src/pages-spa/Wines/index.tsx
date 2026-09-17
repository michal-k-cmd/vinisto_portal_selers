'use client';

import type { InitialListingBundlePage } from 'lib/data/listing-bundles';
import AdmintoolsProvider from 'providers/admintools/admintools-provider';

import WinesBundlesWithFilters from './Components/WinesBundlesWithFilters';
import BundlesWithFiltersProvider from './Components/WinesBundlesWithFilters/context';

const Wines = ({
	initialBundlePage,
}: {
	initialBundlePage?: InitialListingBundlePage;
}) => {
	return (
		<section id="content-wrapper">
			<AdmintoolsProvider />
			<BundlesWithFiltersProvider
				category={null}
				initialBundlePage={initialBundlePage}
			>
				<WinesBundlesWithFilters />
			</BundlesWithFiltersProvider>
		</section>
	);
};

export default Wines;
