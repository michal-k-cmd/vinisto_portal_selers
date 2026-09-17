import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import ContactAddresseeForm from './Addressee';
import ContactCityForm from './City';
import ContactCountryCodeForm from './CountryCode';
import ContactEmailForm from './Email';
import ContactHouseNumberForm from './HouseNumber';
import ContactLandRegistryNumberForm from './LandRegistryNumber';
import ContactNoteForm from './Note';
import ContactPhoneForm from './Phone';
import ContactStreetForm from './Street';
import ContactTitleForm from './Title';
import ContactZipForm from './Zip';

const ContactData: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section className="vinisto-card mb-3">
			<header>
				<h3>{t({ id: 'settings.heading.seller.contact' })}</h3>
			</header>
			<ContactTitleForm />
			<ContactAddresseeForm />
			<ContactPhoneForm />
			<ContactEmailForm />
			<ContactStreetForm />
			<ContactLandRegistryNumberForm />
			<ContactHouseNumberForm />
			<ContactCityForm />
			<ContactZipForm />
			<ContactCountryCodeForm />
			<ContactNoteForm />
		</section>
	);
};

export default ContactData;
