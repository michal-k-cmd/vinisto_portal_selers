'use client';

import { useCallback, useContext, useMemo, useState } from 'react';
import cx from 'classnames';
import { Field } from 'react-final-form';
import { get, set } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import InputError from '../Error';
import FormValidators from '../../validators';

import ShowPasswordIcon from './Components/ShowPasswordIcon';
import HidePasswordIcon from './Components/HidePasswordIcon';
import { IPasswordProps } from './interfaces';
import {
	CONFIRM_PASSWORD_TYPE,
	FIELD_IDENTIFIER,
	FIELD_NAME,
	FIELD_PASSWORD_TYPE,
	FIELD_SECOND_IDENTIFIER,
	FIELD_SECOND_NAME,
	FIELD_TEXT_TYPE,
	LOGIN_PASSWORD_TYPE,
	PASSWORD_TYPE,
} from './constants';
import styles from './styles.module.css';

const { validatePassword, requirePassword, composeValidators } = FormValidators;

const InputPassword = (props: IPasswordProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
	const passwordType = get(props, 'type', PASSWORD_TYPE);
	const label = get(props, 'label', null);
	const hideLabel = get(props, 'hideLabel', null);
	const readOnly = get(props, 'readOnly', false);
	const isShowPasswordToggle = get(props, 'showPasswordToggle', true);
	const customName = get(props, 'name');
	const customId = get(props, 'id');
	const classNameWrapper = get(props, 'classNameWrapper');
	const classNameLabel = get(props, 'classNameLabel');
	const className = get(props, 'className');

	const handleOnReadonlyBlur = useCallback(() => false, []);

	const handleSetIsPaswordVisible = useCallback(() => {
		setIsPasswordVisible(!isPasswordVisible);
	}, [isPasswordVisible]);

	const getPasswordValidationByType = useCallback(() => {
		if (passwordType === LOGIN_PASSWORD_TYPE) {
			return composeValidators(requirePassword);
		} else if (passwordType === PASSWORD_TYPE) {
			return composeValidators(requirePassword, validatePassword);
		} else if (passwordType === CONFIRM_PASSWORD_TYPE) {
			return composeValidators(requirePassword);
		}

		return undefined;
	}, [passwordType]);

	const fieldName = useMemo(
		() =>
			customName ??
			(passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE
				? FIELD_NAME
				: FIELD_SECOND_NAME),
		[customName, passwordType]
	);
	const fieldId = useMemo(
		() =>
			customId ??
			(passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE
				? FIELD_IDENTIFIER
				: FIELD_SECOND_IDENTIFIER),
		[customId, passwordType]
	);

	return (
		<Field
			name={fieldName}
			validate={getPasswordValidationByType()}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';

				if (readOnly) {
					set(input, 'readOnly', true);
					set(input, 'onBlur', handleOnReadonlyBlur); // disable validation
				}

				return (
					<div className={cx(styles.wrapper, classNameWrapper)}>
						{!hideLabel && (
							<label
								htmlFor={fieldId}
								className={cx('vinisto-label--required', classNameLabel)}
							>
								{label
									? label
									: passwordType === PASSWORD_TYPE ||
									  passwordType === LOGIN_PASSWORD_TYPE
									? t({ id: 'form.input.password.label' })
									: t({
											id: 'form.input.confirmPassword.label',
									  })}
							</label>
						)}
						<div className="position-relative">
							<input
								{...input}
								value={fieldValue}
								id={fieldId}
								className={cx('form-control vinisto-input', className)}
								type={isPasswordVisible ? FIELD_TEXT_TYPE : FIELD_PASSWORD_TYPE}
								placeholder={
									passwordType === PASSWORD_TYPE ||
									passwordType === LOGIN_PASSWORD_TYPE
										? `${t({
												id: 'form.input.password.placeholder',
										  })}`
										: `${t({
												id: 'form.input.confirmPassword.placeholder',
										  })}`
								}
								data-testid={props.dataTestid}
							/>
							{isShowPasswordToggle && (
								<button
									className="vinisto-popup__show-password"
									type="button"
									onClick={handleSetIsPaswordVisible}
								>
									{!isPasswordVisible ? (
										<HidePasswordIcon />
									) : (
										<ShowPasswordIcon />
									)}
								</button>
							)}
						</div>
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

export default InputPassword;
