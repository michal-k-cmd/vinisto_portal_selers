import { isExternalLink } from 'vinisto_shared';
import NextLink from 'next/link';
import { ReactNode, useState } from 'react';
import { VinistoHelperDllEnumsSliderCarouselButtonStyle } from 'vinisto_api_client/src/api-types/cms-api';

import BannerButton from '../banner-button';

import styles from './styles.module.css';

interface BannerListingProps {
	title?: string;
	subtitle?: string;
	imageUrl?: string;
	buttonText?: string;
	buttonLink: string;
	titleColor?: string | null;
	subtitleColor?: string | null;
	buttonStyle?: VinistoHelperDllEnumsSliderCarouselButtonStyle | null;
}

const BannerListing = ({
	title,
	subtitle,
	imageUrl,
	buttonText,
	buttonLink,
	titleColor,
	subtitleColor,
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
			<NextLink
				href={buttonLink}
				className={styles.overlay}
			>
				{children}
			</NextLink>
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
						style={titleColor ? { color: titleColor } : undefined}
					>
						{title}
					</div>
				</div>
				<div className={styles.bottom}>
					{subtitle && (
						<div
							className={styles.subtitle}
							style={subtitleColor ? { color: subtitleColor } : undefined}
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
