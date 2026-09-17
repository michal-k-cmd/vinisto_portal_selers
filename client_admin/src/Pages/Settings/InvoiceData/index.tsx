import { FC, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import IdNumberForm from './IdNumber';
import SupplierNameForm from './SupplierName';
import VatinForm from './Vatin';

const InvoiceData: FC = () => {
	const localizationContext = useContext(LocalizationContext);

	const t = localizationContext.useFormatMessage();

	return (
		<section className="vinisto-card mb-3">
			<header>
				<h3>{t({ id: 'settings.heading.seller.invoice' })}</h3>
			</header>
			<SupplierNameForm />
			<IdNumberForm />
			<VatinForm />
		</section>
	);
};

export default InvoiceData;
