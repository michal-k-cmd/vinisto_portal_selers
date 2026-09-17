import { useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { CURRENCIES } from 'Components/Form/Components/CurrencySelect/constants';
import { VATS } from 'Components/Form/Components/VatSelect/constants';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { CurrencySelect, Form, InputNumber, VatSelect } from 'Components/Form';
import { useQueryClient } from '@tanstack/react-query';

const AddPriceToProductModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const product = modalContext.data?.product;
	const productPrice = product?.prices[0];

	const queryClient = useQueryClient();

	const handleOnAddPriceToProduct = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};
			apiServiceInstance
				.post(
					`product-api/products/${get(modalContext, 'data.product.id')}/prices`,
					requestData,
					true
				)
				.then(async () => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addPriceToProduct.success'
					);
					await queryClient.invalidateQueries([
						'productDetail',
						modalContext?.data?.product.id,
					]);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addPriceToProduct.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			queryClient,
		]
	);

	return (
		<Form
			submitCallback={handleOnAddPriceToProduct}
			submitText={'admin.modal.addPriceToProduct'}
			initializationValues={{
				price: productPrice?.value ?? 0,
				currency: CURRENCIES[0].value,
				vat: VATS[0].value,
			}}
		>
			<CurrencySelect
				name="currency"
				identifier="currency"
				label="admin.modal.form.currency"
			/>
			<VatSelect
				name="vat"
				identifier="vat"
				label="admin.modal.form.vat"
			/>
			<InputNumber
				name="price"
				identifier="price"
				label="admin.modal.form.price"
			/>
		</Form>
	);
};

export default AddPriceToProductModal;
