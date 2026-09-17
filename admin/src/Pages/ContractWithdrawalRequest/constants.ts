import {
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState,
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType,
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource,
	VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState,
	VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns,
} from 'vinisto_api_client/src/api-types/order-api';

export const CONTRACT_WITHDRAWAL_REQUEST_URI =
	'order-api/contract-withdrawal-request';

export const CONTRACT_WITHDRAWAL_REQUEST_LIST_URL =
	'/contract-withdrawal-request-list';
export const CONTRACT_WITHDRAWAL_REQUEST_DETAIL_URL =
	'/contract-withdrawal-request-detail';

export const CONTRACT_WITHDRAWAL_REQUEST_DEFAULT_SORT = [
	{
		id: 'createdAt',
		desc: true,
	},
];

export const ContractWithdrawalRequestListTableKeys = {
	CREATED_AT: 'createdAt',
	ORDER_NUMBER: 'orderNumber',
	CUSTOMER_NAME: 'customerName',
	CUSTOMER_EMAIL: 'customerEmail',
	CUSTOMER_PHONE: 'customerPhone',
	CUSTOMER_TYPE: 'customerType',
	SOURCE: 'source',
	STATE: 'state',
	PROCESSED_BY: 'processedBy',
	ACTIONS: 'actions',
};

export const CONTRACT_WITHDRAWAL_REQUEST_SORTING_COLUMN_MAP = {
	[ContractWithdrawalRequestListTableKeys.CREATED_AT]:
		VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns.Date,
	[ContractWithdrawalRequestListTableKeys.ORDER_NUMBER]:
		VinistoHelperDllEnumsContractWithdrawalRequestSortableColumns.Id,
};

export const CONTRACT_WITHDRAWAL_REQUEST_FILTER_COLUMN_MAP = {
	[ContractWithdrawalRequestListTableKeys.CUSTOMER_NAME]: 'SearchSurname',
	[ContractWithdrawalRequestListTableKeys.CUSTOMER_EMAIL]: 'SearchEmail',
	[ContractWithdrawalRequestListTableKeys.CUSTOMER_PHONE]: 'SearchPhone',
	[ContractWithdrawalRequestListTableKeys.STATE]: 'SearchState',
};

export const ContractWithdrawalRequestState = {
	Created:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState.Created,
	InReview:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState.InReview,
	Approved:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState.Approved,
	Rejected:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState.Rejected,
	Resolved:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestState.Resolved,
} as const;

export const ContractWithdrawalRequestChangeState = {
	InReview:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState.InReview,
	Approved:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState.Approved,
	Rejected:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState.Rejected,
	Resolved:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestChangeState.Resolved,
} as const;

export const ContractWithdrawalRequestCustomerType = {
	LoggedUser:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType.LoggedUser,
	Guest:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestCustomerType.Guest,
} as const;

export const ContractWithdrawalRequestSource = {
	PublicForm:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource.PublicForm,
	OrderDetail:
		VinistoHelperDllEnumsContractWithdrawalRequestContractWithdrawalRequestSource.OrderDetail,
} as const;

export const contractWithdrawalRequestStateTranslationKeys = {
	[ContractWithdrawalRequestState.Created]:
		'admin.contractWithdrawalRequest.state.created',
	[ContractWithdrawalRequestState.InReview]:
		'admin.contractWithdrawalRequest.state.inReview',
	[ContractWithdrawalRequestState.Approved]:
		'admin.contractWithdrawalRequest.state.approved',
	[ContractWithdrawalRequestState.Rejected]:
		'admin.contractWithdrawalRequest.state.rejected',
	[ContractWithdrawalRequestState.Resolved]:
		'admin.contractWithdrawalRequest.state.resolved',
};

export const contractWithdrawalRequestCustomerTypeTranslationKeys = {
	[ContractWithdrawalRequestCustomerType.LoggedUser]:
		'admin.contractWithdrawalRequest.customerType.loggedUser',
	[ContractWithdrawalRequestCustomerType.Guest]:
		'admin.contractWithdrawalRequest.customerType.guest',
};

export const contractWithdrawalRequestSourceTranslationKeys = {
	[ContractWithdrawalRequestSource.PublicForm]:
		'admin.contractWithdrawalRequest.source.publicForm',
	[ContractWithdrawalRequestSource.OrderDetail]:
		'admin.contractWithdrawalRequest.source.orderDetail',
};

export const contractWithdrawalRequestChangeStateTranslationKeys = {
	[ContractWithdrawalRequestChangeState.InReview]:
		'admin.contractWithdrawalRequest.action.inReview',
	[ContractWithdrawalRequestChangeState.Approved]:
		'admin.contractWithdrawalRequest.action.approved',
	[ContractWithdrawalRequestChangeState.Rejected]:
		'admin.contractWithdrawalRequest.action.rejected',
	[ContractWithdrawalRequestChangeState.Resolved]:
		'admin.contractWithdrawalRequest.action.resolved',
};
