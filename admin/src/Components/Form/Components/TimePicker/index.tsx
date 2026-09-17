import { FC, useCallback, useContext, useMemo } from 'react';
import { get } from 'Helpers/lodash';
import { ReactDatePickerProps } from 'react-datepicker';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputTimePickerProps } from './interfaces';

import 'react-datepicker/dist/react-datepicker.css';

/**
 * @category Component Input Date Picker
 */
const InputTimePicker: FC<InputTimePickerProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	placeholder,
	className,
	validate = () => undefined,
	onChange,
	showError = false,
	disabled = false,
	minDate,
	minTime,
	maxDate,
	selected,
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

	return (
		<Field
			name={name}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				return (
					<div className={className}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={Validators.isRequired(validate)}
								className={labelClassName}
							>
								{typeof label == 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<LocalizedDatePicker
							name={name}
							id={identifier}
							className="form-control"
							selected={selected ?? (input.value || null)}
							onChange={handleOnChange(input)}
							showTimeInput
							dateFormat={`${t({ id: 'admin.dateFormat.timepicker' })}`}
							minDate={minDate}
							minTime={minTime}
							maxDate={maxDate}
							placeholderText={
								typeof placeholder == 'string'
									? `${t({ id: placeholder })}`
									: placeholder
							}
							disabled={disabled}
							autoComplete="off"
						/>

						<InputError
							errorMessage={get(meta, 'error') || get(meta, 'submitError')}
							touched={get(meta, 'touched', false)}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputTimePicker;
