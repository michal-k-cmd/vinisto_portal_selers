import { useCallback, useContext, useMemo } from 'react';
import cx from 'classnames';
import { Field } from 'react-final-form';
import { get, indexOf, isArray, isFunction, set, uniqueId } from 'lodash-es';
import { composeValidators, required } from 'Components/Form/validators';
import InputError from 'Components/Form/Components/Error';
import { LocalizationContext } from 'Services/LocalizationService';

import { NOT_FOUND } from './constants';

const InputText = (props: Record<any, any>) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const placeholder = get(props, 'placeholder')
		? t({ id: get(props, 'placeholder') })
		: '';
	const label = get(props, 'label') ? t({ id: get(props, 'label') }) : '';
	const customLabel = get(props, 'customLabel');
	const readOnly = get(props, 'readOnly', false);
	const maxLength = get(props, 'maxLength', null);
	const validate = get(props, 'validate', () => {});
	const className = get(props, 'className');
	const classNameWrapper = get(props, 'classNameWrapper');
	const labelClassName = get(props, 'labelClassName');
	const handleOnChange = get(props, 'onChange');
	const validateOnBlur = get(props, 'validateOnBlur', true); // Default to true for backward compatibility
	const fieldId = useMemo(() => get(props, 'identifier') ?? uniqueId(), []);

	const preventValidationOnBlur = useCallback(() => false, []);

	return (
		<Field
			name={get(props, 'name')}
			validate={isArray(validate) ? composeValidators(...validate) : validate}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';

				if (readOnly) {
					set(input, 'readOnly', true);
					set(input, 'onBlur', preventValidationOnBlur); // disable validation
				}

				if (!validateOnBlur) {
					set(input, 'onBlur', preventValidationOnBlur);
				}

				if (!isNaN(parseInt(maxLength))) {
					set(input, 'maxLength', parseInt(maxLength));
				}

				if (isFunction(handleOnChange)) {
					const defaultOnChange = input.onChange;
					input.onChange = (...args) => {
						defaultOnChange(...args);
						handleOnChange(...args);
					};
				}

				return (
					<div className={classNameWrapper}>
						<label
							htmlFor={fieldId}
							className={cx(labelClassName, {
								'vinisto-label--required':
									validate === required ||
									(isArray(validate) &&
										indexOf(validate, required) > NOT_FOUND),
							})}
						>
							{customLabel ? customLabel : label}
						</label>
						<input
							{...input}
							id={fieldId}
							value={fieldValue}
							className={cx('form-control', 'vinisto-input', className)}
							type="text"
							placeholder={`${placeholder}`}
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

export default InputText;
