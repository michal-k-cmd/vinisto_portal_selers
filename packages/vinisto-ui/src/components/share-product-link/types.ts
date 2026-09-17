export interface SocialMediaLinksProps {
	bundleName: string;
	isTabletMobile: boolean;
	className?: string;
}

enum ShareBundleLinkVariant {
	FACEBOOK = 'FACEBOOK',
	X = 'X',
	COPY_LINK = 'COPY_LINK',
}

export { ShareBundleLinkVariant };
