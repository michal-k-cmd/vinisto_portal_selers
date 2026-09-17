import { type HTMLAttributes } from 'react';
import {
	IS_CLEARANCE_SALE,
	IS_DELETED,
	IS_GIFT,
	TEMPORARY_UNAVAILABLE,
} from 'Constants/flags';

import { VARIANTS } from './constants';

export interface BundleFlagsWarningProps
	extends HTMLAttributes<HTMLSpanElement> {
	variant?: keyof typeof VARIANTS;
	isTemporaryUnavailable?: boolean;
	isGift?: boolean;
	flags: {
		[TEMPORARY_UNAVAILABLE]?: boolean;
		[IS_GIFT]?: boolean;
		[IS_DELETED]?: boolean;
		[IS_CLEARANCE_SALE]?: boolean;
	};
}
