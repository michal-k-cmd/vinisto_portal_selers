import { useField } from 'react-final-form';
import { head } from 'Helpers/lodash';
import { InputAutocompleteAsync, Validators } from 'Components/Form';
import useAddonCategoryAutocomplete from 'Hooks/useAddonCategoryAutocomplete';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { useQuery } from '@tanstack/react-query';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import { ConditionRequest } from '@/api-types/addons-api';
import api from '@/api';
import { ProductApi } from '@/api-types/product-api';

interface ItemCategoryProps {
	name: string;
	initialConditions: ConditionRequest;
}

const ItemCategory = ({ name, initialConditions }: ItemCategoryProps) => {
	const { input } = useField(name, {
		subscription: { value: true },
	});

	const {
		autocompleteOptions: categoryAutocompleteOptions,
		handleOnSearch: handleOnCategorySearch,
	} = useAddonCategoryAutocomplete();

	const categoryInitialValue = initialConditions?.itemCategoryConditionRequest;

	const { data: initialCategory } = useQuery({
		queryKey: ['category', categoryInitialValue?.itemCategoryId],
		queryFn: () => {
			return api.get<ProductApi.CategoriesDetail.ResponseBody>(
				`product-api/categories/${categoryInitialValue?.itemCategoryId}`
			);
		},
		enabled: !!categoryInitialValue?.itemCategoryId,
	});

	const getLocalizedValue = useLocalizedValue();

	return (
		<InputAutocompleteAsync
			options={categoryAutocompleteOptions}
			defaultInputValue={getLocalizedValue(initialCategory?.category?.name)}
			label="form.input.category.label"
			placeholder="form.input.category.placeholder"
			name={name}
			identifier={name}
			validate={Validators.required}
			onChange={(selectedCategories: AutocompleteOption[]) => {
				const categoryId = head(selectedCategories)?.value;
				if (categoryId) {
					input.onChange({ itemCategoryId: categoryId });
				} else {
					input.onChange(null);
				}
			}}
			onSearchCallback={handleOnCategorySearch}
		/>
	);
};

export default ItemCategory;
