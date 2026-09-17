import React from 'react';
import { InputNumber, Validators } from 'Components/Form';

import { ConditionRequest } from '@/api-types/addons-api';

interface MinOrderPriceProps {
	name: string;
	initialConditions: ConditionRequest;
}

const MinOrderPrice = ({ name }: MinOrderPriceProps) => {
	return (
		<InputNumber
			name={`${name}.minOrderPrice`}
			identifier={`${name}.minOrderPrice`}
			label="admin.modal.createEditAddon.conditionType.minOrderPrice"
			validate={Validators.required}
		/>
	);
};
export default MinOrderPrice;
