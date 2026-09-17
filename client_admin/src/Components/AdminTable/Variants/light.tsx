import cx from 'classnames';
import { PageListTableRow } from 'Hooks/useAdminTable/interfaces';

import { AdminTableProps } from '../interfaces';
import AdminTable from '..';

import style from './styles.module.css';

const AdminTableLight = <T extends PageListTableRow = PageListTableRow>(
	props: AdminTableProps<T>
) => {
	return (
		<AdminTable
			{...props}
			className={cx(style.table, props.className)}
		/>
	);
};

export default AdminTableLight;
