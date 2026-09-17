import { FC, useCallback, useEffect, useState } from 'react';
import { uniqueId } from 'Helpers/lodash';
import { useField } from 'react-final-form';
import SmartFormService from 'Services/SmartForm';

import InputAutocompleteAsync from '../AutocompleteAsync';

import {
	AddressAutocompleteProps,
	AutocompleteOptionAddress,
} from './interfaces';

const AddressAutocomplete: FC<AddressAutocompleteProps> = ({
	options: defaultOptions = [],
	onSearchCallback,
	onChange,
	onSelect,
	...props
}) => {
	const [autocompleteOptions, setAutocompleteOptions] =
		useState<AutocompleteOptionAddress[]>(defaultOptions);
	// refresh autocomplete input once value is set programmatically
	const [addressAutocompleteKey, setAddressAutocompleteKey] = useState<string>(
		uniqueId()
	);

	const {
		input: { value: initialValue },
	} = useField(props.name);

	const getAddressData = useCallback((inputText: string) => {
		SmartFormService.getAddress({
			SearchAddress: inputText,
		}).then((payload) =>
			setAutocompleteOptions(
				payload.suggestions?.map((address) => ({
					label: address.values?.WHOLE_ADDRESS ?? '',
					value: address.values ?? {},
				})) ?? []
			)
		);
	}, []);

	const handleOnSearch = useCallback(
		(inputText: string) => {
			if (onSearchCallback) {
				onSearchCallback(inputText);
			}
			getAddressData(inputText);
		},
		[onSearchCallback, getAddressData]
	);

	const handleOnChange = useCallback(
		(address: AutocompleteOptionAddress[]) => {
			if (onChange) {
				onChange(address);
			}
			if (address.length > 0 && onSelect) {
				onSelect(address[0].value);
			}
			setAddressAutocompleteKey(uniqueId());
		},
		[onChange, onSelect]
	);

	useEffect(() => {
		getAddressData(initialValue);
	}, []);

	// WHY: setValue mutator succesfully updates the field in form state, but not in the UI
	// So loading the ARES data sets street as it should, but the field seems to be empty.
	// This effect seems to be fixing that with no side effects (I would suggest being cautious though)
	useEffect(() => {
		handleOnChange(initialValue);
	}, [handleOnChange, initialValue]);

	return (
		<InputAutocompleteAsync<AutocompleteOptionAddress>
			{...props}
			key={addressAutocompleteKey}
			options={autocompleteOptions}
			onSearchCallback={handleOnSearch}
			onChange={handleOnChange}
		/>
	);
};

export default AddressAutocomplete;
