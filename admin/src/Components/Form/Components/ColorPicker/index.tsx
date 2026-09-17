import { FC, useCallback, useContext, useMemo } from 'react';
import { ColorChangeHandler, SketchPicker } from 'react-color';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { InputColorPickerProps } from './interfaces';

import './styles.css';

/**
 * @category Component Input Color Picker
 */
const InputColorPicker: FC<InputColorPickerProps> = ({
	name,
	label,
	labelClassName,
	className,
	validate = () => undefined,
	onChange,
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
		(input: FieldInputProps<string>): ColorChangeHandler =>
			(value) => {
				input.onChange(value);
				if (typeof onChange === 'function') {
					onChange(value.hex);
				}
			},
		[]
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
								isRequired={Validators.isRequired(validate)}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}

						<SketchPicker
							className="admin-color-picker"
							width="94.6%"
							color={input.value}
							disableAlpha
							onChangeComplete={handleOnChange(input)}
							onChange={handleOnChange(input)}
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

export default InputColorPicker;
