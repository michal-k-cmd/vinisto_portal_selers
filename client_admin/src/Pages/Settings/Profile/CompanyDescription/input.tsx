import { FC, useContext } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';
import { Input } from 'Components/Form';

import { FIELD_NAME } from './constants';

const CompanyDescriptionInput: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<Input
			identifier={FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.profile.companyDescription.label' }))}
			placeholder="settings.profile.companyDescription.placeholder"
			className="flex-grow-1"
			disabled={disabled}
		/>
	);
};

export default CompanyDescriptionInput;
