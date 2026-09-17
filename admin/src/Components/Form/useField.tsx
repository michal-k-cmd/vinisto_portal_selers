import { fieldSubscriptionItems } from 'final-form';
import { useEffect, useRef, useState } from 'react';
import { set } from 'Helpers/lodash';

export const all = fieldSubscriptionItems.reduce((result, key) => {
	return set(result, key, true);
}, {});

const subscriptionToInputs = (subscription: any) =>
	fieldSubscriptionItems.map((key) => Boolean(subscription[key]));

const eventValue = (event: any) => {
	if (!event || !event.target) {
		return event;
	} else if (event.target.type === 'checkbox') {
		return event.target.checked;
	}

	return event.target.value;
};

/**
 * @category Component UseField
 */
const useField = (
	name: string,
	form: any,
	validate: any,
	subscription = all
) => {
	const autoFocus = useRef(false);
	const validatorRef = useRef(undefined);
	const [state, setState] = useState<any>({});

	validatorRef.current = validate;

	const deps = subscriptionToInputs(subscription);
	useEffect(
		() =>
			form.registerField(
				name,
				(newState: any) => {
					if (autoFocus.current) {
						autoFocus.current = false;
						setTimeout(() => newState.focus());
					}
					setState(newState);
				},
				subscription,
				validate
					? {
							getValidator: () => validatorRef.current,
					  }
					: undefined
			),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[name, form, ...deps]
	);
	const { value, ...meta } = state;
	delete meta.name;
	return {
		input: {
			name,
			value: value === undefined ? '' : value,
			onBlur: () => state.blur(),
			onChange: (event: any) => state.change(eventValue(event)),
			onFocus: () => {
				if (state.focus) {
					state.focus();
				} else {
					autoFocus.current = true;
				}
			},
		},
		meta,
	};
};

export default useField;
