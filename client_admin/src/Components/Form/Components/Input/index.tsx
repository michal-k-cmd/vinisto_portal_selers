import { filterProhibitedChars } from 'vinisto_shared';
import {
	ChangeEventHandler,
	FC,
	FocusEventHandler,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormInput } from '@coreui/react';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputProps } from './interfaces';
import styles from './styles.module.css';

/**
 * @category Component Input Text
 */
const InputText: FC<InputProps> = ({
	type = 'text',
	customKey,
	validate,
	onChange,
	onFocus,
	onBlur,
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
	prefix,
	suffix,
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

	const handleOnFocus = useCallback<
		(input: FieldInputProps<string>) => FocusEventHandler<HTMLInputElement>
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
		(input: FieldInputProps<string>) => FocusEventHandler<HTMLInputElement>
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
						<div className={styles.inputWrapper}>
							{prefix}
							<CFormInput
								{...input}
								onChange={handleOnChange(input)}
								onFocus={handleOnFocus(input)}
								onBlur={handleOnBlur(input)}
								value={fieldValue}
								type={type}
								id={identifier}
								placeholder={
									placeholder !== undefined ? `${t({ id: placeholder })}` : ''
								}
								disabled={disabled}
								min={min}
								max={max}
							/>
							{suffix}
						</div>
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

export default InputText;
