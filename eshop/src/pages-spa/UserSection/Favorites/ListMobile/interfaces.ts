import { FavoriteItem } from 'vinisto_api_client/src/domain/favorite';

export interface IListProps {
	favoritesData: { isLoading: boolean }[] | FavoriteItem[];
}
