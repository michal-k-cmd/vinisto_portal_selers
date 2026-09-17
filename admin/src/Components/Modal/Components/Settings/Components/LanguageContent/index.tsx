import { FC, useCallback, useContext, useState } from 'react';
import { CFormLabel } from '@coreui/react';
import { get } from 'Helpers/lodash';
import { Form } from 'react-final-form';
import Config from 'Config';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputSelect } from 'Components/Form';

import { getItemsByLocalizationsConfig } from './helpers';

import './styles.css';

const LanguageContent: FC = () => {
	const [localizationsConfig] = useState<Record<any, any>[]>(
		getItemsByLocalizationsConfig(get(Config, 'localizations', {}))
	);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnChangeLanguage = useCallback(
		(value: string) => {
			localizationContext.changeLanguage(value);
		},
		[localizationContext]
	);

	return (
		<Form
			onSubmit={() => undefined}
			initialValues={{ lang: localizationContext.activeLanguage }}
		>
			<div className="language-content">
				<CFormLabel>{t({ id: 'admin.modal.changeLanguage.label' })}</CFormLabel>
				<InputSelect
					name="lang"
					identifier="lang"
					options={localizationsConfig}
					onChange={handleOnChangeLanguage}
				/>
			</div>
		</Form>
	);
};

export default LanguageContent;
