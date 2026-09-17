import useAutocompleteCategories from 'Hooks/useAutocompleteCategories';
import InputAutocompleteAsync from 'Components/Form/Components/AutocompleteAsync';
import { FormControlProps } from 'Components/Form/interfaces';

import { AutocompleteOptionBase } from '../AutocompleteAsync/interfaces';

import { VinistoProductDllModelsApiCategoryCategory } from '@/api-types/product-api';

export interface InputAutocompleteAsyncProps<T extends AutocompleteOptionBase>
	extends FormControlProps<T[]> {
	labelKey?: string;
	onSearchCallback?: (searchingNameString: string) => void;
	minLength?: number;
	defaultInputValue?: string;
	mapOption?: (options: VinistoProductDllModelsApiCategoryCategory) => T;
	alreadyUsedCategoryIds?: string[];
}

const AutocompleteCategory = <T extends AutocompleteOptionBase>({
	name,
	identifier,
	mapOption,
	alreadyUsedCategoryIds = [],
	...props
}: InputAutocompleteAsyncProps<T>) => {
	const {
		autocompleteOptions: categoryAutocompleteOptions,
		handleOnSearch: handleOnCategorySearch,
	} = useAutocompleteCategories<T>({
		alreadyUsedCategoryIds: alreadyUsedCategoryIds,
		mapOption,
	});

	return (
		<div className="mb-3">
			<InputAutocompleteAsync
				options={categoryAutocompleteOptions}
				name={name}
				identifier={identifier}
				onSearchCallback={handleOnCategorySearch}
				className="w-100"
				{...props}
			/>
		</div>
	);
};

export default AutocompleteCategory;
