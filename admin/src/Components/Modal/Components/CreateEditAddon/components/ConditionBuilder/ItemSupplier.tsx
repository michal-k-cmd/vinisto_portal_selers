import { useContext } from 'react';
import { useField } from 'react-final-form';
import { head } from 'Helpers/lodash';
import { InputAutocompleteAsync, Validators } from 'Components/Form';
import useAutocompleteSuppliers from 'Hooks/useAutocompleteSuppliers';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { useQuery } from '@tanstack/react-query';

import { ConditionRequest } from '@/api-types/addons-api';
import { SupplierApi } from '@/api-types/supplier-api';
import api from '@/api';

interface ItemSupplierProps {
	name: string;
	initialConditions: ConditionRequest;
}

const ItemSupplier = ({ name, initialConditions }: ItemSupplierProps) => {
	const { input } = useField(name, {
		subscription: { value: true },
	});

	const {
		autocompleteOptions: supplierAutocompleteOptions,
		handleOnSearch: handleOnSupplierSearch,
	} = useAutocompleteSuppliers({
		alreadyUsedSupplierIds: input.value?.itemSupplierId
			? [input.value.itemSupplierId]
			: [],
	});

	const authenticationContext = useContext(AuthenticationContext);

	const { data: initialSupplier } = useQuery({
		queryKey: [
			'supplier',
			initialConditions?.itemSupplierConditionRequest?.itemSupplierId,
		],
		queryFn: () => {
			return api.get<
				SupplierApi.SuppliersDetail.ResponseBody,
				SupplierApi.SuppliersDetail.RequestQuery
			>(
				`supplier-api/suppliers/${initialConditions?.itemSupplierConditionRequest?.itemSupplierId}`,
				{
					UserLoginHash: authenticationContext.vinistoUser.loginHash,
				}
			);
		},
		enabled: !!initialConditions?.itemSupplierConditionRequest?.itemSupplierId,
	});

	return (
		<InputAutocompleteAsync
			options={supplierAutocompleteOptions}
			label="admin.modal.form.supplier"
			placeholder="admin.modal.form.findSupplier"
			defaultInputValue={initialSupplier?.supplier?.nameWeb}
			name={name}
			identifier={name}
			validate={Validators.required}
			onChange={(selectedSuppliers: AutocompleteOption[]) => {
				const supplierId = head(selectedSuppliers)?.value;
				if (supplierId) {
					input.onChange({ itemSupplierId: supplierId });
				} else {
					input.onChange(null);
				}
			}}
			onSearchCallback={handleOnSupplierSearch}
		/>
	);
};

export default ItemSupplier;
