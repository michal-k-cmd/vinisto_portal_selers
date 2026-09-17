import * as React from 'react';

import LanguageContent from './Components/LanguageContent';

import './styles.css';

const Settings: React.FC = (): JSX.Element => {
	return (
		<div className="admin-settings">
			<LanguageContent />
		</div>
	);
};

export default Settings;
