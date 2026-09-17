import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input } from 'Components/Form';

import { FIELD_NAME } from './constants';

const VatinInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<Input
			identifier={FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.invoice.vatin.label' }))}
			placeholder="settings.invoice.vatin.placeholder"
			className="flex-grow-1"
			disabled={disabled}
			validate={[required]}
		/>
	);
};

export default VatinInput;
