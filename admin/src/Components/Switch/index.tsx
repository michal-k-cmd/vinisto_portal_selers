import { CFormSwitch } from '@coreui/react';

import { SwitchProps } from './interfaces';

const VinistoSwitch = ({ id, checked, className, onChange }: SwitchProps) => {
	return (
		<CFormSwitch
			onChange={(event) => onChange(event.currentTarget.checked)}
			checked={checked}
			id={id}
			className={className}
		/>
	);
};

export default VinistoSwitch;
