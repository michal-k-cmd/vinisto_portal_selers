import { useCallback, useContext } from 'react';
import { FaExclamation } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ModalContext } from 'Components/Modal/context';
import { LocalizationContext } from 'Services/LocalizationService';
import { DeviceServiceContext } from 'Services/DeviceService';
import { SideBarContext } from 'Components/SideBar/context';
import { isExternalLink } from 'vinisto_shared';

import { ISideBarItemProps } from './interfaces';
import styles from './styles.module.css';

const SideBarItem = ({
	title,
	route,
	icon,
	modalType,
	customIconSize,
	customFontSize,
}: ISideBarItemProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { handleOpenModal } = useContext(ModalContext);
	const { isTablet, isMobile } = useContext(DeviceServiceContext);
	const { handleOnForceHideSideBar } = useContext(SideBarContext);

	const history = useNavigate();

	const MainIcon = icon || FaExclamation;

	const action = modalType || null;

	const handleMoveToRoute = useCallback(() => {
		if (isTablet || isMobile) {
			handleOnForceHideSideBar();
		}

		if (action) {
			handleOpenModal(action);
			return;
		}

		if (route) {
			if (isExternalLink(route)) {
				window.open(route, '_blank', 'noopener,noreferrer');
				return;
			}

			history(route);
		}
	}, [
		isTablet,
		isMobile,
		action,
		route,
		handleOnForceHideSideBar,
		handleOpenModal,
		history,
	]);

	return (
		<button
			className={styles.menuItem}
			onClick={handleMoveToRoute}
		>
			<MainIcon
				className={styles.menuItemIcon}
				style={{
					fontSize: `${customIconSize || 30}px`,
				}}
			/>
			<div
				className={styles.menuItemTitle}
				style={{
					fontSize: `${customFontSize || 18}px`,
				}}
			>
				{t({ id: title })}
			</div>
		</button>
	);
};

export default SideBarItem;
