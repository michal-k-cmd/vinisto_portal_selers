import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import Icon from '../Icon';
import { BASE_FA_ICONS_URL } from '../Icon/constants';

import styles from './styles.module.css';
import { LinkTileProps } from './types';

const FallbackSvg = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		width="24"
		height="24"
		fill="currentColor"
		className={styles.fallbackIcon}
	>
		<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
	</svg>
);

const LinkTile = ({ title, img, className, ...props }: LinkTileProps) => {
	const source = img.src;

	const isFontAwesomeIcon = source.includes(' ');

	const iconName = isFontAwesomeIcon ? source.split(' ')[1] : '';
	const iconPrefix = isFontAwesomeIcon ? source.split(' ')[0] : '';

	return (
		<div
			{...props}
			className={cx(className, styles.wrapper)}
		>
			{isFontAwesomeIcon ? (
				<Icon
					baseUrl={`${BASE_FA_ICONS_URL}/${'solid'}/`}
					prefix={iconPrefix}
					name={iconName}
					className={styles.icon}
				/>
			) : source ? (
				<div className={styles.imageWrapper}>
					<img
						className={styles.image}
						src={img.src}
						alt={img.alt}
					/>
				</div>
			) : (
				<FallbackSvg />
			)}
			<p className={styles.title}>{title}</p>
		</div>
	);
};

const LinkTileSkeleton = () => (
	<Skeleton
		style={{
			minHeight:
				'calc(calc(0.8125rem * (calc(var(--vinisto-line-height)) * 2)) + 1.5rem)',
		}}
	/>
);

LinkTile.Skeleton = LinkTileSkeleton;

export default LinkTile;
