import { BiSortAlt2 } from 'react-icons/bi';
import { BsSortDown, BsSortUpAlt } from 'react-icons/bs';

interface SortButtonProps {
	sortDirection: string | undefined;
	getCanSort: () => boolean;
}

const SortButton = ({ sortDirection, getCanSort }: SortButtonProps) => {
	return sortDirection === 'asc' ? (
		<BsSortUpAlt className="vinisto-admin-table__sorting-ico" />
	) : sortDirection === 'desc' ? (
		<BsSortDown className="vinisto-admin-table__sorting-ico" />
	) : getCanSort() ? (
		<BiSortAlt2 className="vinisto-admin-table__sorting-ico vinisto-admin-table__sorting-ico--faded" />
	) : null;
};

export default SortButton;
