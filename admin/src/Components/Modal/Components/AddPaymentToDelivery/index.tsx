import { FC, useCallback, useContext, useState } from 'react';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { Form, InputAutocompleteAsync, Validators } from 'Components/Form';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import {
	VinistoOrderDllModelsApiPaymentPayment,
	VinistoOrderDllModelsApiReturnDataPaymentsReturn,
} from 'vinisto_api_client/src/api-types/order-api/';

import { ModalContext } from '../../context';

const AddPaymentToDeliveryModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const [autocompleteOptions, setAutocompleteOptions] = useState<
		AutocompleteOption[]
	>([]);
	const getLocalizedValue = useLocalizedValue();

	const handleOnAddAlternativeBundleToBundle = useCallback(
		(formValues: any) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
			};
			const deliveryId = formValues.deliveryName[0].value;
			apiServiceInstance
				.post(
					`order-api/deliveries/${modalContext?.data?.deliveryDetailState.deliveryDetailData.id}/payments/${deliveryId}`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addPaymentToDelivery.success'
					);
					const setDeliveryDetailState =
						modalContext.data?.setDeliveryDetailState;
					setDeliveryDetailState((deliveryState: any) => ({
						...deliveryState,
						loaded: false,
					}));
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addPaymentToDelivery.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
		]
	);

	const handleOnSearch = useCallback(
		(name: string) => {
			apiServiceInstance
				.getCollection<VinistoOrderDllModelsApiReturnDataPaymentsReturn>(
					`order-api/payments/GetAutocompleteNames`,
					[
						{
							key: 'Name',
							value: name,
						},
						{
							key: 'limit',
							value: 1000,
						},
					],
					true
				)
				.then((response) => {
					const alreadyUserPaymentMethods =
						modalContext?.data?.deliveryDetailState?.deliveryDetailData?.payments?.map(
							(payment: VinistoOrderDllModelsApiPaymentPayment) => payment?.id
						);
					const searchOptions = [
						...(response.payments
							?.filter(
								(payment) => !alreadyUserPaymentMethods?.includes(payment?.id)
							)
							?.map((payment) => ({
								value: payment?.id ?? '',
								label: getLocalizedValue(payment.name ?? []),
							})) ?? []),
					];

					setAutocompleteOptions(searchOptions);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addPaymentToDelivery.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[
			getLocalizedValue,
			modalContext?.data?.deliveryDetailState?.deliveryDetailData?.payments,
			notificationsContext,
		]
	);

	return (
		<Form
			submitCallback={handleOnAddAlternativeBundleToBundle}
			submitText={'admin.modal.addPaymentToDelivery'}
		>
			<InputAutocompleteAsync
				placeholder="admin.modal.addPaymentToDelivery.autocomplete.placeholder"
				labelKey={'label'}
				name="deliveryName"
				identifier="deliveryName"
				onSearchCallback={handleOnSearch}
				options={autocompleteOptions}
				validate={[Validators.required]}
			/>
		</Form>
	);
};

export default AddPaymentToDeliveryModal;
