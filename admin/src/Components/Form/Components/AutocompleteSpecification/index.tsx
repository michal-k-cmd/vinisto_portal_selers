import InputAutocompleteAsync from 'Components/Form/Components/AutocompleteAsync';
import { FormControlProps } from 'Components/Form/interfaces';
import useAutocompleteSpecifications from 'Hooks/useAutocompleteSpecifications';

import { AutocompleteOptionBase } from '../AutocompleteAsync/interfaces';

import { VinistoProductDllModelsApiSpecificationSpecificationsReturn } from '@/api-types/product-api';

export interface InputAutocompleteAsyncProps<T extends AutocompleteOptionBase>
	extends FormControlProps<T[]> {
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

const AutocompleteSpecification = <T extends AutocompleteOptionBase>({
	name,
	identifier,
	mapOption,
	alreadyUsedSpecificationIds = [],
	...props
}: InputAutocompleteAsyncProps<T>) => {
	const {
		autocompleteOptions: specificationAutocompleteOptions,
		handleOnSearch: handleOnSpecificationSearch,
	} = useAutocompleteSpecifications<T>({
		alreadyUsedSpecificationIds: alreadyUsedSpecificationIds,
		mapOption,
	});

	return (
		<div className="mb-3">
			<InputAutocompleteAsync
				options={specificationAutocompleteOptions}
				name={name}
				identifier={identifier}
				onSearchCallback={handleOnSpecificationSearch}
				className="w-100"
				{...props}
			/>
		</div>
	);
};

export default AutocompleteSpecification;
