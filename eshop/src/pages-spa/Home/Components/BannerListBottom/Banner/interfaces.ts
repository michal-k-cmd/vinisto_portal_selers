import { Banner } from 'Services/Banner/interfaces';

export type BottomBannerProps = Pick<
	Banner,
	| 'url'
	| 'title'
	| 'subtitle'
	| 'ctaLabel'
	| 'srcSet'
	| 'imageOriginalUrl'
	| 'imageUrl'
	| 'position'
	| 'order'
	| 'titleColor'
	| 'subtitleColor'
	| 'buttonStyle'
>;
