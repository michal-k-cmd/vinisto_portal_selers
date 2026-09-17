import * as React from 'react';
import { CFormLabel, CFormSwitch } from '@coreui/react';

import './styles.css';

const RemberContent: React.FC = (): JSX.Element => {
	const [checked, setChecked] = React.useState(false);

	const handleOnCheck = () => {
		setChecked(!checked);
	};
	return (
		<div className="remember-content">
			<CFormLabel>Remember me</CFormLabel>
			<br />
			<CFormSwitch
				onChange={() => handleOnCheck()}
				checked={checked}
			/>
		</div>
	);
};

export default RemberContent;
