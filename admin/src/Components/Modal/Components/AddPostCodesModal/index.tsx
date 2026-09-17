import { useCallback, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-final-form';
import { CCol, CContainer, CForm, CFormTextarea, CRow } from '@coreui/react';
import { SubmitButton } from 'Components/Form';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { NotificationsContext } from 'Services/NotificationService';
import { LocalizationContext } from 'Services/LocalizationService';
import { apiServiceInstance } from 'Services/ApiService';
import { LangValuePair } from 'Hooks/useLocalizedValue/interfaces';
import { VinistoOrderDllModelsApiDeliveryDelivery } from 'vinisto_api_client/src/api-types/order-api/';

import { ModalContext } from '../../context';

import { API_URL } from './constants';

import './styles.css';

const AddPostCodesModal = () => {
	const localizationContext = useContext(LocalizationContext);
	const { data: deliveryDetailData, handleCloseModal } =
		useContext(ModalContext);

	const { id, name, description, servingZipCodes, alternativeName, note } =
		(deliveryDetailData || {}) as VinistoOrderDllModelsApiDeliveryDelivery;

	const notificationsContext = useContext(NotificationsContext);
	const { loginHash: userLoginHash } = useContext(
		AuthenticationContext
	).vinistoUser;
	const navigate = useNavigate();

	const postcodesTextArea = useRef<HTMLTextAreaElement>(null);

	const t = localizationContext.useFormatMessage();

	const getNameByLang = useCallback(() => {
		const names = name || [];
		const found = names.find(
			(singleName: LangValuePair) =>
				singleName.language === localizationContext.activeLanguageKey
		);
		return found?.value || '';
	}, [localizationContext.activeLanguageKey, name]);

	const getNoteByLang = useCallback(() => {
		const notes = note || [];
		const found = notes.find(
			(singleName: LangValuePair) =>
				singleName.language === localizationContext.activeLanguageKey
		);
		return found?.value || '';
	}, [localizationContext.activeLanguageKey, note]);

	const getAlternativeNameByLang = useCallback(() => {
		const alternativeNames = alternativeName || [];
		const found = alternativeNames.find(
			(singleName: LangValuePair) =>
				singleName.language === localizationContext.activeLanguageKey
		);
		return found?.value || '';
	}, [localizationContext.activeLanguageKey, alternativeName]);

	const getDescriptionByLang = useCallback(() => {
		const descriptions = description || [];
		const found = descriptions.find(
			(singleName: LangValuePair) =>
				singleName.language === localizationContext.activeLanguageKey
		);
		return found?.value || '';
	}, [description, localizationContext.activeLanguageKey]);

	const handleSubmit = () => {
		const requestData = {
			...deliveryDetailData,
			userLoginHash,
			language: localizationContext.activeLanguageKey,
			name: getNameByLang(),
			description: getDescriptionByLang(),
			note: getNoteByLang(),
			alternativeName: getAlternativeNameByLang(),
			servingZipCodes: (
				postcodesTextArea.current?.value.split(/[|;]/) || []
			).map((s) => s.trim()),
		};

		apiServiceInstance
			.put(`${API_URL}/${id}/EditDelivery`, requestData)
			.then(() => {
				notificationsContext.handleShowSuccessNotification(
					'admin.modal.addPostCodes.success'
				);
				handleCloseModal();
				navigate(0); //TODO: remove this 'refetch mechanism' in favor of a better solution
			})
			.catch(() =>
				notificationsContext.handleShowErrorNotification(
					'admin.modal.addPostCodes.error'
				)
			);
	};

	return (
		<Form
			onSubmit={handleSubmit}
			render={({ handleSubmit, submitting, pristine, valid }) => {
				return (
					<CContainer>
						<CRow className="justify-content-center">
							<CCol
								md={6}
								className="admin-form-col"
							>
								<CForm onSubmit={handleSubmit}>
									<p>{t({ id: 'admin.modal.addPostCodes.tootip' })}</p>
									<CFormTextarea
										ref={postcodesTextArea}
										name="postcodes-input"
										label={`${t({ id: 'admin.modal.addPostCodes.label' })}`}
										className="add-postcodes-modal__textarea"
										defaultValue={servingZipCodes
											?.filter((code: string) => code !== '')
											.join('; ')}
									/>
									<SubmitButton
										valid={valid}
										pristine={pristine}
										submitting={submitting}
										submitText="admin.modal.btn.addPostCodes"
									/>
								</CForm>
							</CCol>
						</CRow>
					</CContainer>
				);
			}}
		/>
	);
};

export default AddPostCodesModal;
