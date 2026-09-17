import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import OrderAddresses from 'Components/Forms/OrderAddresses';
import { OrderAddressModalData } from 'Components/Forms/interfaces';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { VinistoOrderDllModelsApiOrderOrderEditAddressesParameters } from 'vinisto_api_client/src/api-types/order-api/';

const OrderAddressModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const loginHash = authenticationContext.vinistoUser.loginHash;

	const modalContext = useContext(ModalContext);

	const transferData = modalContext.data as OrderAddressModalData;

	const handleSubmit = (formValues: Record<any, any>) => {
		const requestParams: VinistoOrderDllModelsApiOrderOrderEditAddressesParameters =
			{
				userLoginHash: loginHash,
				billingAddress: formValues.billingAddress,
				deliveryAddress: formValues.shippingAddress,
				isSendInfoEmailRequested: formValues.isSendEmail,
			};

		transferData.handleEditAddressesInOrder(requestParams);
		modalContext.handleCloseModal();
	};

	return (
		<OrderAddresses
			initialValues={transferData}
			handleSubmit={handleSubmit}
		/>
	);
};

export default OrderAddressModal;
