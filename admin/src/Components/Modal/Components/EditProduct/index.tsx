import { FC, useCallback, useContext } from 'react';
import { get } from 'Helpers/lodash';
import { LANGUAGES } from 'Components/Form/Components/LanguageSelect/constants';
import useLocalizedValue from 'Hooks/useLocalizedValue';
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
import { useQueryClient } from '@tanstack/react-query';

import { VinistoProductDllModelsApiProductProductReturn } from '@/api-types/product-api';

/**
 * @category Component Edit Product Modal Content
 */
const EditProductModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const notificationsContext = useContext(NotificationsContext);

	const getLocalizedValue = useLocalizedValue();

	const queryClient = useQueryClient();

	const product = modalContext.data?.product;

	const handleOnEditProduct = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.put<VinistoProductDllModelsApiProductProductReturn>(
					`product-api/products/${get(product, 'id')}/EditProduct`,
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						language: get(formValues, 'language', LANGUAGES[0].value),
						name: get(formValues, 'name', ''),
						description: get(formValues, 'description', ''),
						text: get(formValues, 'text', ''),
						url: get(formValues, 'url', ''),
						warehouseId: get(formValues, 'warehouseId', ''),
						ean: get(formValues, 'ean', ''),
					},
					true
				)
				.then(async () => {
					await queryClient.invalidateQueries(['productDetail', product?.id]);
					notificationsContext.handleShowSuccessNotification(
						'admin.editProduct.success'
					);

					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editProduct.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnEditProduct}
			submitText={'admin.modal.form.editProduct'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				text: getLocalizedValue(get(product, 'text', [])),
				name: getLocalizedValue(get(product, 'name', [])),
				url: getLocalizedValue(get(product, 'url', [])),
				description: getLocalizedValue(get(product, 'description', [])),
				warehouseId: get(product, 'warehouseId', ''),
				ean: get(product, 'ean', ''),
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
				label="admin.modal.form.name"
				placeholder="admin.modal.form.name"
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

export default EditProductModal;
