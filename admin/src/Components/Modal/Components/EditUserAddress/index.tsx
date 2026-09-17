import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import ShippingAddressForm from 'Components/Forms/ShippingAddress';
import { VinistoAuthDllModelsApiAddressUserAddressEditParameters } from 'vinisto_api_client/src/api-types/user-api/';

const EditUserAddressModal = () => {
	const { handleCloseModal, data } = useContext(ModalContext);
	const { updateUserAddressMutation, userAddress } = data ?? {};

	const handleOnEdit = (
		formValues: VinistoAuthDllModelsApiAddressUserAddressEditParameters
	) => {
		updateUserAddressMutation.mutate({
			addressId: userAddress.id,
			request: formValues,
		});
		handleCloseModal();
	};

	return (
		<ShippingAddressForm
			handleSubmit={handleOnEdit}
			initialValues={userAddress ?? {}}
		/>
	);
};

export default EditUserAddressModal;
