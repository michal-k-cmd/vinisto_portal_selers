import { StockRequestBundle } from 'Services/StockRequest/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { StockRequestBundleTableModel } from './interfaces';

export const localizeBundles = (
	bundles: StockRequestBundle[],
	getLocalizedValue: ReturnType<typeof useLocalizedValue>
) =>
	bundles.map((bundle) => {
		const localizedBundle: StockRequestBundleTableModel = {
			...bundle,
			name: getLocalizedValue(bundle.name),
		};
		return localizedBundle;
	});
