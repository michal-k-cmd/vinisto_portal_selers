import { useContext } from 'react';
import { FaExclamation } from 'react-icons/fa';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';

import { DetailItem } from './interfaces';
import { getFormatedValueByType } from './helpers';

import './styles.css';

/**
 * @param label - renders label of the item
 * @param value - renders value of the item
 * @param icon - renders icon of the item or fallback icon if disableFallbackIcon is false
 * @param type - i think this is data type used for formatting value
 * @param disableFallbackIcon - if true, fallback icon will not be rendered
 * @param visible - if false, item will not be rendered
 */
const AdminDetailItem = ({
	label,
	value,
	icon = FaExclamation,
	type,
	disableFallbackIcon = false,
	visible = true,
}: DetailItem) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const { isMobile } = useContext(DeviceServiceContext);

	if (!visible) return null;

	const MainIcon = icon;

	return (
		<div className={`admin-detail-item ${isMobile ? 'd-inline-block' : ''}`}>
			{!disableFallbackIcon && (
				<MainIcon
					className={`admin-detail-icone ${isMobile ? 'd-inline-block' : ''}`}
				/>
			)}
			<div
				className={`admin-detail-label ${
					isMobile ? 'd-inline-block h-auto' : ''
				}`}
			>
				{t({ id: label })}
			</div>
			<div
				className={`admin-detail-value ${
					isMobile ? 'd-inline-block w-auto p-0' : ''
				}`}
			>
				{getFormatedValueByType(value, type, t)}
			</div>
		</div>
	);
};

export default AdminDetailItem;
