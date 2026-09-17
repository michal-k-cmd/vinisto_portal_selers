import api from '@/api';
import {
	VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn,
	VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn,
} from '../../api-types/product-api';

import {
	createGiftRuleEndpointMap,
	GIFT_RULE_URI,
	updateGiftRuleEndpointMap,
} from './constants';

import { GiftRuleAdapter } from '@/domain/gift-rule/adapter';
import { GiftRule, ToApiSpecification } from '@/domain/gift-rule/types';

const { fromApi, toApi } = new GiftRuleAdapter();

const getAll = async (params: any) => {
	const response =
		await api.get<VinistoGiftsDllModelsApiGiftRuleGiftRulesReturn>(
			GIFT_RULE_URI,
			params
		);

	const mappedData = response.giftRules?.map((item: any) => fromApi(item));

	return mappedData;
};

const getById = async (id: string, userLoginHash: string) => {
	const response =
		await api.get<VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn>(
			`${GIFT_RULE_URI}/${id}`,
			{ userLoginHash }
		);

	return { ...response, giftRule: fromApi(response.giftRule) };
};

const create = async (
	giftRule: GiftRule & { specification?: ToApiSpecification },
	userLoginHash: string
) => {
	const reqGiftRule = toApi(giftRule);
	const ruleType = giftRule.ruleType;
	const endpoint = createGiftRuleEndpointMap[ruleType];

	if (!endpoint) return Promise.reject(new Error('Invalid rule type'));

	const response =
		await api.post<VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn>(
			`${GIFT_RULE_URI}/${endpoint}`,
			undefined,
			{ ...reqGiftRule, userLoginHash }
		);

	return {
		...reqGiftRule,
		giftRule: fromApi(response.giftRule),
	};
};

const update = async (
	giftRule: GiftRule & { specification?: ToApiSpecification },
	id: string,
	userLoginHash: string
) => {
	const reqGiftRule = toApi(giftRule);
	const ruleType = giftRule.ruleType;
	const endpoint = updateGiftRuleEndpointMap[ruleType];

	if (!endpoint) return Promise.reject(new Error('Invalid rule type'));

	const response =
		await api.put<VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn>(
			`${GIFT_RULE_URI}/${id}/${endpoint}`,
			undefined,
			{ ...reqGiftRule, userLoginHash }
		);

	return {
		...reqGiftRule,
		giftRule: fromApi(response.giftRule),
	};
};

const activate = async (id: string, userLoginHash: string) => {
	await api.put<VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn>(
		`${GIFT_RULE_URI}/${id}/activate-gift-rule`,
		undefined,
		{ userLoginHash }
	);

	return {};
};

const deactivate = async (id: string, userLoginHash: string) => {
	await api.put<VinistoGiftsDllModelsApiGiftRuleGiftRuleReturn>(
		`${GIFT_RULE_URI}/${id}/deactivate-gift-rule`,
		undefined,
		{ userLoginHash }
	);

	return {};
};

const GiftRuleService = {
	getAll,
	getById,
	create,
	update,
	activate,
	deactivate,
};

export default GiftRuleService;
