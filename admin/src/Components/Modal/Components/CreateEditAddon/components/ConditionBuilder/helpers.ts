import { CreateEditAddonFormValues } from '../../types';

import { ConditionRequest } from '@/api-types/addons-api';

export const getIsLastConditionEmpty = (
	formValues: CreateEditAddonFormValues
) => {
	const conditionCount = formValues?.conditions?.length;
	const lastCondition = formValues?.conditions[conditionCount - 1] ?? {};
	const lastConditionWithoutOperator = Object.keys(lastCondition)
		.filter((key) => key !== 'operator')
		.find((key) => key.endsWith('ConditionRequest'));
	if (lastConditionWithoutOperator == undefined) return true;
	return (
		lastCondition[lastConditionWithoutOperator as keyof ConditionRequest] ==
		undefined
	);
};
