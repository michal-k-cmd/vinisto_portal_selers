import { Field, useForm } from 'react-final-form';
import { useContext, useMemo } from 'react';
import { InputError, Label, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { IntegrationContext } from 'Services/IntergationService';
import { FormControlProps } from 'Components/Form/interfaces';

interface PlatformMultiselectProps extends FormControlProps {}

const PlatformMultiselect = (props: PlatformMultiselectProps) => {
	const form = useForm();
	const { integrations } = useContext(IntegrationContext);
	const t = useContext(LocalizationContext).useFormatMessage();
	const {
		label,
		className,
		name,
		identifier,
		labelClassName,
		validate,
		showError,
	} = props;

	const validators = useMemo(
		() =>
			Array.isArray(validate) ? Validators.compose(...validate) : validate,
		[validate]
	);

	if (!integrations || !integrations.length) return null;

	const meta = form.getFieldState(name);

	return (
		<div className={className}>
			{label !== undefined && (
				<Label
					htmlFor={identifier}
					className={labelClassName}
					isRequired={Validators.isRequired(validate)}
				>
					{typeof label === 'string' ? t({ id: label }) : label}
				</Label>
			)}
			<div>
				{integrations.map((platform) => (
					<div key={platform.integrationId}>
						<Label className="d-flex gap-2 vinisto-checkbox">
							<Field
								name={name}
								component="input"
								type="checkbox"
								// @ts-expect-error Technically, only string are allowed, but this actually works fine
								value={platform.integrationId}
								validate={validators}
							/>
							<span className="vinisto-checkbox__checkmark"></span>
							{platform.integrationName}
						</Label>
					</div>
				))}
			</div>
			{meta && (
				<InputError
					errorMessage={meta.error || meta.submitError}
					touched={meta.touched}
					show={showError}
				/>
			)}
		</div>
	);
};

export default PlatformMultiselect;
