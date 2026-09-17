import { Row } from '@tanstack/react-table';
import DeleteIcon from 'Components/Icons/Delete';
import EditIcon from 'Components/Icons/Edit';
import { LocalizationContext } from 'Services/LocalizationService';
import { useContext } from 'react';
import { VscChevronDown } from 'react-icons/vsc';

import styles from './styles.module.css';

interface MetaColumnProps<T = object> {
	row: Row<T>;
	handleEdit: () => void;
	handleDelete: () => void;
}

const upsideDownStyle = {
	transform: 'rotate(180deg)',
};

const MetaColumn = <T,>({
	row,
	handleEdit,
	handleDelete,
}: MetaColumnProps<T>) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();
	const isExpanded = row.getIsExpanded();
	return (
		<div className="d-flex w-100 align-items-center">
			<EditIcon
				className="pointer me-2"
				onClick={() => handleEdit()}
			/>
			<DeleteIcon
				className="me-2 pointer"
				onClick={() => handleDelete()}
			/>

			<button
				className={styles.expandButton}
				onClick={() => {
					row.toggleExpanded();
				}}
			>
				{isExpanded
					? t({ id: 'admin.table.showLess' })
					: t({ id: 'admin.table.showMore' })}
				<VscChevronDown style={isExpanded ? upsideDownStyle : undefined} />
			</button>
		</div>
	);
};

export default MetaColumn;
