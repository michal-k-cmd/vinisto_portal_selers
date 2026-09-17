'use client';

import {
	ChangeEvent,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import cx from 'classnames';
import {
	defaultTo,
	first,
	get,
	indexOf,
	isArray,
	replace,
	size,
	split,
	toNumber,
	uniqueId,
} from 'lodash-es';
import { Field } from 'react-final-form';
import {
	DEFAULT_PHONE_CODE,
	PHONE_CODE_PREFIX_CHAR,
	PHONE_CODE_SEPARATOR,
} from 'Components/Form/constants';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Validators } from 'Components/Form';

import { NOT_FOUND, phoneCodes } from './constants';
import { IInputPhoneProps } from './interfaces';
import InputPhoneCode from './Components/InputPhoneCode';

const InputPhone: FC<IInputPhoneProps> = (props) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const validate = get(props, 'validate', () => undefined);

	const placeholder = get(props, 'placeholder')
		? t({ id: get(props, 'placeholder') })
		: 'text';
	const label = get(props, 'label') ? t({ id: get(props, 'label') }) : 'label';
	const fieldId = useMemo(() => get(props, 'identifier', uniqueId()), []);
	const [phoneCode, setPhoneCode] = useState<number>(
		get(first(phoneCodes), 'code', DEFAULT_PHONE_CODE)
	);
	const [phoneNumber, setPhoneNumber] = useState<string>('');

	const handleOnPhoneCodeChange = useCallback((code: number) => {
		setPhoneCode(code);
	}, []);

	const handleOnPhoneNumberChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setPhoneNumber(get(event, 'target.value', ''));
		},
		[]
	);

	const validators = useMemo(
		() =>
			Validators.composeValidators(
				isArray(validate) ? [...validate] : validate,
				Validators.validatePhone
			),
		[validate]
	);

	return (
		<Field
			name={get(props, 'name')}
			validate={validators}
		>
			{(fieldPropTypes: Record<any, any>) => {
				const { input, meta } = fieldPropTypes;

				// Set initial value
				useEffect(() => {
					if (get(input, 'value')) {
						const splittedValue: string[] = split(
							get(input, 'value', ''),
							PHONE_CODE_SEPARATOR
						);
						if (
							size(splittedValue) === 2 &&
							get(splittedValue, '[0][0]') === PHONE_CODE_PREFIX_CHAR
						) {
							setPhoneCode(
								defaultTo(
									toNumber(
										replace(
											get(splittedValue, '[0]', ''),
											PHONE_CODE_PREFIX_CHAR,
											''
										)
									),
									DEFAULT_PHONE_CODE
								)
							);
							setPhoneNumber(get(splittedValue, '[1]', ''));
						} else {
							setPhoneNumber(get(input, 'value'));
						}
					}
				}, []);

				useEffect(() => {
					const onChange = get(input, 'onChange', () => {});
					onChange(
						`${PHONE_CODE_PREFIX_CHAR}${phoneCode}${PHONE_CODE_SEPARATOR}${phoneNumber}`
					);
				}, [phoneCode, phoneNumber]);

				return (
					<>
						<label
							htmlFor={fieldId}
							className={cx({
								'vinisto-label--required':
									validate === Validators.required ||
									(isArray(validate) &&
										indexOf(validate, Validators.required) > NOT_FOUND),
							})}
						>
							{label}
						</label>
						<div className="vinisto-phone-wrap">
							<InputPhoneCode
								phoneCodes={phoneCodes}
								value={phoneCode}
								onChange={handleOnPhoneCodeChange}
							/>
							<input
								{...input}
								id={fieldId}
								value={phoneNumber}
								onChange={handleOnPhoneNumberChange}
								className="form-control vinisto-input"
								type="tel"
								placeholder={`${placeholder}`}
							/>
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

export default InputPhone;
