import cx from 'classnames';

import { DetailTableProps } from './types';
import styles from './styles.module.css';

const MIN_WIDTH = '125px';

const DetailTable = ({ data, columns, className }: DetailTableProps) => {
	if (!data) return null;

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
			{columns?.some((column) => column.footer) && (
				<tfoot>
					<tr className={styles.tableRow}>
						{columns.map((column, index) => (
							<td key={index}>{column.footer}</td>
						))}
					</tr>
				</tfoot>
			)}
		</table>
	);
};

export default DetailTable;
