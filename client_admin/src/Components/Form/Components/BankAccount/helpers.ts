import { isNaN, map, padStart, split, toNumber, trim } from 'lodash-es';
import { Validator } from 'Components/Form/interfaces';

import {
	ACCOUNT_LENGTH,
	BANK_ACCOUNT_CODE_SEPRATOR,
	BANK_ACCOUNT_FALLBACK,
	BANK_ACCOUNT_PREFIX_SEPRATOR,
	BANK_CODE_LENGTH,
	PADDING_CHAR,
	PREFIX_LENGTH,
} from './constants';

export const bankCodeSeparatorRegExp = new RegExp(
	`${BANK_ACCOUNT_PREFIX_SEPRATOR}|${BANK_ACCOUNT_CODE_SEPRATOR}`,
	'g'
);

export const validateBankAccount: Validator<string> = (value) => {
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
		const paddedBankCode = padStart(bankCode, BANK_CODE_LENGTH, PADDING_CHAR);
		if (isNaN(toNumber(paddedBankCode))) {
			return 'form.input.bankAccountNumber.bankCode.error.invalid';
		}
		// TODO: validace podle aktualnich ciselniku CNB (https://www.cnb.cz/cs/platebni-styk/ucty-kody-bank/)
	}
};

export const requiredBankAccount: Validator<string> = (value) => {
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
};

export const getBankAccountNumberParts = (
	value: string
): [string, string, string] => {
	return map(
		split(value ? value : BANK_ACCOUNT_FALLBACK, bankCodeSeparatorRegExp),
		trim
	) as [string, string, string];
};
