import { useForm } from 'react-final-form';
import { get, head } from 'Helpers/lodash';
import { InputNumber, Validators } from 'Components/Form';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import useBundleById from 'Hooks/Queries/useBundleById';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';

import { ConditionRequest } from '@/api-types/addons-api';

interface ItemQuantityProps {
	name: string;
	initialConditions: ConditionRequest;
}

const ItemQuantity = ({ name, initialConditions }: ItemQuantityProps) => {
	const form = useForm();
	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({});

	const handleProductChange = (selectedItems: AutocompleteOption[]) => {
		const itemId = head(selectedItems)?.value;
		form.change(`${name}.itemId`, itemId);

		const quantityPath = `${name}.minItemQuantity`;
		const currentQuantity = get(form.getState().values, quantityPath);

		if (itemId && (currentQuantity === undefined || currentQuantity === null)) {
			form.change(quantityPath as any, 1);
		} else if (!itemId) {
			form.change(quantityPath as any, undefined);
		}
	};

	const { data: initialBundle } = useBundleById({
		bundleId: initialConditions?.itemQuantityConditionRequest?.itemId ?? '',
	});

	const getLocalizedValue = useLocalizedValue();

	return (
		<div className="d-flex flex-column gap-3">
			<AutocompleteBundle
				options={autocompleteOptions}
				defaultInputValue={getLocalizedValue(initialBundle?.name)}
				label="bundle"
				placeholder="admin.modal.form.findBundle"
				name={`${name}.itemId`}
				identifier={`${name}.itemId`}
				validate={Validators.required}
				onSearchCallback={handleOnSearch}
				onChange={handleProductChange}
			/>
			<InputNumber
				name={`${name}.minItemQuantity`}
				identifier={`${name}.minItemQuantity`}
				label="admin.modal.form.amount"
				validate={Validators.required}
			/>
		</div>
	);
};

export default ItemQuantity;
