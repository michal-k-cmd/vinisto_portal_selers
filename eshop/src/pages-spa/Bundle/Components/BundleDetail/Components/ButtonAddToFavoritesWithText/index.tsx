import { useContext } from 'react';
import { FavoritesContext } from 'Services/FavoritesService';
import { LocalizationContext } from 'Services/LocalizationService';
import Favorite from 'Components/Favorite';

import { IButtonAddToFavoritesProps } from './interfaces';
import styles from './styles.module.css';

const ButtonAddToFavoritesWithText = ({
	addToFavorites,
	removeItemFromFavorites,
	itemId,
}: IButtonAddToFavoritesProps) => {
	const favoritesContext = useContext(FavoritesContext);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const isAlreadyInFavorites =
		favoritesContext.isAlreadyInFavorites(itemId) === true;

	const handleOnClick = isAlreadyInFavorites
		? removeItemFromFavorites
		: addToFavorites;

	return (
		<div
			className={styles.addToFavorites}
			onClick={handleOnClick}
			role="presentation"
		>
			<Favorite
				filled={isAlreadyInFavorites}
				size="sm"
			/>
			<span className="underline-item">
				{isAlreadyInFavorites
					? t({ id: 'productDetail.btn.removeFromFavourites' })
					: t({ id: 'productDetail.btn.addToFavourites' })}
			</span>
		</div>
	);
};
export default ButtonAddToFavoritesWithText;
