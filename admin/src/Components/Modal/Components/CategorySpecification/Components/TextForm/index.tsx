import { FC, useCallback, useState } from 'react';
import Multiselect from 'Components/Multiselect';

import { TextFormProps, TextSpecificationOption } from './interfaces';

const TextForm: FC<TextFormProps> = ({
	specification,
	setSelectedValues,
	initialValue,
}) => {
	const [options, setOptions] = useState<TextSpecificationOption[]>(
		() =>
			specification.availableValues?.sort().map((value) => ({
				value: value,
				label: value,
			})) ?? []
	);

	const handleOnSelectionChange = useCallback(
		(selection: TextSpecificationOption[]) =>
			setSelectedValues(selection.map((value) => value.value)),
		[setSelectedValues]
	);

	const handleOnAddNewItem = useCallback(
		(item: TextSpecificationOption) =>
			setOptions((options) => [...options, item]),
		[]
	);

	const initialSelect: typeof options =
		initialValue === undefined
			? []
			: initialValue.map((name) => ({
					value: name,
					label: name,
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

export default TextForm;
