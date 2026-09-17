export const STORAGE_PREFIX = 'VINISTO_ADMIN';

export const LocalStorageKeys = {
	ACTIVE_LANGUAGE: 'ACTIVE_LANGUAGE',
	LOGIN_REDIRECT_PATH: 'LOGIN_REDIRECT_PATH',
	VINISTO_AUTH: 'VINISTO_AUTH',
	CUSTOMER_ID: 'CUSTOMER_ID',
	INTEGRATIONS: 'INTEGRATIONS',
} as const;

export type LocalStorageKey =
	| keyof typeof LocalStorageKeys
	| `adminTableVisibleColumns-${string}`
	| `adminTableColumnsOrder-${string}`;
