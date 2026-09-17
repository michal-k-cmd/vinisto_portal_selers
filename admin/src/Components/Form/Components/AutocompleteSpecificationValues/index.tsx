import InputAutocompleteAsync from 'Components/Form/Components/AutocompleteAsync';
import { FormControlProps } from 'Components/Form/interfaces';
import useAutocompleteSpecificationValues from 'Hooks/useAutocompleteSpecificationValues';
import { useEffect, useMemo, useState } from 'react';
import { useField } from 'react-final-form';
import { uniqueId } from 'Helpers/lodash';
import { useQuery } from '@tanstack/react-query';
import { SpecificationService } from 'vinisto_api_client';

import { AutocompleteOptionBase } from '../AutocompleteAsync/interfaces';

import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';

export interface InputAutocompleteAsyncProps<T extends AutocompleteOptionBase>
	extends FormControlProps<T[]> {
	specificationId: string;
	labelKey?: string;
	onSearchCallback?: (searchingNameString: string) => void;
	minLength?: number;
	defaultInputValue?: string;
	mapOption?: (
		options: NonNullable<
			VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications']
		>[number]
	) => T;
	alreadyUsedSpecificationIds?: string[];
}

const AutocompleteSpecificationValues = <T extends AutocompleteOptionBase>({
	name,
	identifier,
	specificationId,
	mapOption,
	alreadyUsedSpecificationIds = [],
	...props
}: InputAutocompleteAsyncProps<T>) => {
	const {
		autocompleteOptions: specificationValuesAutocompleteOptions,
		handleOnSearch: handleOnSpecificationValuesSearch,
		isLoading: isSpecificationValuesIsLoading,
	} = useAutocompleteSpecificationValues<T>({
		specificationId,
		alreadyUsedSpecificationIds: alreadyUsedSpecificationIds,
		mapOption,
	});

	// Resolve label for initial raw string values so the input shows a pretty label on edit
	const {
		input: { value: fieldValue },
	} = useField(name);
	const [resolvedDefaultInputValue, setResolvedDefaultInputValue] = useState<
		string | undefined
	>(undefined);

	const {
		data: allowedValuesData,
		isFetching: isAllowedValuesLoading,
		isError: isAllowedValuesError,
	} = useQuery({
		queryKey: [
			'specificationAllowedValues',
			specificationId,
			fieldValue ?? null,
		],
		queryFn: async () =>
			SpecificationService.getSpecificationAllowedValues({
				specificationId,
				SearchUrl: fieldValue as string,
			}),
		enabled:
			!props.defaultInputValue &&
			typeof fieldValue === 'string' &&
			!!fieldValue,
		staleTime: 5 * 60 * 1000,
	});

	useEffect(() => {
		// If parent supplied defaultInputValue, prefer it and skip resolution
		if (props.defaultInputValue) {
			setResolvedDefaultInputValue(props.defaultInputValue);
			return;
		}

		// After the first selection, value is no longer a string (it's e.g. an array of objects from typeahead),
		// in that case we leave resolvedDefaultInputValue as is
		// and let the AsyncTypeahead component control the input state itself.
		if (typeof fieldValue !== 'string') {
			return;
		}

		// If the value is an empty string, reset the default label.
		if (!fieldValue) {
			setResolvedDefaultInputValue(undefined);
			return;
		}

		if (!allowedValuesData || isAllowedValuesLoading || isAllowedValuesError) {
			setResolvedDefaultInputValue(fieldValue);
			return;
		}

		const allowed = allowedValuesData?.allowedValues ?? [];
		const match = allowed.find(
			(option) => option?.url === fieldValue || option?.value === fieldValue
		);

		if (match) {
			// Use mapped label if mapper provided; otherwise prefer option.value
			if (typeof mapOption === 'function') {
				const mapped = mapOption(
					match as NonNullable<
						VinistoProductDllModelsApiSpecificationSpecificationsReturn['specifications']
					>[number]
				);
				setResolvedDefaultInputValue(
					String(mapped?.label ?? match.value ?? fieldValue)
				);
			} else {
				setResolvedDefaultInputValue(String(match.value ?? fieldValue));
			}
		} else {
			setResolvedDefaultInputValue(fieldValue);
		}
	}, [
		fieldValue,
		mapOption,
		props.defaultInputValue,
		allowedValuesData,
		isAllowedValuesLoading,
		isAllowedValuesError,
	]);

	const mergedDefaultInputValue = useMemo(
		() => props.defaultInputValue ?? resolvedDefaultInputValue,
		[props.defaultInputValue, resolvedDefaultInputValue]
	);

	// Force re-mount of AsyncTypeahead once we resolve the label so it shows the text
	const [typeaheadKey, setTypeaheadKey] = useState<string>(() => uniqueId());
	useEffect(() => {
		setTypeaheadKey(uniqueId());
	}, [mergedDefaultInputValue]);

	return (
		<div className="mb-3">
			<InputAutocompleteAsync
				key={typeaheadKey}
				options={specificationValuesAutocompleteOptions}
				name={name}
				identifier={identifier}
				onSearchCallback={handleOnSpecificationValuesSearch}
				isLoading={isSpecificationValuesIsLoading || isAllowedValuesLoading}
				className="w-100"
				{...props}
				defaultInputValue={mergedDefaultInputValue}
			/>
		</div>
	);
};

export default AutocompleteSpecificationValues;
