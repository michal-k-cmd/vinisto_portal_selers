'use client';

import { isExternalLink } from 'vinisto_shared';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { VinistoHelperDllEnumsSliderCarouselButtonStyle } from 'vinisto_api_client/src/api-types/cms-api';

import BannerButton from '../banner-button';

import styles from './styles.module.css';

interface BannerListingProps {
	title?: string;
	titleColor?: string;
	subtitle?: string;
	subtitleColor?: string;
	imageUrl?: string;
	buttonText?: string;
	buttonLink: string;
	buttonStyle: VinistoHelperDllEnumsSliderCarouselButtonStyle;
}

const BannerListing = ({
	title,
	titleColor,
	subtitle,
	subtitleColor,
	imageUrl,
	buttonText,
	buttonLink,
	buttonStyle,
}: BannerListingProps) => {
	const [isHovered, setIsHovered] = useState<boolean>(false);

	const WrapperComponent = ({ children }: { children: ReactNode }) =>
		isExternalLink(buttonLink) ? (
			<a
				href={buttonLink}
				className={styles.overlay}
				target="_blank"
				rel="noreferrer"
			>
				{children}
			</a>
		) : (
			<Link
				to={buttonLink}
				className={styles.overlay}
			>
				{children}
			</Link>
		);

	return (
		<div
			className={styles.banner}
			style={{ backgroundImage: `url('${imageUrl}')` }}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<WrapperComponent>
				<div className={styles.top}>
					<div
						className={styles.title}
						style={{ color: titleColor }}
					>
						{title}
					</div>
				</div>
				<div className={styles.bottom}>
					{subtitle && (
						<div
							className={styles.subtitle}
							style={{ color: subtitleColor }}
						>
							{subtitle}
						</div>
					)}
					<BannerButton
						className={styles.button}
						buttonText={buttonText}
						buttonStyle={buttonStyle || null}
						isHovered={isHovered}
					/>
				</div>
			</WrapperComponent>
		</div>
	);
};

export default BannerListing;
