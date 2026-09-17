import { IVinistoUser } from './interfaces';

export const getValidActiveSupplierId = (
	activeSupplierId: string,
	suppliers: IVinistoUser['suppliers']
) => {
	let validActiveSupplierId = '';
	// is current active supplier id present in suppliers?
	if (activeSupplierId !== '' && suppliers?.length) {
		validActiveSupplierId =
			suppliers.find((supplier) => supplier.id === activeSupplierId)?.id ?? '';
	}

	// if no valid supplier selected, use first one
	if (validActiveSupplierId === '') {
		return suppliers?.[0]?.id ?? '';
	}

	return validActiveSupplierId;
};
