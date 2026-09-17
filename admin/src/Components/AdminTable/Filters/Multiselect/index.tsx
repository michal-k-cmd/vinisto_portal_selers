import { Typeahead } from 'react-bootstrap-typeahead';

interface MultiSelectFilterProps {
	options: { value: string; label: string }[];
	selected: { value: string; label: string }[];
	onChange: (selected: string[]) => void;
}

const MultiSelectFilter = ({
	options,
	selected,
	onChange,
}: MultiSelectFilterProps) => {
	const handleOnChange = (
		selectedOptions: { value: string; label: string }[]
	) => {
		const selectedValues = selectedOptions.map((option) => option.value);
		onChange(selectedValues);
	};

	return (
		<Typeahead
			multiple
			id="multi-select-filter"
			options={options}
			selected={selected}
			onChange={handleOnChange}
			positionFixed
		/>
	);
};

export default MultiSelectFilter;
