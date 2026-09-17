import * as React from 'react';
import { Field, useForm } from 'react-final-form';
import { get, indexOf, isArray, uniqueId } from 'lodash-es';
import cx from 'classnames';
import {
	composeValidators,
	required,
	validateIco,
} from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';

import InputError from '../Error';

import { ICO_LENGTH, NOT_FOUND } from './constants';

/**
 * @category Component Input ICO
 */
const InputIco: React.FC<Record<any, any>> = (props): JSX.Element => {
	const form = useForm();
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const placeholder = get(props, 'placeholder')
		? t({ id: get(props, 'placeholder') })
		: 'text';
	const label = get(props, 'label') ? t({ id: get(props, 'label') }) : 'label';
	const validate = get(props, 'validate', () => {});
	const fieldId = React.useMemo(
		() => get(props, 'identifier') ?? uniqueId(),
		[]
	);
	const onAres = get(props, 'onAres', () => {});
	const validateOnBlur = get(props, 'validateOnBlur', false);
	const handleOnAres = React.useCallback(
		(isError: boolean, value: string) => () => {
			if (isError) {
				return;
			}
			onAres(value);
		},
		[onAres]
	);

	const validators = React.useMemo(
		() =>
			composeValidators(
				...(isArray(validate) ? validate : [validate]),
				validateIco
			),
		[validate]
	);

	return (
		<Field
			name={get(props, 'name')}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';
				const isError = !!get(meta, 'error') && get(meta, 'touched', false);
				const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
					if (!validateOnBlur) {
						input.onBlur(event);
						return;
					}

					form.setConfig('validateOnBlur', true);
					input.onBlur(event);
					form.setConfig('validateOnBlur', false);
				};

				return (
					<>
						<label
							htmlFor={fieldId}
							className={cx({
								'vinisto-label--required':
									validate === required ||
									(isArray(validate) &&
										indexOf(validate, required) > NOT_FOUND),
							})}
						>
							{label}
						</label>
						<div className="vinisto-address-ico-wrap">
							<input
								{...input}
								onBlur={handleBlur}
								id={fieldId}
								value={fieldValue}
								className="form-control vinisto-input"
								type={'text'}
								placeholder={`${placeholder}`}
								maxLength={ICO_LENGTH}
							/>
							<button
								className="vinisto-btn vinisto-bg vinisto-address-ico__btn"
								type="button"
								onClick={handleOnAres(isError, fieldValue)}
							>
								{t({ id: 'addInvoiceForm.ARESButton' })}
							</button>
						</div>
						<InputError
							errorMessage={get(meta, 'error')}
							touched={get(meta, 'touched', false)}
						/>
					</>
				);
			}}
		</Field>
	);
};

export default InputIco;
