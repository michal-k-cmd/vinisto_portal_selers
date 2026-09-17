import { FC, useCallback, useContext, useMemo } from 'react';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import Switch, { ReactSwitchProps } from 'react-switch';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputSwitchProps } from './interfaces';

/**
 * @category Component Input Switch
 */
const InputSwitch: FC<InputSwitchProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate,
	onChange,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	const handleOnChange = useCallback<
		(
			input: FieldInputProps<boolean>
		) => (...params: Parameters<ReactSwitchProps['onChange']>) => void
	>(
		(input) => (checked, event) => {
			input.onChange(event);
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
				const fieldValue = !!get(input, 'value', false);
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
						<Switch
							{...input}
							value={String(input.value)}
							onChange={handleOnChange(input)}
							checked={fieldValue}
							width={40}
							height={20}
							id={identifier}
						/>

						<InputError
							errorMessage={get(meta, 'error') || get(meta, 'submitError')}
							touched={get(meta, 'touched', false)}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputSwitch;
