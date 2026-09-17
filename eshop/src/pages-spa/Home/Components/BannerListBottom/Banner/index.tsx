'use client';

import cx from 'classnames';
import NextLink from 'next/link';
import isExternalLink from 'Helpers/is-external-link';
import transformImage from 'Helpers/transformImage';
import { useState } from 'react';
import { BannerButton } from 'vinisto_ui';
import usePromotionAnalytics from 'Hooks/usePromotionAnalytics';

import { BottomBannerProps } from './interfaces';
import styles from './styles.module.css';

const BottomBanner = ({
	url,
	title,
	subtitle,
	imageOriginalUrl,
	imageUrl,
	srcSet,
	ctaLabel,
	position,
	order,
	titleColor,
	subtitleColor,
	buttonStyle,
}: BottomBannerProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);
	const { promotionRef, handleSelectPromotion } =
		usePromotionAnalytics<HTMLAnchorElement>({
			promotion_id: `${position}-${order}-${url}`,
			promotion_name: title,
			creative_name: imageUrl || imageOriginalUrl,
			creative_slot: position,
		});

	const bannerContent = (
		<div
			className={cx('vinisto-card', styles.card)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className={styles.imageContainer}>
				<img
					className={styles.image}
					srcSet={srcSet}
					// Cannot use these sizes because they can be padded with transparency
					//sizes={`(max-width: 375px) 100vw, (max-width 767.98) 50vw, 25vw`}
					sizes={`(max-width: 767.98px) 500px, 500px`}
					src={transformImage(imageOriginalUrl, 320)}
					alt={title || subtitle || ''}
					loading="lazy"
				/>
			</div>
			<div>
				{title && (
					<p
						className="vinisto-card__heading h2 w-100 position-relative"
						style={{ color: titleColor || 'rgb(var(--vinisto-color-white))' }}
					>
						{title}
					</p>
				)}
				{subtitle && (
					<p
						className="vinisto-card__top-text position-relative"
						style={{
							color: subtitleColor || 'rgb(var(--vinisto-color-white))',
						}}
					>
						{subtitle}
					</p>
				)}
			</div>
			<div className="vinisto-card__bottom-link text-right">
				<BannerButton
					className={styles.button}
					buttonText={ctaLabel || ''}
					buttonStyle={buttonStyle || null}
					isHovered={isHovered}
				/>
			</div>
		</div>
	);

	return isExternalLink(url) ? (
		<a
			ref={promotionRef}
			href={url}
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
			onClick={handleSelectPromotion}
		>
			{bannerContent}
		</NextLink>
	);
};

export default BottomBanner;
