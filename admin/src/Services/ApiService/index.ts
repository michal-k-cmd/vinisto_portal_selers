/* eslint-disable no-console */
import Config from 'Config';

import { IApiService, IQueryArgument, ResponseData } from './interfaces';
import { ENV_DEVELOPMENT } from './constants';
import { HttpError, HttpRequestConfig } from './http';

// kuna.nese.nanuk

const requestDefaults: NonNullable<Parameters<typeof fetch>[1]> = {
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'X-Api-Key': `${import.meta.env.VITE_INTEGRATIONS_API_KEY}`,
	},
};

/**
 * Api Service
 * @class ApiService
 * @param API_URI string | null
 * @param ENV string | null
 */
class ApiService implements IApiService {
	private API_URI: string | null = null;
	private ENV: string | null = null;

	constructor() {
		this.API_URI = Config.apiUrl;
		this.ENV = Config.environment;
	}

	/**
	 * Function return custom url query
	 * @param queryArguments Array QueryArgumentInterface type
	 * @returns returns custom url query
	 */
	private makeQuery(queryArguments?: IQueryArgument[]): string {
		if (queryArguments && queryArguments.length > 0) {
			return `?${queryArguments
				.map((queryArgument: IQueryArgument): string => {
					return `${queryArgument.key}=${queryArgument.value}`;
				})
				.join('&')}`;
		}

		return '';
	}

	/**
	 * Logs error messages to the console when in development mode.
	 * @param error The error to log.
	 */
	private logErrorToSystemConsole(error: Error) {
		if (this.ENV === ENV_DEVELOPMENT) {
			console.error(error);
		}
	}

	/**
	 * Returns error message from erroneous API response
	 * @param responseData
	 */
	private getErrorMessage(responseData: ResponseData) {
		const [apiError] = responseData?.error ?? [];
		return (
			apiError?.message ?? apiError?.specificError ?? apiError?.generalError
		);
	}

	private async request<T = any>(
		method: string,
		path: string,
		data?: Record<any, any> | FormData,
		requestId?: string | number | undefined,
		queryArguments?: IQueryArgument[],
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		const query = this.makeQuery(queryArguments);
		const url = `${this.API_URI}${path}${
			requestId ? `/${requestId}` : ''
		}${query}`;

		try {
			const headers = new Headers(requestDefaults.headers);
			new Headers(requestConfig.headers).forEach((value, key) => {
				headers.set(key, value);
			});
			if (data instanceof FormData) {
				headers.delete('Content-Type');
			}
			const response = await fetch(url, {
				...requestConfig,
				method: method.toUpperCase(),
				headers,
				...(data !== undefined
					? { body: data instanceof FormData ? data : JSON.stringify(data) }
					: {}),
			});
			const responseData = await response.json();
			if (!response.ok || responseData?.isError) {
				throw new HttpError(
					this.getErrorMessage(responseData) ?? response.statusText,
					response.status,
					responseData
				);
			}

			return responseData;
		} catch (error: unknown) {
			if (!(error instanceof HttpError)) {
				const networkError = new HttpError(
					error instanceof Error ? error.message : String(error),
					0
				);
				this.logErrorToSystemConsole(networkError);
				throw networkError;
			}

			this.logErrorToSystemConsole(error);

			if (error?.response?.status === 500 && this.ENV !== ENV_DEVELOPMENT) {
				console.error(error);
			}

			throw error;
		}
	}

	/**
	 * API Get one Entity method
	 * @param path string
	 * @param disableToastError Boolean
	 * @param requestId number | string
	 * @param queryArguments Array QueryArgumentInterface
	 * @returns returns API Response data or handle Error
	 */
	public get<T = any>(
		path: string,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		queryArguments?: IQueryArgument[],
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'get',
			path,
			undefined,
			requestId,
			queryArguments,
			requestConfig
		);
	}

	/**
	 * API Get collection method
	 * @param path string
	 * @param queryArguments Array QueryArgumentInterface
	 * @param disableToastError Boolean
	 * @returns returns API Response data or handle Error
	 */
	public getCollection<T = any>(
		path: string,
		queryArguments?: IQueryArgument[],
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'get',
			path,
			undefined,
			undefined,
			queryArguments,
			requestConfig
		);
	}

	/**
	 * API POST method
	 * @template T The expected response type from the API. Defaults to Promise<any>.
	 * @param path string
	 * @param requestData Record<any, any>
	 * @param disableToastError Boolean
	 * @returns returns API POST Response or handle Error
	 */
	public post<T = any>(
		path: string,
		requestData: Record<any, any>,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'post',
			path,
			requestData,
			undefined,
			undefined,
			requestConfig
		);
	}

	/**
	 * Upload data using API POST method
	 * @param path string
	 * @param requestData FormData
	 * @param disableToastError Boolean
	 * @returns returns API POST Response or handle Error
	 */
	public upload<T = any>(
		path: string,
		requestData: FormData,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false
	): Promise<T> {
		return this.request('post', path, requestData);
	}

	/**
	 * API PUT method
	 * @param path string
	 * @param requestData Record<any, any>
	 * @param disableToastError Boolean
	 * @param requestId number | string | undefined
	 * @returns returns API PUT Response or handle Error
	 */
	public put<T = any>(
		path: string,
		requestData: Record<any, any> | FormData,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'put',
			path,
			requestData,
			requestId,
			undefined,
			requestConfig
		);
	}

	/**
	 * API PATCH method
	 * @param path string
	 * @param requestData Record<any, any>
	 * @param disableToastError Boolean
	 * @param requestId number | string | undefined
	 * @returns returns API PATCH Response or handle Error
	 */
	public patch<T = any>(
		path: string,
		requestData: Record<any, any>,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'patch',
			path,
			requestData,
			requestId,
			undefined,
			requestConfig
		);
	}

	/**
	 * API DELETE method
	 * @param path string
	 * @param requestId number | string
	 * @param disableToastError Boolean
	 * @param queryArguments Array QueryArgumentInterface
	 * @returns returns API DELETE Response or handle Error
	 */
	public delete<T = any>(
		path: string,
		requestId: number | string | undefined,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		queryArguments?: IQueryArgument[],
		requestConfig: HttpRequestConfig = {}
	): Promise<T> {
		return this.request(
			'delete',
			path,
			undefined,
			requestId,
			queryArguments,
			requestConfig
		);
	}
}

export const apiServiceInstance = new ApiService();

export default ApiService;
