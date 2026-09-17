import { Banner } from 'Services/Banner/interfaces';

export type TopBannerProps = Pick<
	Banner,
	'url' | 'title' | 'subtitle' | 'imageUrl' | 'ctaLabel'
>;
