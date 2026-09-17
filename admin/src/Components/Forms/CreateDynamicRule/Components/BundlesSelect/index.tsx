import { FormControlProps } from 'Components/Form/interfaces';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { useCallback, useContext } from 'react';
import { FieldArray } from 'react-final-form-arrays';
import { LocalizationContext } from 'Services/LocalizationService';
import DeleteIcon from 'Components/Icons/Delete';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';

const BundlesSelect = <FormValues,>({
	name,
	identifier,
	// formValues,
	displayValues = [],
}: FormControlProps & {
	name: keyof FormValues;
	formValues: FormValues;
	displayValues?: string[] | null;
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({});

	const renderOption = useCallback((option: AutocompleteBundleOption) => {
		return (
			<BundleOption
				bundle={option?.bundle}
				label={option?.label}
			/>
		);
	}, []);

	return (
		<FieldArray name={name}>
			{({ fields }) => (
				<div className="mb-3">
					{fields.map((name, index) => (
						<div
							key={name}
							className="d-flex items-center gap-3"
						>
							<AutocompleteBundle
								defaultInputValue={displayValues?.[index]}
								label="admin.sideBar.bundleList"
								placeholder="admin.modal.form.findBundle"
								labelKey="label"
								name={name}
								identifier={identifier}
								onSearchCallback={(val) => {
									handleOnSearch(val, {
										isSet: false,
									});
								}}
								options={autocompleteOptions}
								renderOption={renderOption}
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
							//disabled={fields.length === 0 ? false : !formValues[name]?.at(-1)}
						>
							{t({ id: 'dynamicSellingRule.selectBundle' })}
						</button>
					)}
				</div>
			)}
		</FieldArray>
	);
};

export default BundlesSelect;
