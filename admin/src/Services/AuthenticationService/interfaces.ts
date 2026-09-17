import { ReactNode } from 'react';

import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
} from '@/api-types/user-api';

export interface IVinistoUser {
	id: string | null;
	email: string | null;
	loginKey: string | null;
	loginHash: string;
	createdAt: number | Date | null;
	isAgreementCC: boolean;
	isNewsletterActive: boolean;
	isEmailVerified: boolean;
	permissions: string[];
	merchantRights: VinistoHelperDllEnumsUserCompanyMerchantRights[];
}

export interface IAuthenticationContextValues {
	isLoggedIn: boolean;
	vinistoUser: IVinistoUser;
	handleOnLogIn: (email: string, password: string) => void;
	handleOnLogOut: () => void;
	handleOnForceLogOut: () => void;
	handleOnOptimisticAddPermission: (permissionId: string) => void;
	handleOnOptimisticDeletePermission: (permissionId: string) => void;
	handleOnOAuthLogIn: (
		user:
			| VinistoAuthDllModelsApiUserBaseBuyerUser
			| VinistoAuthDllModelsApiUserCompany
			| VinistoAuthDllModelsApiUserMerchant
			| VinistoAuthDllModelsApiUserUser
	) => void;
}

export interface IAuthenticationContextProviderProps {
	children: ReactNode;
}
