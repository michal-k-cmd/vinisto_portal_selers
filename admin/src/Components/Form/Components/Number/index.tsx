import { FC, useCallback, useContext, useMemo } from 'react';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';
import { Validator } from 'Components/Form/interfaces';

import Spinner from './Components/Spinner';
import { DEFAULT_MIN } from './constants';
import { InputNumberProps } from './interfaces';

const InputNumber: FC<InputNumberProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate,
	onChange,
	showError = false,
	disabled = false,
	min = DEFAULT_MIN,
	max,
	step,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const minMaxValidators = useMemo(() => {
		const validators: Validator<number>[] = [];
		if (min !== undefined) {
			validators.push(Validators.min(min));
		}
		if (max !== undefined) {
			validators.push(Validators.max(max));
		}
		return validators;
	}, [min, max]);

	const validators = useMemo(
		() =>
			Array.isArray(validate)
				? composeValidators(...validate, ...minMaxValidators)
				: composeValidators(validate ?? (() => undefined), ...minMaxValidators),
		[minMaxValidators, validate]
	);

	const handleOnChange = useCallback(
		(input: FieldInputProps<number>) => (value: string | number) => {
			input.onChange(value);
			if (typeof onChange === 'function') {
				onChange(Number(value));
			}
		},
		[onChange]
	);

	return (
		<Field<number>
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
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<Spinner
							{...input}
							value={input.value}
							onChange={handleOnChange(input)}
							min={min}
							max={max}
							step={step}
							disabled={disabled}
						/>

						<InputError
							errorMessage={meta.error || meta.submitError}
							touched={meta.touched}
							show={showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputNumber;
