import { FC, memo, useContext, useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { CForm } from '@coreui/react';
import { InputSelect } from 'Components/Form';
import SupplierService from 'Services/SupplierService/Supplier';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { StockingRequestService } from 'Services/SupplierService/StockingRequest';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { useNavigate } from 'react-router-dom';

import { CreateStockingRequestFormValues, VinistoSupplier } from './interfaces';

const CreateRequestModal: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const notificationsContext = useContext(NotificationsContext);
	const { handleCloseModal } = useContext(ModalContext);

	const navigate = useNavigate();

	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [suppliers, setSuppliers] = useState<VinistoSupplier[]>([]);

	const onSubmit = (formValues: CreateStockingRequestFormValues) => {
		StockingRequestService.create({
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			...formValues,
		})
			.then((data) => {
				if (data.stockingRequest) {
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.createRequest.success'
					);
					handleCloseModal();
					navigate('stock-request-detail/' + data.stockingRequest.id);
				}
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.createRequest.error'
				);
			});
	};

	useEffect(() => {
		SupplierService.get([
			{
				key: 'userLoginHash',
				value: authenticationContext.vinistoUser.loginHash,
			},
			{
				key: 'limit',
				value: 0,
			},
			{
				key: 'SortingColumn',
				value: 'NAME',
			},
		])
			.then((data) => {
				setSuppliers(data.suppliers ?? []);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.createBundle.product.autocomplete.error'
				);
			});
	}, [authenticationContext.vinistoUser.loginHash, notificationsContext]);

	return (
		<Form
			onSubmit={onSubmit}
			submitText={'admin.modal.createRequest.submitButtonText'}
			initialValues={{
				supplierId: suppliers[0]?.id ?? '',
			}}
		>
			{({ handleSubmit }) => (
				<CForm
					onSubmit={handleSubmit}
					className="align-self-start"
				>
					<InputSelect
						name="supplierId"
						options={suppliers.map((item: VinistoSupplier) => ({
							label: item.nameWeb ?? '',
							value: item.id ?? '',
						}))}
						identifier="supplierId"
						label="admin.modal.createRequest.label"
					/>
					<Button
						variant="primary"
						type="submit"
						className="mt-3"
					>
						{t({ id: 'admin.modal.createRequest.submitButtonText' })}
					</Button>
				</CForm>
			)}
		</Form>
	);
};

export default memo(CreateRequestModal);
