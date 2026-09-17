import { FC, useCallback, useContext } from 'react';
import { invoke } from 'Helpers/lodash';
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
 * @category Component Create Custom Homepage Carousel Modal Content
 */
const CreateCustomHomePageCarouselModal: FC = () => {
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);

	const handleOnCreateCustomCarousel = useCallback(
		(formValues: Record<any, any>) => {
			apiServiceInstance
				.post(
					'product-api/home-page/custom-carousels',
					{
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						...formValues,
					},
					true
				)
				.then(() => {
					modalContext.handleCloseModal();
					notificationsContext.handleShowSuccessNotification(
						'admin.createCustomHomePageCarousel.success'
					);
					invoke(modalContext, 'data.resetCustomCarouselsList');
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.createCustomHomePageCarousel.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnCreateCustomCarousel}
			submitText="admin.modal.createHomePageCustomCarousel.submit"
			initializationValues={{
				language: localizationContext.activeLanguageKey,
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

export default CreateCustomHomePageCarouselModal;
