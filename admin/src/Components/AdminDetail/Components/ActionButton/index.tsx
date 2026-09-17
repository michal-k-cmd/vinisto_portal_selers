import { useContext } from 'react';
import { CButton, CCol } from '@coreui/react';
import cx from 'classnames';
import { DeviceServiceContext } from 'Services/DeviceService';
import { LocalizationContext } from 'Services/LocalizationService';

import { ActionButtonProps } from './interfaces';

import './styles.css';

const ActionButton = ({
	onClick,
	icon: ActionButtonIcon,
	disabled,
	label,
	className,
}: ActionButtonProps) => {
	const { isTablet, isMobile } = useContext(DeviceServiceContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<CCol
			xs={12}
			lg={4}
			className={cx('admin-action-buttons-row', {
				'w-auto': isTablet,
			})}
		>
			<CButton
				color="primary"
				onClick={onClick}
				className={cx('px-3 admin-action-button', className, {
					'w-100': isMobile,
				})}
				type="button"
				disabled={disabled}
			>
				{ActionButtonIcon && (
					<ActionButtonIcon className="action-button-icon" />
				)}
				{t({ id: label })}
			</CButton>
		</CCol>
	);
};

export default ActionButton;
