import { FavoriteItem } from 'vinisto_api_client/src/domain/favorite';

export interface IFavoriteProps {
	favoriteData: { isLoading: boolean } | FavoriteItem;
	isLoading?: boolean;
	isRemoved?: boolean;
	alwaysRedirectToDetail?: boolean;
}
