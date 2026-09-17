import { useContext } from 'react';
import cx from 'classnames';
import { LocalizationContext } from 'Services/LocalizationService';
import Link from 'next/link';
import { BasketContext } from 'Services/BasketService';

import { BasketHeaderProps } from './interfaces';
import styles from './styles.module.css';

const BasketHeader = ({ step, basketItemsQuantity }: BasketHeaderProps) => {
	const { handleGoToShippingPayment } = useContext(BasketContext);
	const t = useContext(LocalizationContext).useFormatMessage();

	const isBasket = step === 'basket';
	const isShippingPayment = step === 'shippingAndPayment';
	const isDeliveryDetail = step === 'deliveryDetail';

	return (
		<div className={styles.basketHeader}>
			<Link
				className={cx(
					styles.basketHeaderStep,
					isBasket ? styles.active : styles.semiActive
				)}
				href={`/${t({ id: 'routes.cart.route' })}`}
			>
				<div className={styles.basketHeaderStepNumber}>1</div>
				<div>{t({ id: 'basket' })}</div>
			</Link>
			{basketItemsQuantity > 0 ? (
				<Link
					className={cx(styles.basketHeaderStep, styles.semiActive, {
						[styles.active]: isShippingPayment,
					})}
					href={`/${t({ id: 'routes.cart.shippingPayment.route' })}`}
					onClick={(e) => handleGoToShippingPayment(e)}
				>
					<div className={styles.basketHeaderStepNumber}>2</div>
					<div>{t({ id: 'basket.shippingAndPayment' })}</div>
				</Link>
			) : (
				<div
					className={cx(styles.basketHeaderStep, styles.nonActive)}
					aria-disabled="true"
				>
					<div className={styles.basketHeaderStepNumber}>2</div>
					<div>{t({ id: 'basket.shippingAndPayment' })}</div>
				</div>
			)}
			<div
				className={cx(
					styles.basketHeaderStep,
					isDeliveryDetail && styles.active
				)}
			>
				<div className={styles.basketHeaderStepNumber}>3</div>
				<div>{t({ id: 'basket.deliveryDetail' })}</div>
			</div>
		</div>
	);
};

export default BasketHeader;
