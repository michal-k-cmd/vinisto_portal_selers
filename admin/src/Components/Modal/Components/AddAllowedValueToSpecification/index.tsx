import { useCallback, useContext } from 'react';
import { CFormInput } from '@coreui/react';
import {
	Input,
	InputNumber,
	Label,
	LanguageSelect,
	Validators,
} from 'Components/Form';
import { ModalContext } from 'Components/Modal/context';
import { slugify } from 'Helpers/slugify';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { Form, FormSpy } from 'react-final-form';
import { Button } from 'react-bootstrap';
import { UseMutationResult } from '@tanstack/react-query';

interface CreateSpecificationValueModalData {
	data: Record<any, any>;
	createSpecificationValueMutation: UseMutationResult<
		Promise<any>,
		unknown,
		void,
		unknown
	>;
}

const AddAllowedValueToSpecification = () => {
	const modalContext = useContext(ModalContext);
	const modalData = modalContext?.data as CreateSpecificationValueModalData;
	const authenticationContext = useContext(AuthenticationContext);
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnEditSpecification = useCallback(
		(formValues: Record<any, any>) => {
			const requestData = {
				userLoginHash: authenticationContext.vinistoUser.loginHash,
				...formValues,
				valueName: slugify(formValues.valueName),
			};

			modalData.createSpecificationValueMutation.mutate(requestData as any);
			modalContext.handleCloseModal();
		},
		[
			authenticationContext.vinistoUser.loginHash,
			modalContext,
			modalData.createSpecificationValueMutation,
		]
	);

	return (
		<Form
			onSubmit={handleOnEditSpecification}
			initialValues={{
				valueName: '',
				language: localizationContext.activeLanguageKey,
				score: 0,
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit}>
					<Input
						type="text"
						name="valueName"
						identifier="name"
						label="admin.modal.form.allowedValue.name"
						placeholder="admin.modal.form.allowedValue.name"
						validate={Validators.required}
					/>
					<FormSpy
						subscription={{ values: true }}
						render={({ values }) => (
							<>
								<Label>{t({ id: 'admin.modal.form.allowedValue.url' })}</Label>
								<CFormInput
									name="url"
									value={slugify(values.valueName ?? '')}
									readOnly
									// to compensate missing error field height
									style={{ marginBottom: 22 }}
								/>
							</>
						)}
					/>
					<Label>{t({ id: 'admin.modal.form.language' })}</Label>
					<LanguageSelect
						name="language"
						identifier="language"
						disabled
					/>
					<InputNumber
						name="score"
						identifier="score"
						label="admin.modal.form.allowedValue.score"
					/>
					<Input
						type="text"
						name="name"
						identifier="name"
						label="admin.modal.form.allowedValue"
						placeholder="admin.modal.form.allowedValue"
						validate={Validators.required}
					/>
					<Button
						variant="primary"
						type="submit"
					>
						{t({ id: 'admin.modal.form.addAllowedValueToSpecification' })}
					</Button>
				</form>
			)}
		/>
	);
};
export default AddAllowedValueToSpecification;
