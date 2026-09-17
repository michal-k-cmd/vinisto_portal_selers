'use client';

import {
	createContext,
	FC,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { NotificationsContext } from 'Services/NotificationService';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from 'vinisto_api_client/src/api-types/warehouse-api';
import useDebounce from 'Hooks/useDebounce';
import api from 'vinisto_api_client/src/api';

import { BUNDLE_QTY_API_ENDPOINT, FETCH_QUANTITIES_DELAY } from './constants';
import {
	WarehouseServiceContextModel,
	WarehouseServiceContextProviderProps,
} from './interfaces';
import { normalizeWarehouseQuantity } from './helpers';

const defaultWarehouseServiceContextModel: WarehouseServiceContextModel = {
	fetchQuantity: () => undefined,
	getQuantity: () => undefined,
	requestQuantityUpdate: async () => undefined,
	deliveryDate: undefined,
};

export const WarehouseContext = createContext(
	defaultWarehouseServiceContextModel
);

/**
 * We aggregate the ids of all bundles that we want to fetch quantities for.
 * We use a Set to avoid duplicates.
 * We debounce the fetchQuantity call to avoid making too many requests.
 * We filter out the bundle IDs that already have a quantity associated with them in order to not make the request too big for the server.
 * In order to avoid requesting quantity for the same id multiple times, we keep track of the ids that we already fetched.
 * WarehouseServiceContextProvider is a top-level provider, therefore the state persists throughout the user's visit to the app.
 */
const WarehouseServiceContextProvider: FC<
	WarehouseServiceContextProviderProps
> = ({ children }) => {
	const { handleShowErrorNotification } = useContext(NotificationsContext);
	const [bundleQuantities, setBundleQuantities] = useState<Map<string, number>>(
		new Map()
	);
	const [deliveryDate, setDeliveryDate] = useState<Date>();
	const [bundleIds, setBundleIds] = useState<string[]>([]);
	const debouncedBundleIds = useDebounce(bundleIds, FETCH_QUANTITIES_DELAY);

	useEffect(() => {
		const fetchQuantities = async () => {
			try {
				const idsToFetch = debouncedBundleIds.filter(
					(id: string) => !bundleQuantities.has(id)
				);

				if (idsToFetch.length === 0) return;

				const res =
					await api.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
						BUNDLE_QTY_API_ENDPOINT,
						{ bundleIds: idsToFetch }
					);
				const warehouseQuantities = res.warehouseItemQuantities || [];
				const deliveryDate = res.deliveryDate;

				if (deliveryDate) {
					setDeliveryDate(new Date(deliveryDate));
				}

				if (!Array.isArray(warehouseQuantities)) return;
				if (warehouseQuantities.length === 0) return;
				setBundleQuantities((prevQuantities) => {
					const updatedQuantities = new Map(prevQuantities);
					for (const item of warehouseQuantities) {
						if (item.itemId) {
							updatedQuantities.set(
								item.itemId,
								normalizeWarehouseQuantity(item.quantity)
							);
						}
					}
					return updatedQuantities;
				});
			} catch (error) {
				handleShowErrorNotification('error.failedToLoadWarehouseQuantities');
			}
		};

		if (debouncedBundleIds.length > 0) {
			fetchQuantities();
		}
	}, [debouncedBundleIds, handleShowErrorNotification, bundleQuantities]);

	const fetchQuantity = useCallback((newBundleId: string | string[]) => {
		setBundleIds((prevIds) => {
			const uniqueIds = new Set(prevIds);
			if (Array.isArray(newBundleId)) {
				newBundleId.forEach((id) => uniqueIds.add(id));
			} else {
				uniqueIds.add(newBundleId);
			}
			return Array.from(uniqueIds);
		});
	}, []);

	const getQuantity = useCallback(
		(bundleId: string) => {
			return bundleQuantities.get(bundleId);
		},
		[bundleQuantities]
	);

	const requestQuantityUpdate = useCallback(
		async (requestedBundleIds: string | string[]) => {
			try {
				const res =
					await api.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
						BUNDLE_QTY_API_ENDPOINT,
						{
							bundleIds: Array.isArray(requestedBundleIds)
								? requestedBundleIds
								: [requestedBundleIds],
						}
					);
				const warehouseQuantities = res.warehouseItemQuantities || [];
				const deliveryDate = res.deliveryDate;

				if (deliveryDate) {
					setDeliveryDate(new Date(deliveryDate));
				}

				if (!Array.isArray(warehouseQuantities)) return;
				if (warehouseQuantities.length === 0) return;
				setBundleQuantities((prevQuantities) => {
					const updatedQuantities = new Map(prevQuantities);
					for (const item of warehouseQuantities) {
						if (item.itemId) {
							updatedQuantities.set(
								item.itemId,
								normalizeWarehouseQuantity(item.quantity)
							);
						}
					}
					return updatedQuantities;
				});
			} catch (error) {
				handleShowErrorNotification('error.failedToLoadWarehouseQuantities');
			}
		},
		[handleShowErrorNotification]
	);

	const warehouseServiceContextModel: WarehouseServiceContextModel = {
		fetchQuantity,
		getQuantity,
		deliveryDate,
		requestQuantityUpdate,
	};

	return (
		<WarehouseContext.Provider value={warehouseServiceContextModel}>
			{children}
		</WarehouseContext.Provider>
	);
};

export default WarehouseServiceContextProvider;
