import { FC, useCallback, useContext, useMemo, useState } from 'react';
import cx from 'classnames';
import Animate from 'Components/SideBar/Animated';
import { Link } from 'react-router-dom';
import { SideBarMenuItemTopLevel } from 'Components/SideBar/Components/SideBarContent/interfaces';
import { getAccessibleItems } from 'Components/SideBar/Components/SideBarContent/helpers';
import { SideBarContext } from 'Components/SideBar/context';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';
import { FaExclamation, FaWindowClose } from 'react-icons/fa';

import SideBarItem from '../SideBarItem';

import { isSideBarMenuItemLeaf } from './helpers';

import './styles.css';

const SideBarToggableItem: FC<SideBarMenuItemTopLevel> = ({
	title,
	icon: MainIcon = FaExclamation,
	items,
	delay = 0,
	url,
	className,
}) => {
	const authenticationContext = useContext(AuthenticationContext);
	const permissions = authenticationContext.vinistoUser?.permissions;
	const merchantRights = authenticationContext.vinistoUser?.merchantRights;
	const deviceServiceContext = useContext(DeviceServiceContext);
	const { useFormatMessage } = useContext(LocalizationContext);
	const sideBarContext = useContext(SideBarContext);

	const t = useFormatMessage();

	const combinedPermissions = (permissions ?? []).concat(merchantRights ?? []);

	const [isOpened, setIsOpened] = useState(false);
	const [closing, setClosing] = useState(false);
	const handleSetIsOpened = useCallback(() => {
		if (isOpened) {
			setClosing(true);
			setTimeout(() => {
				setIsOpened(false);
				setClosing(false);
			}, 400);
		} else {
			setIsOpened(true);
		}
	}, [isOpened]);

	const allowedItems = useMemo(
		() => items && items.filter(getAccessibleItems(combinedPermissions)),
		[combinedPermissions, items]
	);

	const handleHideSidebar = useCallback(() => {
		if (deviceServiceContext.isTablet || deviceServiceContext.isMobile) {
			sideBarContext.handleOnForceHideSideBar();
		}
	}, [deviceServiceContext, sideBarContext]);

	return (
		<Animate
			type="fadeIn"
			duration="2200ms"
			delay={`${delay}ms`}
			style={{ width: '100%' }}
		>
			<div
				className={cx('sidebar-toggable-item', className, {
					'is-open': isOpened || closing,
				})}
			>
				{items !== undefined && (
					<>
						<div
							className="toggle-click-panel"
							onClick={handleSetIsOpened}
						>
							<MainIcon className="sidebar-toggable-item-icon" />
							<div
								style={{ fontFamily: "'Zen Dots', cursive" }}
								className="sidebar-toggable-item-title"
							>
								{t({ id: title })}
							</div>
							<FaWindowClose
								className="sidebar-toggable-item-icon-toggle"
								style={{
									opacity: isOpened && !closing ? 1 : 0,
								}}
							/>
						</div>
						{(isOpened || closing) && (
							<div className="toggle-content-panel">
								{(allowedItems ?? []).map((item, key) => (
									<Animate
										type={closing ? 'fadeOutToLeft' : 'fadeInFromLeft'}
										duration="600ms"
										key={key}
										style={{ width: '90%' }}
									>
										{isSideBarMenuItemLeaf(item) ? (
											<SideBarItem
												{...item}
												customIconSize={18}
												customFontSize={10}
											/>
										) : (
											<SideBarToggableItem {...item} />
										)}
									</Animate>
								))}
							</div>
						)}
					</>
				)}
				{items === undefined && url !== undefined && (
					<Link
						to={url}
						className="toggle-click-panel"
						onClick={handleHideSidebar}
						style={{ textDecoration: 'none' }}
					>
						<MainIcon className="sidebar-toggable-item-icon" />
						<div
							style={{ fontFamily: "'Zen Dots', cursive" }}
							className="sidebar-toggable-item-title"
						>
							{t({ id: title })}
						</div>
					</Link>
				)}
			</div>
		</Animate>
	);
};

export default SideBarToggableItem;
