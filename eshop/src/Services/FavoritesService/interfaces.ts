import { ReactNode } from 'react';
import { VinistoProductDllModelsApiBundleBundle } from 'vinisto_api_client/src/api-types/product-api';
import { FavoriteItem } from 'vinisto_api_client/src/domain/favorite';

export interface IFavoritesServiceProviderProps {
	children: ReactNode;
}

export type FavoriteData = {
	Bundle: VinistoProductDllModelsApiBundleBundle;
	ItemId: string;
};

export interface IFavoritesState {
	loading: boolean;
	loaded: boolean;
	favoritesData: FavoriteData[];
	error: null | string;
}

export interface IFavoritesModel {
	handleOnAddToFavorites: (itemId: string) => void;
	handleOnRemoveItemFromFavorites: (itemId: string) => void;
	isAlreadyInFavorites: (itemId: string) => boolean;
	favoritesState: IFavoritesState;
	favoriteItemsWithTemp: FavoriteItem[];
}
