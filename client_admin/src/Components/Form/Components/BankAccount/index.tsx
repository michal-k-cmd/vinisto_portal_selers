import { FC } from 'react';
import { Field } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';

import { InputBankAccountProps } from './interfaces';
import { requiredBankAccount, validateBankAccount } from './helpers';
import Fields from './Fields';

/**
 * @category Component Input Bank Account
 */
const InputBankAccount: FC<InputBankAccountProps> = (props) => {
	const validate = composeValidators(
		props.isRequired ? requiredBankAccount : () => undefined,
		validateBankAccount
	);

	return (
		<Field<string>
			name={props.name}
			validate={validate}
		>
			{(fieldProps) => (
				<Fields
					{...fieldProps}
					{...props}
				/>
			)}
		</Field>
	);
};

export default InputBankAccount;
