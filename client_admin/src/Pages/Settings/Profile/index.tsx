import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import SupplierNameWebForm from 'Pages/Settings/Profile/SupplierNameWeb';

import CompanyDescriptionForm from './CompanyDescription';
import MainProfileForm from './MainProfile';
import WebsiteForm from './Website';
import WineRegionForm from './WineRegion';

const Profile: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section className="vinisto-card mb-3">
			<header>
				<h2>{t({ id: 'settings.heading.profile' })}</h2>
			</header>
			<SupplierNameWebForm />
			<WebsiteForm />
			<CompanyDescriptionForm />
			<MainProfileForm />
			<WineRegionForm />
		</section>
	);
};

export default Profile;
