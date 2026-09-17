import { useContext } from 'react';
import useSuppliers from 'Pages/UserDetail/Components/SupplierList/useSuppliers';
import { Supplier } from 'Pages/UserDetail/Components/SupplierList/types';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import sortSuppliersByNameWeb from 'Helpers/sortSuppliersByNameWeb';
import ApiService from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useRevalidator } from 'react-router-dom';

const AddSellerToCategoryModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);

	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const categoryId = data?.categoryId;
	const { suppliers } = useSuppliers();
	const revalidator = useRevalidator();

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

	const handleOnAddSellerToCategory = (formValues: {
		supplier: Array<{ value: string; label: string }>;
	}) => {
		const { value: supplierId } = formValues.supplier[0];

		const apiService = new ApiService();
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
		};
		apiService
			.post(
				`product-api/categories/${categoryId}/suppliers/${supplierId}`,
				requestData,
				true
			)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.addSellerToCategory.success'
				);
				revalidator.revalidate();
				handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.addSellerToCategory.error'
				);
			});
	};

	return (
		<div>
			<Form
				submitCallback={handleOnAddSellerToCategory}
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

export default AddSellerToCategoryModal;
