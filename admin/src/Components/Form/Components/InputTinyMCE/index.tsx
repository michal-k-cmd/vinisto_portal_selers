import { Field } from 'react-final-form';
import { FC, useContext, useRef } from 'react';
import TinyMCE from 'Components/TinyMCE';
import { Label, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';

import { TinyMCEInputProps, TinyMCEInputPropsWithoutInput } from './interfaces';

/**
 * onFormSubmit returns the value of the TinyMCE editor as a string containing HTML
 * @returns Renders a TinyMCE input field in a react-final-form Field component
 */
const InputTinyMCE: FC<
	TinyMCEInputPropsWithoutInput & { initialValue?: string }
> = ({
	name,
	className,
	label,
	identifier,
	labelClassName,
	validate,
	initialValue,
	onChangeNew,
	myValue,
	...rest
}) => {
	const t = useContext(LocalizationContext).useFormatMessage();

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
			<Field
				name={name}
				{...rest}
				render={(fieldProps) => (
					<FieldComponent
						{...fieldProps}
						onChangeNew={onChangeNew}
						initialValue={initialValue}
						myValue={myValue}
					/>
				)}
			/>
		</div>
	);
};

export default InputTinyMCE;

const FieldComponent: FC<TinyMCEInputProps> = ({
	initialValue,
	onChangeNew,
	myValue,
	...rest
}) => {
	const editorRef = useRef(null);

	return (
		<TinyMCE
			onEditorChange={onChangeNew}
			initialValue={initialValue}
			myValue={myValue}
			ref={editorRef}
			{...rest}
		/>
	);
};
