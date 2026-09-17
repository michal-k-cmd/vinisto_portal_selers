import { type Editor } from '@tiptap/core';
import TipTapEditor from 'Components/TipTapEditor';
import { memo, useContext, useMemo } from 'react';
import { Field } from 'react-final-form';
import { InputError, Label, Validators } from 'Components/Form';
import { LocalizationContext } from 'Services/LocalizationService';
import { FormControlProps } from 'Components/Form/interfaces';
import { composeValidators } from 'Components/Form/validators';

interface RichTextEditorProps
	extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			'onChange' | 'defaultValue' | 'validate'
		>,
		FormControlProps {
	name: string;
	className?: string;
	label: string | React.ReactNode;
}

const RichTextEditor = ({
	name,
	className,
	label,
	identifier,
	showError = false,
	validate = () => undefined,
	...rest
}: RichTextEditorProps) => {
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
				{({ input, meta }) => {
					return (
						<>
							<TipTapEditor
								id={identifier}
								content={input.value}
								onUpdate={(editor: Editor) => {
									if (editor.isEmpty) return input.onChange('');
									return input.onChange(editor.getHTML() ?? '');
								}}
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

export default memo(RichTextEditor);
