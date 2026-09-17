import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import Multiselect from 'Components/Multiselect';

import { CheckBoxFormProps } from './interfaces';
import { CHECKBOX_OPTION } from './constants';

const CheckBoxForm: FC<CheckBoxFormProps> = ({
	setSelectedValues,
	initialValue,
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);

	const t = useFormatMessage();

	const options = [
		{
			value: CHECKBOX_OPTION.TRUE,
			label: `${t({ id: 'admin.modal.form.specification.isChecked.yes' })}`,
		},
		{
			value: CHECKBOX_OPTION.FALSE,
			label: `${t({ id: 'admin.modal.form.specification.isChecked.no' })}`,
		},
	];

	const initialSelect: typeof options =
		initialValue === undefined
			? []
			: initialValue.map((value) => (value === true ? options[0] : options[1]));

	return (
		<Multiselect
			onSelectionChange={(selection) =>
				setSelectedValues(
					selection.map((value) => value.value === CHECKBOX_OPTION.TRUE)
				)
			}
			options={options}
			initialSelected={initialSelect}
		/>
	);
};

export default CheckBoxForm;
