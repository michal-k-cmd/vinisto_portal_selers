import { SpecificationDetail } from 'Hooks/useLocalizedSpecificationValue/interfaces';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoStockingRequestDllModelsApiStockingRequestStockingRequest } from 'vinisto_api_client/src/api-types/supplier-api/';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { StockRequestBundle, StockRequestBundleTableModel } from './interfaces';

export const mapBundlesToTableModel = (
	stockRequest: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
	getLocalizedValue: ReturnType<typeof useLocalizedValue>
): StockRequestBundleTableModel[] =>
	stockRequest.bundleDetails
		?.map((bundleDetails) => {
			const bundle = bundleDetails as unknown as StockRequestBundle;
			const bundleRequest = stockRequest.bundles?.find(
				(bundleRequest) => bundleRequest.bundleId === bundle.id
			);
			return {
				...bundle,
				name: getLocalizedValue((bundle.name ?? []) as LangValuePair[]),
				specificationDetails:
					bundle.specificationDetails as SpecificationDetail[],
				countDifference: bundleRequest?.countDifference ?? 0,
				requestedCount: bundleRequest?.requestedCount ?? 0,
				warehouseIds: bundle.productsDetail
					.map((product) => product.warehouseId)
					.join(', '),
				deliveredCount: bundleRequest?.deliveredCount ?? null,
			};
		})
		.sort((bundleA, bundleB) => bundleA.name.localeCompare(bundleB.name)) ?? [];
