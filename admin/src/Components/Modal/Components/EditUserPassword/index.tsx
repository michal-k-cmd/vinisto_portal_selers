import { useContext, useRef } from 'react';
import { Form } from 'react-final-form';
import { CContainer, CForm } from '@coreui/react';
import { ModalContext } from 'Components/Modal/context';
import { VinistoAuthDllModelsApiUserChangePasswordParameters } from 'vinisto_api_client/src/api-types/user-api/';
import { Input, SubmitButton } from 'Components/Form';

const EditUserPasswordModal = () => {
	const { data, handleCloseModal } = useContext(ModalContext);

	const form = useRef<HTMLFormElement>(null);

	const handleSubmit = (
		formValues: VinistoAuthDllModelsApiUserChangePasswordParameters
	) => {
		data?.setPasswordMutation.mutate(formValues.newPassword);
		handleCloseModal();
	};

	return (
		<Form<VinistoAuthDllModelsApiUserChangePasswordParameters>
			onSubmit={handleSubmit}
			render={({ handleSubmit, pristine, valid, submitting }) => {
				return (
					<CContainer>
						<CForm
							onSubmit={handleSubmit}
							ref={form}
						>
							<Input
								name="newPassword"
								identifier="newPassword"
								label="form.input.editPassword.label"
								placeholder=""
							/>
							<SubmitButton
								valid={valid}
								pristine={pristine}
								submitting={submitting}
								submitText={'modal.editPassword.submitButtonText'}
								isBackButton={true}
							/>
						</CForm>
					</CContainer>
				);
			}}
		/>
	);
};

export default EditUserPasswordModal;
