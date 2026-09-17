import { VinistoAuthDllModelsApiFavoriteFavorite } from "@/api-types/user-api";
import { AbstractAdapter } from "../abstract-adapter";
import { Favorite, FavoriteItem } from ".";

export class FavoriteAdapter extends AbstractAdapter<Favorite, VinistoAuthDllModelsApiFavoriteFavorite> {
	isValid(item: unknown): item is any {
		throw new Error('Method not implemented.');
	}

	fromApi(apiData: VinistoAuthDllModelsApiFavoriteFavorite): Favorite {
		return {
			id: apiData.id,
			items: apiData.items as unknown as FavoriteItem[],
			anonymousUserId: apiData.anonymousUserId ?? undefined,
			userId: apiData.userId ?? undefined,
		};
	}
}
