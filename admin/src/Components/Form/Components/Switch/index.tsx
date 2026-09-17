import { FC, useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { Field, FieldInputProps } from 'react-final-form';
import { CFormSwitch } from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputSwitchProps } from './interfaces';

import './styles.css';

/**
 * @category Component Input Switch
 */
const InputSwitch: FC<InputSwitchProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate = () => undefined,
	onChange,
	disabled = false,
	showError = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
		[validate]
	);

	const handleOnChange = useCallback(
		(input: FieldInputProps<boolean>) => (checked: boolean) => {
			input.onChange(checked);
			if (typeof onChange === 'function') {
				onChange(checked);
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
								className={cx(labelClassName, 'vinisto-switch-label')}
							>
								{typeof label == 'string' ? t({ id: label }) : label}
							</Label>
						)}

						<CFormSwitch
							name={input.name}
							onBlur={input.onBlur}
							onFocus={input.onFocus}
							onChange={(event) =>
								handleOnChange(input)(event.currentTarget.checked)
							}
							checked={!!input.value}
							disabled={disabled}
							id={identifier}
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

export default InputSwitch;
