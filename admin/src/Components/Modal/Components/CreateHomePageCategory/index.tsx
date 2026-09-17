import React from 'react';
import { get, head, invoke, map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import {
	Form,
	InputAutocomplete,
	InputNumber,
	Validators,
} from 'Components/Form';

import { ModalContext } from '../../context';

/**
 * @category Component Create Home Page Category Modal Content
 */
const CreateHomePageCategoryModal: React.FC = (): JSX.Element => {
	const [autocompleteCategories, setAutocompleteCategories] = React.useState<
		Record<any, any>[]
	>([]);
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const getLocalizedValue = useLocalizedValue();
	const usedCategories = modalContext?.data?.categories;
	const selectedType = modalContext?.data?.selectedType;

	const handleOnCreateHomepageCategory = React.useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				homePageCategoryType: selectedType,
				categoryId: get(head(get(formValues, 'categoryId', [])), 'value'),
				sequenceNumber: formValues?.sequenceNumber,
			};
			apiServiceInstance
				.post('product-api/home-page/categories', requestData, true)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createHomePageCategory.success'
					);
					invoke(modalContext, 'data.resetCategoryList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createHomePageCategory.error'
					);
				});
		},
		[authenticationContext, selectedType]
	);

	React.useEffect(() => {
		apiServiceInstance
			.getCollection(
				'product-api/categories',
				[
					{ key: 'Limit', value: 1000 },
					{ key: 'Offset', value: 0 },
				],
				true
			)
			.then((payload: Record<any, any>) => {
				const usedCategoryIds = usedCategories?.map(
					(category: Record<any, any>) => category?.id
				);
				const preparedCategories = map(
					get(payload, 'categories', [])?.filter(
						(category: Record<any, any>) =>
							!usedCategoryIds?.includes(category?.id)
					),
					(category: Record<any, any>) => {
						return {
							value: get(category, 'id'),
							label: getLocalizedValue(get(category, 'name')),
						};
					}
				);
				setAutocompleteCategories(preparedCategories);
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.categoryHomePageCreate.autocomplete.error'
				);
				setAutocompleteCategories([]);
			});
	}, []);

	return (
		<Form
			submitCallback={handleOnCreateHomepageCategory}
			submitText={'admin.modal.categoryHomePageCreate'}
			initializationValues={{
				typeCategoryHomePage: get(modalContext, 'data.selectedType', ''),
			}}
		>
			<InputAutocomplete
				options={autocompleteCategories}
				label="admin.modal.categoryHomePageCreate.autocomplete.label"
				placeholder="search.category.singular"
				labelKey={'label'}
				name="categoryId"
				identifier="categoryId"
				validate={Validators.required}
			/>

			<InputNumber
				identifier="sequenceNumber"
				name="sequenceNumber"
				label="admin.modal.form.sequenceNumber"
			/>
		</Form>
	);
};

export default CreateHomePageCategoryModal;
