import { FC, useContext } from 'react';
import SingleEditFormContextProvider from 'Components/SingleEditForm/context';
import { LocalizationContext } from 'Services/LocalizationService';

import SupplierAddressContextProvider from './SupplierAddressContext';
import SupplierDataContextProvider from './SupplierDataContext';
import BankData from './BankData';
import ContactData from './ContactData';
import Credentials from './Credentials';
import DeliveryData from './DeliveryData';
import InvoiceData from './InvoiceData';
import Profile from './Profile';

const SettingsPage: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<div className="p-3">
			<SingleEditFormContextProvider>
				<Credentials />

				<SupplierDataContextProvider>
					<Profile />

					<h2 className="mt-3">{t({ id: 'settings.heading.seller' })}</h2>
					<InvoiceData />
					<BankData />

					<SupplierAddressContextProvider>
						<ContactData />
					</SupplierAddressContextProvider>

					<DeliveryData />
				</SupplierDataContextProvider>
			</SingleEditFormContextProvider>
		</div>
	);
};

export default SettingsPage;
