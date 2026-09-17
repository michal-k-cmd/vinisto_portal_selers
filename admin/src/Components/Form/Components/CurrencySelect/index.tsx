import { FC } from 'react';
import InputSelect from 'Components/Form/Components/Select';

import { CurrencySelectProps } from './interfaces';
import { CURRENCIES } from './constants';

const CurrencySelect: FC<CurrencySelectProps> = (props) => {
	return (
		<InputSelect
			{...{ ...props }}
			options={CURRENCIES}
		/>
	);
};

export default CurrencySelect;
