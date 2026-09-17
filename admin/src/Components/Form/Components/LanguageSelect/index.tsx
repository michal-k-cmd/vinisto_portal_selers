import { FC } from 'react';
import InputSelect from 'Components/Form/Components/Select';

import { LanguageSelectProps } from './interfaces';
import { LANGUAGES } from './constants';

const LanguageSelect: FC<LanguageSelectProps> = ({
	languages = LANGUAGES,
	...props
}) => {
	return (
		<InputSelect
			{...{ ...props }}
			options={languages}
		/>
	);
};

export default LanguageSelect;
