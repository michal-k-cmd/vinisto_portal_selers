import { FC, useCallback, useContext } from 'react';
import { find, forEach, get, map } from 'lodash-es';
import { AuthenticationContext } from 'Services/AuthenticationService/context';

import SideBarToggableItem from './Components/SideBarToggableItem';
import { insertMktPackages, menuItems } from './constants';

import './styles.css';

const SideBarContent: FC = () => {
	const authenticationContext = useContext(AuthenticationContext);
	const permissions = get(authenticationContext, 'vinistoUser.permissions', []);

	const checkRights = (menuRights: string[]): boolean => {
		let hasRights = true;
		forEach(menuRights, (menuRight: string) => {
			if (!hasRights) return;
			const foundRight = find(
				permissions,
				(permission: string) => permission === menuRight
			);
			if (!foundRight) {
				hasRights = true;
			}
		});

		return hasRights;
	};

	const items = useCallback(() => {
		const items = insertMktPackages(menuItems);
		return map(items, (item: Record<any, any>, key) => {
			return checkRights(item.rights) ? (
				<SideBarToggableItem
					key={`toogable-sidebar-item-${key}`}
					icon={item.icon}
					title={item.title}
					items={item.items}
					action={item.action}
					route={item.route}
				/>
			) : (
				''
			);
		});
	}, [menuItems, authenticationContext.activeSupplierId]);

	return <div className="sidebar-content">{items()}</div>;
};

export default SideBarContent;
