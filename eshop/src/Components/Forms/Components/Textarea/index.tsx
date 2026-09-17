import cx from 'classnames';
import { ForwardedRef, forwardRef, HTMLProps, lazy, Suspense } from 'react';
import Loader from 'Components/View/Loader';
const CheckIcon = lazy(() => import('Components/Icons/Check'));

import styles from './styles.module.css';

type TInputProps = HTMLProps<HTMLTextAreaElement> & {
	isSuccess?: boolean;
	isError?: boolean;
	showSuccessIcon?: boolean;
	wrapperClassName?: string;
	inputType?: string;
	autocomplete?: string;
};

const Textarea = forwardRef(
	(
		{
			className,
			wrapperClassName,
			isSuccess = false,
			isError = false,
			showSuccessIcon = false,
			autocomplete,
			...props
		}: TInputProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	) => {
		return (
			<div className={cx(styles.inputWrapper, wrapperClassName)}>
				<textarea
					className={cx(
						styles.input,
						{
							[styles.success]: isSuccess,
							[styles.error]: isError,
						},
						className
					)}
					aria-invalid={isError ? 'true' : 'false'}
					ref={ref}
					autoComplete={autocomplete}
					{...props}
				/>
				{isSuccess && showSuccessIcon && (
					<Suspense fallback={<Loader blank />}>
						<CheckIcon className={styles.checkIcon} />
					</Suspense>
				)}
			</div>
		);
	}
);

Textarea.displayName = 'Textarea';

export default Textarea;
