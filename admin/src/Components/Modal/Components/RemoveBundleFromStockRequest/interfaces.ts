import { Dispatch, SetStateAction } from 'react';

interface RemoveBundleFromStockRequestModalData {
	stockingRequestId: string;
	bundleId: string;
	bundleName: string;
	setRefetchKey: Dispatch<SetStateAction<number>>;
}

export type { RemoveBundleFromStockRequestModalData };
