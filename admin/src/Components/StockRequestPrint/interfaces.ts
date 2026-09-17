import { SpecificationDetail } from 'Hooks/useLocalizedSpecificationValue/interfaces';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoStockingRequestDllModelsApiStockingRequestStockingRequest,
} from 'vinisto_api_client/src/api-types/supplier-api/';
import { NonNullableProperties, OmitConstrained } from 'types';

export interface StockRequestPrintProps {
	stockRequest: VinistoStockingRequestDllModelsApiStockingRequestStockingRequest;
}

export type StockRequestBundle =
	NonNullableProperties<VinistoProductDllModelsApiBundleBundle>;

export interface StockRequestBundleTableModel
	extends OmitConstrained<StockRequestBundle, 'name'> {
	name: string;
	specificationDetails: SpecificationDetail[];
	countDifference: number;
	requestedCount: number;
	deliveredCount: number | null;
	warehouseIds: string;
}
