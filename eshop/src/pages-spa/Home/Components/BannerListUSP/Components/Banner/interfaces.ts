import { Banner } from 'Services/Banner/interfaces';

import { VARIANTS } from './constants';

export type USPBannerProps = Pick<
	Banner,
	'url' | 'title' | 'subtitle' | 'imageUrl' | 'srcSet'
> & {
	itemsCount?: number;
	className?: string;
	isLoading: boolean;
	variant?: (typeof VARIANTS)[keyof typeof VARIANTS];
	isNext?: boolean;
};
