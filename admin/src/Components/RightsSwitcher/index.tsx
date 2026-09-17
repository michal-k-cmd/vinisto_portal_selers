import { CFormLabel, CFormSwitch } from '@coreui/react';

import { RightsSwitcherProps } from './interfaces';

const RightsSwitcher = ({
	permissionId,
	checked,
	onToggle,
}: RightsSwitcherProps) => {
	return (
		<>
			<CFormSwitch
				onChange={() => onToggle(permissionId)}
				checked={checked}
				id={permissionId}
			/>
			<CFormLabel htmlFor={permissionId}>{permissionId}</CFormLabel>
		</>
	);
};

export default RightsSwitcher;
