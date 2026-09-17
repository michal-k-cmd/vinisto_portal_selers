import { VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog } from 'vinisto_api_client/src/api-types/product-api/';

export const getUniqueUserEmails = (
	data: VinistoApplicationLogDllModelsApiApplicationLogBundleApplicationLog[]
) => {
	const uniqueIds = Array.from(
		new Set((data ?? []).map((row) => row.user?.id))
	);

	const keyValueTuples = uniqueIds
		.map((id) => {
			const user = data?.find((row) => row.user?.id === id)?.user;
			if (user) return [user.id, user.email];
			return null;
		})
		.filter((user): user is Exclude<typeof user, null> => Boolean(user));

	return keyValueTuples as [string, string][];
};

export const getDiscountPercentage = (
	oldPrice: number,
	newPrice: number,
	asNegativeNumber = true
) => {
	return (asNegativeNumber ? -1 : 1) * ((oldPrice - newPrice) / oldPrice) * 100;
};

export const showSign = (number: number) => {
	const signedNumber = new Intl.NumberFormat('cs-CZ', {
		signDisplay: 'exceptZero',
	}).format(number);

	return signedNumber;
};

export const getRoundedPriceWithVat = (price: number, vat: number) => {
	return Math.round(price + (price * vat) / 100);
};
