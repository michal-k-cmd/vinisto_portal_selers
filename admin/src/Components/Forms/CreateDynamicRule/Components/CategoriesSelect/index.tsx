import { FormControlProps } from 'Components/Form/interfaces';
import { FieldArray } from 'react-final-form-arrays';
import useAutocompleteCategories from 'Hooks/useAutocompleteCategories';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import InputAutocompleteAsync from 'Components/Form/Components/AutocompleteAsync';

const CategoriesSelect = <FormValues,>({
	name,
	identifier,
	// formValues,
	displayValues = [],
}: FormControlProps & {
	formValues: FormValues;
	displayValues?: string[] | null;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const {
		autocompleteOptions: categoryAutocompleteOptions,
		handleOnSearch: handleOnCategorySearch,
	} = useAutocompleteCategories({});

	return (
		<FieldArray name={name}>
			{({ fields }) => (
				<div className="mb-3">
					{fields.map((name, index) => (
						<div
							key={name}
							className="d-flex items-center gap-3"
						>
							<InputAutocompleteAsync
								defaultInputValue={displayValues?.[index]}
								options={categoryAutocompleteOptions}
								label="modal.createDynamicRules.category"
								placeholder="search.category.singular"
								name={name}
								identifier={identifier}
								onSearchCallback={handleOnCategorySearch}
								className="w-100"
								onChange={(value) => {
									fields.update(index, value[0].value);
								}}
							/>

							<button
								type="button"
								style={{
									all: 'unset',
								}}
								onClick={() => {
									fields.remove(index);
								}}
							>
								<DeleteIcon
									style={{
										width: '1rem',
										height: '1rem',
									}}
								/>
							</button>
						</div>
					))}
					{fields.length === 0 && (
						<button
							type="button"
							style={{
								padding: 0,
								backgroundColor: 'transparent',
								border: 'none',
								textDecoration: 'underline',
							}}
							onClick={() => fields.push('')}

							// disabled={fields.length === 0 ? false : !formValues[name]?.at(-1)}
						>
							{t({ id: 'dynamicSellingRule.selectCategory' })}
						</button>
					)}
				</div>
			)}
		</FieldArray>
	);
};

export default CategoriesSelect;
