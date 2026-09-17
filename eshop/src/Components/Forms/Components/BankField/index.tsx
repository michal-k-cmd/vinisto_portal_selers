import Form from 'Components/Forms';
import { ReactNode } from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

import styles from './styles.module.css';

type TPhoneField = {
	id?: string;
	name: FieldPath<FieldValues>;
	label?: ReactNode;
	type?: string;
	placeholder?: string;
	showSuccess?: boolean;
	showSuccessIcon?: boolean;
	showError?: boolean;
	successMessage?: string;
	isRequired?: boolean;
};

const BankField = ({
	id,
	name,
	label,
	successMessage,
	isRequired = false,
}: TPhoneField) => {
	const {
		field,
		fieldState: { error, isTouched },
	} = useController({
		name,
	});

	return (
		<div className={styles.wrapper}>
			{!!label && <Form.Label isRequired={isRequired}>{label}</Form.Label>}
			<Form.BankInput
				id={id}
				{...field}
			/>
			{!!error && <Form.Message variant="error">{error.message}</Form.Message>}
			{!error && isTouched && successMessage && (
				<Form.Message variant="success">{successMessage}</Form.Message>
			)}
		</div>
	);
};

export default BankField;
