import * as React from 'react';
import { Form } from 'react-final-form';
import { get } from 'Helpers/lodash';

import FormContent from './Components/FormContent';
import { IFormProps } from './interfaces';

import './styles.css';

/**
 * @category Component Admin Form Base
 * @deprecated - this should be replaced by direct usage of import { Form } from 'react-final-form'
 * because our wrapper doesn't actually do anything but make it worse :)
 */
const FormComponent: React.FC<IFormProps> = (
	props: IFormProps
): JSX.Element => {
	const submitCallback = get(props, 'submitCallback', null);
	const validationFunction = get(props, 'customValidationFunction', null);

	const customValidationFunction = React.useCallback(
		(formValues: Record<any, any>): Record<any, any> => {
			if (validationFunction) {
				return validationFunction(formValues);
			}

			return {};
		},
		[validationFunction]
	);

	const handleOnSubmit = React.useCallback(
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
			initialValues={get(props, 'initializationValues', {})}
			render={(formRenderPropTypes: Record<any, any>) => {
				return (
					<FormContent
						{...formRenderPropTypes}
						formReference={get(props, 'formReference', undefined)}
						submitText={get(props, 'submitText', undefined)}
						// eslint-disable-next-line react/no-children-prop
						children={get(props, 'children', '')}
						formStateSubscriber={get(props, 'formStateSubscriber')}
						className={props.className}
					/>
				);
			}}
		/>
	);
};

export default FormComponent;
