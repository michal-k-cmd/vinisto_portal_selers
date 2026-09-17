import * as React from 'react';
import Flag from 'Components/Flag';

import { ICountryFlagProps } from './interfaces';

const CountryFlag: React.FC<ICountryFlagProps> = ({
	flagIsoCode,
}): JSX.Element => {
	return (
		<Flag
			code={flagIsoCode}
			width="24"
			className="vinisto-flag"
		/>
	);
};

export default CountryFlag;
