import { ReactNode, useContext } from 'react';
import cx from 'classnames';
import Container from 'Components/View/Container';
import basketStyles from 'pages-spa/Basket/styles.module.css';
import BasketSummary from 'pages-spa/Basket/Components/BasketSummary';
import { UseQueryResult } from '@tanstack/react-query';
import { LocalizationContext } from 'Services/LocalizationService';
import { useIsB2b } from 'Services/PlatformService';

import Address from '../Components/Address';
import { AddressType } from '../Components/Address/interfaces';

import styles from './styles.module.css';

import { Order } from '@/domain/order';

interface LayoutProps {
	children: ReactNode;
	orderQuery: UseQueryResult<void | Order | null, unknown>;
}

const Layout = ({ children, orderQuery }: LayoutProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();
	const isB2b = useIsB2b();

	const delivery = orderQuery.data?.delivery;

	const deliveryAdress =
		delivery?.deliveryAddress ?? delivery?.pickupPoint?.address;
	const deliveryPhone =
		delivery?.pickupPoint != null
			? delivery.pickupPoint.phone
			: delivery?.deliveryAddress?.phone;

	const deliveryEmail =
		delivery?.pickupPoint != null
			? delivery.pickupPoint.email
			: delivery?.deliveryAddress?.email;

	const billingAddress = orderQuery.data?.billingAddress;

	return (
		<section id="content-wrapper">
			<Container
				className={cx(
					basketStyles.basketContainer,
					isB2b && styles.b2bPrintLayout
				)}
			>
				<div className={basketStyles.mainBasketArea}>
					{children}
					<h2 className={cx(styles.subtitle, isB2b && styles.b2bPrintHidden)}>
						{t({
							id: 'orderConfirmation.orderSummary.address.deliveryShipping.title',
						})}
					</h2>
					<div
						className={cx(styles.addresses, isB2b && styles.b2bPrintAddresses)}
					>
						<Address
							addressData={deliveryAdress}
							addressType={AddressType.DELIVERY}
							addressPhone={deliveryPhone}
							addressEmail={deliveryEmail}
						/>
						<Address
							addressData={billingAddress}
							addressType={AddressType.BILLING}
							addressPhone={billingAddress?.phone}
							addressEmail={billingAddress?.email}
						/>
					</div>
				</div>

				<BasketSummary
					orderQuery={orderQuery}
					showButton={false}
				/>
			</Container>
		</section>
	);
};

export default Layout;
