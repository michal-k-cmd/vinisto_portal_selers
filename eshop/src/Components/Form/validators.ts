import {
	head,
	isNaN,
	last,
	map,
	padStart,
	size,
	some,
	split,
	toNumber,
} from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';
import api from 'vinisto_api_client/src/api';

import { memoize, PHONE_FORMAT } from './constants';

const AGE_LIMIT_ADULT = 18;

export const validateIfEmailExists = memoize(async (email: string) => {
	if (typeof email === 'string') {
		const apiEndpoint = 'user-api/users/IsEmailAlreadyUsed';
		const result = await api
			.get(`${apiEndpoint}?email=${email}`)
			.then((data: any) => data.result);
		if (!result) return '';
		return `form.input.email.emailExists`;
	} else {
		return '';
	}
});

export const validateEmail = (email?: string): string | undefined => {
	const regExp =
		/^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

	if (!email) {
		return;
	}

	const emailParts = split(email, '@');

	if (emailParts.length !== 2) {
		return 'form.input.email.badEmailValidation';
	}

	const account = head(emailParts);
	const address = last(emailParts);

	if (size(account) > 64) {
		return 'form.input.email.badEmailValidation';
	} else if (size(account) > 255) {
		return 'form.input.email.badEmailValidation';
	}

	const domainParts = split(address, '.');
	if (
		some(domainParts, (part) => {
			return size(part) > 63;
		})
	) {
		return 'form.input.email.badEmailValidation';
	}

	if (!regExp.test(email)) {
		return 'form.input.email.badEmailValidation';
	}

	return;
};

const phoneRegex = new RegExp(`${map(PHONE_FORMAT).join('|')}`);

const validatePhone = (value: string) => {
	if (!phoneRegex.exec(value)) {
		return 'form.input.phone.wrongFormat';
	}
};

export const validatePassword = (password?: string): string | undefined => {
	// const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

	if (!password) {
		return 'form.input.password.requiredValidation';
	}

	if (size(password) < 3) {
		return 'form.input.password.tooWeakValidation';
	}

	// if (!regExp.test(password)) {
	//   return 'form.input.password.tooWeakValidation';
	// }

	return;
};

const isIcoValid = (value: string): boolean => {
	if (!value.match(/^\d{8}$/)) {
		return false;
	}
	const digits = split(value, '');
	let sum = 0;
	for (let i = 0; i < 7; i += 1) {
		sum += toNumber(digits[i]) * (8 - i);
	}
	sum = sum % 11;

	let lastDigitCheck;
	if (sum == 1) {
		lastDigitCheck = 0;
	} else if (sum === 0 || sum === 10) {
		lastDigitCheck = 1;
	} else {
		lastDigitCheck = 11 - sum;
	}
	return toNumber(digits[7]) === lastDigitCheck;
};

export const validateIco = (value: string): string | undefined => {
	if (value && !isIcoValid(value)) {
		return 'addAddressForm.ares.documentError';
	}
};

const isBirthNumberCzSkValid = (value: string, ageLimit = 0): boolean => {
	const matches = value.match(/^\s*(\d\d)(\d\d)(\d\d)[ /]*(\d\d\d)(\d?)\s*$/);
	if (matches === null) {
		return false;
	}

	// eslint-disable-next-line prefer-const
	let [, year, month, day, birthNumberEnd, c] = map(matches, (v) =>
		parseInt(v)
	);
	// do roku 1954 přidělovaná devítimístná RČ nelze ověřit
	if (isNaN(c)) {
		return year < 54;
	}

	let m =
		toNumber(
			`${padStart(String(year), 2, '0')}${padStart(
				String(month),
				2,
				'0'
			)}${padStart(String(day), 2, '0')}${padStart(
				String(birthNumberEnd),
				3,
				'0'
			)}`
		) % 11;
	if (m === 10) m = 0;
	if (m !== c) {
		return false;
	}

	year += year < 54 ? 2000 : 1900;

	if (year + ageLimit > new Date().getFullYear()) {
		return false;
	}

	if (month > 70 && year > 2003) {
		month -= 70;
	} else if (month > 50) {
		month -= 50;
	} else if (month > 20 && year > 2003) {
		month -= 20;
	}

	return dayjs(
		`${year}-${padStart(String(month), 2, '0')}-${padStart(
			String(day),
			2,
			'0'
		)}`
	).isValid();
};

export const validateDic = (value: string): string | undefined => {
	if (!value) {
		return;
	}
	const valueNumber = value.substring(2);
	if (
		valueNumber.length < 8 ||
		valueNumber.length > 11 ||
		!value.match(/^(CZ|SK)/i) ||
		(valueNumber.length === 8 && !isIcoValid(valueNumber)) ||
		(valueNumber.length !== 8 &&
			!isBirthNumberCzSkValid(valueNumber, AGE_LIMIT_ADULT))
	) {
		return 'cartShippingData.form.dicField.error.invalid';
	}
};

export const requirePassword = (password?: string): string | undefined => {
	return password ? undefined : 'form.input.password.requiredValidation';
};

export const requireEmail = (email?: string): string | undefined => {
	return email ? undefined : 'form.input.email.requiredValidation';
};

export const required = (value: any): string | undefined => {
	return value ? undefined : 'form.input.field.requiredValidation';
};

export const composeValidators = (...validators: any[]) => {
	return (value: string | null | undefined) => {
		return validators.reduce((error, validator) => {
			return error || validator(value);
		}, undefined);
	};
};

const FormValidators = {
	composeValidators,
	required,
	requireEmail,
	requirePassword,
	validateDic,
	validateEmail,
	validateIfEmailExists,
	validatePhone,
	validateIco,
	validatePassword,
};

export default FormValidators;
