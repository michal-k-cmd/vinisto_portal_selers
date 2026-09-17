import * as React from 'react';
import { get, head, map } from 'Helpers/lodash';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import ApiService from 'Services/ApiService';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import BundleService from 'Services/Bundle';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, InputAutocompleteAsync, Validators } from 'Components/Form';

import { ModalContext } from '../../context';

const AddAlternativeBundleToBundleModal = () => {
	const modalContext = React.useContext(ModalContext);
	const notificationsContext = React.useContext(NotificationsContext);
	const authenticationContext = React.useContext(AuthenticationContext);
	const [autocompleteOptions, setAutocompleteOptions] = React.useState<
		AutocompleteOption[]
	>([]);
	const apiService = React.useMemo(() => new ApiService(), []);

	const getLocalizedValue = useLocalizedValue();

	const { bundle, refetchBundleDetail } = modalContext.data ?? {};
	const bundleId = bundle?.id;
	const isSet = bundle?.isSet;

	const handleOnAddAlternativeBundleToBundle = React.useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				itemId: get(head(get(formValues, 'bundleName', [])), 'value'),
			};
			apiService
				.post(
					`product-api/bundles/${bundleId}/alternative-bundles`,
					requestData,
					true
				)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.addAlternativeBundleToBundle.success'
					);
					refetchBundleDetail();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addAlternativeBundleToBundle.error'
					);
				});
		},
		[
			apiService,
			authenticationContext.vinistoUser.loginHash,
			bundleId,
			notificationsContext,
			refetchBundleDetail,
		]
	);

	const handleOnSearch = React.useCallback(
		(searchText: string) => {
			BundleService.getAutocompleteBundles(searchText, isSet && { isSet: true })
				.then((response: Record<any, any>) => {
					const alreadyUsedAlternativeBundleIds = bundle?.alternativeBundles;
					const searchOptions = [
						...map(
							get(response, 'bundles', [])?.filter(
								(bundle: Record<any, any>) =>
									!alreadyUsedAlternativeBundleIds?.includes(bundle?.id)
							),
							(bundle: Record<any, any>) => ({
								value: get(bundle, 'id', ''),
								label: getLocalizedValue(get(bundle, 'name', [])),
							})
						),
					];
					setAutocompleteOptions(searchOptions);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.addAlternativeBundleToBundle.autocomplete.error'
					);
					setAutocompleteOptions([]);
				});
		},
		[bundle?.alternativeBundles, getLocalizedValue, isSet, notificationsContext]
	);

	return (
		<Form
			submitCallback={handleOnAddAlternativeBundleToBundle}
			submitText={'admin.modal.addAlternativeBundleToBundle'}
		>
			<InputAutocompleteAsync
				label="admin.modal.addAlternativeBundleToBundle.autocomplete.label"
				placeholder="admin.modal.addAlternativeBundleToBundle.autocomplete.placeholder"
				labelKey={'label'}
				name="bundleName"
				identifier="bundleName"
				onSearchCallback={handleOnSearch}
				options={autocompleteOptions}
				validate={Validators.required}
			/>
		</Form>
	);
};

export default AddAlternativeBundleToBundleModal;
