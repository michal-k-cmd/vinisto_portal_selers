'use client';

import { useContext, useMemo } from 'react';
import {
	AddressesApiHooks,
	BillingInfoApiHooks,
} from 'Services/Addresses/hooks';
import { LocalizationContext } from 'Services/LocalizationService';
import userSectionStyles from 'pages-spa/UserSection/styles.module.css';

import BreadCrumbsUserSection from '../Breadcrumbs';

import {
	SKELETONS_NUM_ADDRESSES,
	SKELETONS_NUM_BILLING_INFOS,
} from './constants';
import {
	DELIVERY_ELEMENT_TYPE,
	INVOICE_ELEMENT_TYPE,
} from './Components/AddressAdd/constants';
import { ADDRESS_TYPE } from './Components/Address/interfaces';
import Address from './Components/Address';
import AddressAdd from './Components/AddressAdd';
import styles from './styles.module.css';

const Addresses = () => {
	const localizationContext = useContext(LocalizationContext);
	const t = localizationContext.useFormatMessage();

	const addressesData = AddressesApiHooks.useGetAll();

	const addresses = useMemo(
		() =>
			addressesData.isFetching
				? Array.from({ length: SKELETONS_NUM_ADDRESSES }, (_, index) => ({
						id: `${index}`,
				  }))
				: addressesData.data?.addresses ?? [],
		[addressesData]
	);

	const billingInfosData = BillingInfoApiHooks.useGetAll();

	const billingInfos = useMemo(
		() =>
			billingInfosData.isFetching
				? Array.from({ length: SKELETONS_NUM_BILLING_INFOS }, (_, index) => ({
						id: `${index}`,
				  }))
				: billingInfosData.data?.billingInfos ?? [],
		[billingInfosData]
	);

	return (
		<>
			<BreadCrumbsUserSection />

			<h1 className={userSectionStyles.userSectionMainHeader}>
				{t({ id: 'routes.user-section.addresses.name' })}
			</h1>

			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'userSection.addresses.title' })}
			</h2>
			<div className={styles.addressesWrap}>
				{addresses.map((address, index) => (
					<Address
						key={address.id ?? 'usaddr' + index}
						address={address}
						isLoading={addressesData.isFetching}
						addressType={ADDRESS_TYPE.DELIVERY}
					/>
				))}

				<AddressAdd elementType={DELIVERY_ELEMENT_TYPE} />
			</div>

			<h2 className={userSectionStyles.userSectionHeader}>
				{t({ id: 'userSection.addresses.billingInfo.title' })}
			</h2>
			<div className={styles.addressesWrap}>
				{billingInfos.map((billingInfo, index) => (
					<Address
						key={billingInfo.id ?? 'usbillinf' + index}
						address={billingInfo}
						isLoading={billingInfosData.isFetching}
						addressType={ADDRESS_TYPE.INVOICE}
					/>
				))}

				<AddressAdd elementType={INVOICE_ELEMENT_TYPE} />
			</div>
		</>
	);
};

const WithRequireAuth = () => {
	return <Addresses />;
};

export default WithRequireAuth;
