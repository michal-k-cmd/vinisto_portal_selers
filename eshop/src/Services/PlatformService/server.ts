import { cookies, headers } from 'next/headers';
import { prefix } from 'Services/StorageService/helpers';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import { IS_B2B, IS_B2B_FORCED_BY_ENV } from './constants';

import { VinistoHelperDllEnumsDeliveryAndPaymentPlatform } from '@/api-types/order-api';

export type ServerSearchParams = Readonly<
	Record<string, string | string[] | undefined>
>;

const getFirstSearchParamValue = (
	value: string | string[] | undefined
): string | undefined => (Array.isArray(value) ? value[0] : value);

export const getServerIsB2b = async (
	searchParams?: Promise<ServerSearchParams> | ServerSearchParams
): Promise<boolean> => {
	const [headerStore, resolvedSearchParams, cookieStore] = await Promise.all([
		headers(),
		searchParams,
		cookies(),
	]);

	const platformCookie = cookieStore.get(
		`${prefix(LocalStorageKeys.ACTIVE_PLATFORM)}`
	)?.value;

	if (platformCookie) {
		return IS_B2B_FORCED_BY_ENV
			? true
			: platformCookie === VinistoHelperDllEnumsDeliveryAndPaymentPlatform.B2B;
	}

	const host =
		headerStore.get('x-forwarded-host') ?? headerStore.get('host') ?? '';
	const hostname = host.split(':')[0];
	const isB2bSubdomain = hostname.split('.')[0] === 'b2b';
	const isB2bQueryParam = !!getFirstSearchParamValue(
		resolvedSearchParams?.[IS_B2B]
	);

	return isB2bSubdomain || isB2bQueryParam || IS_B2B_FORCED_BY_ENV;
};
