import { FC, useContext, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { AutocompleteFieldProps } from 'Components/Forms/Components/AutocompleteField/interfaces';
import { getDefaultDropdownPlaceholderAutocomplete } from 'Components/Forms/Components/Autocomplete/Dropdowns/Default/helpers';
import useDebounce from 'Hooks/useDebounce';
import { AddressSuggestionsApiHooks } from 'Services/AddressSuggestions/hooks';
import Form from 'Components/Forms';
import DefaultDropdown from 'Components/Forms/Components/Autocomplete/Dropdowns/Default';
import { TestIdType } from 'Constants/test-ids';
import { LocalizationContext } from 'Services/LocalizationService';

import { DEBOUNCE_DELAY } from './constants';

type AddressSuggestionsAutocompleteFieldProps = Omit<
	AutocompleteFieldProps,
	'setValueOnSelect' | 'placeholder'
> & {
	setValueOnSelect?: AutocompleteFieldProps['setValueOnSelect'];
	placeholder?: string;
	dataTestid?: TestIdType;
};

const AddressSuggestionsAutocompleteField: FC<
	AddressSuggestionsAutocompleteFieldProps
> = ({
	name,
	setValueOnSelect,
	label,
	rules,
	onSelect,
	onChangeInput,
	placeholder,
	dataTestid,
}) => {
	const { countryOfSale } = useContext(LocalizationContext);
	const search = useWatch({ name });
	const countryCode = useWatch({ name: 'countryCode' });
	const {
		formState: { dirtyFields },
	} = useFormContext();

	const [isTouched, setIsTouched] = useState(dirtyFields?.[name] ?? false);
	const debouncedSearch: string = useDebounce(
		// If search length is 0, it won't fetch any data
		// Prevent premature or unnecessary data fetching
		search?.selectedItem || !isTouched ? '' : search?.value,
		DEBOUNCE_DELAY
	);

	const { data } = AddressSuggestionsApiHooks.useGet({
		SearchAddress: debouncedSearch,
		Country: countryCode || countryOfSale,
	});

	const items =
		data?.suggestions?.map((address) => ({
			text: address?.values?.WHOLE_ADDRESS ?? '',
			value: address,
		})) ?? [];

	return (
		<Form.AutocompleteField
			inputProps={{ onFocus: () => setIsTouched(true) }}
			label={label}
			name={name}
			placeholder={({ activeIndex, open }) =>
				getDefaultDropdownPlaceholderAutocomplete({
					search: search?.value || '',
					activeIndex,
					items,
					open,
					defaultPlaceholder: placeholder ?? '',
				})
			}
			setValueOnSelect={
				setValueOnSelect ?? ((address) => address?.values?.STREET ?? '')
			}
			dropdownContent={
				<DefaultDropdown
					search={search?.value ?? ''}
					items={items}
				/>
			}
			onSelect={onSelect}
			onChangeInput={onChangeInput}
			rules={rules}
			dataTestid={dataTestid}
		/>
	);
};

export default AddressSuggestionsAutocompleteField;
