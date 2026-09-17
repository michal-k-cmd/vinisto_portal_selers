'use client';

import { useContext } from 'react';
import cx from 'classnames';
import { FavoritesContext } from 'Services/FavoritesService';
import { LocalizationContext } from 'Services/LocalizationService';
import HeartIcon from 'Components/Icons/Heart';
import HeartEmptyIcon from 'Components/Icons/HeartEmpty';

import styles from './styles.module.css';

type TFavoriteProps = {
	size?: 'xs' | 'sm' | 'md' | 'bundle';
	filled?: boolean;
	showCount?: boolean;
	count?: number;
	className?: string;
	inverted?: boolean;
	onClick?: () => void;
};

const Favorite = ({
	filled = false,
	showCount = false,
	count = 0,
	className,
	size = 'md',
	inverted = false,
	onClick,
}: TFavoriteProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const allowToShowCount =
		showCount && typeof count === 'number' && count !== 0;

	return (
		<div
			className={cx(
				styles.wrapper,
				{
					[styles.withCount]: allowToShowCount,
					[styles.sizeXs]: size === 'xs',
					[styles.sizeSm]: size === 'sm',
					[styles.sizeMd]: size === 'md',
					[styles.sizeBundle]: size === 'bundle',
					[styles.inverted]: inverted,
				},
				className
			)}
			onClick={onClick}
			role="presentation"
		>
			{filled ? (
				<HeartIcon
					className={styles.icon}
					alt={`${t({ id: 'alt.inFavorites' })}`}
					fill={inverted ? '#fff' : undefined}
				/>
			) : (
				<HeartEmptyIcon
					className={styles.icon}
					alt={`${t({ id: 'alt.addToFavorites' })}`}
					fill={inverted ? '#fff' : undefined}
				/>
			)}
			{allowToShowCount && <div className={styles.count}>{count}</div>}
		</div>
	);
};

type TFavoriteCountProps = Omit<TFavoriteProps, 'showCount' | 'count'>;

export const FavoriteCount = (props: TFavoriteCountProps) => {
	const { favoritesState } = useContext(FavoritesContext);
	const count = favoritesState.favoritesData?.length ?? 0;

	return (
		<Favorite
			count={count}
			showCount
			{...props}
		/>
	);
};

export default Favorite;
