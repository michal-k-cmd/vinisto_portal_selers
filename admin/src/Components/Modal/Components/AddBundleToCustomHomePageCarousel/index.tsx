import { useCallback, useContext } from 'react';
import {
	VinistoProductDllModelsApiBundleBundle,
	VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn,
} from 'vinisto_api_client/src/api-types/product-api/';
import { apiServiceInstance } from 'Services/ApiService';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import AutocompleteBundle from 'Components/Form/Components/AutocompleteBundle';
import BundleOption from 'Components/Form/Components/AutocompleteBundle/BundleOption';
import { AutocompleteOption } from 'Components/Form/Components/AutocompleteAsync/interfaces';
import { Form, InputNumber, Validators } from 'Components/Form';
import useAutocompleteBundles from 'Hooks/useAutocompleteBundles';
import { AutocompleteBundleOption } from 'Components/Form/Components/AutocompleteBundle/interfaces';

import { ModalContext } from '../../context';

import { B2C_NUMERIC_CODE } from '@/shared';

type FormValues = {
	bundleName: AutocompleteOption[];
	sequenceNumber: number;
};

const AddBundleToCustomHomePageCarouselModal = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const customCarouselId =
		modalContext?.data?.customCarouselState?.homePageCustomCarousel?.id ??
		modalContext?.data?.customCarouselId ??
		null;

	const carousel =
		modalContext?.data?.customCarouselState?.homePageCustomCarousel;

	const handleOnAddBundleToCustomCarousel = useCallback(
		(formValues: FormValues) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				bundleId: formValues.bundleName[0].value,
				sequenceNumber: formValues?.sequenceNumber ?? null,
			};
			apiServiceInstance
				.post<VinistoProductDllModelsApiHomePageHomePageCustomCarouselReturn>(
					`product-api/home-page/custom-carousels/${customCarouselId}/bundles`,
					requestData,
					true
				)
				.then((payload) => {
					const homePageCustomCarousel = payload?.homePageCustomCarousel;

					notificationsContext.handleShowSuccessNotification(
						'admin.addBundleToHomePageCustomCarousel.success'
					);
					const setCustomCarouselState =
						modalContext?.data?.setCustomCarouselState;
					setCustomCarouselState((customCarouselState: Record<any, any>) => ({
						...customCarouselState,
						homePageCustomCarousel,
					}));
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.addBundleToHomePageCustomCarousel.error'
					);
				});
		},
		[authenticationContext]
	);

	const { autocompleteOptions, handleOnSearch } = useAutocompleteBundles({
		alreadyUsedBundleIds: carousel?.bundles?.map(
			(bundle: VinistoProductDllModelsApiBundleBundle) => bundle?.id
		),
	});

	const renderOption = useCallback((option: AutocompleteBundleOption) => {
		return (
			<BundleOption
				bundle={option?.bundle}
				label={option?.label}
			/>
		);
	}, []);

	return (
		<Form
			submitCallback={handleOnAddBundleToCustomCarousel}
			submitText={'admin.modal.addBundleToHomePageCustomCarousel'}
		>
			<AutocompleteBundle
				label="admin.modal.cms.article.products.autocomplete.label"
				placeholder="admin.modal.cms.article.products.autocomplete.placeholder"
				labelKey="label"
				name="bundleName"
				identifier="bundleName"
				onSearchCallback={(search) =>
					handleOnSearch(
						search,
						{},
						carousel.availableOnPlatform ?? B2C_NUMERIC_CODE
					)
				}
				options={autocompleteOptions}
				validate={Validators.required}
				renderOption={renderOption}
			/>
			<InputNumber
				identifier="sequenceNumber"
				name="sequenceNumber"
				label="admin.modal.form.sequenceNumber"
			/>
		</Form>
	);
};

export default AddBundleToCustomHomePageCarouselModal;
