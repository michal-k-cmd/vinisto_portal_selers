'use client';

import { useCallback, useEffect } from 'react';
import { Form } from 'react-final-form';
import { get, invoke, set } from 'lodash-es';

import SubmitButton from '../Submit';

/**
 * @category Component Admin Form Base
 * @deprecated - this should be replaced by direct usage of import { Form } from 'react-final-form'
 * because our wrapper doesn't actually do anything but make it worse :)
 */
const FormComponent = (props: any) => {
	const submitCallback = get(props, 'submitCallback', null);
	const validationFunction = get(props, 'customValidationFunction', null);

	const customValidationFunction = useCallback(
		(values?: Record<any, any>): Record<any, any> => {
			if (validationFunction) {
				return validationFunction(values);
			}

			return {};
		},
		[validationFunction]
	);

	const handleOnSubmit = useCallback(
		(formValues: Record<any, any>): void => {
			if (submitCallback) {
				submitCallback(formValues);
			}
		},
		[submitCallback]
	);

	return (
		<Form
			onSubmit={handleOnSubmit}
			validate={customValidationFunction}
			mutators={get(props, 'mutators', {})}
			initialValues={get(props, 'initializationValues', {})}
			render={(formRenderPropTypes: Record<any, any>) => {
				const { handleSubmit, submitting, pristine, valid, form } =
					formRenderPropTypes;
				useEffect(() => {
					if (get(form, 'mutators') && get(props, 'mutatorsReference')) {
						const mutatorsReference = get(props, 'mutatorsReference');
						set(mutatorsReference, 'current', get(form, 'mutators'));
					}
				}, [get(form, 'mutators', undefined)]);

				useEffect(() => {
					if (get(props, 'formReference', undefined)) {
						const formReference = get(props, 'formReference', undefined);
						set(formReference, 'current', form);
					}
				}, [get(props, 'formReference', undefined)]);

				useEffect(() => {
					if (get(props, 'subscribeCallback', undefined)) {
						invoke(props, 'subscribeCallback', form);
					}
				}, [form, get(props, 'subscribeCallback', undefined)]);

				return (
					<form onSubmit={handleSubmit}>
						{get(props, 'children', '')}
						{get(props, 'submitText', null) && (
							<SubmitButton
								valid={valid}
								pristine={pristine}
								submitting={submitting}
								submitText={get(props, 'submitText', 'Submit')}
								dataTestid={get(props, 'submitDataTestid', '')}
							/>
						)}
						{get(props, 'customSubmitContent', null) && (
							<>{get(props, 'customSubmitContent', '')()}</>
						)}
					</form>
				);
			}}
		/>
	);
};

export default FormComponent;
