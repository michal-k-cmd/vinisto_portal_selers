import { get, head, last, size, some, split, toNumber } from 'lodash-es';
import { dayjsInstance as dayjs } from 'Services/Date';

import { RequiredValidatorCustomMessage, Validator } from './interfaces';
import { MIN_PASSWORD_LENGTH } from './constants';

export const validateEmail: Validator<string> = (email) => {
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

	return undefined;
};

export const validatePassword =
	(minLength: number = MIN_PASSWORD_LENGTH): Validator<string> =>
	(password: string) => {
		// const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

		if (!password) {
			return 'form.input.password.requireValidation';
		}

		if (password.length < minLength) {
			return 'form.input.password.tooWeakValidation';
		}

		// if (!regExp.test(password)) {
		//   return 'form.input.password.tooWeakValidation';
		// }

		return undefined;
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
	if (sum === 1) {
		lastDigitCheck = 0;
	} else if (sum === 0 || sum === 10) {
		lastDigitCheck = 1;
	} else {
		lastDigitCheck = 11 - sum;
	}
	return toNumber(digits[7]) === lastDigitCheck;
};

export const validateIco: Validator<string> = (value) => {
	if (!isIcoValid(value)) {
		return 'validation.error.ico';
	}
};

export const validateWebsite: Validator<string> = (value) => {
	if (!value) {
		return;
	}
	try {
		const url = new URL(value);
		if (
			(url.protocol !== 'https:' && url.protocol !== 'http:') ||
			url.hostname.match(
				/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/
			) === null
		) {
			throw new Error();
		}
	} catch {
		return 'validation.error.url';
	}
};

export const required: Validator<any> = (value) => {
	return value ? undefined : 'validation.error.required';
};

export const requiredCustomMessage = <T = string>(
	errorMessage = 'validation.error.required'
) => {
	const validate: RequiredValidatorCustomMessage<T> = (value) =>
		value ? undefined : errorMessage;
	// custom property to tell validator type
	validate.isRequiredCustomMessage = true;
	return validate;
};

const isRequiredValidatorCustomMessage = <T>(
	value: Validator<T>
): value is RequiredValidatorCustomMessage<T> =>
	(value as RequiredValidatorCustomMessage<T>).isRequiredCustomMessage;

export const requiredWarning = (value: string) =>
	value ? undefined : 'validation.warning.required';

export const minLength = (length: number) => (value: string) =>
	size(value) >= length ? undefined : 'validation.error.tooShort';
export const maxLength = (length: number) => (value: string) =>
	size(value) <= length ? undefined : 'validation.error.tooLong';
export const isNumberOnly = (value: number | string) =>
	!isNaN(toNumber(value)) ? undefined : 'validation.error.onlyNumbers';

export const isEqual =
	(valueName: string) => (value: string, values: Record<any, any>) =>
		get(values, valueName, '') === value
			? undefined
			: 'validation.error.notEqual';

export const isRequired = <T = any>(
	validate?: Validator<T> | Validator<T>[]
) => {
	return (
		validate === required ||
		(validate &&
			!Array.isArray(validate) &&
			isRequiredValidatorCustomMessage(validate)) ||
		(Array.isArray(validate) &&
			(validate.includes(required) ||
				validate.some((validationFn) =>
					isRequiredValidatorCustomMessage(validationFn)
				)))
	);
};

export const validateMoreThan14DaysFromNow = (date: Date | null) => {
	if (!date) {
		return;
	}
	const date14DaysFromNow = dayjs().add(14, 'day');
	if (dayjs(date).isBefore(date14DaysFromNow)) {
		return DATE_14_DAYS_BEFORE_ERROR_MESSAGE;
	}
	return undefined;
};

const cannotContainSpaces: Validator<string> = (value = '') => {
	return value.includes(' ')
		? 'validation.error.cannotContainSpaces'
		: undefined;
};

export const composeValidators = <T = any>(...validators: Validator<T>[]) => {
	if (validators.length === 0) {
		return () => undefined;
	}
	return (value: T) => {
		return validators.reduce<string | undefined>((error, validator) => {
			return error || validator(value);
		}, undefined);
	};
};

const FormValidators = {
	validateEmail,
	required,
	requiredCustomMessage,
	requiredWarning,
	validatePassword,
	validateIco,
	minLength,
	maxLength,
	isNumberOnly,
	isEqual,
	isRequired,
	composeValidators,
	validateMoreThan14DaysFromNow,
	cannotContainSpaces,
};

export default FormValidators;

export const DATE_14_DAYS_BEFORE_ERROR_MESSAGE =
	'validation.error.date14DaysBefore';
