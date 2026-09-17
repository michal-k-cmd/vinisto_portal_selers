import * as React from 'react';
import { Field } from 'react-final-form';
import {
	get,
	isNaN,
	map,
	padStart,
	split,
	toNumber,
	trim,
	uniqueId,
} from 'lodash-es';
import cx from 'classnames';
import { composeValidators } from 'Components/Form/validators';
import { LocalizationContext } from 'Services/LocalizationService';
import InputError from 'Components/Form/Components/Error';

import {
	ACCOUNT_LENGTH,
	BANK_ACCOUNT_CODE_SEPRATOR,
	BANK_ACCOUNT_PREFIX_SEPRATOR,
	BANK_CODE_LENGTH,
	PADDING_CHAR,
	PREFIX_LENGTH,
} from './constants';
import { IInputBankAccountProps } from './interfaces';

const InputBankAccount: React.FC<IInputBankAccountProps> = (
	props: IInputBankAccountProps
): JSX.Element => {
	const [accountPreState, setAccountPreState] = React.useState('');
	const [accountState, setAccountState] = React.useState('');
	const [accountCode, setAccountCode] = React.useState('');
	const localizationContext = React.useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const label = get(props, 'label') ? t({ id: get(props, 'label') }) : '';
	const fieldId = React.useMemo(
		() => get(props, 'identifier') ?? uniqueId(),
		[]
	);

	const isRequired = get(props, 'isRequired', false);
	const validate = React.useCallback(
		composeValidators(
			isRequired
				? (value: any): string | undefined => {
						const [accountNumber, bankCode] = map(
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
				: () => {},
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

	const handleOnAccountPreChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setAccountPreState(get(event, 'target.value', ''));
		},
		[]
	);

	const handleOnAccountChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setAccountState(get(event, 'target.value', ''));
		},
		[]
	);

	const handleOnAccountCodeChange = React.useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setAccountCode(get(event, 'target.value', ''));
		},
		[]
	);

	const bankCodeSeparatorRegExp = React.useMemo(
		() =>
			new RegExp(
				`${BANK_ACCOUNT_PREFIX_SEPRATOR}|${BANK_ACCOUNT_CODE_SEPRATOR}`,
				'g'
			),
		[]
	);

	return (
		<Field
			name={get(props, 'name')}
			{...{ validate }}
		>
			{(fieldPropTypes) => {
				const { input, meta } = fieldPropTypes;

				// Set custom input format on mount
				React.useEffect(() => {
					const [preState, state, code] = map(
						split(
							get(
								input,
								'value',
								` ${BANK_ACCOUNT_PREFIX_SEPRATOR} ${BANK_ACCOUNT_CODE_SEPRATOR} `
							),
							bankCodeSeparatorRegExp
						),
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

				React.useEffect(() => {
					const onChange = get(input, 'onChange', () => {});
					onChange(
						`${accountPreState} ${BANK_ACCOUNT_PREFIX_SEPRATOR} ${accountState} ${BANK_ACCOUNT_CODE_SEPRATOR} ${accountCode}`
					);
				}, [accountPreState, accountState, accountCode]);

				return (
					<>
						<label
							htmlFor={fieldId}
							className={cx({
								'vinisto-label--required': isRequired,
							})}
						>
							{label}
						</label>
						<div className="vinisto-address-bank-account">
							<input
								onChange={handleOnAccountPreChange}
								className="form-control vinisto-input vinisto-address-bank-account__pre"
								name="bank-pre"
								id={fieldId}
								type="text"
								placeholder=""
								value={accountPreState}
								maxLength={PREFIX_LENGTH}
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
							/>
						</div>
						<InputError
							errorMessage={get(meta, 'error')}
							touched={true}
						/>
					</>
				);
			}}
		</Field>
	);
};

export default InputBankAccount;
