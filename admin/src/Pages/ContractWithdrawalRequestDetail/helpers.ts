import {
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState,
	VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest,
} from 'vinisto_api_client/src/api-types/order-api';
import {
	ContractWithdrawalRequestChangeState,
	ContractWithdrawalRequestState,
} from 'Pages/ContractWithdrawalRequest/constants';

type ContractWithdrawalRequest =
	VinistoOrderDllModelsApiContractWithdrawalRequestContractWithdrawalRequest;

export type DisplayUser = {
	email?: string | null;
	firstName?: string | null;
	firstname?: string | null;
	loginKey?: string | null;
	name?: string | null;
	nickname?: string | null;
	surname?: string | null;
};

export const formatCustomerName = (request: ContractWithdrawalRequest) =>
	[request.customerFirstName, request.customerSurname]
		.filter(Boolean)
		.join(' ');

export const formatAddress = (request: ContractWithdrawalRequest) => {
	const address = request.customerAddress;
	if (!address) return '';

	return [
		[
			address.street,
			[address.landRegistryNumber, address.houseNumber]
				.filter(Boolean)
				.join('/'),
		]
			.filter(Boolean)
			.join(' '),
		[address.zip, address.city].filter(Boolean).join(' '),
		address.countryCode,
	]
		.filter(Boolean)
		.join(', ');
};

export const formatDisplayUser = (user: DisplayUser | null | undefined) =>
	user
		? [
				user.nickname,
				user.firstName,
				user.firstname,
				user.name,
				user.surname,
				user.email,
		  ]
				.filter(Boolean)
				.join(' ')
		: '';

export const formatUserLogin = (user: DisplayUser | null | undefined) =>
	user ? user.email || user.loginKey || formatDisplayUser(user) : '';

export const isProcessedByUserId = (processedBy: string | null | undefined) =>
	Boolean(processedBy);

export const getAvailableActions = (
	state:
		| VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState
		| null
		| undefined
) => {
	switch (state) {
		case ContractWithdrawalRequestState.Created:
			return [
				ContractWithdrawalRequestChangeState.InReview,
				ContractWithdrawalRequestChangeState.Approved,
				ContractWithdrawalRequestChangeState.Rejected,
			];
		case ContractWithdrawalRequestState.InReview:
			return [
				ContractWithdrawalRequestChangeState.Approved,
				ContractWithdrawalRequestChangeState.Rejected,
			];
		case ContractWithdrawalRequestState.Approved:
		case ContractWithdrawalRequestState.Rejected:
			return [ContractWithdrawalRequestChangeState.Resolved];
		default:
			return [];
	}
};
