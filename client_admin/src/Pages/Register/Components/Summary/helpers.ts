import { trim } from 'lodash-es';

export const getSupplierAddress = (address: Record<string, any>) => {
	return trim(
		`${address?.street || '-'} ${address?.landRegistryNumber || '-'}${
			address?.houseNumber ? `/${address?.houseNumber}` : ''
		}, ${address?.city || '-'}, ${address?.zip || '-'}`,
		'-, '
	);
};
