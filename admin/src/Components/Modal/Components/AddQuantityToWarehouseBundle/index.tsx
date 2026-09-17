import { FC, useCallback, useContext, useMemo } from 'react';
import { get } from 'Helpers/lodash';
import ApiService from 'Services/ApiService';
import { LocalizationContext } from 'Services/LocalizationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { ModalContext } from 'Components/Modal/context';
import { Form, InputNumber, InputSelect, Validators } from 'Components/Form';
import { AddQuantityReasons } from 'Pages/WarehouseItemDetail/constants';

const AddQuantityToWarehouseBundle: FC = () => {
	const modalContext = useContext(ModalContext);
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const options = useMemo(
		() =>
			AddQuantityReasons.map((option) => ({
				value: option.value,
				label: t({ id: option.label })?.toString(),
			})),
		[t]
	);

	const handleOnSubmit = useCallback(
		(formValues: Record<any, any>) => {
			const apiService = new ApiService();
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
			};

			const bundleId = get(modalContext, 'data.bundleState.bundleId', null);

			apiService
				.put(
					`warehouse-api/warehouse/bundles/${bundleId}/AddQuantityToWarehouseItem`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.addQuantityToWarehouseBundle.success'
					);
					const setBundleState = get(modalContext, 'data.setBundleState');
					setBundleState(() => ({
						loading: false,
						loaded: false,
						warehouseItem: {},
						error: null,
					}));
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addQuantityToWarehouseBundle.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnSubmit}
			submitText="admin.modal.addQuantityToWarehouseBundle.submit"
			initializationValues={{
				quantity: 0,
				changeReason: AddQuantityReasons[0].value,
			}}
		>
			<InputNumber
				name="quantity"
				identifier="quantity"
				label="admin.modal.form.quantity"
				validate={[Validators.required]}
			/>
			<InputSelect
				name="changeReason"
				identifier="changeReason"
				label="admin.warehouseItemDetail.form.changeReason"
				options={options}
				validate={[Validators.required]}
			/>
		</Form>
	);
};
export default AddQuantityToWarehouseBundle;
