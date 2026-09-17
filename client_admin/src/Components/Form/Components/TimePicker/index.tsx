import { FC, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { ReactDatePickerProps } from 'react-datepicker';
import { Field, FieldInputProps } from 'react-final-form';
import {
	DATE_FORMAT,
	DATE_TIME_FORMAT,
} from 'Services/LocalizationService/constants';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { InputError, Label, Validators } from 'Components/Form';

import { InputTimePickerProps } from './interfaces';

import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

/**
 * @category Component Input Date Picker
 */
const InputTimePicker: FC<InputTimePickerProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	placeholderText,
	className,
	validate = () => undefined,
	onChange,
	onFocus,
	onBlur,
	showError = false,
	disabled = false,
	showTimeInput = true,
	minDate,
	forceHideError = false,
	afterInputSlot,
	hideErrors,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<Date | null>) => ReactDatePickerProps['onChange']
	>(
		(input) => (date) => {
			input.onChange(date);
			if (typeof onChange === 'function') {
				onChange(date);
			}
		},
		[onChange]
	);

	const handleOnFocus = useCallback<
		(input: FieldInputProps<Date | null>) => ReactDatePickerProps['onFocus']
	>(
		(input) => (event) => {
			input.onFocus(event);
			if (typeof onFocus === 'function') {
				onFocus(event);
			}
		},
		[onFocus]
	);

	const handleOnBlur = useCallback<
		(input: FieldInputProps<Date | null>) => ReactDatePickerProps['onBlur']
	>(
		(input) => (event) => {
			input.onBlur(event);
			if (typeof onBlur === 'function') {
				onBlur(event);
			}
		},
		[onBlur]
	);

	return (
		<Field
			name={name}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				return (
					<div className={cx('date-picker-container', className)}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={Validators.isRequired(validate)}
								className={labelClassName}
							>
								{typeof label == 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<div className="d-flex gap-2 align-items-center">
							<div>
								<LocalizedDatePicker
									name={name}
									id={identifier}
									className="admin-date-picker form-control"
									selected={input.value}
									onChange={handleOnChange(input)}
									onFocus={handleOnFocus(input)}
									onBlur={handleOnBlur(input)}
									showTimeInput={showTimeInput}
									dateFormat={showTimeInput ? DATE_TIME_FORMAT : DATE_FORMAT}
									minDate={minDate}
									placeholderText={placeholderText}
									disabled={disabled}
									autoComplete="off"
								/>
							</div>
							{afterInputSlot}
						</div>

						{!forceHideError &&
							hideErrors?.every((error) => !meta.error?.includes(error)) && (
								<InputError
									errorMessage={get(meta, 'error') || get(meta, 'submitError')}
									touched={get(meta, 'touched', false)}
									show={showError}
								/>
							)}
					</div>
				);
			}}
		</Field>
	);
};

export default InputTimePicker;
