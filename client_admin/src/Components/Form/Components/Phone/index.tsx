import { FC, useMemo } from 'react';
import { get, split, trim } from 'lodash-es';
import { Field } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';

import { InputPhoneProps } from './interfaces';
import { CODE_NUMBER_SEPARATOR } from './constants';
import InputPhoneFields from './InputPhoneFields';

import './styles.css';

const InputPhone: FC<InputPhoneProps> = (props) => {
	const validators = useMemo(
		() =>
			Array.isArray(props.validate)
				? composeValidators(...props.validate)
				: props.validate ?? (() => undefined),
		[props.validate]
	);

	return (
		<Field
			name={props.name}
			validate={(value) =>
				validators(trim(get(split(value, CODE_NUMBER_SEPARATOR), '[1]', '')))
			}
		>
			{(fieldPropTypes) => (
				<InputPhoneFields
					{...fieldPropTypes}
					{...props}
				/>
			)}
		</Field>
	);
};

export default InputPhone;
