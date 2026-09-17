import cx from 'classnames';

import { DetailTableProps } from './types';
import styles from './styles.module.css';

const MIN_WIDTH = '125px';

const DetailTable = ({ data, columns, className }: DetailTableProps) => {
	if (!data) return <></>;

	return (
		<table className={cx(styles.table, className)}>
			{columns && (
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								style={{
									width: column.width,
									minWidth: column.minWidth ?? MIN_WIDTH,
									maxWidth: column.maxWidth,
								}}
							>
								{column.title}
							</th>
						))}
					</tr>
				</thead>
			)}
			<tbody className={styles.tableBody}>
				{data.map((row, index) => (
					<tr
						key={index}
						className={styles.tableRow}
					>
						{row.map((cell, cellIndex) => (
							<td key={cellIndex}>{cell}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default DetailTable;
