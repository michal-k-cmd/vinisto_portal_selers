import { Fragment, InputHTMLAttributes, ReactNode, useId } from 'react';
import cx from 'classnames';
import {
	ControllerProps,
	FieldPath,
	FieldValues,
	useController,
} from 'react-hook-form';
import Form from 'Components/Forms';
import { TestIdType } from 'Constants/test-ids';

import styles from './styles.module.css';

type TInputField = InputHTMLAttributes<HTMLInputElement> & {
	id?: string;
	name: FieldPath<FieldValues>;
	label?: ReactNode;
	type?: string;
	inputMode?:
		| 'search'
		| 'text'
		| 'none'
		| 'tel'
		| 'url'
		| 'email'
		| 'numeric'
		| 'decimal'
		| undefined;
	placeholder?: string;
	wrapperClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	messageClassName?: string;
	hintClassName?: string;
	showSuccess?: boolean;
	showSuccessIcon?: boolean;
	showError?: boolean;
	successMessage?: string;
	isRequired?: boolean;
	autocomplete?: string;
	rules?: ControllerProps['rules'];
	hint?: ReactNode;
	dataTestid?: TestIdType;
};

const InputField = ({
	id,
	name,
	label,
	type,
	pattern,
	inputMode,
	placeholder,
	wrapperClassName,
	labelClassName,
	inputClassName,
	messageClassName,
	hintClassName,
	showSuccess = false,
	showSuccessIcon = false,
	showError = true,
	successMessage,
	isRequired = false,
	autocomplete,
	rules,
	hint = null,
	dataTestid,
	...rest
}: TInputField) => {
	const {
		field,
		fieldState: { error, isTouched },
	} = useController({
		name,
		rules,
	});

	const inputId = useId();

	const isCheckbox = type === 'checkbox';
	const Container = isCheckbox ? 'div' : Fragment;

	return (
		<div className={cx(styles.wrapper, wrapperClassName)}>
			<Container {...(isCheckbox && { className: styles.checkbox })}>
				{!!label && (
					<Form.Label
						className={labelClassName}
						isRequired={isRequired || !!rules?.required}
						htmlFor={id ?? inputId}
					>
						{label}
					</Form.Label>
				)}
				<Form.Input
					{...rest}
					id={id ?? inputId}
					inputType={type}
					pattern={pattern}
					inputMode={inputMode}
					placeholder={placeholder}
					className={inputClassName}
					isError={!!error && showError}
					isSuccess={!error && isTouched && showSuccess}
					showSuccessIcon={showSuccess && showSuccessIcon}
					autocomplete={autocomplete}
					{...field}
					data-testid={dataTestid}
				/>
				<Form.Hint hintClassName={hintClassName}>{hint}</Form.Hint>
			</Container>
			{!!error && (
				<Form.Message
					className={cx(messageClassName, { 'ms-3 ps-1': isCheckbox })}
					variant="error"
				>
					{error.message}
				</Form.Message>
			)}
			{!error && isTouched && successMessage && (
				<Form.Message
					className={messageClassName}
					variant="success"
				>
					{successMessage}
				</Form.Message>
			)}
		</div>
	);
};

export default InputField;
