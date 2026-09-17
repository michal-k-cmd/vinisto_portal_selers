import { type ReactNode } from 'react';

import CheckboxBare from '../../tokens/checkbox-bare';

import styles from './styles.module.css';

interface CheckboxProps<
	LabelProps extends Record<PropertyKey, any> = Record<PropertyKey, unknown>
> extends Omit<React.AllHTMLAttributes<HTMLInputElement>, 'label'> {
	disabled?: boolean;
	label?: ReactNode | ((props: LabelProps) => ReactNode);
	name: string;
	isLoading?: boolean;
}

const Checkbox = ({ label, name, isLoading, ...props }: CheckboxProps) => {
	return (
		<label className={styles.component}>
			<CheckboxBare
				{...props}
				isLoading={isLoading}
				name={name}
			/>

			{typeof label === 'function' ? label(props) : label}
		</label>
	);
};

export default Checkbox;
