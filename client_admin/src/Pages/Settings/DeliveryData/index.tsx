import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import { SupplierDataContext } from '../SupplierDataContext';

import DeliveryAddresseeForm from './Addressee';
import DeliveryCityForm from './City';
import DeliveryCountryCodeForm from './CountryCode';
import DeliveryTypeForm from './DeliveryType';
import DeliveryEmailForm from './Email';
import DeliveryHouseNumberForm from './HouseNumber';
import DeliveryLandRegistryNumberForm from './LandRegistryNumber';
import DeliveryNoteForm from './Note';
import DeliveryPhoneForm from './Phone';
import DeliveryStreetForm from './Street';
import DeliveryTitleForm from './Title';
import DeliveryZipForm from './Zip';

const DeliveryData: FC = () => {
	const localizationContext = useContext(LocalizationContext);
	const supplieDataContext = useContext(SupplierDataContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section
			className="vinisto-card"
			id="shipping-method"
		>
			<header>
				<h3>{t({ id: 'settings.heading.seller.delivery' })}</h3>
			</header>
			<DeliveryTypeForm />
			{!supplieDataContext.isShipping && (
				<>
					<DeliveryTitleForm />
					<DeliveryAddresseeForm />
					<DeliveryPhoneForm />
					<DeliveryEmailForm />
					<DeliveryStreetForm />
					<DeliveryLandRegistryNumberForm />
					<DeliveryHouseNumberForm />
					<DeliveryCityForm />
					<DeliveryZipForm />
					<DeliveryCountryCodeForm />
					<DeliveryNoteForm />
				</>
			)}
		</section>
	);
};

export default DeliveryData;
