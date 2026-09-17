import { AxiosPromise } from 'axios';

export interface IQueryArgument<T = string> {
	key: T;
	value: string | number | boolean;
}

export type IGetApiMethod = (
	path: string,
	disableToastError: boolean,
	requestId?: number | string,
	queryArguments?: IQueryArgument[]
) => AxiosPromise;

export type IPostApiMethod = (
	path: string,
	requestData: Record<any, any>,
	disableToastError: boolean
) => AxiosPromise;

export type IPutApiMethod = (
	path: string,
	requestData: Record<any, any>,
	disableToastError: boolean,
	requestId?: string | number | undefined
) => AxiosPromise;

export type IDeleteApiMethod = (
	path: string,
	requestId: number | string,
	disableToastError: boolean,
	queryArguments?: IQueryArgument[]
) => AxiosPromise;

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
