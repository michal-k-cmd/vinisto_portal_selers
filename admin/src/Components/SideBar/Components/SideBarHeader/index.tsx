import { FC } from 'react';

import Logo from '../Logo';

import './styles.css';

const SideBarHeader: FC = () => {
	return (
		<div className="sidebar-header">
			<Logo />
		</div>
	);
};

export default SideBarHeader;
