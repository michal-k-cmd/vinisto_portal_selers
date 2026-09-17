import type { InputHTMLAttributes } from 'react';
import cx from 'classnames';

import Checkbox from '../../../form/components/checkbox';
import SelectableOptionLabel, {
	type SelectableOptionLabelProps,
} from '../selectable-label';

import styles from './styles.module.css';

interface SelectableOptionProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'label' | 'prefix'> {
	name: string;
	labelProps: SelectableOptionLabelProps;
	isLoading?: boolean;
	order?: number;
}

const SelectableOption = ({
	name,
	labelProps = {},
	isLoading,
	className,
	order,
	...props
}: SelectableOptionProps) => {
	const { prefix, value, placeholder, suffix, ...restLabelProps } = labelProps;
	return (
		<Checkbox
			{...props}
			className={cx(styles.component, className)}
			name={name}
			isLoading={isLoading}
			label={
				<SelectableOptionLabel
					{...restLabelProps}
					prefix={prefix}
					value={value}
					placeholder={placeholder}
					suffix={suffix}
					isLoading={isLoading}
					order={order}
				/>
			}
		/>
	);
};

export default SelectableOption;
