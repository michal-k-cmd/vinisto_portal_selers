'use client';

import React, { useContext, useMemo } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
import dayjs from 'dayjs';
import getBundleImage, { IMAGE_SIZE_THUMB_64x80 } from 'Helpers/getBundleImage';
import { useGetDeliveriesByBasket } from 'Hooks/useGetDeliveries';
import { AuthenticationContext } from 'Services/AuthenticationService/context';
import { DeliveryData } from 'pages-spa/CartShippingPayment';
import { filter, orderBy } from 'lodash-es';
import { BasketItemProps } from 'pages-spa/Basket/Components/BasketItem/interfaces';

import DeliveryList from '../../DeliveryList';

import styles from './styles.module.css';

import { VinistoHelperDllEnumsCurrency } from '@/api-types/product-api';

type Props = {
	sequenceNumber: number;
	items: BasketItemProps['item'][];
	currency: VinistoHelperDllEnumsCurrency;
};

const SplittedPackage = ({ sequenceNumber, items }: Props) => {
	const { useFormatMessage, activeCurrency, countryOfSale } =
		useContext(LocalizationContext);

	const t = useFormatMessage();

	const { basketId } = useContext(AuthenticationContext);

	const deliveriesByBasketQuery = useGetDeliveriesByBasket(
		{
			currency: activeCurrency.currency,
			allowedCountry: countryOfSale,
			basketId,
		},
		{
			enabled: Boolean(basketId),
		}
	);

	const deliveries: DeliveryData[] = useMemo(() => {
		if (!deliveriesByBasketQuery.isFetched) return [];

		const activeDeliveries = orderBy<DeliveryData>(
			filter(deliveriesByBasketQuery.data ?? [], 'isActive'),
			'order',
			'asc'
		);

		return activeDeliveries;
	}, [deliveriesByBasketQuery.isFetched, deliveriesByBasketQuery.data]);

	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.sequenceNumber}>
					{t(
						{
							id: 'splittedDelivery.package.sequence',
							defaultMessage: `Zásilka ${sequenceNumber}`,
						},
						{
							sequenceNumber,
						}
					)}
				</div>
				<div className={styles.deliveryDate}>
					{t({
						id: 'splittedDelivery.package.deliveryDate',
						defaultMessage: 'Termín doručení:',
					})}
					<span>{dayjs().add(1, 'day').format('D. M. YYYY')}</span>
				</div>
			</div>
			<div className={styles.bundlesWrapper}>
				{items.map((item) => (
					<div
						key={item.itemId}
						className={styles.bundle}
					>
						<img
							src={getBundleImage(
								item.bundle?.images ?? [],
								IMAGE_SIZE_THUMB_64x80
							)}
							alt={`${t({ id: 'alt.bundleImage' })}`}
						/>
						<span className={styles.quantity}>{item.quantity}</span>
					</div>
				))}
			</div>
			<div className={styles.items}>
				{deliveriesByBasketQuery.isFetched &&
					deliveries?.length === 0 &&
					t({
						id: 'cartShippingPayment.deliveryList.empty',
					})}
				<DeliveryList
					deliveries={deliveries}
					isDeliveriesLoading={deliveriesByBasketQuery.isLoading}
				/>
			</div>
		</div>
	);
};

export default SplittedPackage;
