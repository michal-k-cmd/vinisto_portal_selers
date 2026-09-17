import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';
import { StockRequestType } from 'Services/StockRequest/interfaces';
import useFormatMessage from 'Hooks/useFormatMessage';

import {
	VinistoCommonDllModelsApiSpecificationsBaseSpecification,
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
	VinistoFeeSystemModelsFeeRuleSaleFeeRule,
} from '@/api-types/supplier-api';

export interface StockRequestListTableRow
	extends PageListTableRow,
		StockRequestType {}

export type SupplierAdminFeeRulesTableRow =
	| (
			| {
					saleFeeRule?:
						| (Omit<
								VinistoFeeSystemModelsFeeRuleSaleFeeRule,
								'specifications'
						  > & {
								specifications: ({
									allowedValues: string[];
								} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
						  })
						| null;
					logisticFeeRule?:
						| (Omit<
								VinistoFeeSystemModelsFeeRuleLogisticFeeRule,
								'specifications'
						  > & {
								specifications: ({
									allowedValues: string[];
								} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
						  })
						| null;
			  }
			| DynamicSaleFeeRuleStructure
	  ) & {
			id: string;
	  };

export type DynamicSaleFeeRuleStructure = Omit<
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	'specifications'
> & {
	specifications: ({
		allowedValues: string[];
	} & VinistoCommonDllModelsApiSpecificationsBaseSpecification)[];
};

export type ConditionProperty = keyof Pick<
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRule,
	'categoryNames' | 'supplierNames' | 'bundleNames' | 'tagNames'
>;

export type Translator = ReturnType<typeof useFormatMessage>;
