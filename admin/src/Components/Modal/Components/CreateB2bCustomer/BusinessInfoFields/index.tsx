import { Input, InputSelect, InputTextArea, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import useGetMerchants from 'Hooks/Queries/useGetMerchants';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import {
	VinistoHelperDllEnumsPriceLevel,
	VinistoHelperDllEnumsUserCompanyMerchantRights,
	VinistoHelperDllEnumsUserCompanyPaymentType,
} from '@/api-types/user-api';

const BusinessInfoFields = ({
	values,
	hideMerchantField,
}: {
	values: Record<string, any>;
	hideMerchantField?: boolean;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		loginHash: userLoginHash,
		merchantRights,
		id: userId,
	} = useContext(AuthenticationContext).vinistoUser;

	const merchantsQuery = useGetMerchants({ userLoginHash });

	const canCreateBasketAsMerchant = merchantRights.includes(
		VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersCreation
	);

	const canApproveBasketAsMerchant = merchantRights.includes(
		VinistoHelperDllEnumsUserCompanyMerchantRights.OrdersConfirmation
	);

	const isCurrentUserAsassignedMerchant = !!(
		merchantsQuery.isSuccess &&
		!merchantsQuery.data?.length &&
		(canCreateBasketAsMerchant || canApproveBasketAsMerchant)
	);

	const merchantsOptions = isCurrentUserAsassignedMerchant
		? [
				{
					value: userId ?? '',
					label: `Přiřadit mě`,
				},
		  ]
		: merchantsQuery.data?.map((merchant) => ({
				value: merchant.id,
				label: `${merchant.firstName} ${merchant.surname}`,
		  }));

	// TODO: Dedupe these options! These are used also in create company form
	const paymentTypeOptions = Object.values(
		VinistoHelperDllEnumsUserCompanyPaymentType
	).map((type) => ({
		value: type,
		label: `${t({ id: `admin.b2bCustomer.paymentMethod.${type}` })}`,
	}));

	// TODO: Dtto
	const invoiceDueDateOptions = [
		{
			value: '7',
			label: '7',
		},
		{
			value: '14',
			label: '14',
		},
		{
			value: '30',
			label: '30',
		},
	];

	return (
		<>
			<InputSelect
				label="admin.b2bCustomer.priceLevelPriceList.label"
				name="priceLevel"
				identifier="priceLevel"
				validate={Validators.required}
				options={Object.values(VinistoHelperDllEnumsPriceLevel)
					.filter(
						(level) => level !== VinistoHelperDllEnumsPriceLevel.VinistoPlus
					)
					.map((level) => ({
						value: level,
						label: `${t({ id: `VinistoB2b.${level}` })}`,
					}))}
			/>
			{!hideMerchantField && (
				<InputSelect
					label="admin.b2bCustomer.assignedMerchant.label"
					name="merchantId"
					identifier="merchantId"
					validate={Validators.required}
					options={merchantsOptions}
				/>
			)}
			<InputSelect
				label="admin.b2bCustomer.paymentMethod.label"
				name="paymentMethod"
				identifier="paymentMethod"
				options={paymentTypeOptions}
			/>
			<Input
				label="admin.b2bCustomer.credit.label"
				type="number"
				name="credit"
				identifier="credit"
				// @ts-expect-error Not sure why, is value of an input of type="number" a string?
				validate={[Validators.required, Validators.min(1)]}
				disabled
			/>
			<InputSelect
				label="admin.b2bCustomer.invoiceDueDate.label"
				name="invoiceDueDate"
				identifier="invoiceDueDate"
				options={invoiceDueDateOptions}
				disabled
			/>
			<Input
				type="number"
				name="monthlyTurnover"
				identifier="monthlyTurnover"
				label="admin.b2bCustomer.monthlyTurnover.label"
			/>
			{!!values.monthlyTurnover &&
				!Number.isNaN(Number(values.monthlyTurnover)) &&
				`Předpokládaný roční obrat: ${values.monthlyTurnover * 12}`}
			<Input
				type="number"
				name="orderingFrequency"
				identifier="orderingFrequency"
				label="admin.b2bCustomer.orderingFrequency.label"
			/>
			<InputTextArea
				name="agreementCCNote"
				identifier="agreementCCNote"
				label="admin.b2bCustomer.agreementCCNote.label"
			/>
		</>
	);
};

export default BusinessInfoFields;
