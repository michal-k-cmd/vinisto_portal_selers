export interface CreateSellingRuleFromProps {
	initialValues: SaleFeeRuleFormValues;
	handleSubmit: (data: SaleFeeRuleFormValues) => void;
}

export type SaleFeeRuleFormValues = {
	id?: string;

	originCountry?: string;
	destinationCountry?: string;

	validFrom?: Date;
	validTo?: Date;
	productType?: string;
	kind?: string;
	priceFrom?: number;
	priceTo?: number;
	originB2CAmount?: string;
	originB2CPercent?: string;
	originB2BAmount?: string;
	originB2BPercent?: string;
	destinationB2CAmount?: string;
	destinationB2CPercent?: string;
	destinationB2BAmount?: string;
	destinationB2BPercent?: string;
	note?: string;

	flags?: {
		save: boolean;
	};

	originOrDestinationFees?: string;
};
