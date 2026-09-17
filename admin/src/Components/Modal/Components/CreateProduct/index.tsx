import { FC, useCallback, useContext } from 'react';
import { invoke } from 'Helpers/lodash';
import { useNavigate } from 'react-router-dom';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Form,
	Input,
	InputTextArea,
	LanguageSelect,
	Validators,
} from 'Components/Form';

/**
 * @category Component Create Product Modal Content
 */
const CreateProductModal: FC = () => {
	const navigate = useNavigate();
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);

	const handleOnCreateProduct = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			apiServiceInstance
				.post('product-api/products', requestData, true)
				.then((payload: Record<any, any>) => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createProduct.success'
					);
					if (payload?.product?.id) {
						navigate(`/product-detail/${payload?.product?.id}`);
					} else {
						invoke(modalContext, 'data.resetProductList');
					}
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createProduct.error'
					);
				});
		},

		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnCreateProduct}
			submitText={'admin.modal.form.createProduct'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled={true}
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="name"
				identifier="name"
				label="admin.modal.form.naming"
				placeholder="admin.modal.form.naming"
				validate={Validators.required}
			/>

			<InputTextArea
				name="description"
				identifier="description"
				label="admin.modal.form.description"
				placeholder="admin.modal.form.description"
				validate={Validators.required}
			/>

			<InputTextArea
				name="text"
				identifier="text"
				label="admin.modal.form.text"
				placeholder="admin.modal.form.text"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="url"
				identifier="url"
				label="admin.modal.form.url"
				placeholder="admin.modal.form.url"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="warehouseId"
				identifier="warehouseId"
				label="admin.modal.form.warehouseId"
				placeholder="admin.modal.form.warehouseId"
				validate={Validators.required}
			/>

			<Input
				type="text"
				name="ean"
				identifier="ean"
				label="admin.modal.form.EAN"
				placeholder="admin.modal.form.EAN"
			/>
		</Form>
	);
};
export default CreateProductModal;
