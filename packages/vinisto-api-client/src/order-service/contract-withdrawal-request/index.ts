import api from '@/api';
import {
	ContractWithdrawalRequestDetailParams,
	ContractWithdrawalRequestListParams,
	ContractWithdrawalRequestUpdateParams,
	VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn,
	VinistoHelperDllEnumsActionLogApplicationLogType,
	VinistoHelperDllEnumsActionLogSortableColumns,
	VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn,
	VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestsReturn,
} from '@/api-types/order-api';

import { ORDER_API_BASE_URI } from '../constants';

const CONTRACT_WITHDRAWAL_REQUEST_URI = `${ORDER_API_BASE_URI}/contract-withdrawal-request`;
const APPLICATION_LOG_URI = `${ORDER_API_BASE_URI}/application-log`;
const CONTRACT_WITHDRAWAL_REQUEST_HISTORY_LOG_TYPES = [
	VinistoHelperDllEnumsActionLogApplicationLogType.CONTRACT_WITHDRAWAL_REQUEST_CREATE,
	VinistoHelperDllEnumsActionLogApplicationLogType.CONTRACT_WITHDRAWAL_REQUEST_STATE_CHANGE,
];

const getList = async (params: ContractWithdrawalRequestListParams) =>
	api.get<VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestsReturn>(
		CONTRACT_WITHDRAWAL_REQUEST_URI,
		params
	);

const getById = async (params: ContractWithdrawalRequestDetailParams) => {
	const { contractWithdrawalRequestId, ...query } = params;

	return api.get<VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn>(
		`${CONTRACT_WITHDRAWAL_REQUEST_URI}/${contractWithdrawalRequestId}`,
		query
	);
};

const update = async (params: ContractWithdrawalRequestUpdateParams) => {
	const { contractWithdrawalRequestId, ...query } = params;

	return api.put<VinistoOrderDllModelsApiReturnDataContractWithdrawalRequestReturn>(
		`${CONTRACT_WITHDRAWAL_REQUEST_URI}/${contractWithdrawalRequestId}`,
		query
	);
};

const getHistory = async (params: {
	requestId: string;
	UserLoginHash: string;
}) => {
	const responses = await Promise.all(
		CONTRACT_WITHDRAWAL_REQUEST_HISTORY_LOG_TYPES.map((ApplicationLogType) =>
			api.get<VinistoApplicationLogDllModelsApiApplicationLogApplicationLogReturn>(
				`${APPLICATION_LOG_URI}/${params.requestId}`,
				{
					UserLoginHash: params.UserLoginHash,
					SortingColumn:
						VinistoHelperDllEnumsActionLogSortableColumns.CREATED_AT,
					IsSortingDescending: false,
					ApplicationLogType,
				}
			)
		)
	);

	const applicationLogs = responses
		.flatMap((response) => response.applicationLogs ?? [])
		.sort((a, b) => a.time - b.time);

	return {
		...responses[0],
		applicationLogs,
		count: responses.reduce(
			(count, response) => count + (response.count ?? 0),
			0
		),
	};
};

const ContractWithdrawalRequestService = {
	getList,
	getById,
	update,
	getHistory,
};

export default ContractWithdrawalRequestService;
