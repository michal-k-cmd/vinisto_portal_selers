import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputPhone } from 'Components/Form';

import { FIELD_NAME } from './constants';

const PhoneInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
	id,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<InputPhone
			name={FIELD_NAME}
			identifier={typeof id === 'string' ? id : id?.[0] ?? FIELD_NAME}
			label={label(t({ id: 'settings.address.phone.label' }))}
			className="flex-grow-1"
			disabled={disabled}
			validate={required}
			placeholder="settings.address.phone.placeholder"
		/>
	);
};

export default PhoneInput;
