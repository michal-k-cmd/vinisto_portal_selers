import { get, head, map } from 'Helpers/lodash';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';
import { useRevalidator } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';

import { ModalContext } from '../../context';

const AddTagToCategoryModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const categoryId = modalContext.data?.categoryId;

	const [autocompleteTags, setAutocompleteTags] = useState<Record<any, any>[]>(
		[]
	);

	const getLocalizedValue = useLocalizedValue();
	const revalidator = useRevalidator();

	const handleOnAddTagToCategory = useCallback(
		(formValues: Record<any, any>) => {
			const apiService = new ApiService();
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
			};
			apiService
				.post(
					`product-api/categories/${categoryId}/tags/${get(
						head(get(formValues, 'tagId', [])),
						'value'
					)}`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addTagToCategory.success'
					);
					revalidator.revalidate();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addTagToCategory.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			categoryId,
			modalContext,
			notificationsContext,
			revalidator,
		]
	);

	useEffect(() => {
		const apiService = new ApiService();
		const loginHash = authenticationContext?.vinistoUser?.loginHash ?? '';
		apiService
			.getCollection(
				'product-api/tags',
				[
					{ key: 'userLoginHash', value: loginHash },
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload: Record<any, any>) => {
				apiService
					.getCollection(
						'product-api/tags',
						[
							{ key: 'userLoginHash', value: loginHash },
							{ key: 'limit', value: get(payload, 'count', 0) },
							{ key: 'offset', value: 0 },
						],
						true
					)
					.then((pay) => {
						const preparedTags = map(
							get(pay, 'tags', []),
							(tag: Record<any, any>) => {
								return {
									value: get(tag, 'id'),
									label: getLocalizedValue(get(tag, 'name')),
								};
							}
						);
						setAutocompleteTags(preparedTags);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.addTagToBundle.autocomplete.error'
				);
				setAutocompleteTags([]);
			});
	}, [
		authenticationContext?.vinistoUser?.loginHash,
		getLocalizedValue,
		notificationsContext,
	]);

	return (
		<Form
			submitCallback={handleOnAddTagToCategory}
			submitText={'admin.modal.addTagToCategory'}
		>
			<InputAutocomplete
				options={autocompleteTags}
				label="admin.modal.addTagToCategory.autocomplete.label"
				placeholder="admin.modal.addTagToCategory.autocomplete.placeholder"
				labelKey={'label'}
				name="tagId"
				identifier="tagId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddTagToCategoryModal;
