import { FC, useCallback, useContext } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { ModalContext } from 'Components/Modal/context';
import { SideBarContext } from 'Components/SideBar/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { FaExclamation } from 'react-icons/fa';

import { ISideBarItemProps } from './interfaces';

import './styles.css';

const SideBarItem: FC<ISideBarItemProps> = ({
	title,
	icon: MainIcon = FaExclamation,
	route,
	action = '',
	customIconSize = 30,
	customFontSize = 18,
	className,
}) => {
	const { useFormatMessage } = useContext(LocalizationContext);
	const modalContext = useContext(ModalContext);
	const deviceServiceContext = useContext(DeviceServiceContext);
	const sideBarContext = useContext(SideBarContext);

	const t = useFormatMessage();

	const handleOpenModal = useCallback(() => {
		modalContext.handleOpenModal(action);
	}, [modalContext, action]);

	const handleHideSidebar = useCallback(() => {
		if (deviceServiceContext.isTablet || deviceServiceContext.isMobile) {
			sideBarContext.handleOnForceHideSideBar();
		}
	}, [deviceServiceContext, sideBarContext]);

	const itemContent = (
		<>
			<MainIcon
				className="sidebar-menu-item-icon"
				style={{
					fontSize: `${customIconSize}px`,
				}}
			/>
			<div
				className="sidebar-menu-item-title"
				style={{
					fontSize: `${customFontSize}px`,
				}}
			>
				{t({ id: title })}
			</div>
		</>
	);

	return (
		<>
			{action && (
				<div
					className={cx('sidebar-menu-item', className)}
					onClick={handleOpenModal}
				>
					{itemContent}
				</div>
			)}
			{!action && route && (
				<Link
					to={route}
					className={cx('sidebar-menu-item', className)}
					onClick={handleHideSidebar}
				>
					{itemContent}
				</Link>
			)}
			{!action && !route && itemContent}
		</>
	);
};

export default SideBarItem;
