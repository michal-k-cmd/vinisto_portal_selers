import { ReactNode } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';
import isExternalLink from 'Helpers/is-external-link';
import NextLink from 'next/link';

import { USPBannerProps } from './interfaces';
import styles from './styles.module.css';
import { VARIANTS } from './constants';

const USPBanner = ({
	url,
	isNext,
	title,
	subtitle,
	imageUrl,
	// srcSet,
	itemsCount,
	isLoading,
	variant,
}: USPBannerProps) => {
	const ParentComponent = ({
		children,
		...props
	}: {
		children: ReactNode;
		className?: string;
		props?: any;
	}) => {
		if (!url) return <div {...props}>{children}</div>;

		if (isExternalLink(url)) {
			return (
				<a
					href={url}
					target="_blank"
					rel="noreferrer"
					{...props}
				>
					{children}
				</a>
			);
		}

		if (isNext) {
			return (
				<NextLink
					href={url}
					{...props}
				>
					{children}
				</NextLink>
			);
		}

		return (
			<NextLink
				href={url}
				{...props}
			>
				{children}
			</NextLink>
		);
	};

	return (
		<ParentComponent
			className={cx(
				styles.container,
				variant === VARIANTS.PRODUCT_DETAIL && styles.productDetailUspBanner,
				typeof itemsCount === 'number' && {
					[styles.items_2]: itemsCount <= 2,
					[styles.items_3]: itemsCount === 3,
					[styles.items_4]: itemsCount === 4,
					[styles.items_5]: itemsCount === 5,
					[styles.items_6]: itemsCount === 6,
					[styles.items_7]: itemsCount === 7,
					[styles.items_8]: itemsCount === 8,
				}
			)}
		>
			{!isLoading ? (
				<div className={styles.imageWrap}>
					<img
						src={imageUrl}
						// !!! These 30x30 images are actually being rendered as 500x500 and there's
						// no way to change it as all smaller sizes are padded with transparency !!!
						// srcSet={srcSet}
						// {...(variant === VARIANTS.PRODUCT_DETAIL && { sizes: '30px' })}
						alt={title || subtitle || ''}
						className={styles.image}
						width={40}
						height={40}
					/>
				</div>
			) : (
				<Skeleton
					height={'100%'}
					containerClassName={styles.imageWrap}
				/>
			)}
			{!isLoading ? (
				<span className={styles.title}>{title}</span>
			) : (
				<Skeleton containerClassName={styles.skeletonContainer} />
			)}
			{!isLoading ? (
				<span className={styles.subtitle}>{subtitle}</span>
			) : (
				<Skeleton containerClassName={styles.skeletonContainer} />
			)}
		</ParentComponent>
	);
};

export default USPBanner;
