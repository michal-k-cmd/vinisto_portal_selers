import api from '@/api';
import {
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleCreateParameters,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRuleCreateParameters,
	VinistoFeeSystemModelsFeeRuleSaleFeeRuleCreateParameters,
	VinistoFeeSystemModelsFeeRuleSaleFeeRuleEditParameters,
	VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleEditParameters,
	VinistoFeeSystemModelsFeeRuleLogisticFeeRuleEditParameters,
} from '@/api-types/supplier-api';

const getFeeRule = async (id: string, loginHash: string) =>
	await api.get(`supplier-api/admin/fee-rules/${id}`, {
		userLoginHash: loginHash,
	});

//TODO: Implement this function including filters. Probably unnecessary because we have a different fetch implementation for table data.
const getFeeRules = async (loginHash: string) => {};

const createSaleFeeRule = async (
	requestBody: VinistoFeeSystemModelsFeeRuleSaleFeeRuleCreateParameters
) =>
	await api.post('supplier-api/admin/fee-rules/sale', undefined, requestBody);

const createDynamicFeeRule = async (
	requestBody: Omit<VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleCreateParameters, "destinationFees" | "originFees" | "validFrom" | "validTo" | "tags">
) =>
	await api.post(
		'supplier-api/admin/fee-rules/dynamic-sale',
		undefined,
		requestBody
	);

const createLogisticFeeRule = async (
	requestBody: VinistoFeeSystemModelsFeeRuleLogisticFeeRuleCreateParameters
) =>
	await api.post(
		'supplier-api/admin/fee-rules/logistic',
		undefined,
		requestBody
	);

const updateSaleFeeRule = async (
	id: string,
	requestBody: VinistoFeeSystemModelsFeeRuleSaleFeeRuleEditParameters
) =>
	await api.patch(
		`supplier-api/admin/fee-rules/sale/${id}`,
		undefined,
		requestBody
	);

const updateDynamicFeeRule = async (
	id: string,
	requestBody: VinistoFeeSystemModelsFeeRuleDynamicSaleFeeRuleEditParameters
) =>
	await api.patch(
		`supplier-api/admin/fee-rules/dynamic-sale/${id}`,
		undefined,
		requestBody
	);

const updateLogisticFeeRule = async (
	id: string,
	requestBody: VinistoFeeSystemModelsFeeRuleLogisticFeeRuleEditParameters
) =>
	await api.patch(
		`supplier-api/admin/fee-rules/logistic/${id}`,
		undefined,
		requestBody
	);

const feeRuleService = {
	getFeeRule,
	getFeeRules,
	createSaleFeeRule,
	createDynamicFeeRule,
	createLogisticFeeRule,
	updateSaleFeeRule,
	updateDynamicFeeRule,
	updateLogisticFeeRule,
};

export default feeRuleService;
