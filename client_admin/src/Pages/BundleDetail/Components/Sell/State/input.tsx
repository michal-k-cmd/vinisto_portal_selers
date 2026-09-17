import { useContext, useMemo } from 'react';
import { SingleEditWrapperComponentProps } from 'Components/SingleEditForm/interfaces';
import { required } from 'Components/Form/validators';
import { InputSelect } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import { FIELD_NAME, options } from './constants';

const StateSelect = ({ disabled }: SingleEditWrapperComponentProps) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const selectOptions = useMemo(() => {
		return options.map((option) => ({
			...option,
			label: `${t({ id: option.label })}`,
		}));
	}, [t]);

	return (
		<InputSelect
			name={FIELD_NAME}
			identifier={FIELD_NAME}
			label={t({ id: 'bundleDetail.sell.state.label' })}
			options={selectOptions}
			className="flex-grow-1"
			disabled={disabled}
			validate={required}
		/>
	);
};

export default StateSelect;
