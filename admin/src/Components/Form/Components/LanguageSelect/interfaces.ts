import { FormControlProps } from 'Components/Form/interfaces';

import { LANGUAGES } from './constants';

export interface LanguageSelectProps extends FormControlProps {
	languages?: typeof LANGUAGES;
}
