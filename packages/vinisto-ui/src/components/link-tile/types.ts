import { ComponentPropsWithoutRef } from 'react';

type LinkTileProps = {
	title: string;
	img: {
		src: string;
		alt: string;
	};
} & ComponentPropsWithoutRef<'div'>;

export type { LinkTileProps };
