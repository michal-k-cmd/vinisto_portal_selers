import { filterProhibitedChars } from 'vinisto_shared';
import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormInput } from '@coreui/react';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputProps } from './interfaces';

const InputText: FC<InputProps> = ({
	type = 'text',
	customKey,
	validate,
	onChange,
	name,
	className,
	label,
	identifier,
	placeholder,
	showError = false,
	disabled = false,
	labelClassName,
	min,
	max,
	step,
	prohibitedChars = [],
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<string>) => ChangeEventHandler<HTMLInputElement>
	>(
		(input) => (event) => {
			const originalEvent = event;
			let newValue = event.target.value;

			if (prohibitedChars.length > 0) {
				newValue = filterProhibitedChars(newValue, prohibitedChars);

				const newEvent = {
					...originalEvent,
					target: {
						...originalEvent.target,
						value: newValue,
					},
				};
				input.onChange(newEvent);
			} else {
				input.onChange(originalEvent);
			}

			if (typeof onChange === 'function') {
				onChange(newValue);
			}
		},
		[onChange, prohibitedChars]
	);

	return (
		<Field
			key={customKey}
			name={name}
			validate={validators}
		>
			{(field) => {
				const { input, meta } = field;
				const fieldValue = input.value ?? '';

				return (
					<div className={className}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								className={labelClassName}
								isRequired={Validators.isRequired(validate)}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<CFormInput
							{...input}
							onChange={handleOnChange(input)}
							value={fieldValue}
							type={type}
							id={identifier}
							placeholder={placeholder ? `${t({ id: placeholder })}` : ''}
							disabled={disabled}
							min={min}
							max={max}
							step={step}
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

export default InputText;
