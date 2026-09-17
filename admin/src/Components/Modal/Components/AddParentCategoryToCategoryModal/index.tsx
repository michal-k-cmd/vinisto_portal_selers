import { useContext, useEffect, useState } from 'react';
import { map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import { CategoriesService, CategoryService } from 'vinisto_api_client';

import { ModalContext } from '../../context';

const AddParentCategoryToCategoryModal = () => {
	const { handleCloseModal, data } = useContext(ModalContext);
	const { handleShowSuccessNotification, handleShowErrorNotification } =
		useContext(NotificationsContext);
	const { loginHash } = useContext(AuthenticationContext).vinistoUser;

	const [autocompleteCategories, setAutocompleteCategories] = useState<
		Record<any, any>[]
	>([]);

	const getLocalizedValue = useLocalizedValue();

	const submitButtonLabel = data?.submitButtonLabel ?? '-';
	const categoryId = data?.categoryId;
	const refetchBreadcrumbs = data?.refetchBreadcrumbs;

	const handleOnAddParentCategoryToCategory = (
		formValues: Record<any, any>
	) => {
		const parentCategoryId = formValues.categoryId?.[0]?.value ?? null;

		if (parentCategoryId === null) {
			handleShowErrorNotification('admin.addParentCategoryToCategory.error');
			return;
		}

		const requestData = {
			userLoginHash: loginHash,
			parentCategoryId,
		};

		CategoryService.modifyCategoryParent(categoryId, requestData)
			.then(() => {
				handleShowSuccessNotification(
					'admin.addParentCategoryToCategory.success'
				);
				handleCloseModal();
			})
			.catch(() => {
				handleShowErrorNotification('admin.addParentCategoryToCategory.error');
			})
			.finally(() => {
				refetchBreadcrumbs();
			});
	};

	useEffect(() => {
		CategoriesService.getCategories({})
			.then((payload) => {
				CategoriesService.getCategories({ Limit: payload?.count }).then(
					(payload) => {
						const preparedCategories = map(
							payload?.categories ?? [],
							(category) => {
								return {
									value: category.id,
									label: getLocalizedValue(category.name),
								};
							}
						);

						setAutocompleteCategories(preparedCategories);
					}
				);
			})
			.catch(() => {
				handleShowErrorNotification(
					'admin.modal.addParentCategoryToCategory.autocomplete.error'
				);
				setAutocompleteCategories([]);
			});
	}, [loginHash, getLocalizedValue, handleShowErrorNotification]);

	return (
		<Form
			submitCallback={handleOnAddParentCategoryToCategory}
			submitText={submitButtonLabel}
		>
			<InputAutocomplete
				options={autocompleteCategories}
				label="admin.modal.addParentCategoryToCategory.autocomplete.label"
				placeholder="admin.modal.addParentCategoryToCategory.autocomplete.placeholder"
				labelKey={'label'}
				name="categoryId"
				identifier="categoryId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddParentCategoryToCategoryModal;
