import { ReactNode } from 'react';
import cx from 'classnames';

import styles from './styles.module.css';

interface TagFiltersProps {
	children?: ReactNode;
	className?: string;
}

const FilterOptionsFieldset = ({ children, className }: TagFiltersProps) => {
	return (
		<fieldset className={cx(styles.filterOptionsFieldset, className)}>
			{children}
		</fieldset>
	);
};

export default FilterOptionsFieldset;
