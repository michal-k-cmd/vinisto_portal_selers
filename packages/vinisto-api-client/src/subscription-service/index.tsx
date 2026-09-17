import { Api } from '../api-types/subscription-api';

interface SecurityDataType {
	key: string;
}

const _FIX_THE_PROCESS_IS_NOT_DEFINED_BUG = JSON.stringify(process.env);

const readOnlyKey =
	process.env?.NEXT_PUBLIC_SUBSCRIPTION_READONLY_API_KEY ??
	import.meta.env?.VITE_SUBSCRIPTION_READONLY_API_KEY ??
	'';

const writeKey =
	process.env?.NEXT_PUBLIC_SUBSCRIPTION_WRITE_API_KEY ??
	import.meta.env?.VITE_SUBSCRIPTION_WRITE_API_KEY ??
	'';

const baseUrl =
	process.env.NEXT_PUBLIC_API_URI ?? import.meta.env?.VITE_API_URI ?? '';

const subscriptionReadOnlyApiInstance = new Api<SecurityDataType>({
	baseUrl: baseUrl.replace(/\/$/, ''),
	securityWorker: (securityData: SecurityDataType | null) => {
		if (securityData) {
			return {
				headers: {
					['X-Api-Key']: securityData.key,
				},
			};
		}
	},
});

subscriptionReadOnlyApiInstance.setSecurityData({
	key: readOnlyKey,
});

const subscriptionWriteApiInstance = new Api<SecurityDataType>({
	baseUrl: baseUrl.replace(/\/$/, ''),
	securityWorker: (securityData: SecurityDataType | null) => {
		if (securityData) {
			return {
				headers: {
					['X-Api-Key']: securityData.key,
				},
			};
		}
	},
});

subscriptionWriteApiInstance.setSecurityData({
	key: writeKey,
});

export const subscriptionReadOnlyApi =
	subscriptionReadOnlyApiInstance.subscriptionApi;
export const subscriptionWriteApi =
	subscriptionWriteApiInstance.subscriptionApi;
