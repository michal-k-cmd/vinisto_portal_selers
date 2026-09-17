import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from './api-types/order-api';
import { VinistoHelperDllBaseError } from './api-types/product-api';
import { ApiError, NetworkError } from './domain/error';
import { getCookieByName } from './utils/get-cookie-by-name';
import isClientSideB2b from './utils/is-client-side-b2b';
import isNetworkError from './utils/is-network-error';

// The discriminate union is, sadly, very likely not wworking as intended :(
// User-defined type guard is probably the only way to go
export type BaseResponse =
	| {
			isError: true;
			error: VinistoHelperDllBaseError[];
	  }
	| {
			isError: false;
			error: null;
	  }
	| {
			isError?: boolean;
			error: VinistoHelperDllBaseError[] | null | undefined | unknown;
	  };

//TODO: Remove once BE correctly deserializes URL params (anon hash, colons, etc.)
//TODO: This shouldn't be here for longer than 2 sprints !!!!!!!
type TempRequestInit = RequestInit & {
	serializeUrlParams?: boolean;
};

const mergeHeaders = (
	baseHeaders: HeadersInit | undefined,
	requestHeaders: HeadersInit | undefined
): Headers => {
	const headers = new Headers(baseHeaders);

	new Headers(requestHeaders).forEach((value, key) => {
		headers.set(key, value);
	});

	return headers;
};

const injectB2bIntegrationApiKeyIfNeeded = (
	options: TempRequestInit | undefined,
	baseOptions: TempRequestInit | undefined
) => {
	// Would apply only on eshop app in client components
	if (
		typeof window !== 'undefined' &&
		process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY
	) {
		const isB2b = isClientSideB2b();

		if (isB2b) {
			const headers = mergeHeaders(baseOptions?.headers, options?.headers);
			headers.set(
				'X-Api-Key',
				process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B || ''
			);

			return {
				...baseOptions,
				...options,
				headers,
			};
		}
	}

	return options;
};

export class VinistoApiService {
	constructor(baseURL?: RequestInfo | URL, baseOptions?: RequestInit) {
		this.baseUrl = baseURL ?? '';
		this.options = {
			...this.baseOptions,
			...baseOptions,
		};
	}

	private options;

	private baseUrl;

	private baseOptions: RequestInit = {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			['X-Api-Key']:
				process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY ||
				import.meta.env.VITE_INTEGRATIONS_API_KEY ||
				'',
		},
	};

	// This is one of the options how to pass platform as argument
	//public platform(platform: VinistoHelperDllEnumsDeliveryAndPaymentPlatform) {
	//	if (platform === VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B) {
	//		return new VinistoApiService(getApiUrl(), {
	//			...this.baseOptions,
	//			...this.options,
	//			headers: {
	//				...this.baseOptions?.headers,
	//				...this.options?.headers,
	//				['X-Api-Key']: process.env.NEXT_PUBLIC_INTEGRATIONS_API_KEY_B2B ?? '',
	//			},
	//		});
	//	}
	//	return this;
	//}

	// api processes arrays like this: OrderStates=CREATED&OrderStates=PAID&OrderStates=REFUNDED
	// and not like this OrderStates: CREATED%2CPAID%2CIN_WMS%2CWMS_ACCEPTED%2CWMS_INCOMPLETE%2CWMS_READY%2CSENT
	private serializeQueryParams(params: Record<string, any>): string {
		const queryString = Object.entries(params)
			.map(([key, value]) => {
				if (Array.isArray(value)) {
					return value
						.map(
							(val) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`
						)
						.join('&');
				}
				return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
			})
			.join('&');
		return queryString;
	}

	private constructUrlWithParams(
		url: string,
		queryParams?: Record<PropertyKey, any>,
		serialize: boolean = true
	): string {
		if (!queryParams) return url;

		const queryString = serialize
			? this.serializeQueryParams(queryParams)
			: Object.entries(queryParams)
					.map(([key, val]) => `${key}=${val}`)
					.join('&');
		return `${url}?${queryString}`;
	}

	private async request<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any>,
		TBody extends Record<PropertyKey, any> | FormData
	>(
		method: RequestInit['method'],
		url: RequestInfo | URL,
		body?: TBody,
		queryParams?: TQueryParams,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		const serialize = options?.serializeUrlParams !== false;
		const requestURL = this.constructUrlWithParams(
			`${this.baseUrl}${url}`,
			queryParams,
			serialize
		);
		// TODO: Uncomment and use instead of prev 2 lines after BE fixes URL deserialization
		// const requestURL = `${this.baseUrl}${url}${
		//   queryParams ? `?${this.serializeQueryParams(queryParams)}` : ''
		// }`;

		const requestOptions = injectB2bIntegrationApiKeyIfNeeded(
			options,
			this.options
		);
		const requestHeaders = mergeHeaders(
			this.options.headers,
			requestOptions?.headers
		);

		if (
			body instanceof FormData &&
			!new Headers(options?.headers).has('Content-Type') &&
			requestHeaders.get('Content-Type') === 'application/json'
		) {
			requestHeaders.delete('Content-Type');
		}

		const requestInit = {
			...this.options,
			...requestOptions,
			headers: requestHeaders,
			method,
			...(body &&
				method !== 'GET' && {
					body: body instanceof FormData ? body : JSON.stringify(body),
				}),
		} satisfies RequestInit;

		try {
			var data;
			const response = await fetch(requestURL, requestInit);
			const method = options?.responseType ?? 'json';

			switch (method) {
				case 'blob':
					data = await response.blob();
					break;
				case 'text':
					data = await response.text();
					break;
				case 'json':
					data = await response.json();
					break;
				default:
					data = response;
					break;
			}

			if (!response.ok || data.isError) {
				return Promise.reject(new ApiError(data, requestInit, response));
			}

			return data;
		} catch (error) {
			if (isNetworkError(error)) {
				/* Error properties are not enumerable, we need to hack it a bit to get a regular object
        const errorObject = JSON.parse(
          JSON.stringify(error, Object.getOwnPropertyNames(error))
        );*/
				return Promise.reject(new NetworkError(requestInit));
			}
			// Probably unknown error? This should not happen
			return Promise.reject(error);
		}
	}

	get<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('GET', url, undefined, queryParams, options);
	}

	post<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>,
		TBody extends Record<PropertyKey, any> | FormData =
			| Record<PropertyKey, any>
			| FormData
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		body?: TBody,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('POST', url, body, queryParams, options);
	}

	put<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>,
		TBody extends Record<PropertyKey, any> | FormData =
			| Record<PropertyKey, any>
			| FormData
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		body?: TBody,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('PUT', url, body, queryParams, options);
	}

	patch<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>,
		TBody extends Record<PropertyKey, any> | FormData =
			| Record<PropertyKey, any>
			| FormData
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		body?: TBody,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('PATCH', url, body, queryParams, options);
	}

	delete<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>,
		TBody extends Record<PropertyKey, any> | FormData =
			| Record<PropertyKey, any>
			| FormData
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		body?: TBody,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('DELETE', url, body, queryParams, options);
	}

	upload<
		TResponse extends BaseResponse,
		TQueryParams extends Record<PropertyKey, any> = Record<PropertyKey, any>,
		TBody extends FormData = FormData
	>(
		url: RequestInfo | URL,
		queryParams?: TQueryParams,
		body?: TBody,
		options?: TempRequestInit & { responseType?: 'blob' | 'text' | 'json' }
	): Promise<TResponse> {
		return this.request('POST', url, body, queryParams, {
			...options,
			headers: { 'Content-Type': 'multipart/form-data' },
		});
	}
}

// Add TypeScript interface for Vite's import.meta.env
declare global {
	interface ImportMetaEnv {
		readonly VITE_API_URI?: string;
		readonly VITE_API_URI_SK?: string;
		readonly [key: string]: any;
	}

	interface ImportMeta {
		readonly env: ImportMetaEnv;
	}
}

const getApiUrl = () => {
	if (typeof window !== 'undefined') {
		const location = window.document.location;
		const apiUrl = location.hostname.includes('.sk')
			? // For Vite projects
			  (typeof import.meta !== 'undefined' &&
					import.meta.env?.VITE_API_URI_SK) ||
			  // For Next.js projects
			  process.env.NEXT_PUBLIC_API_URI_SK ||
			  ''
			: // For Vite projects
			  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URI) ||
			  // For Next.js projects
			  process.env.NEXT_PUBLIC_API_URI ||
			  '';

		return apiUrl;
	}

	// Server-side (Next.js only)
	return process.env.NEXT_PUBLIC_API_URI || 'https://www.vinisto.dev/';
};

export default new VinistoApiService(getApiUrl());
