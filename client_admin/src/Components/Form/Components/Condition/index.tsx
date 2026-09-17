import { Field } from 'react-final-form';

import { ConditionProps, PrimitiveType } from './interfaces';

const Condition = <T extends PrimitiveType>({
	field,
	condition,
	children,
}: ConditionProps<T>) => (
	<Field
		name={field}
		subscription={{ value: true }}
	>
		{({ input: { value: inputValue } }) => {
			if (typeof condition === 'function') {
				return condition(inputValue) ? children : null;
			}
			return inputValue === condition ? children : null;
		}}
	</Field>
);

export default Condition;
