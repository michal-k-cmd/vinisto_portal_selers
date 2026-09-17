import cx from 'classnames';

import { ColumnFilterProps } from './interface';
import styles from './styles.module.css';

const ColumnFilter = ({
	isColumnFilterOpen,
	table,
	onClickOutsideRef,
}: ColumnFilterProps) => {
	return (
		<div
			className={cx(styles.columnFilter, isColumnFilterOpen && styles.open)}
			ref={onClickOutsideRef}
		>
			{table.getAllLeafColumns().map((column) => {
				return (
					<div
						key={column.id}
						className="form-check"
					>
						<input
							id={column.id}
							{...{
								type: 'checkbox',
								checked: column.getIsVisible(),
								onChange: column.getToggleVisibilityHandler(),
							}}
						/>{' '}
						<label
							className="form-check-label"
							htmlFor={column.id}
						>
							{column.columnDef.header?.toString()}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default ColumnFilter;
