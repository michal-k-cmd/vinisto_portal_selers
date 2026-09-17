import { FC, useCallback, useMemo } from 'react';
import { entriesIn, map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import Multiselect from 'Components/Multiselect';

import { MultiselectFormProps } from './interfaces';

const MultiselectForm: FC<MultiselectFormProps> = ({
	specification,
	setSelectedValues,
	initialValue,
}) => {
	const getLocalizedValue = useLocalizedValue();

	const options = useMemo(
		() =>
			map(entriesIn(specification.allowedValues), ([key, value]) => ({
				value: key,
				label: getLocalizedValue(value.name),
			})).sort((a, b) => a.label.localeCompare(b.label)),
		[getLocalizedValue, specification.allowedValues]
	);

	const handleOnSelectionChange = useCallback(
		(selection: typeof options) =>
			setSelectedValues(selection.map((value) => value.value)),
		[setSelectedValues]
	);

	const initialSelect: typeof options =
		initialValue === undefined
			? []
			: initialValue.map((value) => ({
					value: value,
					label: getLocalizedValue(
						specification.allowedValues
							? specification.allowedValues[value as string]?.name
							: []
					),
			  }));

	return (
		<Multiselect
			onSelectionChange={handleOnSelectionChange}
			options={options}
			initialSelected={initialSelect}
		/>
	);
};

export default MultiselectForm;
