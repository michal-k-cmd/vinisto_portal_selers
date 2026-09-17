import { FC, useContext, useMemo } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required } from 'Components/Form/validators';
import { InputSelect } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import { FIELD_NAME, OPTIONS } from './constants';

const DeliveryTypeSelect: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const options = useMemo(() => {
		return OPTIONS.map((option) => ({
			...option,
			label: `${t({ id: option.text })}`,
		}));
	}, [t]);

	return (
		<InputSelect
			name={FIELD_NAME}
			identifier={FIELD_NAME}
			label={label(t({ id: 'settings.delivery.type.label' }))}
			options={options}
			className="flex-grow-1"
			disabled={disabled}
			validate={required}
		/>
	);
};

export default DeliveryTypeSelect;
