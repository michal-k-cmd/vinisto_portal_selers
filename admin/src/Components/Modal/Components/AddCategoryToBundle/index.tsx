import * as React from 'react';
import { filter, get, head, includes, map } from 'Helpers/lodash';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

const AddCategoryToBundleModal = () => {
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);

	const [autocompleteCategories, setAutocompleteCategories] = React.useState<
		Record<any, any>[]
	>([]);

	const getLocalizedValue = useLocalizedValue();

	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const bundleId = modalContext.data?.bundle?.id;

	const handleOnAddCategoryToBundle = (formValues: Record<any, any>) => {
		const apiService = new ApiService();
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			itemId: get(head(get(formValues, 'categoryId', [])), 'value'),
		};
		apiService
			.post(`product-api/bundles/${bundleId}/categories`, requestData, true)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.addCategoryToBundle.success'
				);
				refetchBundleDetail();
				modalContext.handleCloseModal();
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.addCategoryToBundle.error'
				);
			});
	};

	React.useEffect(() => {
		const apiService = new ApiService();
		const loginHash = authenticationContext?.vinistoUser?.loginHash ?? '';
		apiService
			.getCollection(
				'product-api/categories',
				[
					{ key: 'userLoginHash', value: loginHash },
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload) => {
				apiService
					.getCollection(
						'product-api/categories',
						[
							{ key: 'userLoginHash', value: loginHash },
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
							{ key: 'type', value: 'STATIC' },
						],
						true
					)
					.then((payload: Record<any, any>) => {
						let preparedCategories = map(
							get(payload, 'categories', []),
							(category: Record<any, any>) => {
								return {
									value: get(category, 'id'),
									label: getLocalizedValue(get(category, 'name')),
								};
							}
						);
						preparedCategories = filter(
							preparedCategories,
							(preparedCategory: Record<any, any>) => {
								const productCategoryIds: string[] = get(
									modalContext,
									'data.categories',
									[]
								);

								return !includes(
									productCategoryIds,
									get(preparedCategory, 'value')
								);
							}
						);

						setAutocompleteCategories(preparedCategories);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.addCategoryToBundle.autocomplete.error'
				);
				setAutocompleteCategories([]);
			});
	}, [
		authenticationContext?.vinistoUser?.loginHash,
		getLocalizedValue,
		modalContext,
		notificationsContext,
	]);

	return (
		<Form
			submitCallback={handleOnAddCategoryToBundle}
			submitText={'admin.modal.addCategoryToBundle'}
		>
			<InputAutocomplete
				options={autocompleteCategories}
				label="admin.modal.addCategoryToBundle.autocomplete.label"
				placeholder="admin.modal.addCategoryToBundle.autocomplete.placeholder"
				labelKey={'label'}
				name="categoryId"
				identifier="categoryId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddCategoryToBundleModal;
