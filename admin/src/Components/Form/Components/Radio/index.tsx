import { LocalizationContext } from 'Services/LocalizationService';
import {
	ChangeEventHandler,
	HTMLAttributes,
	memo,
	ReactNode,
	useCallback,
	useContext,
} from 'react';
import { Field, FieldInputProps } from 'react-final-form';

import Label from '../Label';

export interface Option {
	label: string;
	value: string;
}

interface RadioProps
	extends Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> {
	name: string;
	options: Option[];
	className?: string;
	onChange?: (value: string) => void;
	renderLabel?: ({
		option,
		index,
	}: {
		option: Option;
		index: number;
	}) => ReactNode;
	defaultValue?: string;
	label?: React.ReactNode;
	inputClassName?: string;
}

const Radio = ({
	options,
	name,
	label,
	className,
	onChange,
	defaultValue,
	renderLabel,
}: RadioProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const handleOnChange = useCallback<
		(
			input: FieldInputProps<string, HTMLInputElement>
		) => ChangeEventHandler<HTMLInputElement>
	>(
		(input) => (event) => {
			input.onChange(event);
			if (typeof onChange === 'function') {
				onChange(event.target.value);
			}
		},
		[onChange]
	);

	return (
		<>
			{label ? (
				typeof label === 'string' ? (
					<Label className="d-block">{t({ id: label })}</Label>
				) : (
					label
				)
			) : null}
			<div className={className}>
				{options.map((option, index) => (
					<Field
						name={name}
						type="radio"
						value={option.value}
						key={index}
					>
						{({ input }) => {
							return (
								<>
									<input
										name={input.name}
										id={`${name}-${index}`}
										type="radio"
										value={option.value}
										checked={input.checked || defaultValue === option.value}
										onChange={handleOnChange(input)}
									/>
									{typeof renderLabel === 'function'
										? renderLabel({ option, index })
										: option.label && (
												<label htmlFor={`${name}-${index}`}>
													{t({ id: option.label })}
												</label>
										  )}
								</>
							);
						}}
					</Field>
				))}
			</div>
		</>
	);
};

export default memo(Radio);
