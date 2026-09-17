export interface IButtonAddToFavoritesProps {
	itemId: string;
	addToFavorites: (event: React.MouseEvent<HTMLElement>) => void;
	removeItemFromFavorites: (event: React.MouseEvent<HTMLElement>) => void;
}
