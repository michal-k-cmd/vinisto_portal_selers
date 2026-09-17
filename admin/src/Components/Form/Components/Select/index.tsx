import { ChangeEventHandler, useCallback, useContext, useMemo } from 'react';
import { CFormSelect } from '@coreui/react';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputSelectProps, Option } from './interfaces';

const InputSelect = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate = () => undefined,
	onChange,
	disabled = false,
	showError = false,
	options,
	initialValue,
}: InputSelectProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<string>) => ChangeEventHandler<HTMLSelectElement>
	>(
		(input) => (event) => {
			// Not sure if this is HTML, final-form or CoreUI specific, but after onChange event,
			// if the "empty" option is selected, the value is set to the label of the option.
			// which somehow breaks the required validation (the submitted value is still empty though).
			if (event.target.value === `${t({ id: 'value.pick' })}`) {
				event.target.value = '';
			}
			input.onChange(event);
			if (typeof onChange === 'function') {
				onChange(event.target.value);
			}
		},
		[onChange, t]
	);

	const optionsWithInitialValue = useMemo(
		() =>
			options &&
			options.length > 0 &&
			typeof options[0] !== 'string' &&
			options?.[0]?.label !== ''
				? [
						{
							label: `${t({ id: 'value.pick' })}`,
							value: '',
						},
						...(options as Option[]),
				  ]
				: (options as Option[]),
		[options, t]
	);

	return (
		<Field
			name={name}
			validate={validators}
			initialValue={initialValue}
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
						<CFormSelect
							name={name}
							id={identifier}
							options={optionsWithInitialValue}
							value={input.value}
							onChange={handleOnChange(input)}
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

export default InputSelect;
