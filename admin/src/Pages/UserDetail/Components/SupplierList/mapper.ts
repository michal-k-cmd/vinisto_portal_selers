import { isValidApiResponse } from 'Helpers/apiMapper/mapper';
import { ApiResponse } from 'Helpers/apiMapper/types';

import { Supplier, User } from './types';

export function mapResponseToUserSuppliers(response: unknown): Supplier[] {
	if (isValidApiResponse(response) && 'suppliers' in response) {
		const castedResponse = response as ApiResponse<Supplier[], 'suppliers'>;
		if (castedResponse.suppliers.every(isSupplier)) {
			return castedResponse.suppliers;
		} else {
			throw new Error('Invalid Supplier object in response');
		}
	}
	throw new Error('Invalid response key');
}

export function isUser(obj: any): obj is User {
	return (
		typeof obj.id === 'string' &&
		typeof obj.email === 'string' &&
		(typeof obj.userLoginHash === 'string' || obj.userLoginHash === null)
	);
}

export function isSupplier(obj: any): obj is Supplier {
	const isValid =
		typeof obj.id === 'string' &&
		typeof obj.nameWeb === 'string' &&
		Array.isArray(obj.userIds) &&
		obj.userIds.every((id: any) => typeof id === 'string') &&
		Array.isArray(obj.users) &&
		obj.users.every(isUser);

	// if (!isValid) {
	//   console.error('Invalid supplier object:', obj);
	// }

	return isValid;
}
