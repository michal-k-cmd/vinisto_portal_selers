import { storageServiceInstance as storageService } from 'Services/StorageService';
import { LocalStorageKeys } from 'Services/StorageService/constants';

import {
	mapBasketTypeEnumToBasketTypeCode,
	mapCurrencyEnumToCountryCode,
	mapCurrencyEnumToCurrencyCode,
} from './helpers';

import api from '@/api';
import {
	BasketApprovalState,
	BasketPlatformType,
	BasketResponse,
} from '@/api-types/basket-api';
import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';
import { BasketType } from '@/api-types/basket-api';
import { Actions } from '@/message-bus/constants';
import User from '@/domain/user';

// TODO THIS WILL BE USED ONLY TO CREATE THE PRIMARY BASKET (because of side effects)
export const createBasket = async (params: {
	userId: string | null;
	userLoginHash: string | null;
	anonymousUserId: string | null;
	customerId: string | null;
	currency: VinistoHelperDllEnumsCurrency;
	isMergingBaskets?: boolean;
	isCreatingBasketRef: React.MutableRefObject<boolean>;
	type: BasketType.Primary;
	platform: BasketPlatformType;
}) => {
	const {
		userId,
		userLoginHash,
		anonymousUserId,
		customerId,
		isMergingBaskets = false,
		isCreatingBasketRef,
		type,
		platform,
	} = params;
	if (userId == null && anonymousUserId == null) {
		throw new Error('UserID or AnonymousUserId is required to create a basket');
	}
	// This sometimes happens in B2B iframe - auth is lost for reasons unknown
	if (customerId && !userLoginHash) {
		if (typeof window !== 'undefined')
			window.parent.postMessage({ action: Actions.LOGOUT_FROM_ESHOP }, '*');
		throw new Error('Only logged in user can create b2b basket');
	}

	if (!isMergingBaskets && platform === BasketPlatformType.B2C) {
		const maybeExisitingNonStaleId = storageService.getStorageItem(
			LocalStorageKeys.BASKET_ID
		);
		if (typeof maybeExisitingNonStaleId === 'string')
			return maybeExisitingNonStaleId;
	}

	if (isCreatingBasketRef.current) {
		// If we are already creating a basket, wait for it to finish
		return new Promise<string>((resolve) => {
			const poll = () => {
				const maybeBasketId = storageService.getStorageItem(
					LocalStorageKeys.BASKET_ID
				);
				if (typeof maybeBasketId === 'string') {
					resolve(maybeBasketId);
					return;
				}
				setTimeout(poll, 120);
			};
			setTimeout(poll, 120);
		});
	}

	isCreatingBasketRef.current = true;

	const currencyCode = mapCurrencyEnumToCurrencyCode(params.currency);
	const countryOfSaleCode = mapCurrencyEnumToCountryCode(params.currency);
	const requestBody = {
		currency: currencyCode,
		countryOfSale: countryOfSaleCode,
		...(customerId && { customerId }),
		...(userId
			? {
					userId,
					userLoginHash,
			  }
			: {
					anonymousUserId: anonymousUserId,
			  }),
		type,
	};

	return await api
		.post(`basket-api/Basket`, undefined, requestBody)
		.then((response) => {
			if (!response) {
				throw new Error('No basket ID returned');
			}
			isCreatingBasketRef.current = false;
			return response as unknown as string;
		})
		.catch((error) => {
			isCreatingBasketRef.current = false;
			throw error;
		});
};

export const createUserOrSystemBasket = async (params: {
	userId: string | null;
	userLoginHash: string | null;
	anonymousUserId: string | null;
	currency: VinistoHelperDllEnumsCurrency;
	name: string;
	type: BasketType.UserDefined | BasketType.SystemDefined;
}) => {
	const { userId, userLoginHash, anonymousUserId, name, type } = params;
	if (userId == null && anonymousUserId == null) {
		throw new Error('UserID or AnonymousUserId is required to create a basket');
	}

	const currencyCode = mapCurrencyEnumToCurrencyCode(params.currency);
	const countryOfSaleCode = mapCurrencyEnumToCountryCode(params.currency);

	const requestBody = {
		currency: currencyCode,
		countryOfSale: countryOfSaleCode,
		...(userId
			? {
					userId: userId,
					userLoginHash,
			  }
			: {
					anonymousUserId: anonymousUserId,
			  }),
		type: mapBasketTypeEnumToBasketTypeCode(type),
		name,
	};

	return await api
		.post(`basket-api/Basket`, undefined, requestBody)
		.then((response) => {
			if (!response) {
				throw new Error('No basket ID returned');
			}
			return response as unknown as string;
		})
		.catch((error) => {
			throw error;
		});
};

export const mergeBaskets = async (params: {
	basketId?: string | null;
	customerId: string | null;
	setBasketId: (basketId: string) => void;
	currency: VinistoHelperDllEnumsCurrency;
	isCreatingBasketRef: React.MutableRefObject<boolean>;
	vinistoUser: User;
	wsConnectionId: string | null;
}) => {
	const {
		vinistoUser,
		basketId,
		customerId,
		isCreatingBasketRef,
		setBasketId,
		wsConnectionId,
		currency,
	} = params;

	const currentBasketId =
		basketId || storageService.getStorageItem(LocalStorageKeys.BASKET_ID);
	// No need to merge baskets as the anonymous user has no basket
	if (!currentBasketId) return;

	const createPrimaryBasketForLoggedInUser = async () => {
		const basketId = await createBasket({
			userId: String(vinistoUser?.id),
			userLoginHash: vinistoUser.loginHash,
			anonymousUserId: null,
			customerId,
			currency,
			isMergingBaskets: true,
			isCreatingBasketRef: isCreatingBasketRef,
			type: BasketType.Primary,
			platform: BasketPlatformType.B2C,
		});

		setBasketId(basketId);
		storageService.setItem(LocalStorageKeys.BASKET_ID, basketId);
		return basketId;
	};

	const basketIdOfLoggingInUser = await api
		// @ts-expect-error BasketResponse does not match constraint of BaseResponse. TODO add option to override this?
		.get<BasketResponse[]>(`basket-api/Basket/user/${vinistoUser?.id}`)
		.then(async (response: BasketResponse[]) => {
			const primaryBasket = response?.find(
				(basket) => basket.type === BasketType.Primary
			);

			if (primaryBasket?.id) return primaryBasket.id;

			return await createPrimaryBasketForLoggedInUser();
		})
		.catch(async (error) => {
			if (error.response?.status === 404) {
				return await createPrimaryBasketForLoggedInUser().catch((error) => {
					isCreatingBasketRef.current = false;
					throw error;
				});
			}
			return null;
		});

	if (!basketIdOfLoggingInUser) {
		throw new Error('Creating basket for logged in user failed');
	}

	await api
		.post(
			`basket-api/Basket/${currentBasketId}/merge/${basketIdOfLoggingInUser}`,
			undefined,
			{
				websocketId: wsConnectionId,
			},
			{ responseType: 'text' }
		)
		.then(() => {
			storageService.setItem(
				LocalStorageKeys.BASKET_ID,
				basketIdOfLoggingInUser
			);
			setBasketId(basketIdOfLoggingInUser);
		})
		.catch((error) => {
			storageService.setItem(
				LocalStorageKeys.BASKET_ID,
				basketIdOfLoggingInUser
			);
			setBasketId(basketIdOfLoggingInUser);
			throw error;
		});
};

export const updateApprovalState = (params: {
	targetState: BasketApprovalState;
	userLoginHash: string;
	basketId: string | null;
}) => {
	const { targetState, userLoginHash, basketId } = params;
	return api.put(
		`basket-api/Basket/${basketId}/state`,
		{
			userLoginHash,
		},
		{ newState: targetState },
		{ responseType: 'text' }
	);
};
