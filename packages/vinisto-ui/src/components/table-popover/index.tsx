import { ReactNode } from 'react';
import { FaEdit } from 'react-icons/fa';

import styles from './styles.module.css';

interface TablePopoverProps {
	name?: string;
	note?: string | ReactNode;
}

const TablePopover = ({ name, note }: TablePopoverProps) => {
	if (!name) return null;
	return (
		<div className={styles.rule}>
			{name}
			<div className="position-relative">
				<FaEdit className="ms-2 align-text-top" />
				<div className={styles.popover}>
					<div className={styles.vinistoAdminPopover}>{note}</div>
				</div>
			</div>
		</div>
	);
};

export default TablePopover;
