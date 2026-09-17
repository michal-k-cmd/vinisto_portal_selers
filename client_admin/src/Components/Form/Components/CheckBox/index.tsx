import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
} from 'react';
import { CFormCheck } from '@coreui/react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import { FIELD_TYPE } from './constants';
import { CheckBoxProps } from './interfaces';

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
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
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

export default InputCheckBox;
