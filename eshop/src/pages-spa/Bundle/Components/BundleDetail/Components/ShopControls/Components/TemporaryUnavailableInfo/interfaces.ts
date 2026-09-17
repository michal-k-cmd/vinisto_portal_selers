import { ReactNode } from 'react';

export interface TemporaryUnavailableInfoProps {
	translations: Record<TranslationKeys, string>;
	price?: ReactNode | string;
	priceNoVat?: ReactNode | string;
	originalPrice?: ReactNode | string;
	discountBadge?: ReactNode;
	supplier?: ReactNode | string;
	className?: string;
	isCompact?: boolean;
}

/**
 * Translation keys for the component.
 * header: business requirement is price
 * footer: business requirement is seller
 */
type TranslationKeys = 'title' | 'cta' | 'seller' | 'withoutVat';
