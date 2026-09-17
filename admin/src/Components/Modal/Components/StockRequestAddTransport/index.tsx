import { useContext, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import {
	Delivery,
	DeliveryListQueryArgument,
} from 'Services/OrderService/interfaces';
import DeliveryService from 'Services/OrderService/Delivery';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import { VinistoHelperDllEnumsOrderDeliveryBaseType } from 'vinisto_api_client/src/api-types/supplier-api/';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { ModalContext } from 'Components/Modal/context';
import { Input, InputAutocomplete, Validators } from 'Components/Form';

import {
	StockRequestAddTransportFormValues,
	StockRequestAddTransportModalData,
} from './interfaces';

const StockRequestAddTransportModal = () => {
	const modalContext = useContext(ModalContext);
	const { setRefetchKey, stockRequestId, delivery, trackingNumber } =
		modalContext.data as StockRequestAddTransportModalData;

	const notificationsContext = useContext(NotificationsContext);

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [deliveries, setDeliveries] = useState<Delivery[]>([]);

	const getLocalizedValue = useLocalizedValue();

	useEffect(() => {
		const params: DeliveryListQueryArgument[] = [
			{
				key: 'IsForStocking',
				value: true,
			},
		];

		DeliveryService.getAll(params)
			.then((data) => {
				setDeliveries(data);
			})
			.catch(() =>
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestAddTransport.error'
				)
			);
	}, [notificationsContext]);

	const isEdit = Boolean(delivery && trackingNumber);

	const initialValues = isEdit
		? {
				transportType: [
					{
						label: getLocalizedValue(delivery?.name ?? []),
						value: delivery?.id,
					},
				],
				trackingNumber,
		  }
		: {};

	const handleSubmit = (formValues: StockRequestAddTransportFormValues) => {
		StockingRequestService.delivery(stockRequestId, {
			userLoginHash: loginHash,
			//@ts-expect-error inteface isn't correct, it can be extended but has to be checked in multiple places after
			deliveryId: formValues.transportType[0].value,
			trackingNumber: formValues.trackingNumber,
		})
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.stockRequestAddTransport.success'
				);
				setRefetchKey((prev) => prev + 1);
				modalContext.handleCloseModal();
			})
			.catch(() =>
				notificationsContext.handleShowErrorNotification(
					'admin.stockRequestAddTransport.error'
				)
			);
	};

	return (
		<div className="d-flex flex-row gap-2">
			<Form
				onSubmit={handleSubmit}
				initialValues={initialValues}
			>
				{({ handleSubmit, pristine, values }) => {
					const selectedDelivery =
						values.transportType && values.transportType[0]
							? deliveries.find(
									(delivery) =>
										values.transportType &&
										delivery.id === values.transportType[0].value
							  )
							: null;

					const showTrackingNumberInput =
						selectedDelivery &&
						selectedDelivery.deliveryBaseType !==
							VinistoHelperDllEnumsOrderDeliveryBaseType.OWN_DELIVERY;

					return (
						<form
							onSubmit={handleSubmit}
							className="align-self-start"
						>
							<InputAutocomplete
								options={deliveries.map((delivery) => ({
									label: getLocalizedValue(delivery.name ?? []),
									value: delivery.id,
									deliveryBaseType: delivery.deliveryBaseType,
								}))}
								name="transportType"
								identifier="transportType"
								placeholder="admin.modal.stockRequestAddTransport.transportType.placeholder"
								label="admin.modal.stockRequestAddTransport.transportType.label"
								validate={Validators.required}
							/>
							{showTrackingNumberInput && (
								<Input
									name="trackingNumber"
									identifier="trackingNumber"
									placeholder="admin.modal.stockRequestAddTransport.trackingNumber.placeholder"
									label="admin.modal.stockRequestAddTransport.trackingNumber.label"
									validate={Validators.required}
								/>
							)}
							<div className="d-flex flex-row gap-4">
								<Button
									type="button"
									onClick={() => modalContext.handleCloseModal()}
								>
									{t({ id: 'admin.modal.stockRequestAddTransport.cancel' })}
								</Button>
								<Button
									type="submit"
									disabled={pristine}
								>
									{t({ id: 'admin.modal.stockRequestAddTransport.confirm' })}
								</Button>
							</div>
						</form>
					);
				}}
			</Form>
		</div>
	);
};

export default StockRequestAddTransportModal;
