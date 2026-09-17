import { VinistoHelperDllEnumsFeeRuleFeeRuleState } from '@/api-types/supplier-api';

export interface CreateLogisticRuleFromProps {
	initialValues: LogisticFeeRuleFormValues;
	handleSubmit: (data: LogisticFeeRuleFormValues) => void;
}

export type LogisticFeeRuleFormValues = {
	id?: string;

	originCountry?: string;
	destinationCountry?: string;

	validFrom?: Date;
	validTo?: Date;
	productType?: string;
	kind?: string;
	priceFrom?: number;
	priceTo?: number;
	name?: string;
	note?: string;
	state?: VinistoHelperDllEnumsFeeRuleFeeRuleState;

	supplierTransportB2CAmount?: string;
	supplierTransportB2CPercent?: string;
	supplierTransportB2BAmount?: string;
	supplierTransportB2BPercent?: string;

	vinistoTransportB2CAmount?: string;
	vinistoTransportB2CPercent?: string;
	vinistoTransportB2BAmount?: string;
	vinistoTransportB2BPercent?: string;

	dispatchingB2CAmount?: string;
	dispatchingB2CPercent?: string;
	dispatchingB2BAmount?: string;
	dispatchingB2BPercent?: string;

	packagingB2CAmount?: string;
	packagingB2CPercent?: string;
	packagingB2BAmount?: string;
	packagingB2BPercent?: string;

	completionB2CAmount?: string;
	completionB2CPercent?: string;
	completionB2BAmount?: string;
	completionB2BPercent?: string;

	storageB2CAmount?: string;
	storageB2CPercent?: string;
	storageB2BAmount?: string;
	storageB2BPercent?: string;

	flags?: {
		save: boolean;
	};

	vinistoOrSupplierTransportFees?: string;
};
