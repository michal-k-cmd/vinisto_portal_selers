import { VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition } from 'vinisto_api_client/src/api-types/order-api/';
import {
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoImageDllModelsApiImageImage,
	VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters,
} from 'vinisto_api_client/src/api-types/order-api/';
import { VinistoHelperDllEnumsSpecificationSpecificationType } from 'vinisto_api_client/src/api-types/product-api/';
import {
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsLanguage,
} from 'vinisto_api_client/src/api-types/user-api/';

export type LimitationType = NonNullable<
	VinistoCommonDllModelsApiCouponLimitationsBaseLimitationDefinition['limitationType']
>;

export type SupplierOption = {
	value: string;
	label: string;
};

export interface CouponOption {
	label: string;
	value: LimitationType;
}

export interface CreateCouponFormValues {
	allowedFromCurrency: VinistoHelperDllEnumsCurrency;
	allowedFromPrice: number;
	allowedFromVat: string;
	allowedValues: { value: string; label: string }[];
	amountCurrency: VinistoHelperDllEnumsCurrency;
	amountPrice: number;
	amountVat: string;
	categoryId: string;
	code: string;
	discountCouponType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	validFrom: Date;
	validTo: Date;
	isAllowedFrom: number;
	isReusable: string;
	isCombinable: boolean;
	isForDiscountedItems: boolean;
	isVisibleOnProductDetail: boolean;
	isSupplierDiscount: boolean;
	limitationType:
		| 'CATEGORY_LIMITATION'
		| 'SPECIFICATION_LIMITATION'
		| 'NO_LIMITATION'
		| 'SUPPLIER_LIMITATION';
	supplierId: SupplierOption;
	percentageDiscount: number;
	specificationId: unknown[];
	unitLanguage: VinistoHelperDllEnumsLanguage;
	unitValue: string;
	isVisibleInUsersSection: boolean;
	isForRegisteredUsers: boolean;
	name?: string;
	shortDescription?: string;
	description?: string;
	images?: VinistoImageDllModelsApiImageImage[] | null;
}

export interface NoLimitation {
	limitationType: 'NO_LIMITATION';
}

export interface CategoryLimitation {
	limitationType: 'CATEGORY_LIMITATION';
	categoryId: string;
}

export interface SupplierLimitation {
	limitationType: 'SUPPLIER_LIMITATION';
	supplierId: string;
}

export interface SpecificationLimitation {
	limitationType: 'SPECIFICATION_LIMITATION';
	specification: {
		specificationDefinitionId: string;
		specificationType: VinistoHelperDllEnumsSpecificationSpecificationType;
		allowedValues: (string | number)[];
	};
}

export type CreateCouponRequest =
	VinistoOrderDllModelsApiDiscountCouponDefinitionParametersDiscountCouponCreateParameters & {
		limitationDefinition:
			| NoLimitation
			| CategoryLimitation
			| SpecificationLimitation
			| SupplierLimitation;
	};
