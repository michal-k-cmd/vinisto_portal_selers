export type LandingCTAs = {
	icon: string;
	mainText: string;
	subText: string;
};

export type HeaderType =
	| 'Competition_header'
	| 'Producer_header'
	| 'VinistoPlus_header';

export interface LandingHeaderProps {
	bgImgUrl?: string | null;
	logoUrl?: string;
	title: string;
	text?: string;
	countryCode?: string;
	countryName?: string;
	region?: string;
	region_slug?: string;
	ctas?: LandingCTAs[];
	type?: HeaderType;
}
