import { InputHTMLAttributes, ReactNode, Suspense, useContext } from 'react';
import cx from 'classnames';
import {
	ControllerProps,
	FieldPath,
	FieldValues,
	useController,
} from 'react-hook-form';
import Form from 'Components/Forms';
import { TestIdType } from 'Constants/test-ids';
import Loader from 'Components/View/Loader';
import AddToCartButtonPlusWhite from 'Components/Icons/AddToCartButtonPlusWhite';
import AddToCartButtonMinus from 'Components/Icons/AddToCartButtonMinus';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

type TInputField = InputHTMLAttributes<HTMLInputElement> & {
	id?: string;
	name: FieldPath<FieldValues>;
	label?: ReactNode;
	placeholder?: string;
	wrapperClassName?: string;
	labelClassName?: string;
	inputClassName?: string;
	messageClassName?: string;
	showSuccess?: boolean;
	showSuccessIcon?: boolean;
	showError?: boolean;
	successMessage?: string;
	isRequired?: boolean;
	autocomplete?: string;
	rules?: ControllerProps['rules'];
	dataTestid?: TestIdType;
	min?: number | string;
};

const CountField = ({
	id,
	name,
	label,
	pattern,
	placeholder,
	wrapperClassName,
	labelClassName,
	inputClassName,
	messageClassName,
	showSuccess = false,
	showSuccessIcon = false,
	showError = true,
	successMessage,
	isRequired = false,
	autocomplete,
	rules,
	dataTestid,
	min = 1,
}: TInputField) => {
	const {
		field,
		fieldState: { error, isTouched },
	} = useController({
		name,
		rules,
	});
	const t = useContext(LocalizationContext).useFormatMessage();

	const isMinusButtonDisabled = !field.value || field.value <= 1;

	const handleOnDecrement = () => {
		if (isMinusButtonDisabled) return;
		field.onChange(Number(field.value) - 1);
	};

	const handleOnIncrement = () => {
		field.onChange(Number(field.value) + 1);
	};

	const handleOnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters

		field.onChange(numericValue === '' ? '' : Number(numericValue));
	};

	const handleOnCountBlur = () => {
		if (
			field.value === '' ||
			field.value === undefined ||
			Number(field.value) < Number(min)
		) {
			field.onChange(Number(min));
		}
		field.onBlur?.();
	};

	return (
		<div className={cx(styles.wrapper, wrapperClassName)}>
			{!!label && (
				<Form.Label
					className={labelClassName}
					isRequired={isRequired || !!rules?.required}
				>
					{label}
				</Form.Label>
			)}
			<div className={styles.countWrapper}>
				<button
					type="button"
					className={cx(styles.minusButton, {
						[styles.disabled]: isMinusButtonDisabled,
					})}
					onClick={handleOnDecrement}
				>
					<Suspense fallback={<Loader blank />}>
						<AddToCartButtonMinus
							alt={t({ id: 'alt.less' })}
							className={styles.minusButtonIcon}
							stroke="#4D4D4E"
						/>
					</Suspense>
				</button>
				<Form.Input
					id={id}
					inputType="text"
					min={min}
					step="1"
					pattern={pattern}
					inputMode="numeric"
					placeholder={placeholder}
					className={cx(styles.countInput, inputClassName)}
					wrapperClassName={styles.inputCountWrapper}
					isError={!!error && showError}
					isSuccess={!error && isTouched && showSuccess}
					showSuccessIcon={showSuccess && showSuccessIcon}
					autocomplete={autocomplete}
					{...field}
					onChange={handleOnCountChange}
					onBlur={handleOnCountBlur}
					data-testid={dataTestid}
				/>

				<div
					className={styles.plusButtonWrapper}
					onClick={handleOnIncrement}
					onKeyDown={handleOnIncrement}
					role="button"
					tabIndex={0}
				>
					<button
						type="button"
						className={styles.plusButton}
					>
						<Suspense fallback={<Loader blank />}>
							<AddToCartButtonPlusWhite
								alt={t({ id: 'alt.more' })}
								className={cx(styles.plusButtonIcon)}
							/>
						</Suspense>
					</button>
				</div>
			</div>
			{!!error && (
				<Form.Message
					className={messageClassName}
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

export default CountField;
