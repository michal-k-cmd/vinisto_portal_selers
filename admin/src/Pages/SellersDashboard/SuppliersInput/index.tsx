import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';
import { Supplier } from 'Pages/UserDetail/Components/SupplierList/types';
import { Form, InputAutocomplete } from 'Components/Form';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';

interface SuppliersInputProps {
	setSupplierId: (supplierId: string | null) => void;
	className?: string;
}

const SuppliersInput = ({ setSupplierId, className }: SuppliersInputProps) => {
	const { suppliers } = useSuppliers();

	const mapSuppliersToAutocompleteOptions = (suppliers: Supplier[]) => {
		return suppliers.sort(sortSuppliersByNameWeb).map((supplier: Supplier) => {
			return {
				value: supplier.id,
				label: supplier.nameWeb,
			};
		});
	};

	return (
		<div className={className}>
			<Form submitCallback={() => {}}>
				<InputAutocomplete
					options={mapSuppliersToAutocompleteOptions(suppliers)}
					label="admin.modal.addSupplierToUser.autocomplete.label"
					placeholder="admin.modal.addSupplierToUser.autocomplete.placeholder"
					labelKey={'label'}
					name="supplier"
					identifier="supplier"
					onChange={(value) => {
						setSupplierId(value[0] ? value[0].value : null);
					}}
				/>
			</Form>
		</div>
	);
};

export default SuppliersInput;
