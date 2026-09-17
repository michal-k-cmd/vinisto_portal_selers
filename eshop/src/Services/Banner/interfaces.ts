import { BANNER_POSITION } from './constants';

import { VinistoHelperDllEnumsSliderCarouselButtonStyle } from '@/api-types/cms-api';

export interface Banner {
	title: string;
	subtitle?: string;
	ctaLabel: string;
	url: string;
	imageOriginalUrl: string;
	imageUrl: string;
	srcSet?: string;
	position: BANNER_POSITION;
	order: number;
	titleColor?: string | null;
	subtitleColor?: string | null;
	buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
}
