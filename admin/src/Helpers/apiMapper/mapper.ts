import { ApiResponse } from './types';

export function isValidApiResponse(
	response: unknown
): response is ApiResponse<unknown, string> {
	return (
		typeof response === 'object' &&
		response !== null &&
		'count' in response &&
		'error' in response &&
		'isError' in response
	);
}
