import { FC, useContext } from 'react';
import { InputSelect } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

const CheckBoxForm: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	return (
		<InputSelect
			identifier="isChecked"
			name="isChecked"
			label="admin.modal.form.specification.isChecked"
			options={[
				{
					value: 'true',
					label: `${t({ id: 'admin.modal.form.specification.isChecked.yes' })}`,
				},
				{
					value: 'false',
					label: `${t({ id: 'admin.modal.form.specification.isChecked.no' })}`,
				},
			]}
		/>
	);
};

export default CheckBoxForm;
