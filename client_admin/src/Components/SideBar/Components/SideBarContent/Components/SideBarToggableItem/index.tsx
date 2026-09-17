import { useCallback, useContext, useState } from 'react';
import { get, map } from 'lodash-es';
import { FaChevronDown, FaChevronUp, FaExclamation } from 'react-icons/fa';
import Animate from 'react-moving-text';
import { LocalizationContext } from 'Services/LocalizationService';

import SideBarItem from '../SideBarItem';

import { ISideBarToogableItemProps } from './interfaces';

import './styles.css';

const SideBarToggableItem = (props: ISideBarToogableItemProps) => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

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

	const MainIcon = get(props, 'icon', FaExclamation);

	if (!get(props, 'items')) {
		return (
			<Animate
				type="fadeIn"
				duration="2200ms"
				delay={`${props.delay}ms`}
				direction="normal"
				timing="ease"
				iteration="1"
				fillMode="none"
				style={{ width: '100%' }}
			>
				<div className="sidebar-toggable-item">
					<SideBarItem
						customIconSize={24}
						customFontSize={12}
						icon={MainIcon}
						title={get(props, 'title', '-')}
						route={get(props, 'route') || '/404'}
					/>
				</div>
			</Animate>
		);
	}

	return (
		<Animate
			type="fadeIn"
			duration="2200ms"
			delay={`${props.delay}ms`}
			direction="normal"
			timing="ease"
			iteration="1"
			fillMode="none"
			style={{ width: '100%' }}
		>
			<div className="sidebar-toggable-item">
				<div
					className="toggle-click-panel"
					onClick={handleSetIsOpened}
				>
					<MainIcon
						className="sidebar-toggable-item-icon"
						style={{ fontSize: '24px' }}
					/>
					<div
						style={{ fontFamily: "'Zen Dots', cursive" }}
						className="sidebar-toggable-item-title"
					>
						{t({ id: get(props, 'title') })}
					</div>
					{isOpened && !closing ? (
						<FaChevronUp
							className="sidebar-toggable-item-icon-toggle"
							style={{ fontSize: '14px' }}
						/>
					) : (
						<FaChevronDown
							className="sidebar-toggable-item-icon-toggle"
							style={{ fontSize: '14px' }}
						/>
					)}
				</div>
				{(isOpened || closing) && (
					<div className="toggle-content-panel">
						{map(props.items, (item, key) => (
							<Animate
								type={closing ? 'fadeOutToLeft' : 'fadeInFromLeft'}
								duration="600ms"
								delay={`${key * 160}ms`}
								direction="normal"
								timing="ease"
								key={`sidebar-item-${key}-${item.route}-${item.modalType}`}
								className="flex-center-item"
								iteration="1"
								fillMode="none"
								style={{ width: '90%' }}
							>
								<SideBarItem
									modalType={get(item, 'action')}
									customIconSize={18}
									customFontSize={10}
									icon={get(item, 'icon', FaExclamation)}
									title={get(item, 'title')}
									route={item.route}
								/>
							</Animate>
						))}
					</div>
				)}
				{(isOpened || closing) && <br />}
			</div>
		</Animate>
	);
};

export default SideBarToggableItem;
