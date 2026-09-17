import {
	VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification,
	VinistoHelperDllEnumsAutomaticCouponTriggerType,
	VinistoHelperDllEnumsCurrency,
	VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
	VinistoHelperDllEnumsDiscountCouponLimitationType,
	VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon,
} from 'vinisto_api_client/src/api-types/order-api';
import { VinistoHelperDllEnumsLanguage } from 'vinisto_api_client/src/api-types/cms-api/';

import { AbstractAdapter } from './Adapter';

type AutomaticCouponTrigger = {
	delay: number;
	type: VinistoHelperDllEnumsAutomaticCouponTriggerType;
};

interface AutomaticCoupon {
	id: number;
	name: string;
	trigger: AutomaticCouponTrigger;
	minOrderPrice: number;
	maxOrderPrice: number;
	discountType: VinistoHelperDllEnumsDiscountCouponDiscountCouponType;
	discountValue: number;
	currency: VinistoHelperDllEnumsCurrency;
	language: VinistoHelperDllEnumsLanguage;
	expirationDays: number;
	applicableFrom: string;
	isCombinable: boolean;
	isForDiscountedItems: boolean;
	limitationDefinition: {
		limitationType: VinistoHelperDllEnumsDiscountCouponLimitationType;
		categoryId?: string | null;
		allowedValues?: Array<{
			value: string;
			label: string;
		}>;
		specification?: VinistoCommonDllModelsApiCouponLimitationsLimitationDefinitionSpecification['specification'];
		supplierId?: string | null;
		supplier?: Array<{
			value: string;
			label: string;
		}>;
	};
	specificationDefinitionId?: string | undefined;
	specificationType?: string | undefined;
	specificationValues?: Array<{
		value: string;
		label: string;
	}>;
}

class AutomaticCouponAdapter extends AbstractAdapter<
	AutomaticCoupon,
	VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon
> {
	fromApi(
		apiData: VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon
	): AutomaticCoupon {
		if (apiData.trigger?.type === undefined) {
			throw new Error(
				'Trigger type is undefined. This is an unsupported state.'
			);
		}

		return {
			id: Number(apiData.id),
			name: apiData.name || '',
			trigger: {
				delay: apiData.trigger?.delay || 0,
				type: apiData.trigger?.type,
			},
			minOrderPrice: apiData.minOrderPrice || 0,
			maxOrderPrice: apiData.maxOrderPrice || 0,
			discountType:
				apiData.discountType as VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
			discountValue: apiData.discountValue || 0,
			currency: apiData.currency as VinistoHelperDllEnumsCurrency,
			language: apiData.language as VinistoHelperDllEnumsLanguage,
			expirationDays: apiData.expirationDays || 0,
			applicableFrom: apiData.applicableFrom?.toString() || '',
			isCombinable: apiData.isCombinable || false,
			isForDiscountedItems: apiData.isForDiscountedItems || true,
			limitationDefinition: {
				...apiData.limitationDefinition,
				limitationType:
					apiData.limitationDefinition?.limitationType ??
					VinistoHelperDllEnumsDiscountCouponLimitationType.NO_LIMITATION,
			},
		};
	}

	toApi(
		domainData: AutomaticCoupon
	): VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon {
		return {
			id: domainData.id.toString(),
			name: domainData.name,
			trigger: domainData.trigger,
			minOrderPrice: domainData.minOrderPrice,
			maxOrderPrice: domainData.maxOrderPrice,
			discountType:
				domainData.discountType as VinistoHelperDllEnumsDiscountCouponDiscountCouponType,
			discountValue: domainData.discountValue,
			currency: domainData.currency as VinistoHelperDllEnumsCurrency,
			language: domainData.language as VinistoHelperDllEnumsLanguage,
			expirationDays: domainData.expirationDays,
			applicableFrom: domainData.applicableFrom
				? parseFloat(domainData.applicableFrom)
				: null,
			isCombinable: domainData.isCombinable,
			isForDiscountedItems: domainData.isForDiscountedItems,
		};
	}

	isValid(
		item: unknown
	): item is VinistoOrderDllModelsApiAutomaticCouponAutomaticCoupon {
		return (
			typeof item === 'object' &&
			item !== null &&
			'id' in item &&
			'name' in item &&
			'trigger' in item &&
			'discountType' in item &&
			'discountValue' in item &&
			'currency' in item &&
			'language' in item &&
			'expirationDays' in item &&
			'applicableFrom' in item &&
			'isCombinable' in item &&
			'isForDiscountedItems' in item
		);
	}
}

export default AutomaticCouponAdapter;
export type { AutomaticCoupon };
