import { FC } from 'react';
import { validateEmail } from 'Components/Form/validators';

import InputText from '../Input';

import { EmailProps } from './interfaces';

/**
 * @category Component Input Email
 */
const InputEmail: FC<EmailProps> = ({ validate, ...props }) => {
	return (
		<InputText
			{...props}
			type="email"
			validate={
				!validate
					? validateEmail
					: [
							...(Array.isArray(validate) ? validate : [validate]),
							validateEmail,
					  ]
			}
		/>
	);
};

export default InputEmail;
