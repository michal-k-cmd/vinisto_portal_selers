import { FC, useContext, useMemo } from 'react';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import { menuItems } from './constants';
import SideBarToggableItem from './Components/SideBarToggableItem';
import { getAccessibleItems } from './helpers';

import './styles.css';

const SideBarContent: FC = (): JSX.Element => {
	const authenticationContext = useContext(AuthenticationContext);
	const permissions = authenticationContext.vinistoUser?.permissions;
	const merchantRights = authenticationContext.vinistoUser?.merchantRights;

	const combinedPermissions = (permissions ?? []).concat(merchantRights ?? []);

	const allowedItems = useMemo(
		() => menuItems.filter(getAccessibleItems(combinedPermissions)),
		[combinedPermissions]
	);

	return (
		<div className="sidebar-content">
			{allowedItems.map(({ title, icon, items, rights, url }, key) => {
				if (url !== undefined) {
					return (
						<SideBarToggableItem
							key={key}
							icon={icon}
							title={title}
							items={items}
							rights={rights}
							url={url}
						/>
					);
				} else {
					return (
						<SideBarToggableItem
							key={key}
							icon={icon}
							title={title}
							items={items}
							rights={rights}
						/>
					);
				}
			})}
		</div>
	);
};

export default SideBarContent;
