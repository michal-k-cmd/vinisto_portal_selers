import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	HTMLProps,
	lazy,
	Suspense,
	useContext,
} from 'react';
import cx from 'classnames';
import {
	DEFAULT_PHONE_CODE,
	PHONE_CODE_PREFIX_CHAR,
	PHONE_CODE_SEPARATOR,
} from 'Components/Forms/constants';
import Loader from 'Components/View/Loader';
import { TestIdType } from 'Constants/test-ids';
const CheckIcon = lazy(() => import('Components/Icons/Check'));
import { LocalizationContext } from 'Services/LocalizationService';
import { PHONE_CODES } from 'Components/Form/constants';

import styles from './styles.module.css';

type TPhoneProps = HTMLProps<HTMLInputElement> & {
	isSuccess?: boolean;
	isError?: boolean;
	showSuccessIcon?: boolean;
	value?: string;
	dataTestid?: TestIdType;
};

const Phone = forwardRef(
	(
		{
			className,
			isSuccess = false,
			isError = false,
			showSuccessIcon = false,
			value,
			name,
			onChange,
			dataTestid,
			...props
		}: TPhoneProps,
		ref: ForwardedRef<HTMLInputElement>
	) => {
		const { countryOfSale } = useContext(LocalizationContext);
		const displayCode =
			value?.[0] === PHONE_CODE_PREFIX_CHAR
				? (value?.slice(1, 4) as string)
				: String(
						PHONE_CODES[countryOfSale as keyof typeof PHONE_CODES] ??
							DEFAULT_PHONE_CODE
				  );

		const displayNumber =
			(value as string)
				?.slice(5)
				?.match(/.{1,3}/g)
				?.join(' ') ?? '';

		const handleOnNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
			const phoneNumber = e.target.value.replace(/\s/g, '');
			if (
				phoneNumber?.length > 9 ||
				phoneNumber
					?.split('')
					?.some((number: string) => Number.isNaN(parseInt(number)))
			) {
				return;
			}

			const event = {
				target: {
					value: `${PHONE_CODE_PREFIX_CHAR}${displayCode}${PHONE_CODE_SEPARATOR}${phoneNumber}`,
					name,
				},
			};
			if (typeof onChange === 'function') {
				onChange(event as ChangeEvent<HTMLInputElement>);
			}
		};

		return (
			<div className={styles.inputWrapper}>
				<input
					className={cx(
						styles.input,
						{ [styles.success]: isSuccess, [styles.error]: isError },
						className
					)}
					type="text"
					name={name}
					aria-invalid={isError ? 'true' : 'false'}
					ref={ref}
					{...props}
					onChange={handleOnNumberChange}
					value={displayNumber}
					inputMode="tel"
					data-testid={dataTestid}
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

Phone.displayName = 'Phone';

export default Phone;
