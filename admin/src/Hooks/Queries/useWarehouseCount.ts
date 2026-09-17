import { useQuery } from '@tanstack/react-query';
import ItemQuantityService from 'Services/WarehouseService/ItemQuantity';

const useWarehouseCount = (itemIds: string[]) => {
	const { getBundleQuantities } = ItemQuantityService;
	const query = useQuery(['GetWarehouseItemsQuantities', itemIds], () => {
		return getBundleQuantities(itemIds);
	});

	return query;
};

export default useWarehouseCount;
