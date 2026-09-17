import { Banner } from 'Services/Banner/interfaces';
import { Dispatch, SetStateAction } from 'react';

export type TopBannerProps = Pick<
	Banner,
	| 'imageOriginalUrl'
	| 'imageUrl'
	| 'srcSet'
	| 'url'
	| 'title'
	| 'ctaLabel'
	| 'subtitle'
	| 'position'
	| 'order'
	| 'titleColor'
	| 'subtitleColor'
	| 'buttonStyle'
> & {
	cardOrder: number;
	isMatchingNarrowestBreakpoint?: boolean;
	setLoadedImages?: Dispatch<SetStateAction<boolean[]>>;
};
