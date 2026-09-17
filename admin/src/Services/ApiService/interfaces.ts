export interface IQueryArgument<T = string> {
	key: T;
	value: string | number | boolean;
}

export type IGetApiMethod = (
	path: string,
	disableToastError: boolean,
	requestId?: number | string,
	queryArguments?: IQueryArgument[]
) => Promise<any>;

export type IPostApiMethod = (
	path: string,
	requestData: Record<any, any>,
	disableToastError: boolean
) => Promise<any>;

export type IPutApiMethod = (
	path: string,
	requestData: Record<any, any> | FormData,
	disableToastError: boolean,
	requestId?: string | number | undefined
) => Promise<any>;

export type IDeleteApiMethod = (
	path: string,
	requestId: number | string,
	disableToastError: boolean,
	queryArguments?: IQueryArgument[]
) => Promise<any>;

export interface IApiService {
	get: IGetApiMethod;
	post: IPostApiMethod;
	put: IPutApiMethod;
	delete: IDeleteApiMethod;
}

export interface ResponseData {
	isError: boolean;
	error: VinistoApiError[];
}

interface VinistoApiError {
	message: string;
	specificError?: string;
	generalError?: string;
}
