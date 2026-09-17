import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
} from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FavoriteService } from 'vinisto_api_client';
import usePrevious from 'Hooks/usePrevious';
import { WarehouseContext } from 'Services/WarehouseService';
import { LocalizationContext } from 'Services/LocalizationService';

import {
	FavoriteData,
	IFavoritesModel,
	IFavoritesServiceProviderProps,
} from './interfaces';

const defaultFavoritesContextModel: IFavoritesModel = {
	handleOnAddToFavorites: () => null,
	handleOnRemoveItemFromFavorites: () => null,
	isAlreadyInFavorites: () => false,
	favoritesState: {
		loading: false,
		loaded: false,
		favoritesData: [],
		error: null,
	},
	favoriteItemsWithTemp: [],
};

export const FavoritesContext = createContext(defaultFavoritesContextModel);

const favoritesBaseQueryKey = 'favorites';

const { add, clear, getList, merge, remove } = FavoriteService;

const FavoritesServiceProvider = ({
	children,
}: IFavoritesServiceProviderProps) => {
	const { fetchQuantity } = useContext(WarehouseContext);
	const { vinistoUser, anonymousUID, isLoggedIn, isLoggining } = useContext(
		AuthenticationContext
	);
	const { activeCurrency, countryOfSale } = useContext(LocalizationContext);
	const isPrevLoggining = usePrevious(isLoggining);
	const prevAnonymousUID = usePrevious(anonymousUID);

	const notificationsContext = useContext(NotificationsContext);
	const queryClient = useQueryClient();

	const { loginHash } = vinistoUser;
	const { anonymousUserId } = anonymousUID;

	const requestAuth = isLoggedIn
		? {
				userLoginHash: loginHash,
				CountryOfSale: countryOfSale,
				currency: activeCurrency.currency,
		  }
		: {
				anonymousUserId: anonymousUserId ?? '',
				CountryOfSale: countryOfSale,
				currency: activeCurrency.currency,
		  };

	const favoritesQueryKey = [favoritesBaseQueryKey, requestAuth];

	const { data, error, isLoading, isFetching } = useQuery(
		favoritesQueryKey,
		() =>
			getList(requestAuth)
				.then((res) => {
					const bundleIds = res
						.getDomainData()
						.items.map((item) => item.ItemId);
					fetchQuantity(bundleIds);

					return res;
				})
				.catch(() => {
					// TODO FIX THIS
					return null;
				})
	);

	const addFavoriteMutation = useMutation(
		(itemId: string) => add({ ...requestAuth, itemId }),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification(
					'flashMessage.addToFavorites.error'
				);
			},
		}
	);

	const removeFavoriteMutation = useMutation(
		(itemId: string) =>
			remove({
				...requestAuth,
				id: itemId,
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
			},
			onError: () => {
				notificationsContext.handleShowErrorNotification(
					'flashMessage.removeItemFromFavorites.error'
				);
			},
		}
	);

	const deleteFavoritesMutation = useMutation(() => clear(requestAuth), {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
		},
	});

	const mergeFavoritesMutation = useMutation(
		() =>
			merge({
				userLoginHash: loginHash,
				anonymousUserId:
					anonymousUserId ?? prevAnonymousUID.anonymousUserId ?? '',
			}),
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: favoritesQueryKey });

				setTimeout(() => {
					queryClient.invalidateQueries({ queryKey: favoritesQueryKey });
				}, 1000);
			},
		}
	);

	const handleOnAddToFavorites = useCallback(
		(itemId: string) => {
			addFavoriteMutation.mutate(itemId);
		},
		[addFavoriteMutation]
	);

	const handleOnRemoveItemFromFavorites = useCallback(
		(itemId: string) => {
			removeFavoriteMutation.mutate(itemId);
		},
		[removeFavoriteMutation]
	);

	const isAlreadyInFavorites = (itemId: string) => {
		if (!data) return false;

		return data.getDomainData().items.some((i) => i.ItemId === itemId);
	};

	// is the user is logging in, we merge the favorites into his logged in account and delete favorites for anonymous user
	useEffect(() => {
		if (isPrevLoggining && !isLoggining) mergeFavoritesMutation.mutate();

		if (prevAnonymousUID && !anonymousUID) deleteFavoritesMutation.mutate();
	}, [
		isLoggining,
		isPrevLoggining,
		anonymousUID,
		prevAnonymousUID,
		mergeFavoritesMutation,
		deleteFavoritesMutation,
	]);

	// This is a hack. Currently BE types are missing, also unhacking this will require more refactoring.
	// We should pass the data from query instead of duping it.
	const favoritesState = useMemo(
		() => ({
			loading: isLoading || isFetching,
			loaded: !isLoading && !isFetching && !error,
			favoritesData: (data?.getDomainData().items ||
				[]) as unknown as FavoriteData[],
			error: (error as any) || null,
		}),
		[isLoading, isFetching, data, error]
	);

	const favoriteItems = useMemo(() => {
		if (!data) return [];

		return data.getDomainData().items;
	}, [data]);

	const favoritesContextModel: IFavoritesModel = {
		handleOnAddToFavorites,
		handleOnRemoveItemFromFavorites,
		isAlreadyInFavorites,
		favoritesState,
		favoriteItemsWithTemp: favoriteItems,
	};

	return (
		<FavoritesContext.Provider value={favoritesContextModel}>
			{children}
		</FavoritesContext.Provider>
	);
};

export default FavoritesServiceProvider;
