import { ReactNode } from 'react';

export interface WarehouseServiceContextProviderProps {
	children: ReactNode;
}

export interface WarehouseServiceContextModel {
	fetchQuantity: (bundleId: string | string[]) => void;
	getQuantity: (bundleId: string) => number | undefined;
	requestQuantityUpdate: (
		requestedBundleIds: string | string[]
	) => Promise<void>;
	deliveryDate: Date | undefined;
}
