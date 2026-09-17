import {
	dayjsInstance,
	SPECIFICATION_ID_KIND,
	SPECIFICATION_ID_TYPE,
} from 'vinisto_shared';
import useFormatMessage from 'Hooks/useFormatMessage';
import { DynamicSaleFeeRuleStructure } from 'Pages/CommissionsList/interfaces';

import { EnrichedFeeRule } from '.';

import {
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	VinistoFeeSystemModelsFeeRuleFeeValue,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	VinistoFeeSystemModelsFeeRuleLogisticFeeValue,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
} from '@/api-types/supplier-api';
import { VinistoServicesApiServicesIntegrationListItemDto } from '@/api-types/services-api';

export const formatFees = (
	fees:
		| Record<string, VinistoFeeSystemModelsFeeRuleFeeValue>
		| Record<string, VinistoFeeSystemModelsFeeRuleFeeValue[]>
		| undefined
		| null,
	getPlatform: (
		platformId: number
	) => VinistoServicesApiServicesIntegrationListItemDto | null
) => {
	if (!fees) return '';

	return (
		<div>
			{Object.keys(fees).map((key, i) => {
				const feeRecord = fees[key];
				const platform =
					getPlatform(Number(key))?.integrationName ?? 'UNKNOWN_PLATFORM';

				return Array.isArray(feeRecord) ? (
					feeRecord.map((record) => (
						<div key={i}>{`${platform}: ${record.fixedPrice ?? 0} Kč + ${
							record.percentage ?? 0
						} %`}</div>
					))
				) : (
					<div key={i}>{`${platform}: ${feeRecord.fixedPrice ?? 0} Kč + ${
						feeRecord.percentage ?? 0
					} %`}</div>
				);
			})}
		</div>
	);
};

export const formatLogisticFees = (
	fees: VinistoFeeSystemModelsFeeRuleLogisticFeeValue[],
	getPlatform: (
		platformId: number
	) => VinistoServicesApiServicesIntegrationListItemDto | null
) => {
	if (!fees || fees.length === 0) return '';

	const feeStrings = fees.map((fee) => {
		const levelDisplay =
			typeof fee.platformId === 'number'
				? getPlatform(fee.platformId)?.integrationName ?? ''
				: '';

		return `${levelDisplay}: ${fee.fixedPrice ?? 0} Kč + ${
			fee.percentage ?? 0
		} %`;
	});

	return (
		<>
			{feeStrings.map((feeString, index) => (
				<div key={index}>
					{feeString}
					<br />
				</div>
			))}
		</>
	);
};

export const formatFeeRuleValidityRange = (
	feeRule:
		| VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
		| VinistoFeeSystemModelsFeeRuleLogisticFeeRule
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	unlimitedString: string = '∞'
) => {
	const validFrom = dayjsInstance((feeRule.validFrom ?? 0) * 1000).format(
		'MM. YYYY'
	);
	const validTo = feeRule.validTo
		? dayjsInstance((feeRule.validTo ?? 0) * 1000).format('MM. YYYY')
		: unlimitedString;

	return `${validFrom} - ${validTo}`;
};

export const formatFeeRulePriceRange = (
	feeRule:
		| VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
		| VinistoFeeSystemModelsFeeRuleLogisticFeeRule
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	currencyString: string
) => {
	const priceFrom = feeRule.bundlePriceFrom;
	const priceTo = feeRule.bundlePriceTo;

	if (priceFrom == null && priceTo == null) {
		return '';
	}
	return `${priceFrom ?? 0} ${currencyString} - ${
		priceTo ?? 0
	} ${currencyString}`;
};

// Define a type for the translator function for clarity
type Translator = ReturnType<typeof useFormatMessage>;

// Map for specification titles
const specificationTitleMap: Record<
	typeof SPECIFICATION_ID_TYPE | typeof SPECIFICATION_ID_KIND,
	string
> = {
	[SPECIFICATION_ID_TYPE]: 'commissionsList.type',
	[SPECIFICATION_ID_KIND]: 'commissionsList.kind',
};

const conditionTitleMap: Record<
	keyof Pick<
		VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
		'categoryNames' | 'supplierNames' | 'bundleNames' | 'tagNames'
	>,
	string
> = {
	categoryNames: 'commissionsList.categories',
	supplierNames: 'commissionsList.suppliers',
	bundleNames: 'commissionsList.bundles',
	tagNames: 'commissionsList.tags',
};

// Utility function for specification conditions
export const formatSpecificationCondition = (
	t: Translator,
	specificationId: typeof SPECIFICATION_ID_TYPE | typeof SPECIFICATION_ID_KIND,
	row: EnrichedFeeRule
): string | null => {
	const condition =
		row.specifications?.find((spec) => spec.definitionId === specificationId)
			?.allowedValues[0] ?? null;

	if (!condition) return null;

	const titleKey = specificationTitleMap[specificationId];
	const translatedTitle = t({ id: titleKey });

	return `${translatedTitle}: ${condition}`;
};

// Utility function for other conditions
export const formatCondition = (
	t: Translator,
	property: keyof typeof conditionTitleMap,
	row: EnrichedFeeRule
): string | null => {
	const titleKey = conditionTitleMap[property];
	if (!titleKey) return null;

	if (property in row) {
		const value = (row as DynamicSaleFeeRuleStructure)[property];
		if (value && Array.isArray(value) && value.length > 0) {
			const translatedTitle = t({ id: titleKey });
			return `${translatedTitle}: ${value.join(', ')}`;
		}
	}
	return null;
};
