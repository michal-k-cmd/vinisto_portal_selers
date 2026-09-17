import * as React from 'react';
import { get, head, map } from 'Helpers/lodash';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { apiServiceInstance as apiService } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocompleteAsync, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

const AddUserToSupplierModal = () => {
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const [autocompleteUsers, setAutocompleteUsers] = React.useState<
		AutocompleteOption[]
	>([]);

	const { supplierData, refetch } = modalContext.data ?? {};

	const handleOnAddUserToSupplier = React.useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				userId: get(head(get(formValues, 'userEmail', [])), 'value'),
			};
			apiService
				.put(
					`supplier-api/suppliers/${supplierData.id}/AddUserToSupplier`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addUserToSupplier.success'
					);

					refetch();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addUserToSupplier.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			refetch,
			supplierData.id,
		]
	);

	const handleOnSearch = React.useCallback(
		(searchEmail: string) => {
			apiService
				.getCollection(
					`user-api/users/`,
					[
						{
							key: 'SearchEmail',
							value: searchEmail,
						},
						{
							key: 'UserLoginHash',
							value: authenticationContext.vinistoUser.loginHash,
						},
					],
					true
				)
				.then((response: Record<any, any>) => {
					const searchOptions = [
						...map(get(response, 'users', []), (user: Record<any, any>) => ({
							value: get(user, 'id', ''),
							label: get(user, 'email', []),
						})),
					];
					setAutocompleteUsers(searchOptions);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addUserToSupplier.autocomplete.error'
					);
					setAutocompleteUsers([]);
				});
		},
		[authenticationContext.vinistoUser.loginHash, notificationsContext]
	);

	return (
		<Form
			submitCallback={handleOnAddUserToSupplier}
			submitText={'admin.modal.addUserToSupplier'}
		>
			<InputAutocompleteAsync
				label="admin.modal.addUserToSupplier.autocomplete.label"
				placeholder="admin.modal.addUserToSupplier.autocomplete.placeholder"
				labelKey={'label'}
				name="userEmail"
				identifier="userEmail"
				onSearchCallback={handleOnSearch}
				options={autocompleteUsers}
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddUserToSupplierModal;
