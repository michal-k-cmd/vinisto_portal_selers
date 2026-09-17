import { TransformedSignalRErrors } from 'Services/BasketService/interfaces';

import { BasketErrorBuckets } from './interfaces';

const PREFIX_USER = 'user';
const PREFIX_ANON = 'anon';
const UNKNOWN_FALLBACK = 'unknown';

export const createEmptyErrorMessages = (): TransformedSignalRErrors => ({
	Bundle: [],
	Coupon: [],
	Addon: [],
});

export const getOwnerKey = ({
	isLoggedIn,
	userId,
	anonymousUserId,
}: {
	isLoggedIn: boolean;
	userId: string | number | null | undefined;
	anonymousUserId: string | null | undefined;
}) => {
	if (isLoggedIn && userId) return `${PREFIX_USER}:${String(userId)}`;
	if (anonymousUserId) return `${PREFIX_ANON}:${anonymousUserId}`;
	return `${PREFIX_ANON}:${UNKNOWN_FALLBACK}`;
};

export const getBucketKey = (ownerKey: string, basketId: string) =>
	`${ownerKey}:${basketId}`;

export const dedupeById = (items: TransformedSignalRErrors['Bundle']) => {
	const seen = new Set<string>();

	return items.filter((item) => {
		const key = item.id
			? String(item.id)
			: `${String(item.itemId || UNKNOWN_FALLBACK)}:${String(
					item.specificError || UNKNOWN_FALLBACK
			  )}`;

		if (seen.has(key)) {
			return false;
		}

		seen.add(key);
		return true;
	});
};

export const aggregateErrorsForOwner = (
	buckets: BasketErrorBuckets,
	ownerKey: string
): TransformedSignalRErrors => {
	const aggregated = Object.values(buckets)
		.filter((bucket) => bucket.ownerKey === ownerKey)
		.reduce<TransformedSignalRErrors>(
			(accumulator, bucket) => ({
				Bundle: [...accumulator.Bundle, ...bucket.errors.Bundle],
				Coupon: [...accumulator.Coupon, ...bucket.errors.Coupon],
				Addon: [...accumulator.Addon, ...bucket.errors.Addon],
			}),
			createEmptyErrorMessages()
		);

	return {
		Bundle: dedupeById(aggregated.Bundle),
		Coupon: dedupeById(aggregated.Coupon),
		Addon: dedupeById(aggregated.Addon),
	};
};
