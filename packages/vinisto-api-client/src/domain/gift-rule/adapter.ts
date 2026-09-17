import { AbstractAdapter } from '../abstract-adapter';
import { dayjsInstance } from 'vinisto_shared';

import { FromApiSpecification, GiftRule } from './types';

/**
 * @deprecated Use addons.
 */
export class GiftRuleAdapter extends AbstractAdapter<GiftRule, any> {
	isValid(item: unknown): item is any {
		throw new Error('Method not implemented.');
	}

	fromApi(apiData: any): GiftRule & {
		specification?: FromApiSpecification;
	} {
		return {
			id: apiData.id,
			name: apiData.name,
			description: apiData.description,
			allowedCountry: apiData.allowedCountry ?? apiData.countryCode,
			validFrom: dayjsInstance.unix(apiData.validFrom).toDate(),
			validTo: apiData.validTo
				? dayjsInstance.unix(apiData.validTo).toDate()
				: null,
			applicableLimit: apiData.applicableLimit,
			applicableLimitCounter: apiData.applicableLimitCounter,
			ruleType: apiData.ruleType,
			bundles: apiData.bundles,
			isActive: apiData.isActive,
			orderPriceLimitFrom: apiData.orderPriceLimitFrom,
			orderPriceLimitTo: apiData.orderPriceLimitTo,
			specification: apiData.specification ?? null,
			categoryId: apiData.categoryId ?? null,
			supplierId: apiData.supplierId ?? null,
		};
	}

	toApi(domainData: Partial<GiftRule>) {
		return {
			name: domainData.name,
			description: domainData.description,
			allowedCountry: domainData.allowedCountry,
			validFrom: Math.ceil(Number(domainData.validFrom) / 1000),
			validTo: domainData.validTo
				? Math.ceil(Number(domainData.validTo) / 1000)
				: null,
			applicableLimit: domainData.applicableLimit,
			applicableLimitCounter: domainData.applicableLimitCounter,
			ruleType: domainData.ruleType,
			bundles: domainData.bundles,
			isActive: domainData.isActive,
			orderPriceLimitFrom: domainData.orderPriceLimitFrom,
			orderPriceLimitTo: domainData.orderPriceLimitTo,
			specification: domainData.specification,
			categoryId: domainData.categoryId,
			supplierId: domainData.supplierId,
			isVisibleOnDetail: domainData.isVisibleOnDetail,
		};
	}
}
