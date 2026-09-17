type OmitConstrained<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
type NotPresent<T> = {
	[K in keyof T]?: never;
};

type NonNullableProperties<T> = {
	[K in keyof T]-?: NonNullable<T[K]>;
};

interface BaseDataState {
	loading?: boolean;
	loaded?: boolean;
	error?: string | null;
}

interface Address {
	street: string | null;
	landRegistryNumber: string | null;
	houseNumber: string | null;
	zip: string | null;
	city: string | null;
	countryCode: 'CZ' | 'SK' | 'DE' | 'UK';
	name: string;
	surname: string;
	phone: string;
	note: string | null;
	email: string | null;
	title: string | null;
	company: string | null;
	ico: string | null;
	dic: string | null;
	accountNumber: string | null;
	bankCode: string | null;
}

export type {
	Address,
	BaseDataState,
	NonNullableProperties,
	NotPresent,
	OmitConstrained,
};
