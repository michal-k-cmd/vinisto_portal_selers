import cx from 'classnames';

import { ColumnsProps } from './interfaces';
import styles from './styles.module.css';

const Columns = ({ columnsCount, elements }: ColumnsProps) => {
	return (
		<div className={cx('container', styles.columns)}>
			<div className={`row row-cols-1 row-cols-xl-${columnsCount}`}>
				{elements.map((element, index) => (
					<div
						key={'landing' + index}
						className="col"
					>
						{element}
					</div>
				))}
			</div>
		</div>
	);
};

export default Columns;
