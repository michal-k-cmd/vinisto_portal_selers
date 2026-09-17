'use client';

import { useContext } from 'react';
import cx from 'classnames';
import { FavoritesContext } from 'Services/FavoritesService';
import Favorite from 'Components/Favorite';
import { TEST_IDS } from 'Constants/test-ids';
import { LocalizationContext } from 'Services/LocalizationService';

import { IButtonAddToFavoritesProps } from './interfaces';
import styles from './styles.module.css';

const ButtonAddToFavorites = ({
	removeItemFromFavorites,
	addToFavorites,
	itemId,
	size = 'sm',
	className = styles.addToFavorites,
	carouselType,
}: IButtonAddToFavoritesProps) => {
	const favoritesContext = useContext(FavoritesContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const isAlreadyInFavorites =
		favoritesContext.isAlreadyInFavorites(itemId) === true;

	const handleOnClick = isAlreadyInFavorites
		? removeItemFromFavorites
		: addToFavorites;

	const dataIdString = `${TEST_IDS.PRODUCT_BOX_ADD_TO_FAVORITES}${
		carouselType !== undefined ? '_' + carouselType : ''
	}_${itemId}`;

	return (
		<button
			className={cx(className, {
				[styles.full]: isAlreadyInFavorites,
			})}
			onClick={handleOnClick}
			data-testid={dataIdString}
			aria-label={`${t({ id: 'productDetail.btn.addToFavourites' })}`}
		>
			<Favorite
				filled={isAlreadyInFavorites}
				size={size}
			/>
		</button>
	);
};
export default ButtonAddToFavorites;
