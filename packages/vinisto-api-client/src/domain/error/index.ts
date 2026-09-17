import type { VinistoHelperDllBaseError } from '../../api-types/product-api';
import type { BaseResponse } from '@/api';

export const isApiError = (value: unknown): value is ApiError =>
	value instanceof ApiError;

export const isNetworkError = (value: unknown): value is NetworkError =>
	value instanceof NetworkError;

export class ApiError extends Error {
	readonly request: RequestInit;
	readonly response: any;
	readonly message: string;
	readonly error: VinistoHelperDllBaseError[] | null | undefined | unknown;

	private getErrorMessage(responseData?: BaseResponse) {
		// @ts-expect-error According to generated api types, error can be "unknown", which causes error here
		const apiError = responseData?.error?.[0] as VinistoHelperDllBaseError;
		return (
			apiError?.message ??
			apiError?.specificError ??
			apiError?.generalError ??
			''
		);
	}

	constructor(
		responseData: BaseResponse,
		originalRequest: RequestInit,
		originalResponse?: Response,
	) {
		super();
		this.request = originalRequest;
		this.response = originalResponse;
		this.message = this.getErrorMessage(responseData);
		this.error = responseData?.error;
	}
}

export class NetworkError extends Error {
	readonly request: RequestInit;
	readonly message: string;

	constructor(request: RequestInit) {
		super();
		this.request = request;
		this.message = 'Network error';
	}
}
