import { ChangeEventHandler, useCallback, useContext, useMemo } from 'react';
import { CFormInput } from '@coreui/react';
import { Field, FieldInputProps } from 'react-final-form';
import { NOT_FOUND_IN_ARRAY } from 'Components/Form/constants';
import {
	composeValidators,
	required,
	requireEmail,
	validateEmail,
} from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';

import { EmailProps } from './interfaces';

/**
 * @category Component Input Email
 */
const InputEmail = ({
	name,
	identifier,
	label = 'form.input.email.label',
	labelClassName,
	placeholder = 'form.input.email.placeholder',
	className,
	validate = () => undefined,
	onChange,
	showError = false,
	disabled = false,
}: EmailProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			composeValidators(
				...(Array.isArray(validate) ? validate : [validate]),
				validateEmail
			),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<string>) => ChangeEventHandler<HTMLInputElement>
	>(
		(input) => (event) => {
			input.onChange(event);
			if (typeof onChange === 'function') {
				onChange(event.target.value);
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
								isRequired={
									validate === required ||
									validate === requireEmail ||
									(Array.isArray(validate) &&
										(validate.indexOf(required) > NOT_FOUND_IN_ARRAY ||
											validate.indexOf(requireEmail) > NOT_FOUND_IN_ARRAY))
								}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<CFormInput
							{...input}
							className=""
							value={input.value ?? ''}
							type="email"
							id={identifier}
							placeholder={`${t({ id: `${placeholder}` })}`}
							disabled={disabled}
							onChange={handleOnChange(input)}
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

export default InputEmail;
