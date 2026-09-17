import Axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios';
import Config from 'Config';

import { IApiService, IQueryArgument, ResponseData } from './interfaces';
import { ENV_DEVELOPMENT } from './constants';

// kuna.nese.nanuk

const axiosConfig: AxiosRequestConfig = {
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
			/* eslint-disable-next-line no-console */
			console.error(error);
		}
	}

	/**
	 * Returns error message from erroneous API response
	 * @param responseData
	 */
	private getErrorMessage(responseData: ResponseData) {
		const [apiError] = responseData.error;
		return (
			apiError?.message ?? apiError?.specificError ?? apiError?.generalError
		);
	}

	private async request<T = AxiosPromise>(
		method: Method,
		path: string,
		data?: Record<any, any> | FormData,
		requestId?: string | number | undefined,
		queryArguments?: IQueryArgument[],
		requestConfig: AxiosRequestConfig = {}
	): Promise<T> {
		const query = this.makeQuery(queryArguments);
		const url = `${this.API_URI}${path}${
			requestId ? `/${requestId}` : ''
		}${query}`;

		try {
			const response = await Axios({
				method,
				url,
				data,
				headers: { ...axiosConfig.headers, ...requestConfig.headers },
			});

			const responseData = response.data;

			/**
			 * TODO-1: remove the error omitter once the API is fixed (https://vinistoworkspace.slack.com/archives/C06915E5KJ6/p1742484944006949)
			 *
			 * This is a temporary solution to avoid throwing errors for the `supplier-api/admin/fee-rules/supplier/{supplierId}` endpoint.
			 * The API is currently returning `isError: true` even if the request is successful.
			 *
			 * We check whether the URL matches regex `supplier-api/admin/fee-rules/supplier/{supplierId}`
			 * If it does, we check whether the response data has the `feeRules` property.
			 * If the `feeRules` property is not present, or is `null`, or is `undefined`, we throw an error.
			 */

			const SHOULD_THROW =
				!isSupplierFeeRulePath(path) ||
				(isSupplierFeeRulePath(path) &&
					(!('feeRules' in responseData) ||
						responseData.feeRules === null ||
						responseData.feeRules === undefined));

			if (responseData.isError && SHOULD_THROW) {
				throw new Axios.AxiosError(this.getErrorMessage(responseData));
			}

			return responseData;
		} catch (error: unknown) {
			if (!(error instanceof Axios.AxiosError)) {
				throw error;
			}

			this.logErrorToSystemConsole(error);

			if (error?.response?.status === 500 && this.ENV !== ENV_DEVELOPMENT) {
				/* eslint-disable-next-line no-console */
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
	public get<T = AxiosPromise>(
		path: string,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		queryArguments?: IQueryArgument[],
		requestConfig: AxiosRequestConfig = {}
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
	public getCollection<T = AxiosPromise>(
		path: string,
		queryArguments?: IQueryArgument[],
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestConfig: AxiosRequestConfig = {}
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
	 * @template T The expected response type from the API. Defaults to AxiosPromise.
	 * @param path string
	 * @param requestData Record<any, any>
	 * @param disableToastError Boolean
	 * @returns returns API POST Response or handle Error
	 */
	public post<T = AxiosPromise>(
		path: string,
		requestData: Record<any, any>,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestConfig: AxiosRequestConfig = {}
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
	public upload<T = AxiosPromise>(
		path: string,
		requestData: FormData,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false
	): Promise<T> {
		return this.request('post', path, requestData, undefined, undefined, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});
	}

	/**
	 * API PUT method
	 * @param path string
	 * @param requestData Record<any, any>
	 * @param disableToastError Boolean
	 * @param requestId number | string | undefined
	 * @returns returns API PUT Response or handle Error
	 */
	public put<T = AxiosPromise>(
		path: string,
		requestData: Record<any, any>,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		requestConfig: AxiosRequestConfig = {}
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
	public patch<T = AxiosPromise>(
		path: string,
		requestData: Record<any, any>,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		requestId?: string | number | undefined,
		requestConfig: AxiosRequestConfig = {}
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
	public delete<T = AxiosPromise>(
		path: string,
		requestId: number | string | undefined,
		/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
		disableToastError = false,
		queryArguments?: IQueryArgument[],
		requestConfig: AxiosRequestConfig = {}
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

/**
 * TODO-1: remove this once the API is fixed (https://vinistoworkspace.slack.com/archives/C06915E5KJ6/p1742484944006949)
 * this function checks whether the argument === supplier-api/admin/fee-rules/supplier/{supplierId}
 */
const isSupplierFeeRulePath = (path: string): boolean => {
	const regex = /^supplier-api\/admin\/fee-rules\/supplier\/[a-zA-Z0-9]+$/;
	return regex.test(path);
};
