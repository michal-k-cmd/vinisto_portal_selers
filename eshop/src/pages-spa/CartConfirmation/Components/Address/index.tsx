import { useContext } from 'react';
import Skeleton from 'react-loading-skeleton';
import {
	AddressType,
	IAddressProps,
} from 'pages-spa/CartConfirmation/Components/Address/interfaces';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

const Address = ({
	addressData,
	addressPhone,
	addressEmail,
	addressType,
}: IAddressProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const isLoading = addressData === null;

	if (addressData === null || addressData === undefined) return null;

	return (
		<div>
			<div className={styles.addressTitle}>
				{isLoading ? (
					<Skeleton width="140px" />
				) : addressType === AddressType.DELIVERY ? (
					t({
						id: 'orderConfirmation.orderSummary.address.delivery.title',
					})
				) : (
					addressType === AddressType.BILLING &&
					t({
						id: 'orderConfirmation.orderSummary.address.billing.title',
					})
				)}
			</div>
			{isLoading ? (
				<Skeleton
					count={5.6}
					width="75%"
				/>
			) : (
				<div className={styles.addressContent}>
					{addressType === AddressType.BILLING && addressData.ico && (
						<div>{addressData.ico}</div>
					)}
					{addressData.company && <div>{addressData.company}</div>}
					<div>
						{(addressData.name !== undefined || null) &&
							`${addressData.name} ${addressData.surname}`}
					</div>
					<div>{addressEmail}</div>
					<div>{addressPhone}</div>
					<div>
						{addressData.street}
						<span>
							{` ${
								addressData.houseNumber !== null
									? addressData.landRegistryNumber +
									  '/' +
									  addressData.houseNumber
									: addressData.landRegistryNumber
							}`}
						</span>
					</div>
					<div>{addressData.city}</div>
					<div>{addressData.zip}</div>
					{addressType === AddressType.BILLING && addressData.dic && (
						<div>{addressData.dic}</div>
					)}
				</div>
			)}
		</div>
	);
};

export default Address;
