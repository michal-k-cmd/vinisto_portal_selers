import { FormControlProps } from 'Components/Form/interfaces';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/user-api';

export type CountrySelectProps = FormControlProps & {
	excludedCountries?: VinistoHelperDllEnumsCountryCode[];
};
