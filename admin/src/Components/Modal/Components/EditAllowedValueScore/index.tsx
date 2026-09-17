import { useContext } from 'react';
import { ModalContext } from 'Components/Modal/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { Form, InputNumber } from 'Components/Form';
import { UseMutationResult } from '@tanstack/react-query';
import { SpecificationType } from 'Services/Specification/constants';

interface EditAllowedValueScoreModalData {
	data: Record<any, any>;
	key: string;
	score: number;
	specificationType: SpecificationType;
	editAllowedValueScoreMutation: UseMutationResult<
		Promise<any>,
		unknown,
		void,
		unknown
	>;
}

const EditAllowedValueScore = () => {
	const modalContext = useContext(ModalContext);
	const modalData = modalContext?.data as EditAllowedValueScoreModalData;

	const authenticationContext = useContext(AuthenticationContext);

	const handleOnEditScore = (formValues: Record<any, any>) => {
		const requestData = {
			userLoginHash: authenticationContext.vinistoUser.loginHash,
			specificationType: modalData.specificationType,
			valueName: modalData.key,
			...formValues,
		};

		modalData.editAllowedValueScoreMutation.mutate(requestData as any);
		modalContext.handleCloseModal();
	};

	return (
		<Form
			submitCallback={handleOnEditScore}
			submitText={'admin.modal.form.editSpecification'}
			initializationValues={{
				score: modalData.score,
			}}
		>
			<InputNumber
				name="score"
				identifier="score"
				label="admin.modal.form.allowedValue.score"
			/>
		</Form>
	);
};
export default EditAllowedValueScore;
