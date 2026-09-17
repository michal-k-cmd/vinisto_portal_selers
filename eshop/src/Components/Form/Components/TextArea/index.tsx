import * as React from 'react';
import { Field } from 'react-final-form';
import { get, indexOf, isArray, uniqueId } from 'lodash-es';
import cx from 'classnames';
import { composeValidators, required } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';

import InputError from '../Error';

import { NOT_FOUND } from './constants';

const InputTextArea: React.FC<Record<any, any>> = (props): JSX.Element => {
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const placeholder = get(props, 'placeholder')
		? t({ id: get(props, 'placeholder') })
		: '';
	const label = get(props, 'label') ? t({ id: get(props, 'label') }) : 'label';
	const cssClass = get(props, 'className');
	const validate = get(props, 'validate', () => {});
	const fieldId = React.useMemo(() => get(props, 'identifier', uniqueId()), []);

	return (
		<Field
			name={get(props, 'name')}
			validate={isArray(validate) ? composeValidators(...validate) : validate}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;
				const fieldValue =
					get(input, 'value') !== null ? `${get(input, 'value', '')}` : '';

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
						<textarea
							{...input}
							id={fieldId}
							value={fieldValue}
							className={cx('form-control', 'vinisto-input', cssClass)}
							placeholder={`${placeholder}`}
						/>

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

export default InputTextArea;
