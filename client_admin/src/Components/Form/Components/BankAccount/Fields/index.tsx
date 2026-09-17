import {
	ChangeEvent,
	FC,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { CFormInput } from '@coreui/react';
import { get, uniqueId } from 'lodash-es';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label } from 'Components/Form';

import {
	ACCOUNT_LENGTH,
	BANK_ACCOUNT_CODE_SEPRATOR,
	BANK_ACCOUNT_PREFIX_SEPRATOR,
	BANK_CODE_LENGTH,
	PREFIX_LENGTH,
} from '../constants';
import { getBankAccountNumberParts } from '../helpers';

import { FieldsProps } from './interfaces';

const Fields: FC<FieldsProps> = ({
	input,
	meta,
	identifier,
	label,
	labelClassName,
	className,
	onChange,
	showError = true,
	disabled,
	isRequired = false,
}) => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();
	const [accountPreState, setAccountPreState] = useState('');
	const [accountState, setAccountState] = useState('');
	const [accountCode, setAccountCode] = useState('');

	const fieldId = useMemo(() => identifier ?? uniqueId(), [identifier]);

	const handleOnAccountPreChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountPreState(event.target.value);
		},
		[]
	);

	const handleOnAccountChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountState(event.target.value);
		},
		[]
	);

	const handleOnAccountCodeChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountCode(event.target.value);
		},
		[]
	);

	// Set custom input format on mount
	useEffect(() => {
		const [preState, state, code] = getBankAccountNumberParts(input.value);
		setAccountPreState(preState ?? '');
		setAccountState(state ?? '');
		setAccountCode(code ?? '');
	}, [input.value]);

	const inputOnChange = input.onChange;

	useEffect(() => {
		const accountPreStateZeroFill =
			accountPreState === '' && accountState !== ''
				? '000000'
				: accountPreState;
		const bankAccountNumber = `${accountPreStateZeroFill} ${BANK_ACCOUNT_PREFIX_SEPRATOR} ${accountState} ${BANK_ACCOUNT_CODE_SEPRATOR} ${accountCode}`;
		inputOnChange(bankAccountNumber);
		if (typeof onChange === 'function') {
			onChange(bankAccountNumber);
		}
	}, [accountPreState, accountState, accountCode, inputOnChange, onChange]);

	return (
		<div className={className}>
			{label !== undefined && (
				<Label
					htmlFor={fieldId}
					isRequired={isRequired}
					className={labelClassName}
				>
					{typeof label === 'string' ? t({ id: label }) : label}
				</Label>
			)}
			<div className="vinisto-address-bank-account">
				<CFormInput
					onChange={handleOnAccountPreChange}
					className="vinisto-address-bank-account__pre"
					name="bank-pre"
					id={fieldId}
					type="text"
					placeholder={`${t({ id: 'form.bankAccount.pre.placeholder' })}`}
					value={accountPreState}
					maxLength={PREFIX_LENGTH}
					disabled={!!disabled}
				/>
				<div className="vinisto-address-bank-account__separator">
					{BANK_ACCOUNT_PREFIX_SEPRATOR}
				</div>
				<CFormInput
					onChange={handleOnAccountChange}
					className="vinisto-address-bank-account__account"
					name="bank-account"
					type="text"
					placeholder={`${t({ id: 'form.bankAccount.number.placeholder' })}`}
					value={accountState}
					maxLength={ACCOUNT_LENGTH}
					disabled={!!disabled}
				/>
				<div className="vinisto-address-bank-account__separator">
					{BANK_ACCOUNT_CODE_SEPRATOR}
				</div>
				<CFormInput
					onChange={handleOnAccountCodeChange}
					className="vinisto-address-bank-account__code"
					name="bank-code"
					type="text"
					placeholder={`${t({ id: 'form.bankAccount.code.placeholder' })}`}
					value={accountCode}
					maxLength={BANK_CODE_LENGTH}
					disabled={!!disabled}
				/>
			</div>
			<InputError
				errorMessage={get(meta, 'error')}
				touched={true}
				show={showError}
			/>
		</div>
	);
};

export default Fields;
