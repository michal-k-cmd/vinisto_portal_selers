import { useContext } from 'react';
import { CButton, CForm } from '@coreui/react';
import cx from 'classnames';
import { Form } from 'react-final-form';
import { LocalizationContext } from 'Services/LocalizationService';

import { FormProps, FormValues } from './interfaces';

/**
 * @category Component Admin Form Base
 * @deprecated - this should be replaced by direct usage of import { Form } from 'react-final-form'
 * because our wrapper doesn't actually do anything but make it worse :)
 */
const FormComponent = <T extends FormValues>({
	children,
	className,
	submitLabel,
	submitClassName,
	onSubmit = () => {},
	validate,
	initialValues,
	mutators,
}: FormProps<T>): JSX.Element => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const t = useFormatMessage();

	return (
		<Form<T>
			onSubmit={onSubmit}
			validate={validate}
			initialValues={initialValues}
			mutators={mutators}
			render={(props) => {
				return (
					<CForm
						onSubmit={props.handleSubmit}
						className={className}
					>
						{typeof children === 'function' ? children(props) : children}
						{submitLabel && (
							<CButton
								className={cx(
									'vinisto-btn vinisto-bg w-100 mt-3',
									submitClassName
								)}
								type="submit"
							>
								{t({ id: submitLabel })}
							</CButton>
						)}
					</CForm>
				);
			}}
		/>
	);
};

export default FormComponent;
