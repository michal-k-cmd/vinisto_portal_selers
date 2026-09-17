import { memo, useContext, useMemo } from 'react';
import { Field } from 'react-final-form';
import { InputError, Label, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { FormControlProps } from 'Components/Form/interfaces';
import { composeValidators } from 'Components/Form/validators';
import { Range } from 'vinisto_ui';

type RangeProps = React.ComponentProps<typeof Range>;

interface InputRangeProps
	extends Omit<RangeProps, 'onChange' | 'defaultValue' | 'value' | 'validate'>,
		FormControlProps<number[]> {
	name: string;
	className?: string;
	label: string | React.ReactNode;
}

const InputRange = ({
	name,
	className,
	label,
	identifier,
	showError = false,
	validate = () => undefined,
	min = 0,
	max = 100,
	...rest
}: InputRangeProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const validators = useMemo(
		() => (Array.isArray(validate) ? composeValidators(...validate) : validate),
		[validate]
	);

	return (
		<div className={className}>
			{label !== undefined && (
				<Label
					htmlFor={identifier}
					isRequired={Validators.isRequired(validate)}
				>
					{typeof label === 'string' ? t({ id: label }) : label}
				</Label>
			)}
			<Field
				name={name}
				validate={validators}
				{...rest}
			>
				{({ input: { onChange, value }, meta, ...rest }) => {
					return (
						<>
							<Range
								{...rest}
								// @ts-expect-error https://github.com/react-component/slider/issues/997
								id={identifier}
								onChange={(value) => {
									onChange(value);
									if (typeof rest.onChange === 'function') rest.onChange(value);
								}}
								defaultValue={value}
								value={value}
								min={min}
								max={max}
							/>
							<InputError
								errorMessage={meta.error || meta.submitError}
								touched={meta.touched}
								show={showError}
							/>
						</>
					);
				}}
			</Field>
		</div>
	);
};

export default memo(InputRange);
