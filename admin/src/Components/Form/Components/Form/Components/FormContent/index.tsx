import * as React from 'react';
import { get, isEqual, set } from 'Helpers/lodash';
import { CCol, CContainer, CForm, CRow } from '@coreui/react';

import SubmitButton from '../../../Submit';

const FormContent: React.FC<Record<any, any>> = (props): JSX.Element => {
	const { handleSubmit, submitting, pristine, valid, form } = props;
	const [internalFormState, setInternalFormState] = React.useState(
		form.getState()
	);
	React.useEffect(() => {
		if (get(props, 'formReference', undefined)) {
			const formReference = get(props, 'formReference', {});
			set(formReference, 'current', form);
		}
	}, [get(props, 'formReference', undefined), form]);

	React.useEffect(() => {
		if (
			get(props, 'formStateSubscriber', undefined) &&
			!isEqual(form.getState(), internalFormState)
		) {
			const formStateSubscriber = get(props, 'formStateSubscriber');
			setInternalFormState(form.getState());
			formStateSubscriber(form.getState());
		}
	}, [get(props, 'formStateSubscriber', undefined), form]);

	return (
		<div className="d-flex flex-column align-items-center admin-form-col">
			<CContainer>
				<CRow className="justify-content-center">
					<CCol
						md={6}
						className="admin-form-col"
					>
						<CForm
							onSubmit={handleSubmit}
							className={props.className}
						>
							{get(props, 'children', '')}
							<SubmitButton
								valid={valid}
								pristine={pristine}
								submitting={submitting}
								submitText={get(props, 'submitText', 'Submit')}
							/>
						</CForm>
					</CCol>
				</CRow>
			</CContainer>
		</div>
	);
};

export default FormContent;
