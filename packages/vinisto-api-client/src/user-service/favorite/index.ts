import {
	UserApi,
	VinistoAuthDllModelsApiFavoriteUserFavoriteCreateParameters,
} from '@/api-types/user-api';
import DomainFavorite from '../../domain/favorite';
import { FAVORITE_URI } from './constants';

import api from '@/api';

type BaseFavoriteParameters = {
	userLoginHash?: string;
	anonymousUserId?: string;
};

type GetFavoriteListParameters = {
	isCache?: boolean;
} & BaseFavoriteParameters;

const getList = async (params: UserApi.FavoritesList.RequestQuery) => {
	const res = await api.get<
		UserApi.FavoritesList.ResponseBody,
		UserApi.FavoritesList.RequestQuery
	>(
		FAVORITE_URI,
		{
			...params,
		},
		{
			serializeUrlParams: false,
		}
	);

	if (res.favorite === undefined || res.favorite === null)
		throw new Error('Favorite not found');

	return new DomainFavorite(res.favorite);
};

const add = async (
	req: VinistoAuthDllModelsApiFavoriteUserFavoriteCreateParameters
) => {
	await api.post(FAVORITE_URI, undefined, req);
};

type RemoveRequestParams = {
	id: string;
	userLoginHash?: string;
	anonymousUserId?: string;
};

const remove = async ({ id, ...params }: RemoveRequestParams) => {
	await api.delete(`${FAVORITE_URI}/${id}`, params),
		{
			serialize: false,
		};
};

const merge = async (req: BaseFavoriteParameters) => {
	await api.put(FAVORITE_URI, undefined, req);
};

const clear = async (params: BaseFavoriteParameters) => {
	await api.delete(FAVORITE_URI, params, {
		serialize: false,
	});
};

const FavoriteService = {
	getList,
	add,
	remove,
	merge,
	clear,
};

export default FavoriteService;
