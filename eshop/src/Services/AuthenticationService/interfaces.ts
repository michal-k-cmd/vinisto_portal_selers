import { MutableRefObject, ReactNode } from 'react';
import {
	SignalRErrorType,
	TransformedSignalRErrors,
} from 'Services/BasketService/interfaces';

// import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';
import { BasketType } from '@/api-types/basket-api';
import User from '@/domain/user';
import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
} from '@/api-types/order-api';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AuthenticationServiceInterface {}

export interface IAnonymousUID {
	anonymousUserId: string | null;
	initial_timestamp: string | null;
	expiresOn: string | null;
}

export interface IAuthenticationContextValues {
	isLoggedIn: boolean;
	isLoggining: boolean;
	vinistoUser: User;
	saveVinistoUser: (vinistoUser: User) => void;
	handleOnLogIn: (
		params: { email: string; password: string },
		onSuccess?: () => void,
		onError?: (error?: unknown) => void
	) => void;
	handleOnLogOut: () => void;
	handleResetBasketState: () => void;
	handleOnForceLogOut: () => void;
	handleOnRegister: (
		params: {
			email: string;
			password: string;
			isNewsletterActive: boolean;
			isAgreementCC?: boolean;
		},
		onSuccess?: () => void,
		onError?: () => void
	) => void;
	handleOnForgottenPassword: (email: string) => void;
	handleOnConfirmEmail: (hash: string) => void;
	handleOnResetPassword: (
		resetHash: string,
		newPassword: string
	) => Promise<unknown> | void;
	setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
	setVinistoUser: (value: React.SetStateAction<User>) => void;
	anonymousUID: IAnonymousUID;
	handleOnOAuthLogIn: (
		user:
			| VinistoAuthDllModelsApiUserBaseBuyerUser
			| VinistoAuthDllModelsApiUserCompany
			| VinistoAuthDllModelsApiUserMerchant
			| VinistoAuthDllModelsApiUserUser
	) => void;
	basketId: string | null;
	setBasketId: (value: React.SetStateAction<string | null>) => void;
	isCreatingBasketRef: MutableRefObject<boolean>;
	wsConnectionId: string | null;
	basketErrorMessages: TransformedSignalRErrors;
	clearBasketErrorCategory: (category: SignalRErrorType) => void;
}

export interface AuthenticationContextProviderProps {
	children: ReactNode;
}

export type BasketErrorBucket = {
	basketId: string;
	basketType: BasketType;
	ownerKey: string;
	errors: TransformedSignalRErrors;
};

export type BasketErrorBuckets = Record<string, BasketErrorBucket>;
