import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormTextarea } from '@coreui/react';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { TextAreaProps } from './interfaces';

/**
 * @category Component Input TextArea
 */
const InputTextArea: FC<TextAreaProps> = ({
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
	...rest
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(input: FieldInputProps<string>) => ChangeEventHandler<HTMLTextAreaElement>
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
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';

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
						<CFormTextarea
							{...rest}
							{...input}
							id={identifier}
							value={fieldValue}
							placeholder={
								placeholder !== undefined ? `${t({ id: placeholder })}` : ''
							}
							className="form-control"
							onChange={handleOnChange(input)}
							disabled={disabled}
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

export default InputTextArea;
