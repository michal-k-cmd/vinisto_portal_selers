import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputEmail } from 'Components/Form';

import { FIELD_NAME } from './constants';

const EmailInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
	id,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<InputEmail
			identifier={typeof id === 'string' ? id : id?.[0] ?? FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.address.email.label' }))}
			placeholder="settings.address.email.placeholder"
			className="flex-grow-1"
			disabled={disabled}
		/>
	);
};

export default EmailInput;
