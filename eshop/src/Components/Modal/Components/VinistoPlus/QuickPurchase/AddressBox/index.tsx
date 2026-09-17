// import DeleteBinSmallIcon from 'Components/Icons/DeleteBinSmall';
import EditSmallIcon from 'Components/Icons/EditSmall';
import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCountryCode } from '@/api-types/product-api';
import { VinistoAuthDllModelsApiBillingInfoBillingInfo } from '@/api-types/user-api';

interface BillingAddressBoxProps {
	billingAddress: VinistoAuthDllModelsApiBillingInfoBillingInfo;
	handleOnEdit: () => void;
}

const BillingAddressBox = ({
	billingAddress,
	handleOnEdit,
}: BillingAddressBoxProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.component}>
			<div className={styles.actionButtons}>
				<button
					type="button"
					aria-label="edit"
					onClick={handleOnEdit}
				>
					<EditSmallIcon />
				</button>
			</div>
			{billingAddress.title && (
				<div className={styles.title}>{billingAddress.title}</div>
			)}
			{billingAddress.ico && <div>{billingAddress.ico}</div>}
			{billingAddress?.company && <div>{billingAddress.company}</div>}
			{(billingAddress?.name || billingAddress?.surname) && (
				<div>{`${billingAddress?.name} ${billingAddress?.surname}`}</div>
			)}
			{billingAddress?.email && (
				<div>
					<span>{`${String(billingAddress.email).split('@')?.[0]}@`}</span>
					<span className="d-inline-block">{`${
						String(billingAddress.email).split('@')?.[1]
					}`}</span>
				</div>
			)}
			{billingAddress?.phone && (
				<div>{String(billingAddress.phone).replace(/(\+?\d{3})/g, '$1 ')}</div>
			)}
			{billingAddress?.street && (
				<div>
					{billingAddress?.street}
					<span>
						{' '}
						{billingAddress?.houseNumber
							? `${billingAddress?.landRegistryNumber ?? '-'}/${
									billingAddress.houseNumber
							  }`
							: billingAddress.landRegistryNumber ?? '-'}
					</span>
				</div>
			)}
			{billingAddress?.city && <div>{billingAddress.city}</div>}
			{billingAddress?.zip && <div>{billingAddress.zip}</div>}
			{billingAddress?.dic && <div>{billingAddress.dic}</div>}
			{billingAddress?.countryCode && (
				<div>
					{billingAddress.countryCode == VinistoHelperDllEnumsCountryCode.CZ
						? t({ id: 'addressForm.countryCode.CZ.label' })
						: t({ id: 'addressForm.countryCode.SK.label' })}
				</div>
			)}
		</div>
	);
};

export default BillingAddressBox;
