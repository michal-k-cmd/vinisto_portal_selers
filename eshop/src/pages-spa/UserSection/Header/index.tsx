'use client';

import ContainerFullWidth from 'Components/View/ContainerFullWidth';
import { useIsB2b } from 'Services/PlatformService';

import B2bHeader from '../B2bHeader';
import UserHeader from '../UserHeader';

const Header = () => {
	const isB2b = useIsB2b();

	return (
		<ContainerFullWidth containerClassName="my-3">
			{isB2b ? <B2bHeader /> : <UserHeader />}
		</ContainerFullWidth>
	);
};

export default Header;
