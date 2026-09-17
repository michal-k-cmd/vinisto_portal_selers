import { useEffect, useState } from 'react';
import { formSubscriptionItems } from 'final-form';
import { set } from 'Helpers/lodash';

export const all = formSubscriptionItems.reduce((result, key) => {
	return set(result, key, true);
}, {});

const subscriptionToInputs = (subscription: any) =>
	formSubscriptionItems.map((key) => Boolean(subscription[key]));

const useFormState = (form: any, subscription = all) => {
	const [state, setState] = useState(() => form.getState());

	const deps = subscriptionToInputs(subscription);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => form.subscribe(setState, subscription), [form, ...deps]);

	return state;
};

export default useFormState;
