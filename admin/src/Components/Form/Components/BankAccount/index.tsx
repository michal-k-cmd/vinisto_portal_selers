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
import { isNaN, map, padStart, split, toNumber, trim } from 'Helpers/lodash';
import { Field } from 'react-final-form';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import { InputError, Label, Validators } from 'Components/Form';

import {
	ACCOUNT_LENGTH,
	BANK_ACCOUNT_CODE_SEPRATOR,
	BANK_ACCOUNT_PREFIX_SEPRATOR,
	BANK_CODE_LENGTH,
	PADDING_CHAR,
	PREFIX_LENGTH,
} from './constants';
import { InputBankAccountProps } from './interfaces';

/**
 * @category Component Input Bank Account
 */
const InputBankAccount: FC<InputBankAccountProps> = ({
	name,
	identifier,
	label,
	labelClassName,
	className,
	validate = () => undefined,
	onChange,
	showError = false,
	disabled = false,
}) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [accountPreState, setAccountPreState] = useState('');
	const [accountState, setAccountState] = useState('');
	const [accountCode, setAccountCode] = useState('');

	const isRequired = Validators.isRequired(validate);

	const validators = useCallback(
		composeValidators(
			isRequired
				? (value) => {
						const [, accountNumber, bankCode] = map(
							split(value, bankCodeSeparatorRegExp),
							trim
						);
						if (!accountNumber) {
							return 'form.input.bankAccountNumber.accountNumber.error.empty';
						}
						if (!bankCode) {
							return 'form.input.bankAccountNumber.bankCode.error.empty';
						}
				  }
				: () => undefined,
			(value: any): string | undefined => {
				const [prefix, accountNumber, bankCode] = map(
					split(value, bankCodeSeparatorRegExp),
					trim
				);

				if (
					(accountNumber && !bankCode) ||
					(bankCode && !accountNumber) ||
					(prefix && (!accountNumber || !bankCode))
				) {
					return 'form.input.bankAccountNumber.accountNumber.error.invalid';
				}

				// validation logic stolen from https://github.com/Kudris/validace-cisla-uctu/blob/master/index.php
				if (prefix) {
					const paddedPrefix = padStart(prefix, PREFIX_LENGTH, PADDING_CHAR);

					if (
						(10 * toNumber(paddedPrefix[0]) +
							5 * toNumber(paddedPrefix[1]) +
							8 * toNumber(paddedPrefix[2]) +
							4 * toNumber(paddedPrefix[3]) +
							2 * toNumber(paddedPrefix[4]) +
							1 * toNumber(paddedPrefix[5])) %
							11 !==
						0
					) {
						return 'form.input.bankAccountNumber.prefix.error.invalid';
					}
				}

				if (accountNumber) {
					const paddedAccountNumber = padStart(
						accountNumber,
						ACCOUNT_LENGTH,
						PADDING_CHAR
					);
					if (
						(6 * toNumber(paddedAccountNumber[0]) +
							3 * toNumber(paddedAccountNumber[1]) +
							7 * toNumber(paddedAccountNumber[2]) +
							9 * toNumber(paddedAccountNumber[3]) +
							10 * toNumber(paddedAccountNumber[4]) +
							5 * toNumber(paddedAccountNumber[5]) +
							8 * toNumber(paddedAccountNumber[6]) +
							4 * toNumber(paddedAccountNumber[7]) +
							2 * toNumber(paddedAccountNumber[8]) +
							1 * toNumber(paddedAccountNumber[9])) %
							11 !==
						0
					) {
						return 'form.input.bankAccountNumber.accountNumber.error.invalid';
					}
				}

				if (bankCode) {
					const paddedBankCode = padStart(
						bankCode,
						BANK_CODE_LENGTH,
						PADDING_CHAR
					);
					if (isNaN(toNumber(paddedBankCode))) {
						return 'form.input.bankAccountNumber.bankCode.error.invalid';
					}
					// TODO: validace podle aktualnich ciselniku CNB (https://www.cnb.cz/cs/platebni-styk/ucty-kody-bank/)
				}
			}
		),
		[isRequired]
	);

	const handleOnAccountPreChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountPreState(event?.target?.value ?? '');
		},
		[]
	);

	const handleOnAccountChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountState(event?.target?.value ?? '');
		},
		[]
	);

	const handleOnAccountCodeChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setAccountCode(event?.target?.value ?? '');
		},
		[]
	);

	const bankCodeSeparatorRegExp = useMemo(
		() =>
			new RegExp(
				`${BANK_ACCOUNT_PREFIX_SEPRATOR}|${BANK_ACCOUNT_CODE_SEPRATOR}`,
				'g'
			),
		[]
	);

	return (
		<Field
			name={name}
			validate={validators}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				// Set custom input format on mount
				useEffect(() => {
					const [preState, state, code] = map(
						split(input.value, bankCodeSeparatorRegExp),
						trim
					);
					if (preState) {
						setAccountPreState(preState);
					}
					if (state) {
						setAccountState(state);
					}
					if (code) {
						setAccountCode(code);
					}
				}, []);

				useEffect(() => {
					const value = `${accountPreState} ${BANK_ACCOUNT_PREFIX_SEPRATOR} ${accountState} ${BANK_ACCOUNT_CODE_SEPRATOR} ${accountCode}`;
					input.onChange(value);
					if (typeof onChange === 'function') {
						onChange(value);
					}
				}, [accountPreState, accountState, accountCode]);

				return (
					<>
						{label !== undefined && (
							<Label
								htmlFor={identifier}
								isRequired={isRequired}
								className={labelClassName}
							>
								{typeof label === 'string' ? t({ id: label }) : label}
							</Label>
						)}
						<div className={cx('vinisto-address-bank-account', className)}>
							<input
								onChange={handleOnAccountPreChange}
								className="form-control vinisto-input vinisto-address-bank-account__pre"
								name="bank-pre"
								id={identifier}
								type="text"
								placeholder=""
								value={accountPreState}
								maxLength={PREFIX_LENGTH}
								disabled={disabled}
							/>
							<div className="vinisto-address-bank-account__separator">
								{BANK_ACCOUNT_PREFIX_SEPRATOR}
							</div>
							<input
								onChange={handleOnAccountChange}
								className="form-control vinisto-input vinisto-address-bank-account__account"
								name="bank-account"
								type="text"
								placeholder=""
								value={accountState}
								maxLength={ACCOUNT_LENGTH}
								disabled={disabled}
							/>
							<div className="vinisto-address-bank-account__separator">
								{BANK_ACCOUNT_CODE_SEPRATOR}
							</div>
							<input
								onChange={handleOnAccountCodeChange}
								className="form-control vinisto-input vinisto-address-bank-account__code"
								name="bank-code"
								type="text"
								placeholder=""
								value={accountCode}
								maxLength={BANK_CODE_LENGTH}
								disabled={disabled}
							/>
						</div>
						<InputError
							errorMessage={meta.error}
							touched={true}
							show={showError}
						/>
					</>
				);
			}}
		</Field>
	);
};

export default InputBankAccount;
