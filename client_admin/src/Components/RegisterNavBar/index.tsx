import { ChangeEvent, useCallback, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import { Link } from 'react-router-dom';
import { VinistoLogoIcon } from 'Components/Icons';

import './styles.css';

const RegisterNavBar = () => {
	const { changeLanguage, activeLanguage } = useContext(LocalizationContext);

	const handleLanguageSwitch = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			changeLanguage(event?.target?.value ?? activeLanguage);
		},
		[activeLanguage, changeLanguage]
	);
	return (
		<div className="register-navbar">
			<Link to="/login">
				<div className="text-center pointer">
					<VinistoLogoIcon alt="Vinisto" />
				</div>
			</Link>
			<div className="vca-navbar__language">
				<select
					name="language"
					id="language"
					defaultValue={activeLanguage}
					value={activeLanguage}
					onChange={handleLanguageSwitch}
				>
					<option value="cz">🇨🇿 Čeština</option>
					<option value="en">🇺🇸 English</option>
					<option value="de">🇩🇪 Deutsch</option>
				</select>
			</div>
		</div>
	);
};

export default RegisterNavBar;
