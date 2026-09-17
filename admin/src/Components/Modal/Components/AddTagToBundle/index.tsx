import * as React from 'react';
import { get, head, map } from 'Helpers/lodash';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

const AddTagToBundleModal = () => {
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const refetchBundleDetail = modalContext.data?.refetchBundleDetail;
	const bundle = modalContext.data?.bundle;
	const bundleId = bundle?.id;

	const [autocompleteTags, setAutocompleteTags] = React.useState<
		Record<any, any>[]
	>([]);

	const getLocalizedValue = useLocalizedValue();

	const handleOnAddTagToBundle = React.useCallback(
		(formValues: Record<any, any>) => {
			const apiService = new ApiService();
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				itemId: get(head(get(formValues, 'tagId', [])), 'value'),
			};
			apiService
				.post(`product-api/bundles/${bundleId}/tags`, requestData, true)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addTagToBundle.success'
					);

					refetchBundleDetail();
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addTagToBundle.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			bundleId,
			modalContext,
			notificationsContext,
			refetchBundleDetail,
		]
	);

	React.useEffect(() => {
		const apiService = new ApiService();
		const loginHash = authenticationContext?.vinistoUser?.loginHash ?? '';
		apiService
			.getCollection(
				'product-api/tags',
				[
					{ key: 'userLoginHash', value: loginHash },
					{ key: 'IncludeSystemTypeTags', value: false },
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
							{ key: 'IncludeSystemTypeTags', value: false },
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
			submitCallback={handleOnAddTagToBundle}
			submitText={'admin.modal.addTagToBundle'}
		>
			<InputAutocomplete
				options={autocompleteTags}
				label="admin.modal.addTagToBundle.autocomplete.label"
				placeholder="admin.modal.addTagToBundle.autocomplete.placeholder"
				labelKey={'label'}
				name="tagId"
				identifier="tagId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddTagToBundleModal;
