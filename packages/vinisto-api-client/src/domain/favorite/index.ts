import { VinistoProductDllModelsApiBundleBundle } from "../../api-types/product-api";
import { VinistoAuthDllModelsApiFavoriteFavorite } from "../../api-types/user-api";
import { favoriteAdapter } from "../../index";

type FavoriteItem = {
	ItemId: string;
	//TODO: Incorrect - use domain type. However code certain code already uses API types - needs refactor
	Bundle: VinistoProductDllModelsApiBundleBundle;
}

type Favorite = {
	id: string;
	userId?: string;
	anonymousUserId?: string;
	items: FavoriteItem[];
}

class DomainFavorite {
	private domainFavorite: Favorite;

	constructor(data: VinistoAuthDllModelsApiFavoriteFavorite) {
		this.domainFavorite = favoriteAdapter.fromApi(data);
	}

	getDomainData(): Favorite {
		return this.domainFavorite;
	}
}

export type { Favorite, FavoriteItem };
export default DomainFavorite;
