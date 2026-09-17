import { useContext } from 'react';
import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { CForm } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import { ModalContext } from 'Components/Modal/context';
import { InputDatePicker, InputSelect } from 'Components/Form';
import { required } from 'Components/Form/validators';
import { VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters } from 'vinisto_api_client/src/api-types/supplier-api/';

import { TIME_SLOT_OPTIONS } from './constants';
import {
	ConfirmStockRequestForSupplierFormValues,
	ConfirmStockRequestForSupplierModalData,
} from './interfaces';

const ConfirmStockRequestForSupplierModal = () => {
	const notificationsContext = useContext(NotificationsContext);

	const modalContext = useContext(ModalContext);
	const { stockRequestId, setRefetchKey } =
		modalContext.data as ConfirmStockRequestForSupplierModalData;

	const authenticationContext = useContext(AuthenticationContext);
	const { loginHash } = authenticationContext.vinistoUser;

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleSubmit = (
		formValues: ConfirmStockRequestForSupplierFormValues
	) => {
		const request: VinistoStockingRequestDllModelsApiStockingRequestStockingRequestConfirmParameters =
			{
				userLoginHash: loginHash,
				deliveryDate: Math.ceil(formValues.deliveryDate.getTime() / 1000),
				deliveryTime: formValues.deliveryTime,
			};

		StockingRequestService.confirm(stockRequestId ?? '', request)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.confirmStockRequestForSupplier.success'
				);
				setRefetchKey((prev) => prev + 1);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.confirmStockRequestForSupplier.error'
				);
			});

		modalContext.handleCloseModal();
	};

	return (
		<div className="d-flex flex-row gap-2">
			<Form onSubmit={handleSubmit}>
				{({ handleSubmit, pristine }) => (
					<CForm
						onSubmit={handleSubmit}
						className="align-self-start"
					>
						<InputDatePicker
							name="deliveryDate"
							identifier="deliveryDate"
							placeholder="admin.modal.confirmStockRequestForSupplier.lockDate.placeholder"
							label="admin.modal.confirmStockRequestForSupplier.lockDate.label"
							validate={required}
						/>
						<InputSelect
							name="deliveryTime"
							identifier="deliveryTime"
							label="admin.modal.confirmStockRequestForSupplier.lockTime.label"
							validate={required}
							options={TIME_SLOT_OPTIONS}
						/>
						<div className="d-flex flex-row gap-4">
							<Button
								type="button"
								onClick={modalContext.handleCloseModal}
							>
								{t({ id: 'admin.confirmStockRequestForSupplier.cancel' })}
							</Button>
							<Button
								type="submit"
								disabled={pristine}
							>
								{t({ id: 'admin.confirmStockRequestForSupplier.confirm' })}
							</Button>
						</div>
					</CForm>
				)}
			</Form>
		</div>
	);
};

export default ConfirmStockRequestForSupplierModal;
