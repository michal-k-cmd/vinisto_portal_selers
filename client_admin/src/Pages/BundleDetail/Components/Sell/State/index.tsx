import { FC } from 'react';
import withForm from 'Components/SingleEditForm/withForm';

import { StateFormFields, StateFormProps } from './interfaces';
import { FIELD_NAME, FORM_KEY } from './constants';
import StateSelect from './input';

const FormSellState = withForm<StateFormFields>(StateSelect);

const StateForm: FC<StateFormProps> = ({ initialValue, onSubmit }) => {
	return (
		<FormSellState
			formKey={FORM_KEY}
			onSubmit={onSubmit}
			initialValues={{ [FIELD_NAME]: initialValue }}
			btnsClassName="single-edit-form__inline-btn-wrapper"
		/>
	);
};

export default StateForm;
