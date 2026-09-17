import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required, validateIco } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input } from 'Components/Form';

import { FIELD_NAME } from './constants';

const IdNumberInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<Input
			identifier={FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.invoice.id.label' }))}
			placeholder="settings.invoice.id.placeholder"
			className="flex-grow-1"
			disabled={disabled}
			validate={[required, validateIco]}
		/>
	);
};

export default IdNumberInput;
