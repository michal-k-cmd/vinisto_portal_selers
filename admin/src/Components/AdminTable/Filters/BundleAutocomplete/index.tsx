import { FC, MouseEvent, useEffect, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { AutocompleteBundleOptionBase } from 'Components/Form/Components/AutocompleteBundle/interfaces';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import useBundleById from 'Hooks/Queries/useBundleById';

interface BundleAutocompleteFilterProps {
	/** Receives the selected bundle id (or '' when cleared). */
	onChange: (value: string) => void;
	onClick?: (event: MouseEvent) => void;
	value?: string;
}

/**
 * Table column filter that lets the user search bundles by name and filters the
 * list by the selected bundle id. The server only supports filtering by
 * BundleId, so we resolve the name -> id through the bundle autocomplete.
 */
const BundleAutocompleteFilter: FC<BundleAutocompleteFilterProps> = ({
	onChange,
	onClick,
	value,
}) => {
	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({});
	const [isLoading, setIsLoading] = useState(false);
	const [selected, setSelected] = useState<AutocompleteBundleOptionBase[]>([]);
	const getLocalizedValue = useLocalizedValue();
	const { data: initialBundle } = useBundleById({
		bundleId: value ?? '',
		options: { retry: false },
	});

	useEffect(() => {
		if (!value || !initialBundle || selected.length) return;
		setSelected([
			{
				label: getLocalizedValue(initialBundle.name),
				value,
			},
		]);
	}, [value, initialBundle, selected.length, getLocalizedValue]);

	useEffect(() => {
		setIsLoading(false);
	}, [autocompleteOptions]);

	return (
		<div
			onClick={onClick}
			className="w-100"
		>
			<AsyncTypeahead
				id="admin-table-bundle-autocomplete-filter"
				className="vinisto-admin-table__text-input"
				isLoading={isLoading}
				labelKey="label"
				minLength={2}
				useCache={false}
				options={autocompleteOptions}
				selected={selected}
				onSearch={(query) => {
					setIsLoading(true);
					handleOnSearch(query);
				}}
				onChange={(options) => {
					const next = options as AutocompleteBundleOptionBase[];
					setSelected(next);
					onChange(next[0]?.value ?? '');
				}}
				positionFixed
			/>
		</div>
	);
};

export default BundleAutocompleteFilter;
