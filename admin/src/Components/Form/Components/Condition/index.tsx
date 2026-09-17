import { FC } from 'react';
import { Field } from 'react-final-form';

import { ConditionProps } from './interfaces';

const Condition: FC<ConditionProps> = ({ when, is, children }) => (
	<Field
		name={when}
		subscription={{ value: true }}
	>
		{({ input: { value } }) => {
			if (typeof is === 'function') {
				return is(value) ? children : null;
			}
			return value === is ? children : null;
		}}
	</Field>
);

export default Condition;
