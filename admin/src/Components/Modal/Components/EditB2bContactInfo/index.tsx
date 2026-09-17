import { Form } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { ModalContext } from 'Components/Modal/context';
import { NotificationsContext } from 'Services/NotificationService';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import ContactInfoFields from '../CreateB2bCustomer/ContactInfoFields';

import api from '@/api';

const EditB2bContactInfo = () => {
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
				handleShowSuccessNotification('admin.b2bCustomer.contactInfo.success');
				queryClient.invalidateQueries(userQueryKey);
				modalContext.handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.b2bCustomer.contactInfo.error');
			});
	};

	return (
		<Form
			initialValues={company}
			onSubmit={handleEditCompany}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<ContactInfoFields />
					<Button type="submit">{t({ id: 'edit' })}</Button>
				</form>
			)}
		></Form>
	);
};

export default EditB2bContactInfo;
