import { FC, useContext, useMemo } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required } from 'Components/Form/validators';
import { InputSelect } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import { COUNTRIES, FIELD_NAME } from './constants';

const CountryCodeSelect: FC<SingleEditWrapperComponentProps> = ({
	disabled,
	label,
	id,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const options = useMemo(() => {
		return COUNTRIES.map((country) => ({
			value: String(country.value),
			label: `${t({ id: country.text })}`,
		}));
	}, [t]);

	return (
		<InputSelect
			identifier={typeof id === 'string' ? id : id?.[0] ?? FIELD_NAME}
			name={FIELD_NAME}
			label={label(t({ id: 'settings.address.countryCode.label' }))}
			options={options}
			className="flex-grow-1"
			disabled={disabled}
			validate={required}
		/>
	);
};

export default CountryCodeSelect;
