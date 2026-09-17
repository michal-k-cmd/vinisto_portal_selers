import { useContext } from 'react';
import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';
import { Supplier } from 'Pages/UserDetail/Components/SupplierList/types';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';

const AddSupplierToUserModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);

	const { suppliers, refreshSuppliers } = useSuppliers();

	const mapSuppliersToAutocompleteOptions = (suppliers: Supplier[]) => {
		return suppliers
			.sort(sortSuppliersByNameWeb)
			.filter((supplier: Supplier) => !supplier.userIds.includes(data?.userId))
			.map((supplier: Supplier) => {
				return {
					value: supplier.id,
					label: supplier.nameWeb,
				};
			});
	};

	const handleOnAddSupplierToUser = (formValues: {
		supplier: Array<{ value: string; label: string }>;
	}) => {
		const { value: supplierId } = formValues.supplier[0];

		data?.addSupplierToUserMutation.mutate(supplierId);

		handleCloseModal();
		refreshSuppliers();
	};

	return (
		<div>
			<Form
				submitCallback={handleOnAddSupplierToUser}
				submitText={'admin.detail.actionButtons.supplier.label'}
			>
				<InputAutocomplete
					options={mapSuppliersToAutocompleteOptions(suppliers)}
					label="admin.modal.addSupplierToUser.autocomplete.label"
					placeholder="admin.modal.addSupplierToUser.autocomplete.placeholder"
					labelKey={'label'}
					name="supplier"
					identifier="supplier"
					validate={Validators.required}
				/>
			</Form>
		</div>
	);
};

export default AddSupplierToUserModal;
