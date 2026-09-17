import { FC, useCallback, useContext } from 'react';
import { find, get } from 'Helpers/lodash';
import { apiServiceInstance } from 'Services/ApiService';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { NotificationsContext } from 'Services/NotificationService';
import { Form, Input, LanguageSelect, Validators } from 'Components/Form';

/**
 * @category Component Edit Specification Units Modal Content
 */
const EditSpecificationUnitsModal: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const notificationsContext = useContext(NotificationsContext);
	const authenticationContext = useContext(AuthenticationContext);
	const unit = get(
		modalContext,
		'data.specificationDetailState.specificationDetailData.unit'
	);
	const imperialUnit = get(
		modalContext,
		'data.specificationDetailState.specificationDetailData.imperialUnit'
	);

	const handleOnEditSpecificationUnits = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = !imperialUnit
				? {
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						language: get(formValues, 'language'),
						unit: get(formValues, 'unit', ''),
				  }
				: {
						userLoginHash: authenticationContext.vinistoUser.loginHash,
						language: get(formValues, 'language'),
						unit: get(formValues, 'unit', ''),
						imperialUnit: get(formValues, 'imperialUnit', ''),
				  };

			apiServiceInstance
				.put(
					`product-api/specifications/${get(
						modalContext,
						'data.specificationDetailState.specificationDetailData.id'
					)}/${
						!imperialUnit
							? 'NumberSpecificationEditUnit'
							: 'NumberImperialSpecificationEditUnits'
					}`,
					requestData,
					true
				)
				.then((payload: Record<any, any>) => {
					const setSpecificationDetailState = get(
						modalContext,
						'data.setSpecificationDetailState'
					);
					setSpecificationDetailState(
						(specificationDetailState: Record<any, any>) => ({
							...specificationDetailState,
							specificationDetailData: get(payload, 'specification', {}),
						})
					);
					notificationsContext.handleShowSuccessNotification(
						'admin.editSpecificationUnits.success'
					);
					modalContext.handleCloseModal();
				})
				.catch(() => {
					notificationsContext.handleShowErrorNotification(
						'admin.editSpecificationUnits.error'
					);
				});
		},
		[authenticationContext]
	);

	return (
		<Form
			submitCallback={handleOnEditSpecificationUnits}
			submitText={'admin.modal.editSpecificationUnits.submit'}
			initializationValues={{
				language: localizationContext.activeLanguageKey,
				unit: unit
					? get(
							find(unit, { language: localizationContext.activeLanguageKey }),
							'value'
					  )
					: undefined,
				imperialUnit: imperialUnit
					? get(
							find(imperialUnit, {
								language: localizationContext.activeLanguageKey,
							}),
							'value'
					  )
					: undefined,
			}}
		>
			<LanguageSelect
				name="language"
				identifier="language"
				disabled
			/>
			{unit && (
				<Input
					type="text"
					name="unit"
					identifier="unit"
					label="admin.modal.form.unit"
					placeholder="admin.modal.form.unit"
					validate={Validators.required}
				/>
			)}
			{imperialUnit && (
				<Input
					type="text"
					name="imperialUnit"
					identifier="imperialUnit"
					label="admin.modal.form.imperialUnit"
					placeholder="admin.modal.form.imperialUnit"
					validate={Validators.required}
				/>
			)}
		</Form>
	);
};

export default EditSpecificationUnitsModal;
