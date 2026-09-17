import { Form } from 'react-final-form';
import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { Button } from 'react-bootstrap';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import BusinessInfoFields from '../CreateB2bCustomer/BusinessInfoFields';

import api from '@/api';
import { VinistoHelperDllEnumsPriceLevel } from '@/api-types/user-api';

const EditB2bBusinessInfo = () => {
	const { id: userId } = useParams();

	const queryClient = useQueryClient();
	const userQueryKey = ['user', userId];

	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;

	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleShowErrorNotification, handleShowSuccessNotification } =
		useContext(NotificationsContext);

	const modalContext = useContext(ModalContext);
	const { company } = modalContext.data ?? {};

	const handleEditCompany = (values: Record<string, any>) => {
		api
			.put(`user-api/companies/${userId}`, undefined, {
				...company,
				...values,
				userLoginHash,
			})
			.then(() => {
				handleShowSuccessNotification(
					'admin.b2bCustomer.businessConditions.success'
				);
				queryClient.invalidateQueries(userQueryKey);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.b2bCustomer.businessConditions.error'
				);
			});
	};

	const initialValues = {
		...company,
		merchantId: company.users?.[0].userId,
		priceLevel: company.priceLevel ?? VinistoHelperDllEnumsPriceLevel.Level1,
	};

	return (
		<Form
			initialValues={initialValues}
			onSubmit={handleEditCompany}
			render={({ handleSubmit, values }) => (
				<form onSubmit={handleSubmit}>
					<BusinessInfoFields
						values={values}
						hideMerchantField={true}
					/>
					<Button type="submit">{t({ id: 'edit' })}</Button>
				</form>
			)}
		></Form>
	);
};

export default EditB2bBusinessInfo;
