import { IS_GIFT, TEMPORARY_UNAVAILABLE } from 'Constants/flags';

import { Bundle } from '@/domain/bundle';

export type Flag = typeof TEMPORARY_UNAVAILABLE | typeof IS_GIFT;

const incompatibleFlags = {
	[TEMPORARY_UNAVAILABLE]: [IS_GIFT],
	[IS_GIFT]: [TEMPORARY_UNAVAILABLE],
} as const;

const getIncompatibleFlags = (
	desiredFlag: Flag,
	desiredValue: boolean,
	bundle: Bundle | undefined
) => {
	// Currently, turning OFF any flag (meaning 'desiredValue' would be 'false') is O.K.
	// If the logic gets more complex in the future, it would have to be updated
	if (!desiredValue) return null;

	const incompatiblesFound: Flag[] = [];

	if (
		Object.prototype.hasOwnProperty.call(bundle, desiredFlag) &&
		bundle?.flags[desiredFlag] === true
	) {
		incompatiblesFound.push(desiredFlag);
	}

	incompatibleFlags[desiredFlag].forEach((flag) => {
		if (
			Object.prototype.hasOwnProperty.call(bundle, flag) &&
			bundle?.flags[flag] === true
		) {
			incompatiblesFound.push(flag);
		}
	});

	return incompatiblesFound.length ? incompatiblesFound : null;
};

export default getIncompatibleFlags;
