export type OmitConstrained<T, K extends keyof T> = Pick<
	T,
	Exclude<keyof T, K>
>;
export type NotPresent<T> = {
	[K in keyof T]?: never;
};
