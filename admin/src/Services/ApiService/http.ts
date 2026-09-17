export type HttpRequestConfig = NonNullable<Parameters<typeof fetch>[1]>;
export type HttpPromise = Promise<any>;
export type HttpResponse<T = any> = T;

export class HttpError extends Error {
	readonly status: number;
	readonly response: { status: number };
	readonly data: unknown;

	constructor(message: string, status: number, data?: unknown) {
		super(message);
		this.name = 'HttpError';
		this.status = status;
		this.response = { status };
		this.data = data;
	}
}
