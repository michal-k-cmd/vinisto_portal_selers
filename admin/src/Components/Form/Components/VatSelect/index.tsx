import { FC } from 'react';
import InputSelect from 'Components/Form/Components/Select';

import { VatSelectProps } from './interfaces';
import { VATS } from './constants';

const VatSelect: FC<VatSelectProps> = (props) => {
	return (
		<InputSelect
			{...{ ...props }}
			options={VATS}
		/>
	);
};

export default VatSelect;
