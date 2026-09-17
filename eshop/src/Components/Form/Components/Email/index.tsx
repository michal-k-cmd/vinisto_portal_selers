import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { Field } from 'react-final-form';
import { get, indexOf, isArray, set } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';

import InputError from '../Error';
import FormValidators, { required, requireEmail } from '../../validators';

import { IEmailProps } from './interfaces';
import {
	FIELD_IDENTIFIER,
	FIELD_NAME,
	FIELD_TYPE,
	NOT_FOUND,
} from './constants';
import styles from './styles.module.css';

const { validateEmail, composeValidators } = FormValidators;

const InputEmail = ({
	label,
	readOnly = false,
	className,
	classNameLabel,
	classNameWrapper,
	customId = FIELD_IDENTIFIER,
	customName = FIELD_NAME,
	validate = () => undefined,
	dataTestid,
}: IEmailProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const labelT = label ?? t({ id: 'form.input.email.label' });

	const handleOnReadonlyBlur = useCallback(() => false, []);

	const validators = useMemo(
		() =>
			composeValidators(
				validateEmail,
				...(isArray(validate) ? validate : [validate])
			),
		[validate]
	);

	return (
		<Field
			name={customName}
			validate={validators}
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
						{labelT && (
							<label
								htmlFor={customId}
								className={cx(classNameLabel, {
									'vinisto-label--required':
										validate === required ||
										validate === requireEmail ||
										(isArray(validate) &&
											(indexOf(validate, required) > NOT_FOUND ||
												indexOf(validate, requireEmail) > NOT_FOUND)),
								})}
							>
								{labelT}
							</label>
						)}

						<input
							{...input}
							value={fieldValue}
							id={customId}
							className={cx('form-control', 'vinisto-input', className)}
							type={FIELD_TYPE}
							placeholder={`${t({
								id: 'form.input.email.placeholder',
							})}`}
							data-testid={dataTestid}
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

export default InputEmail;
