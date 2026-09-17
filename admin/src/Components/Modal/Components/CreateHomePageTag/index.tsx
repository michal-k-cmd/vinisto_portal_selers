import React from 'react';
import { get, head, invoke, map } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { apiServiceInstance } from 'Services/ApiService';
import { Form, InputAutocomplete, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

/**
 * @category Component Create Home Page Tag Modal Content
 */
const CreateHomePageTagModal: React.FC = (): JSX.Element => {
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const getLocalizedValue = useLocalizedValue();

	const [autocompleteTags, setAutocompleteTags] = React.useState<
		Record<any, any>[]
	>([]);

	const handleOnCreateHomepageTag = React.useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				itemId: get(head(get(formValues, 'tagId', [])), 'value'),
			};
			apiServiceInstance
				.post('product-api/home-page/tags', requestData, true)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createHomePageTag.success'
					);
					invoke(modalContext, 'data.resetTagList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createHomePageTag.error'
					);
				});
		},
		[authenticationContext]
	);

	React.useEffect(() => {
		apiServiceInstance
			.getCollection(
				'product-api/tags',
				[
					{ key: 'limit', value: 1 },
					{ key: 'offset', value: 0 },
				],
				true
			)
			.then((payload) => {
				apiServiceInstance
					.getCollection(
						'product-api/tags',
						[
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
									label: getLocalizedValue(get(tag, 'name', [])),
								};
							}
						);
						setAutocompleteTags(preparedTags);
					});
			})
			.catch(() => {
				notificationsContext.handleShowErrorNotification(
					'admin.modal.tagHomePageCreate.autocomplete.error'
				);
				setAutocompleteTags([]);
			});
	}, []);

	return (
		<Form
			submitCallback={handleOnCreateHomepageTag}
			submitText={'admin.modal.tagHomePageCreate'}
		>
			<InputAutocomplete
				options={autocompleteTags}
				label="admin.modal.tagHomePageCreate.autocomplete.label"
				placeholder="admin.modal.tagHomePageCreate.autocomplete.placeholder"
				labelKey="label"
				name="tagId"
				identifier="tagId"
				validate={Validators.required}
			/>
		</Form>
	);
};

export default CreateHomePageTagModal;
