import { ReactNode, useContext } from 'react';
import cx from 'classnames';
import {
	Country,
	getCountryCallingCode,
	isPossiblePhoneNumber,
} from 'react-phone-number-input';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import cz from 'react-phone-number-input/locale/cz';
import {
	ControllerProps,
	FieldPath,
	FieldValues,
	useController,
} from 'react-hook-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { TestIdType } from 'Constants/test-ids';
import Form from 'Components/Forms';
import styles from 'Components/Forms/Components/Input/styles.module.css';
import ArrowDown from 'Components/Icons/FilterDropdownArrow';

import localStyles from './styles.module.css';

import 'react-phone-number-input/style.css';

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
	rules?: ControllerProps['rules'];
	dataTestid?: TestIdType;
};

type PhoneFieldProps = TPhoneField & {
	control?: ControllerProps['control'];
};

const PhoneField = ({
	id,
	name,
	label,
	placeholder,
	showSuccess = false,
	//showSuccessIcon = false,
	showError = true,
	successMessage,
	isRequired = false,
	rules,
	dataTestid,
	control,
}: PhoneFieldProps) => {
	const { countryOfSale, useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	const {
		fieldState: { error, isTouched },
	} = useController({
		control,
		name,
		rules: {
			...rules,
			validate: (value: string) => {
				if (!isPossiblePhoneNumber(value)) {
					return `${t({ id: 'form.input.phone.wrongFormat' })}`;
				}
				return true;
			},
		},
	});

	return (
		<div
			className={cx(localStyles.wrapper, styles.inputWrapper, {
				[styles.success]: !error && isTouched && showSuccess,
				[styles.error]: error && showError,
			})}
		>
			{!!label && (
				<Form.Label
					isRequired={isRequired || !!rules?.required}
					htmlFor={id}
				>
					{label}
				</Form.Label>
			)}
			<PhoneInputWithCountry
				name={name}
				placeholder={placeholder}
				control={control}
				id={id}
				labels={cz}
				defaultCountry={countryOfSale as Country}
				data-testid={dataTestid}
				countryOptionsOrder={['CZ', 'SK']}
				addInternationalOption={false}
				countrySelectComponent={CountrySelect}
			/>
			{!!error && <Form.Message variant="error">{error.message}</Form.Message>}
			{!error && isTouched && successMessage && (
				<Form.Message variant="success">{successMessage}</Form.Message>
			)}
		</div>
	);
};

export default PhoneField;

interface CountrySelectProps {
	name?: string;
	value?: string;
	onChange: (value?: string) => void;
	onFocus?: () => void;
	onBlur?: () => void;
	options: Array<{ value?: string; label: string }>;
	iconComponent: React.ComponentType<{
		country?: string;
		style?: React.CSSProperties;
	}>;
	disabled?: boolean;
	readOnly?: boolean;
	tabIndex?: number | string;
	className?: string;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
	name,
	value,
	onChange,
	onFocus,
	onBlur,
	options,
	iconComponent: IconComponent,
	disabled,
	readOnly,
	tabIndex,
	className,
}) => {
	return (
		<div className={cx(localStyles.countrySelectWrapper, className)}>
			<select
				name={name}
				value={value || ''}
				onChange={(e) => onChange(e.target.value || undefined)}
				onFocus={onFocus}
				onBlur={onBlur}
				disabled={disabled || readOnly}
				tabIndex={
					typeof tabIndex === 'string' ? parseInt(tabIndex, 10) : tabIndex
				}
				className={localStyles.countrySelect}
			>
				{options.map((option) => (
					<option
						key={option.value || 'international'}
						value={option.value || ''}
					>
						{option.value
							? `${option.label} +${getCountryCallingCode(
									option.value as Country
							  )}`
							: option.label}
					</option>
				))}
			</select>
			<div className={localStyles.countrySelectDisplay}>
				<IconComponent country={value} />
				<span className={localStyles.countryCode}>
					{value ? `+ ${getCountryCallingCode(value as Country)}` : ''}
				</span>
				<ArrowDown className={localStyles.caret} />
			</div>
		</div>
	);
};
