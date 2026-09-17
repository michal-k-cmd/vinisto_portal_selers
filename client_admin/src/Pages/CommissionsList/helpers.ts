import { SPECIFICATION_ID_KIND, SPECIFICATION_ID_TYPE } from 'vinisto_shared';

import {
	ConditionProperty,
	DynamicSaleFeeRuleStructure,
	SupplierAdminFeeRulesTableRow,
	Translator,
} from './interfaces';

const isDynamicSaleFeeRuleRow = (
	row: SupplierAdminFeeRulesTableRow
): row is DynamicSaleFeeRuleStructure & { id: string } => {
	return !('saleFeeRule' in row) && !('logisticFeeRule' in row);
};

const specificationTitleKeyMap: Record<
	typeof SPECIFICATION_ID_TYPE | typeof SPECIFICATION_ID_KIND,
	string
> = {
	[SPECIFICATION_ID_TYPE]: 'commissionsList.type',
	[SPECIFICATION_ID_KIND]: 'commissionsList.kind',
};

const conditionTitleKeyMap: Record<ConditionProperty, string> = {
	categoryNames: 'commissionsList.categories',
	supplierNames: 'commissionsList.suppliers',
	bundleNames: 'commissionsList.bundles',
	tagNames: 'commissionsList.tags',
};

/**
 * Formats a string for a specification condition (Typ, Druh), using translated titles.
 * Requires the translator function 't'.
 * Example: "Typ: Hodnota"
 */
export const formatSpecificationCondition = (
	t: Translator,
	specificationId: typeof SPECIFICATION_ID_TYPE | typeof SPECIFICATION_ID_KIND,
	row: SupplierAdminFeeRulesTableRow
): string | null => {
	let conditionValue: string | null = null;

	// Sale (user-defined) fee rules
	if ('saleFeeRule' in row) {
		conditionValue =
			row.saleFeeRule?.specifications?.find(
				(spec) => spec.definitionId === specificationId
			)?.allowedValues[0] ?? null;
	}

	// Dynamic fee rules
	if ('specifications' in row) {
		conditionValue =
			row.specifications?.find((spec) => spec.definitionId === specificationId)
				?.allowedValues[0] ?? null;
	}

	if (!conditionValue) return null;

	const titleKey = specificationTitleKeyMap[specificationId]; // Get translation key
	const translatedTitle = t({ id: titleKey }); // Translate the title

	return `${translatedTitle}: ${conditionValue}`;
};

/**
 * Formats a string for other conditions (Kategorie, Dodavatelé, etc.), using translated titles.
 * Checks if the row is a DynamicSaleFeeRule first.
 * Requires the translator function 't'.
 * Example: "Kategorie: Hodnota1, Hodnota2"
 */
export const formatCondition = (
	t: Translator, // Pass the translator function
	property: ConditionProperty,
	row: SupplierAdminFeeRulesTableRow
): string | null => {
	if (isDynamicSaleFeeRuleRow(row)) {
		const value = row[property];

		// Check if it's a non-empty array
		if (value && Array.isArray(value) && value.length > 0) {
			const titleKey = conditionTitleKeyMap[property];
			const translatedTitle = t({ id: titleKey });
			return `${translatedTitle}: ${value.join(', ')}`;
		}
	}
	// Return null if not the correct row type or if value is invalid/empty
	return null;
};
