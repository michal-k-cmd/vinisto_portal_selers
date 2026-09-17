import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { validatePassword } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input, InputPassword } from 'Components/Form';

import {
	CURRENT_PASSWORD_FIELD,
	NEW_PASSWORD_FIELD,
	PASSWORD_PLACEHOLDER_FIELD,
} from '../constants';

const ChangePasswordInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<>
			{disabled && (
				<Input
					type="password"
					name={PASSWORD_PLACEHOLDER_FIELD}
					identifier={PASSWORD_PLACEHOLDER_FIELD}
					label={label(t({ id: 'settings.form.password.label' }))}
					disabled={disabled}
					className="flex-grow-1"
				/>
			)}
			{!disabled && (
				<>
					<InputPassword
						className="flex-grow-1"
						label="settings.password.current.label"
						name={CURRENT_PASSWORD_FIELD}
						identifier={CURRENT_PASSWORD_FIELD}
					/>
					<InputPassword
						label="settings.password.new.label"
						className="ms-2 flex-grow-1"
						name={NEW_PASSWORD_FIELD}
						identifier={NEW_PASSWORD_FIELD}
						validate={validatePassword()}
					/>
				</>
			)}
		</>
	);
};

export default ChangePasswordInput;
