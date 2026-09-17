import {
	ChangeEvent,
	FC,
	useCallback,
	useContext,
	useEffect,
	useState,
} from 'react';
import { CFormInput } from '@coreui/react';
import { first, get } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import {
	CODE_NUMBER_SEPARATOR,
	FALLBACK_PHONE_CODE,
	PHONE_PREFIX,
	phoneCodes,
} from '../constants';
import InputPhoneCode from '../InputPhoneCode';

import { getPhoneCodeAndNumber } from './helpers';
import { InputPhoneCodeProps } from './interfaces';

const InputPhoneFields: FC<InputPhoneCodeProps> = ({
	input,
	meta,
	identifier,
	label = 'form.input.phone.label',
	labelClassName,
	placeholder = 'form.input.phone.placeholder',
	className,
	validate,
	onChange,
	showError = false,
	disabled = false,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	const [phoneCode, setPhoneCode] = useState<number>(
		get(first(phoneCodes), 'code', FALLBACK_PHONE_CODE)
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

	useEffect(() => {
		if (meta.initial === undefined) return;
		const [code, number] = getPhoneCodeAndNumber(meta.initial);
		if (code !== null) {
			setPhoneCode(Number(code));
		}
		setPhoneNumber(String(number));
	}, [meta.initial]);

	useEffect(() => {
		if (meta.touched === false) return;
		const fullPhoneNumber = `${PHONE_PREFIX}${phoneCode}${CODE_NUMBER_SEPARATOR}${phoneNumber}`;
		input.onChange(fullPhoneNumber);
		if (typeof onChange === 'function') {
			onChange(fullPhoneNumber);
		}
	}, [meta.touched, input, onChange, phoneCode, phoneNumber]);

	return (
		<div className={className}>
			{label !== undefined && (
				<Label
					htmlFor={identifier}
					isRequired={Validators.isRequired(validate)}
					className={labelClassName}
				>
					{typeof label === 'string' ? t({ id: label }) : label}
				</Label>
			)}
			<div className="vinisto-phone-wrap">
				<InputPhoneCode
					phoneCodes={phoneCodes}
					value={phoneCode}
					onChange={handleOnPhoneCodeChange}
					disabled={disabled}
				/>
				<CFormInput
					{...input}
					id={identifier}
					type="text"
					value={phoneNumber}
					onChange={handleOnPhoneNumberChange}
					placeholder={`${t({ id: placeholder })}`}
					disabled={disabled}
				/>
			</div>
			<InputError
				errorMessage={get(meta, 'error') || get(meta, 'submitError')}
				touched={get(meta, 'touched', false)}
				show={showError}
			/>
		</div>
	);
};

export default InputPhoneFields;
