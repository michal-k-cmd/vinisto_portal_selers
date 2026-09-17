'use client';

import { useCallback, useEffect, useRef } from 'react';
import { configOptions, createForm } from 'final-form';

import useFormState from './useFormState';
import shallowEqual from './shallowEqual';

const useMemoOnce = (factory: any) => {
	const ref = useRef();

	if (!ref.current) {
		ref.current = factory();
	}

	return ref.current;
};

const useForm = ({
	subscription,
	initialValuesEqual = shallowEqual,
	...config
}: any) => {
	const form = useMemoOnce(() => createForm(config));
	const prevConfig = useRef(config);
	const state = useFormState(form, subscription);
	const handleSubmit = useCallback(
		(event: any) => {
			if (event) {
				if (typeof event.preventDefault === 'function') {
					event.preventDefault();
				}
				if (typeof event.stopPropagation === 'function') {
					event.stopPropagation();
				}
			}
			// @ts-ignore
			return form.submit();
		},
		[form]
	);

	useEffect(() => {
		if (config === prevConfig.current) {
			return;
		}

		if (
			config.initialValues &&
			!initialValuesEqual(
				config.initialValues,
				prevConfig.current.initialValues
			)
		) {
			// @ts-ignore
			form.initialize(config.initialValues);
		}

		configOptions.forEach((key) => {
			if (key !== 'initialValues' && config[key] !== prevConfig.current[key]) {
				// @ts-ignore
				form.setConfig(key, config[key]);
			}
		});

		prevConfig.current = config;
	});

	return { ...state, form, handleSubmit };
};

export default useForm;
