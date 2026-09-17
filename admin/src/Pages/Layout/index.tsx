import { type ReactNode, useContext } from 'react';
import cx from 'classnames';
import { SideBarContext } from 'Components/SideBar/context';
import SideBar from 'Components/SideBar';
import NavBar from 'Components/NavBar';
import Burger from 'Components/Burger';

export interface LayoutProps {
	children: ReactNode;
	pathname: string;
}

import './styles.css';

const getCustomContainerClassForPathname = (pathname: string) => {
	if (pathname.includes('basket')) return 'px-0 pb-0';
	return '';
};

const Layout = ({ children, pathname }: LayoutProps) => {
	const { isOpened } = useContext(SideBarContext);

	return (
		<div className="layout">
			<Burger />
			<SideBar />
			<div className={cx('admin-content', isOpened && 'sidebar-is-opened')}>
				<NavBar />
				<div
					className={cx(
						'admin-page-content container-fluid',
						getCustomContainerClassForPathname(pathname)
					)}
				>
					{children}
				</div>
			</div>
		</div>
	);
};

export default Layout;
