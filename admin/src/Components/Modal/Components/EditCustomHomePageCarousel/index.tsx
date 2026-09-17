import { FC, useCallback, useContext } from 'react';
import { get, head } from 'Helpers/lodash';
import useLocalizedValue from 'Hooks/useLocalizedValue';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import {
	Form,
	Input,
	InputNumber,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import PlatformSelect from 'Components/Form/Components/PlatformSelect';

/**
 * @category Component Edit Custom Homepage Carousel Modal Content
 */
const EditCustomHomePageCarouselModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const customCarouselState = modalContext?.data?.homePageCustomCarousel ?? {};
	const getLocalizedValue = useLocalizedValue();

	const handleOnCreateCustomCarousel = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.put(
					`product-api/home-page/custom-carousels/${customCarouselState?.id}`,
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						...formValues,
					},
					true
				)
				.then((payload: Record<any, any>) => {
					const homePageCustomCarousel = payload?.homePageCustomCarousel;
					const setCustomCarouselState = get(
						modalContext,
						'data.setCustomCarouselState'
					);
					setCustomCarouselState((customCarouselState: Record<any, any>) => ({
						...customCarouselState,
						homePageCustomCarousel,
					}));
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.editCustomHomePageCarousel.success'
					);
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editCustomHomePageCarousel.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnCreateCustomCarousel}
			submitText="admin.modal.editHomePageCustomCarousel.submit"
			initializationValues={{
				availableOnPlatform: customCarouselState.availableOnPlatform,
				language:
					head<any>(customCarouselState?.name)?.language ??
					localizationContext.activeLanguageKey,
				name:
					head<any>(customCarouselState?.name)?.value ??
					getLocalizedValue(customCarouselState?.name ?? []),
				sequenceNumber: customCarouselState?.sequenceNumber,
			}}
		>
			<PlatformSelect
				name="availableOnPlatform"
				identifier="availableOnPlatform"
				label="availableOnPlatform"
				validate={Validators.required}
			/>

			<LanguageSelect
				name="language"
				identifier="language"
				disabled={true}
			/>

			<Input
				type="text"
				name="name"
				identifier="name"
				label="admin.modal.form.name"
				placeholder="admin.modal.form.name"
			/>

			<InputNumber
				identifier="sequenceNumber"
				name="sequenceNumber"
				label="admin.modal.form.sequenceNumber"
			/>
		</Form>
	);
};

export default EditCustomHomePageCarouselModal;
