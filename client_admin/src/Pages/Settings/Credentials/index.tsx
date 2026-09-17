import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import ChangePassword from './ChangePassword';
import EditEmail from './EditEmail';

const Credentials: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section className="vinisto-card mb-3">
			<header>
				<h2>{t({ id: 'settings.heading.account' })}</h2>
			</header>
			<EditEmail />
			<ChangePassword />
		</section>
	);
};

export default Credentials;
