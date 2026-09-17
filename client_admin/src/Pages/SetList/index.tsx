import { useContext, useEffect, useState } from 'react';
import AdminListPage from 'Components/AdminListPage';
import {
	CCard,
	CNav,
	CNavItem,
	CNavLink,
	CTabContent,
	CTabPane,
} from '@coreui/react';
import { LocalizationContext } from 'Services/LocalizationService';

import SetTiles from './Components/SetTiles';
import { SET_LIST_COLUMN, SetListTableRow } from './interfaces';
import { useSetListTableSchema } from './use-table-schema';
import { useSetListTableData } from './use-table-data';
import { SetTabs } from './constants';
import styles from './styles.module.css';

const SetListPage = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const [activeKey, setActiveKey] = useState(1);

	const activeStateFilter = SetTabs[activeKey - 1].state;

	const { state, handlers, pageCount, pageNumber } = useSetListTableData();

	useEffect(() => {
		handlers.handleOnFiltersChange([
			...state.filters.filter((f) => f.id !== SET_LIST_COLUMN.STATE),
			{
				id: SET_LIST_COLUMN.STATE,
				value: activeStateFilter,
			},
		]);
		// Do not fill other dependencies to prevent infinite loop
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeStateFilter]);

	const adminTableSchema = useSetListTableSchema();

	return (
		<div className="p-3">
			<SetTiles />

			<CCard className="mx-0 my-4">
				<h2 className={styles.mainHeading}>
					{t({ id: SetTabs[activeKey - 1].heading })}
				</h2>
				<CNav
					variant="tabs"
					role="tablist"
					className={styles.tabsNav}
				>
					{SetTabs.map((tab) => (
						<CNavItem key={tab.id}>
							<CNavLink
								href="#"
								active={activeKey === tab.id}
								onClick={() => setActiveKey(tab.id)}
								className={styles.tabLink}
							>
								{t({ id: tab.tabName })}
							</CNavLink>
						</CNavItem>
					))}
				</CNav>
				<CTabContent>
					{SetTabs.map((tab) => (
						<CTabPane
							key={tab.id}
							role="tabpanel"
							visible={activeKey === tab.id}
						>
							<AdminListPage<SetListTableRow>
								adminTableSchema={adminTableSchema}
								handlers={handlers}
								state={state}
								pageCount={pageCount}
								pageNumber={pageNumber}
							/>
						</CTabPane>
					))}
				</CTabContent>
			</CCard>
		</div>
	);
};

export default SetListPage;
