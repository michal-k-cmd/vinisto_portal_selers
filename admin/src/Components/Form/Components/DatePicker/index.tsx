import { useCallback, useContext } from 'react';
import LocalizedDatePicker from 'Components/LocalizedDatePicker';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputDatePickerProps } from './interfaces';

import 'react-datepicker/dist/react-datepicker.css';

const InputDatePicker = ({
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
	monthYearOnly = false,
	...restProps
}: InputDatePickerProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnChange = useCallback(
		(input: FieldInputProps<string>) => (value: Date | null) => {
			input.onChange(value);
			if (typeof onChange === 'function') {
				onChange(value);
			}
		},
		[]
	);

	return (
		<Field name={name}>
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
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}

						<LocalizedDatePicker
							className="form-control"
							selected={input.value}
							onChange={handleOnChange(input)}
							dateFormat={`${t({
								id: monthYearOnly
									? 'admin.dateFormat.datepicker.monthYear'
									: 'admin.dateFormat.datepicker',
							})}`}
							placeholderText={placeholder ? `${t({ id: placeholder })}` : ''}
							disabled={disabled}
							showMonthYearPicker={monthYearOnly}
							showFullMonthYearPicker={monthYearOnly}
							{...restProps}
						/>

						<InputError
							errorMessage={meta.error}
							touched={meta.touched}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputDatePicker;
