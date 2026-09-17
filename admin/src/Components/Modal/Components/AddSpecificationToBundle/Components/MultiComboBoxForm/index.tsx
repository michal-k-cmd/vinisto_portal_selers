import { FC } from 'react';
import { entriesIn, get, map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { InputCheckBox } from 'Components/Form';
import { SpecificationAllovedValues } from 'Components/Modal/Components/AddSpecificationToBundle/Components/ComboBoxForm/interfaces';

import { MultiComboBoxFormProps } from './interfaces';

const MultiComboBoxForm: FC<MultiComboBoxFormProps> = ({ specification }) => {
	const getLocalizedValue = useLocalizedValue();
	// TODO replace lodash after MultiComboBoxFormProps interface is properly specified
	const optionsToShow = map(
		entriesIn(
			get(
				specification,
				'allowedValues',
				get(specification, 'definition.allowedValues')
			)
		),
		([key, value]: [string, SpecificationAllovedValues]) => ({
			value: key,
			label: getLocalizedValue(value.name),
		})
	) as unknown as { value: string; label: string }[];

	return (
		<>
			{optionsToShow.map((option) => (
				<div key={option.value}>
					<InputCheckBox
						identifier={option.value}
						name={`allowedValues.${option.value}`}
						label={<>{option.label}</>}
					/>
				</div>
			))}
		</>
	);
};

export default MultiComboBoxForm;
