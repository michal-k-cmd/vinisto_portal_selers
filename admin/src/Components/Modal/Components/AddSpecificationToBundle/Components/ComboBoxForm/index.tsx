import { FC } from 'react';
import { entriesIn, get, map } from 'Helpers/lodash';
import { InputSelectProps } from 'Components/Form/Components/Select/interfaces';
import { InputSelect } from 'Components/Form';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { SpecificationAllovedValues } from 'Components/Modal/Components/AddSpecificationToBundle/Components/ComboBoxForm/interfaces';

const ComboBoxForm: FC<Record<any, any>> = (props) => {
	const getLocalizedValue = useLocalizedValue();
	const specification = get(props, 'specification', {});
	const mappedOptions = map(
		entriesIn(
			get(
				specification,
				'allowedValues',
				get(specification, 'definition.allowedValues')
			)
		),
		([key, value]: [string, SpecificationAllovedValues]) => {
			return {
				value: key,
				label: getLocalizedValue(value.name),
			};
		}
	);

	let sortedOptions;
	try {
		// Try to sort. If there is no data (Option.label is nullable), then work with unsorted data.
		sortedOptions = [...mappedOptions].sort((a, b) => {
			const labelA = String(a.label || '');
			const labelB = String(b.label || '');
			return labelA.localeCompare(labelB);
		});
	} catch (error) {
		sortedOptions = mappedOptions;
	}

	const optionsToShow = sortedOptions as unknown as InputSelectProps['options'];

	return (
		<InputSelect
			{...props}
			identifier="allowedValue"
			name="allowedValue"
			label="admin.modal.form.allowedValue"
			options={optionsToShow}
		/>
	);
};

export default ComboBoxForm;
