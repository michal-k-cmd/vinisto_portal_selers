import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormCheck } from '@coreui/react';
import cx from 'classnames';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { CheckBoxProps } from './interfaces';
import { FIELD_TYPE } from './constants';

import './styles.css';

/**
 * @category Component Input CheckBox
 */
const InputCheckBox: FC<CheckBoxProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate,
	onChange,
	showError = false,
	disabled = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
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
			type={FIELD_TYPE}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				return (
					<div className={className}>
						<Label
							htmlFor={identifier}
							className={cx('vinisto-checkbox', labelClassName)}
							isRequired={Validators.isRequired(validate)}
						>
							{typeof label === 'string' ? t({ id: label }) : label}
							<CFormCheck
								id={identifier}
								disabled={disabled}
								value={input.value}
								checked={input.checked}
								onChange={handleOnChange(input)}
								onBlur={input.onBlur}
								onFocus={input.onFocus}
							/>
							<span className="vinisto-checkbox__checkmark"></span>
						</Label>
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

export default InputCheckBox;
