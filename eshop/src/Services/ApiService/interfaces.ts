export interface ICustomApiArguments {
	API_URI?: string | null;
	DOMAIN?: string | null;
	PORT?: number | null;
	PROTOCOL?: string | null;
}

export interface IQueryArgument {
	key: string;
	value: string | number | boolean | string[] | number[];
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
