import removeDiacritics, { getIconFileName } from 'Helpers/removeDiacritics';
import { ReactNode } from 'react';

import styles from './styles.module.css';

enum FallbackShippingItemIconSourceEnum {
	ZASILKOVNA = 'zasilkovna.svg',
	PICKUP = 'osobni-odber.svg',
	COURIER = 'kuryr.svg',
	PPL = 'ppl.svg',
	GENERIC = 'generic-shipping-icon.svg',
	DPD = 'dpd.svg',
}

const shippingItemKeywords: {
	[key in FallbackShippingItemIconSourceEnum]: string[];
} = {
	[FallbackShippingItemIconSourceEnum.ZASILKOVNA]: ['zasilkovna'],
	[FallbackShippingItemIconSourceEnum.PICKUP]: ['osobni odber'],
	[FallbackShippingItemIconSourceEnum.COURIER]: ['kuryr'],
	[FallbackShippingItemIconSourceEnum.PPL]: ['ppl'],
	[FallbackShippingItemIconSourceEnum.DPD]: ['dpd'],
	[FallbackShippingItemIconSourceEnum.GENERIC]: ['generic'],
};

const getShippingItemIconFallbackSource = (
	title: string = ''
): FallbackShippingItemIconSourceEnum => {
	const normalizedString = removeDiacritics(title).toLowerCase();
	//fallback to nice icons per source
	for (const [icon, keywords] of Object.entries(shippingItemKeywords)) {
		if (keywords.some((keyword) => normalizedString.includes(keyword))) {
			return icon as FallbackShippingItemIconSourceEnum;
		}
	}
	return FallbackShippingItemIconSourceEnum.GENERIC;
};

const getIconClassName = (iconSource: string): string => {
	switch (iconSource) {
		case FallbackShippingItemIconSourceEnum.PICKUP:
			return styles.pickup;
		case FallbackShippingItemIconSourceEnum.COURIER:
			return styles.courier;
		default:
			return '';
	}
};

export const getShippingIconData = (
	title: string = ''
): { source: string; fallbackSource: string; className: string } => {
	const iconSource = getIconFileName(title);
	const fallbackIconSource = getShippingItemIconFallbackSource(title);
	return {
		source: iconSource,
		fallbackSource: fallbackIconSource,
		className: getIconClassName(iconSource),
	};
};

export const getPaymentIconData = (
	title: ReactNode
): { source: string; fallbackSource: string; className: string } => {
	const iconSource = getIconFileName(String(title));
	const fallbackIconSource = 'generic-payment-icon.svg';
	return {
		source: iconSource,
		fallbackSource: fallbackIconSource,
		className: getIconClassName(iconSource),
	};
};
