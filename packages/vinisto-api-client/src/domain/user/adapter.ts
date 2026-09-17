import { AbstractAdapter } from '../abstract-adapter';

import {
	VinistoAuthDllModelsApiUserBaseBuyerUser,
	VinistoAuthDllModelsApiUserCompany,
	VinistoAuthDllModelsApiUserMerchant,
	VinistoAuthDllModelsApiUserUser,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/user-api';
import User from '.';
import {
	canCreateOrderAsCSO,
	canCreateOrderAsSupport,
	hasAdminToolbarAccess,
} from './helpers';
import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/product-api';

class UserAdapter extends AbstractAdapter<
	User,
	| VinistoAuthDllModelsApiUserBaseBuyerUser
	| VinistoAuthDllModelsApiUserCompany
	| VinistoAuthDllModelsApiUserMerchant
	| VinistoAuthDllModelsApiUserUser
> {
	fromApi(
		apiData:
			| VinistoAuthDllModelsApiUserBaseBuyerUser
			| VinistoAuthDllModelsApiUserCompany
			| VinistoAuthDllModelsApiUserMerchant
			| VinistoAuthDllModelsApiUserUser
			| null,
		request: { loginHash: string | null | undefined }
	): User {
		if (apiData === null) throw new Error('No id in user');

		return {
			id: apiData.id,
			email: apiData.email,
			loginKey: apiData.loginKey,
			// BEWARE: Api Data are null for login hash! It is needeed to be passed as parameter
			loginHash: request.loginHash ?? '',
			createdAt: apiData.createdAt ?? null,
			isAgreementCC:
				(apiData && 'isAgreementCC' in apiData && apiData.isAgreementCC) ??
				false,
			isEmailVerified: apiData.isEmailVerified ?? false,
			isNewsletterActive:
				(apiData &&
					'isNewsletterActive' in apiData &&
					apiData.isNewsletterActive) ??
				false,
			firstName: (apiData && 'firstName' in apiData && apiData.firstName) ? apiData.firstName : null,
			surname: (apiData && 'surname' in apiData && apiData.surname) ? apiData.surname : null,
			nickname: apiData.nickname ?? null,
			priceLevel: apiData.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1,
			type: apiData.type ?? VinistoHelperDllEnumsUserUserType.B2C,
			feePercentage:
				apiData && 'feePercentage' in apiData
					? apiData.feePercentage
					: undefined,
			permissions: apiData.permissions,
			hasAdminToolbarAccess: hasAdminToolbarAccess(apiData.permissions),
			canCreateOrderAsMerchant:
				apiData && 'merchantRights' in apiData
					? apiData.merchantRights?.includes(
							VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation
					  )
					: false,
			canCreateOrderAsSupport: canCreateOrderAsSupport(apiData.permissions),
			canCreateOrderAsCSO: canCreateOrderAsCSO(apiData.permissions),
		};
	}
}

export default UserAdapter;
