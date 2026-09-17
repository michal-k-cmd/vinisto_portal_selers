import {
	ActionRequest,
	AddonResponse,
	AddonType,
	ConditionRequest,
	Operator,
} from '@/api-types/addons-api';

export interface CreateEditAddonModalData {
	addonId?: string;
	addonType: AddonType;
	addon: AddonResponse | undefined;
	onSuccess?: () => void;
}

export interface ConditionRequestWithType extends ConditionRequest {
	conditionTypeSelect: string | undefined;
}

export type CreateEditAddonFormValues = {
	ruleName: string;
	description: string;
	availableOnPlatform?: number | undefined;
	validFrom: Date | null;
	validTo: Date | null;
	countries: { value: string; label: string }[];
	conditions: ConditionRequestWithType[];
	actions: ActionRequest[];
	[key: `conditions[${number}]`]: ConditionRequest | undefined | null;
	[key: `conditions[${number}][${keyof ConditionRequest}]`]:
		| ConditionRequest
		| undefined
		| null;
	[key: `conditions[${number}].operator`]: Operator | undefined;
	[key: `conditions[${number}].conditionTypeSelect`]: string | undefined;
	isVisibleOnDetail: boolean;
};
