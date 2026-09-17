import { AbstractAdapter } from '../abstract-adapter';

import Supplier from '.';

import { VinistoSupplierDllModelsApiSupplierSupplier } from '@/api-types/supplier-api';
import { imageAdapter } from '../../index';

class SupplierAdapter extends AbstractAdapter<
	Supplier,
	VinistoSupplierDllModelsApiSupplierSupplier
> {
	fromApi(apiData: VinistoSupplierDllModelsApiSupplierSupplier | null): Supplier {

		if (apiData === null) throw new Error('No id in supplier');

		return {
			id: apiData.id,
			nameWeb: apiData.nameWeb,
			nameBilling: apiData.nameBilling,
			ico: apiData.ico,
			dic: apiData.dic ?? undefined,
			address: apiData.address,
			users: apiData.users,
			isShipping: apiData.isShipping ?? false,
			web: this.convertMultiLangValue(apiData.web),
			companyDescription: this.convertMultiLangValue(
				apiData.companyDescription
			),
			mainProfile: this.convertMultiLangValue(apiData.mainProfile),
			wineRegion: this.convertMultiLangValue(apiData.wineRegion),
			logo: imageAdapter.fromApi(apiData.logo),
			baseImage: imageAdapter.fromApi(apiData.baseImage),
			certificates: apiData.certificates,
			bankAccountNumber: apiData.bankAccountNumber ?? undefined,
			countryCode: apiData.countryCode,
		};
	}
}

export default SupplierAdapter;
