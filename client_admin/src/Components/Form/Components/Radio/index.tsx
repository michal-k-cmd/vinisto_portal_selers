import { ChangeEventHandler, FC, useCallback, useContext } from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';

import { IRadioProps } from './interfaces';
import { FIELD_TYPE } from './constants';

/**
 * @category Component Input Radio
 */
const InputRadio: FC<IRadioProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	onChange,
	showError = false,
	disabled = false,
	value,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

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
			type={FIELD_TYPE}
			name={name}
			value={value}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				return (
					<div className={cx('vinisto-radio-check', 'mb-1', className)}>
						<input
							className="vinisto-radio-check__radio"
							id={identifier}
							{...input}
							type={FIELD_TYPE}
							disabled={disabled}
							onChange={handleOnChange(input)}
						/>
						<Label
							htmlFor={identifier}
							className={labelClassName}
						>
							{typeof label === 'string' ? t({ id: label }) : label}
						</Label>
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

export default InputRadio;
