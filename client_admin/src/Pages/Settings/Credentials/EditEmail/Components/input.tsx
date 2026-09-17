import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputEmail } from 'Components/Form';
import { requiredCustomMessage } from 'Components/Form/validators';

import { FIELD_ID } from '../constants';

const EditEmailInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<InputEmail
			identifier={FIELD_ID}
			name={FIELD_ID}
			disabled={disabled}
			className="flex-grow-1"
			label={label(t({ id: 'settings.email.label' }))}
			validate={requiredCustomMessage('form.input.email.requiredValidation')}
		/>
	);
};

export default EditEmailInput;
