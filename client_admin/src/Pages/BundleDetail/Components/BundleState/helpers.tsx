import { VinistoProductDllModelsApiBundleBundle } from '@/api-types/product-api';

export enum BundleState {
	AVAILABLE = 'AVAILABLE',
	CLEARANCE_SALE = 'CLEARANCE_SALE',
	TEMPORARY_UNAVAILABLE = 'TEMPORARY_UNAVAILABLE',
	SALE_OVER = 'SALE_OVER',
}

export const getBundleState = (
	bundle: VinistoProductDllModelsApiBundleBundle
): BundleState | null => {
	if (bundle.temporaryUnavailable) {
		return BundleState.TEMPORARY_UNAVAILABLE;
	}

	if (bundle.isClearanceSale) {
		return BundleState.CLEARANCE_SALE;
	}

	if (bundle.isSaleOver) {
		return BundleState.SALE_OVER;
	}

	return BundleState.AVAILABLE;
};
