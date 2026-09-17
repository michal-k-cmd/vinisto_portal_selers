import Link from 'next/link';
import isExternalLink from 'Helpers/is-external-link';

import { TopBannerProps } from './interfaces';
import styles from './styles.module.css';

const BundleBanner = ({
	url,
	title,
	subtitle,
	imageUrl,
	ctaLabel,
}: TopBannerProps) => {
	const backgroundStyle =
		imageUrl === null ? {} : { backgroundImage: `url(${imageUrl})` };

	const banner = (
		<div
			className={styles.banner}
			style={backgroundStyle}
		>
			<div className={styles.bannerHeadingWrap}>
				<p className={styles.bannerHeading}>{title}</p>
				<p className={styles.bannerSubheading}>{subtitle}</p>
			</div>
			{url && (
				<div className={styles.bannerCtaWrap}>
					<span className={styles.bannerCta}>{ctaLabel} &gt;</span>
				</div>
			)}
		</div>
	);

	if (!url) {
		return banner;
	}
	return isExternalLink(url) ? (
		<a
			href={url}
			target="_blank"
			rel="noreferrer"
		>
			{banner}
		</a>
	) : (
		<Link href={url}>{banner}</Link>
	);
};

export default BundleBanner;
