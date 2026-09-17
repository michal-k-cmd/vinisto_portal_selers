import type { ReactNode } from 'react';

export type FooterInfoLink = {
	name: ReactNode;
	to: string | null;
	as?: 'link' | 'button';
};

export type FooterInfoColumn = {
	id: string;
	title: ReactNode;
	links: FooterInfoLink[];
};

export type FooterConfig = {
	newsletterTitle: ReactNode;
	customerCarePhone: string;
	mobileSecondaryContact?: {
		label: ReactNode;
		phone: string;
	};
	infoColumns: FooterInfoColumn[];
};
