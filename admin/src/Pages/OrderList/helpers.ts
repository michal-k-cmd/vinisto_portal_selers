import { VinistoHelperDllEnumsOrderOrderState } from 'vinisto_api_client/src/api-types/order-api/';

import { OrderListTableKeys } from './constants';

function createColumnFilterValuesMap() {
	return {
		[OrderListTableKeys.STATE]: new Map(
			Object.entries(VinistoHelperDllEnumsOrderOrderState).map(
				([key, value]) => [key, value]
			)
		),
	};
}

const columnFilterValuesMap = createColumnFilterValuesMap();

function getColumnFilterValues(columnId: string): any {
	return columnFilterValuesMap[columnId] || new Map();
}

export { getColumnFilterValues };
