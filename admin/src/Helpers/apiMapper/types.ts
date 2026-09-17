export type ApiResponse<T, K extends string> = {
	count: number;
	error: string | null;
	isError: boolean;
} & { [key in K]: T };
