export interface IButtonAddToFavoritesProps {
	itemId: string;
	addToFavorites: (_: React.MouseEvent<HTMLElement>) => void;
	removeItemFromFavorites: (_: React.MouseEvent<HTMLElement>) => void;
	size?: 'xs' | 'sm' | 'md' | 'bundle';
	className?: string;
	carouselType?: string;
}
