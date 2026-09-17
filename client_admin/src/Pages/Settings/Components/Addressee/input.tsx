import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input } from 'Components/Form';

import { FIELD_NAME } from './constants';

const AddresseeInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
	id,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<Input
			identifier={typeof id === 'string' ? id : id?.[0] ?? FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.address.addressee.label' }))}
			placeholder="settings.address.addressee.placeholder"
			className="flex-grow-1"
			disabled={disabled}
		/>
	);
};

export default AddresseeInput;
