import { head, last, size, some, split } from 'Helpers/lodash';

import { NOT_FOUND_IN_ARRAY } from './constants';
import { Validator } from './interfaces';

import api from '@/api';
import { VinistoHelperDllBaseBoolReturn } from '@/api-types/user-api';

export const validatePhone: Validator = (phone = '') => {
	const regExp = /^\+?[\d\s-]*[\d][\d\s-]*$/;

	const isValidFormat = regExp.test(phone);

	if (phone && !isValidFormat) {
		return 'form.input.phone.badPhoneValidation';
	}

	return undefined;
};

export const validateEmail: Validator = (email) => {
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

	const domainParts = split(address ?? '', '.');
	if (
		some(domainParts, (part: string) => {
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

export const validatePassword: Validator = (password) => {
	// const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/;

	if (!password) {
		return 'form.input.password.requireValidation';
	}

	if (size(password) < 3) {
		return 'form.input.email.tooWeakValidation';
	}

	// if (!regExp.test(password)) {
	//   return 'form.input.password.tooWeakValidation';
	// }

	return undefined;
};

export const requirePassword: Validator = (password) => {
	if (!password) {
		return 'form.input.password.requireValidation';
	}
};

export const requireEmail: Validator = (email) => {
	if (!email) {
		return 'form.input.email.requiredValidation';
	}
};

export const required: Validator<any> = (value) => {
	if (Array.isArray(value) && !value.length) return 'validation.error.required';
	return value || value === 0 ? undefined : 'validation.error.required';
};

export const isRequired = <T = any>(validate?: Validator<T> | Validator<T>[]) =>
	validate === required ||
	(Array.isArray(validate) && validate.indexOf(required) > NOT_FOUND_IN_ARRAY);

export const cannotContainSpaces: Validator<string> = (value = '') => {
	return value.includes(' ')
		? 'form.input.discountCoupon.spaceNotAllowed'
		: undefined;
};

export const min = (min: number) => (value: number) => {
	return isNaN(value) || value >= min
		? undefined
		: { id: 'validation.error.min', min };
};

export const max = (max: number) => (value: number) => {
	return isNaN(value) || value <= max
		? undefined
		: { id: 'validation.error.max', max };
};

export const isNotPastDate: Validator<Date | null> = (date: Date | null) => {
	return date == null || date >= new Date()
		? undefined
		: { id: 'validation.date.pastNotAllowed' };
};

export const isRelativeUrl = (value: string) => {
	return /^https?:\/\/|^www\./i.test(value)
		? 'validation.error.notARelativeUrl'
		: '';
};

export const isUniqueEmail = async (value: string) => {
	const isNotUnique = await api
		.get<VinistoHelperDllBaseBoolReturn>(`user-api/users/IsEmailAlreadyUsed`, {
			email: value,
		})
		.then((res) => res.result)
		.catch(() => {
			return false;
		});

	if (isNotUnique) return 'validation.error.emailIsNotUnique';
};

export const composeValidators = <T = any>(...validators: Validator<T>[]) => {
	if (validators.length === 0) {
		return () => undefined;
	}
	return (value: T) => {
		return validators.reduce<ReturnType<Validator>>((error, validator) => {
			return error || validator(value);
		}, undefined);
	};
};

const FormValidators = {
	validatePhone,
	validateEmail,
	required,
	requireEmail,
	requirePassword,
	validatePassword,
	isRequired,
	cannotContainSpaces,
	min,
	max,
	isNotPastDate,
	isRelativeUrl,
	isUniqueEmail,
	compose: composeValidators,
};

export default FormValidators;
