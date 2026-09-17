import { dayjsInstance } from 'vinisto_shared';

import {
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	VinistoFeeSystemModelsFeeRuleFeeValue,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	VinistoFeeSystemModelsFeeRuleLogisticFeeValue,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
} from '@/api-types/supplier-api';
import { VinistoServicesApiServicesIntegrationListItemDto } from '@/api-types/services-api';

export const formatLogiscticFees = (
	fees:
		| VinistoFeeSystemModelsFeeRuleLogisticFeeValue
		| VinistoFeeSystemModelsFeeRuleLogisticFeeValue[],
	getPlatform: (
		platformId: number
	) => VinistoServicesApiServicesIntegrationListItemDto | null
) => {
	if (!fees || !Array.isArray(fees) || fees.length === 0) return '';

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

				const platformShort = platform.replace(/vinisto/i, '').toUpperCase();

				return Array.isArray(feeRecord) ? (
					feeRecord.map((record) => (
						<div key={i}>{`${platformShort}: ${record.fixedPrice ?? 0} Kč + ${
							record.percentage ?? 0
						} %`}</div>
					))
				) : (
					<div key={i}>{`${platformShort}: ${feeRecord.fixedPrice ?? 0} Kč + ${
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

		const shortenedLevelDisplay = levelDisplay
			.replace(/vinisto/i, '')
			.toUpperCase();

		return `${shortenedLevelDisplay}: ${fee.fixedPrice ?? 0} Kč + ${
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
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule
) => {
	const validFrom = dayjsInstance((feeRule.validFrom ?? 0) * 1000).format(
		'MM. YYYY'
	);
	const validTo = feeRule.validTo
		? dayjsInstance(feeRule.validTo * 1000).format('MM. YYYY')
		: 'Neomezeně';
	return `${validFrom} - ${validTo}`;
};

export const formatFeeRulePriceRange = (
	feeRule:
		| VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule
		| VinistoFeeSystemModelsFeeRuleLogisticFeeRule
		| VinistoFeeSystemModelsFeeRuleSaleFeeRule,
	currencyString: string
): string => {
	const priceFrom = feeRule.bundlePriceFrom;
	const priceTo = feeRule.bundlePriceTo;

	if (priceFrom == null && priceTo == null) {
		return '';
	}

	if (priceTo == null) {
		return `${priceFrom} ${currencyString}`;
	}

	return `${priceFrom ?? 0} ${currencyString} - ${priceTo} ${currencyString}`;
};

export const formatFeeCondition = (
	categoryNames: string[],
	supplierNames: string[],
	bundleNames: string[],
	tagNames: string[]
) => {
	if (
		!categoryNames.length &&
		!supplierNames.length &&
		!bundleNames.length &&
		!tagNames.length
	)
		return '';

	return (
		<>
			{bundleNames[0] && (
				<>
					Bundly: {bundleNames.join(', ')}
					<br />
				</>
			)}

			{supplierNames[0] && (
				<>
					Prodejci: {supplierNames.join(', ')}
					<br />
				</>
			)}

			{categoryNames[0] && (
				<>
					Kategorie: {categoryNames.join(', ')}
					<br />
				</>
			)}
			{tagNames[0] && (
				<>
					Štítky: {tagNames.join(', ')}
					<br />
				</>
			)}
		</>
	);
};
