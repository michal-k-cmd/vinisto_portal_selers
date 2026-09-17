import { useCallback, useContext } from 'react';
import { CForm } from '@coreui/react';
import { Button } from 'react-bootstrap';
import { Form } from 'react-final-form';
import { useRevalidator } from 'react-router-dom';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { VinistoProductDllModelsApiBundleBundle as BundleApiModel } from 'vinisto_api_client/src/api-types/product-api/';
import CategoryService from 'Services/Category';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import { Validators } from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';

import { AddBundleToCategoryFormValues } from './interfaces';

const AddBundleToCategoryModal = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);

	const revalidator = useRevalidator();
	const t = useFormatMessage();

	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({
		alreadyUsedBundleIds:
			modalContext?.data?.customCarouselState?.homePageCustomCarousel?.bundles?.map(
				(bundle: BundleApiModel) => bundle?.id
			),
	});

	const handleOnSubmit = useCallback(
		(formValues: AddBundleToCategoryFormValues) => {
			if (
				!Array.isArray(formValues.bundleName) ||
				formValues.bundleName.length === 0
			)
				return;
			CategoryService.addBundle(
				modalContext.data?.categoryId,
				formValues.bundleName[0].value,
				authenticationContext.vinistoUser.loginHash
			)
				.then(() => {
					notificationsContext.handleShowSuccessNotification(
						'admin.modal.category.bundle.add.success'
					);
					modalContext.handleCloseModal();
					revalidator.revalidate();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.modal.category.bundle.add.error'
					);
				});
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			notificationsContext,
			revalidator,
		]
	);

	const renderOption = useCallback((option: AutocompleteBundleOption) => {
		return (
			<BundleOption
				bundle={option?.bundle}
				label={option?.label}
			/>
		);
	}, []);

	return (
		<Form<AddBundleToCategoryFormValues>
			onSubmit={handleOnSubmit}
			render={({ handleSubmit, submitting }) => (
				<CForm onSubmit={handleSubmit}>
					<AutocompleteBundle
						label="admin.modal.category.bundle.autocomplete.label"
						placeholder="admin.modal.category.bundle.autocomplete.placeholder"
						labelKey="label"
						name="bundleName"
						identifier="bundleName"
						onSearchCallback={handleOnSearch}
						options={autocompleteOptions}
						validate={Validators.required}
						renderOption={renderOption}
					/>
					<Button
						type="submit"
						disabled={submitting}
					>
						{t({ id: 'admin.modal.category.bundle.add.submit' })}
					</Button>
				</CForm>
			)}
		/>
	);
};

export default AddBundleToCategoryModal;
