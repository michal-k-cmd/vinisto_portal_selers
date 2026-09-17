import cx from 'classnames';
import { ForwardedRef, forwardRef, HTMLProps, lazy, Suspense } from 'react';
import Loader from 'Components/View/Loader';
const CheckIcon = lazy(() => import('Components/Icons/Check'));

import styles from './styles.module.css';

type TInputProps = HTMLProps<HTMLInputElement> & {
	isSuccess?: boolean;
	isError?: boolean;
	showSuccessIcon?: boolean;
	wrapperClassName?: string;
	inputType?: string;
	autocomplete?: string;
};

const Input = forwardRef(
	(
		{
			className,
			wrapperClassName,
			isSuccess = false,
			isError = false,
			showSuccessIcon = false,
			inputType = 'text',
			autocomplete,
			...props
		}: TInputProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const isCheckbox = inputType === 'checkbox';

		return (
			<div
				className={cx(styles.inputWrapper, wrapperClassName, {
					[styles.checkboxWrapper]: isCheckbox,
				})}
			>
				<input
					className={cx(
						styles.input,
						{
							[styles.success]: isSuccess,
							[styles.error]: isError,
						},
						className
					)}
					aria-invalid={isError ? 'true' : 'false'}
					type={inputType}
					ref={ref}
					autoComplete={autocomplete}
					{...props}
				/>
				{isCheckbox && (
					<span
						className={styles.checkboxControl}
						aria-hidden="true"
					/>
				)}
				{isSuccess && showSuccessIcon && (
					<Suspense fallback={<Loader blank />}>
						<CheckIcon className={styles.checkIcon} />
					</Suspense>
				)}
			</div>
		);
	}
);

Input.displayName = 'Input';

export default Input;
