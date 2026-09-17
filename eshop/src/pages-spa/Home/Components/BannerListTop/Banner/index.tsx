import cx from 'classnames';
import isExternalLink from 'Helpers/is-external-link';
import NextLink from 'next/link';
import { useState } from 'react';
import { BannerButton } from 'vinisto_ui';
import transformImage from 'Helpers/transformImage';
import usePromotionAnalytics from 'Hooks/usePromotionAnalytics';

import { TopBannerProps } from './interfaces';
import styles from './styles.module.css';

const TopBanner = ({
	url,
	title,
	subtitle,
	imageOriginalUrl,
	imageUrl,
	srcSet,
	ctaLabel,
	cardOrder,
	position,
	order,
	isMatchingNarrowestBreakpoint,
	setLoadedImages,
	titleColor,
	subtitleColor,
	buttonStyle,
}: TopBannerProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const { promotionRef, handleSelectPromotion } =
		usePromotionAnalytics<HTMLAnchorElement>({
			promotion_id: `${position}-${order ?? cardOrder}-${url}`,
			promotion_name: title,
			creative_name: imageUrl || imageOriginalUrl,
			creative_slot: position,
		});

	const bannerContent = (
		<div
			className={cx(styles.card, {
				[styles.primaryCard]: cardOrder === 1 || !cardOrder,
				[styles.secondaryCard]: cardOrder > 1,
			})}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			{
				<div className={styles.heading}>
					{title && (
						<div
							className={styles.title}
							style={titleColor ? { color: titleColor } : undefined}
						>
							{title}
						</div>
					)}
					{subtitle && (
						<div
							className={styles.subtitle}
							style={subtitleColor ? { color: subtitleColor } : undefined}
						>
							{subtitle}
						</div>
					)}
				</div>
			}

			<div className={styles.imgContainer}>
				<img
					srcSet={srcSet}
					sizes={`(max-width: 1199.98px) 500px, (min-width: 1200px) ${
						cardOrder === 1 ? '950px' : '500px'
					},  100vw`}
					src={transformImage(imageOriginalUrl, 950)}
					className={styles.img}
					alt={title || subtitle || ''}
					{...(cardOrder === 1 && { fetchPriority: 'high' })}
					{...(isMatchingNarrowestBreakpoint &&
						cardOrder !== 1 && { loading: 'lazy' })}
					onLoad={() => setLoadedImages?.((prev) => prev.map(() => true))}
				/>
			</div>

			<BannerButton
				className={styles.button}
				buttonText={ctaLabel || ''}
				buttonStyle={buttonStyle || null}
				isHovered={isHovered}
			/>
		</div>
	);

	return isExternalLink(url) ? (
		<a
			ref={promotionRef}
			href={url}
			className={styles.card}
			target="_blank"
			rel="noreferrer"
			onClick={handleSelectPromotion}
		>
			{bannerContent}
		</a>
	) : (
		<NextLink
			ref={promotionRef}
			href={url}
			className={styles.card}
			onClick={handleSelectPromotion}
		>
			{bannerContent}
		</NextLink>
	);
};

export default TopBanner;
