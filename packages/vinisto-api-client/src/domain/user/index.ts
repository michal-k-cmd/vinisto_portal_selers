import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserUserType,
} from '@/api-types/product-api';

interface User {
	id: string | null;
	email: string | null;
	loginKey: string | null;
	loginHash: string;
	createdAt: number | Date | null;
	permissions: string[];
	isAgreementCC: boolean;
	isEmailVerified: boolean;
	isNewsletterActive: boolean;
	firstName: string | null;
	surname: string | null;
	nickname: string | null;
	priceLevel: VinistoHelperDllEnumsPriceLevel;
	type: VinistoHelperDllEnumsUserUserType;
	feePercentage?: number;
	hasAdminToolbarAccess: boolean;
	canCreateOrderAsMerchant?: boolean;
	canCreateOrderAsSupport?: boolean;
	canCreateOrderAsCSO?: boolean;
}

export default User;
