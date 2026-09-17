import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

import { VinistoOrderDllModelsApiOrderOrder } from '@/api-types/order-api';

interface InvoiceAddressProps {
	order: VinistoOrderDllModelsApiOrderOrder;
}

const InvoiceAddress = ({ order }: InvoiceAddressProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const address = order.billingAddress;
	if (!address) return null;

	return (
		<>
			<h2 className={styles.heading}>
				{t({
					id: 'userSection.vinistoplus.invoiceAddress',
				})}
			</h2>
			<div className={styles.address}>
				<p>
					{address.name} {address.surname}
				</p>
				{address.email && <p>{address.email}</p>}
				{address.phone && <p>{address.phone}</p>}
				{address.street && (
					<p>
						{address.street}{' '}
						{address.houseNumber
							? address.landRegistryNumber + '/' + address.houseNumber
							: address.landRegistryNumber}
					</p>
				)}
				{address.city && <p>{address.city}</p>}
				{address.zip && <p>{address.zip}</p>}
			</div>
		</>
	);
};

export default InvoiceAddress;
