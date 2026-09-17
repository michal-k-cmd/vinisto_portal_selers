import {
	ChangeEventHandler,
	FC,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react';
import { CFormInput } from '@coreui/react';
import cx from 'classnames';
import { get } from 'lodash-es';
import { Field, FieldInputProps } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';
import {
	composeValidators,
	requiredCustomMessage,
} from 'Components/Form/validators';

import { FIELD_PASSWORD_TYPE, FIELD_TEXT_TYPE } from './constants';
import { PasswordProps } from './interfaces';
import HidePasswordIcon from './Components/HidePasswordIcon';
import ShowPasswordIcon from './Components/ShowPasswordIcon';

/**
 * @category Component Input Password
 */
const InputPassword: FC<PasswordProps> = ({
	name,
	identifier,
	label = 'form.input.password.label',
	labelClassName,
	placeholder = 'form.input.password.placeholder',
	className,
	validate = () => undefined,
	onChange,
	showError,
	disabled = false,
	isRequired = true,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const handleSetIsPaswordVisible = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const validators = useMemo(
		() =>
			composeValidators(
				requiredCustomMessage('form.input.password.requireValidation'),
				...(Array.isArray(validate) ? validate : [validate])
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
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';

				return (
					<div className={cx('position-relative', className)}>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={isRequired}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<div className="position-relative">
							<CFormInput
								{...input}
								value={fieldValue}
								className=""
								type={isPasswordVisible ? FIELD_TEXT_TYPE : FIELD_PASSWORD_TYPE}
								id={identifier}
								placeholder={
									placeholder !== undefined ? `${t({ id: placeholder })}` : ''
								}
								onChange={handleOnChange(input)}
								disabled={disabled}
							/>

							<div
								className="vinisto-popup__show-password"
								onClick={handleSetIsPaswordVisible}
							>
								{!isPasswordVisible ? (
									<HidePasswordIcon />
								) : (
									<ShowPasswordIcon />
								)}
							</div>
						</div>

						<InputError
							errorMessage={get(meta, 'error') || get(meta, 'submitError')}
							touched={get(meta, 'touched', false)}
							show={!!showError}
						/>
					</div>
				);
			}}
		</Field>
	);
};

export default InputPassword;
