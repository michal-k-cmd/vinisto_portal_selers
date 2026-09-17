import { get } from 'lodash-es';
import { VinistoSupplierDllModelsApiSupplierSupplier } from 'vinisto_api_client/src/api-types/user-api';
import { apiServiceInstance } from 'Services/ApiService';

import {
	SupplierAddress,
	SupplierUpdateAddressData,
	SupplierUpdateData,
} from './interfaces';
import {
	SUPPLIER_API_ADDRESS,
	SUPPLIER_API_UPDATE,
	SUPPLIER_ID_PLACEHOLDER,
} from './constants';

const SupplierService = {
	update: async (
		supplierId: string,
		data: SupplierUpdateData
	): Promise<Partial<VinistoSupplierDllModelsApiSupplierSupplier>> => {
		const url = SUPPLIER_API_UPDATE.replace(
			SUPPLIER_ID_PLACEHOLDER,
			supplierId
		);
		return apiServiceInstance
			.put(url, data, true)
			.then((response) => get(response, 'supplier', {}));
	},
	updateAddress: async (
		supplierId: string,
		data: SupplierUpdateAddressData
	) => {
		const url = SUPPLIER_API_ADDRESS.replace(
			SUPPLIER_ID_PLACEHOLDER,
			supplierId
		);
		return apiServiceInstance
			.put(url, data, true)
			.then((response) => get(response, 'address', {}) as SupplierAddress);
	},
};

export default SupplierService;
