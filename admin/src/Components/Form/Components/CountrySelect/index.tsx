import { FC, useMemo } from 'react';
import InputSelect from 'Components/Form/Components/Select';

import { CountrySelectProps } from './interfaces';
import { COUNTRIES } from './constants';

const CountrySelect: FC<CountrySelectProps> = (props) => {
	const filteredCountries = useMemo(
		() =>
			props.excludedCountries
				? COUNTRIES.filter(
						(country) => !props.excludedCountries?.includes(country.value)
				  )
				: COUNTRIES,
		[props.excludedCountries]
	);
	return (
		<InputSelect
			{...{ ...props }}
			options={filteredCountries}
		/>
	);
};

export default CountrySelect;
