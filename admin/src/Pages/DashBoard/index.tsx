import { useContext, useMemo } from 'react';
import { CCard, CCardBody, CCol, CRow } from '@coreui/react';
import { menuItems } from 'Components/SideBar/Components/SideBarContent/constants';
import {
	isSideBarMenuItemLeaf,
	isSideBarMenuItemWithUrl,
} from 'Components/SideBar/Components/SideBarContent/Components/SideBarToggableItem/helpers';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { LocalizationContext } from 'Services/LocalizationService';

import DashBoardCard from './Components/DashboardCard';

const DashBoardPage = () => {
	const {
		vinistoUser: { permissions, merchantRights },
	} = useContext(AuthenticationContext);
	const { useFormatMessage } = useContext(LocalizationContext);

	const combinedPermissions = (permissions ?? []).concat(merchantRights ?? []);

	const t = useFormatMessage();

	const allowedItems = useMemo(
		() =>
			menuItems
				.flatMap((menuItem) => {
					if (isSideBarMenuItemWithUrl(menuItem)) {
						return [
							{
								title: menuItem.title,
								icon: menuItem.icon,
								route: menuItem.url,
								rights: menuItem.rights ?? menuItem.rights,
								category: menuItem.title,
								//chart: menuItem.chart,
							},
						];
					}
					return menuItem.items.map((menuSubItem) => ({
						...menuSubItem,
						rights: menuSubItem.rights ?? menuItem.rights,
						category: menuItem.title,
						//chart: menuItem.chart,
					}));
				})
				.filter((item) => {
					return (
						item.rights === undefined ||
						item.rights.some((accessRight) =>
							combinedPermissions.includes(accessRight)
						)
					);
				}),
		[combinedPermissions]
	);

	// create multidimensional array - each item is array of two items
	const itemsInRows = useMemo(() => {
		const rows: (typeof allowedItems)[] = [];
		for (let i = 0; i < allowedItems.length; i++) {
			const rowIndex = Math.floor(i / 2);
			if (!(i % 2)) {
				rows[rowIndex] = [];
			}
			rows[rowIndex].push(allowedItems[i]);
		}
		return rows;
	}, [allowedItems]);

	return (
		<CRow>
			<CCol xs={12}>
				<CCard className="mb-4">
					<CCardBody>
						{itemsInRows.map((row, rowIndex) => (
							<CRow key={rowIndex}>
								{row.map((item, index) => (
									<DashBoardCard
										key={index}
										category={t({ id: item.category })}
										label={t({ id: item.title })}
										route={isSideBarMenuItemLeaf(item) ? item.route : undefined}
										action={
											isSideBarMenuItemLeaf(item) ? item.action : undefined
										}
										//chart={item.chart}
									/>
								))}
							</CRow>
						))}
					</CCardBody>
				</CCard>
			</CCol>
		</CRow>
	);
};

export default DashBoardPage;
