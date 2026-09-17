import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { normalizeWarehouseQuantity } from 'Services/WarehouseService/helpers';

import useGetBundlesByIds from './useGetBundlesByIds';

import api from '@/api';
import { VinistoProductDllModelsApiBundleBundleIdsReturn } from '@/api-types/product-api';
import { VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn } from '@/api-types/warehouse-api';

const useGetBundleInSets = ({ bundleId }: { bundleId?: string }) => {
	const { data: bundleSetIds } = useQuery({
		queryKey: ['bundleInSets', bundleId],
		queryFn: () =>
			api
				.get<VinistoProductDllModelsApiBundleBundleIdsReturn>(
					`product-api/bundles/${bundleId}/sets`
				)
				.then((res) => res.bundleSetIds),

		enabled: !!bundleId,
	});

	const { data: quantities, isFetched: isQuantityFetched } = useQuery({
		queryKey: ['bundleInSetsQuantities', bundleId],
		queryFn: () =>
			api
				.get<VinistoWarehouseDllModelsApiWarehouseItemWarehouseItemQuantityReturn>(
					`warehouse-api/warehouse/bundles/GetWarehouseItemsQuantities`,
					{ bundleIds: bundleSetIds }
				)
				.then((res) => res.warehouseItemQuantities),

		enabled: !!bundleSetIds?.length,
	});

	const { data, ...rest } = useGetBundlesByIds({
		bundleIds: bundleSetIds ?? [],
		options: { enabled: !!quantities?.length },
	});

	const sets = useMemo(
		() =>
			isQuantityFetched && data
				? Array.from(data.values()).filter((bundle) => {
						const quantity = quantities?.find(
							(quantityItem) => quantityItem.itemId === bundle.id
						)?.quantity;
						return normalizeWarehouseQuantity(quantity) > 0;
				  })
				: null,
		[data, isQuantityFetched, quantities]
	);

	return {
		data: sets,
		...rest,
	};
};

export default useGetBundleInSets;
