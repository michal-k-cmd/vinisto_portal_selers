import { FC, useCallback, useState } from 'react';
import Multiselect from 'Components/Multiselect';

import { NumberFormProps, NumberSpecificationOption } from './interfaces';

const NumberForm: FC<NumberFormProps> = ({
	specification,
	setSelectedValues,
	initialValue,
}) => {
	const [options, setOptions] = useState<NumberSpecificationOption[]>(
		() =>
			specification.availableValues?.sort().map((value) => ({
				value: String(value),
				label: String(value),
			})) ?? []
	);

	const handleOnSelectionChange = useCallback(
		(selection: NumberSpecificationOption[]) =>
			setSelectedValues(selection.map((value) => value.value)),
		[setSelectedValues]
	);

	const handleOnAddNewItem = useCallback(
		(item: NumberSpecificationOption) =>
			setOptions((options) => [...options, item]),
		[]
	);

	const initialSelect: typeof options =
		initialValue === undefined
			? []
			: initialValue.map((value) => ({
					value: String(value),
					label: String(value),
			  }));

	return (
		<Multiselect
			onAddNewItem={handleOnAddNewItem}
			onSelectionChange={handleOnSelectionChange}
			options={options}
			initialSelected={initialSelect}
		/>
	);
};

export default NumberForm;
