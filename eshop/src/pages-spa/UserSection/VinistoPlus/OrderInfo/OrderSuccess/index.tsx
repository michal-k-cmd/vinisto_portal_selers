import { lazy, Suspense, useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';
const BigGreenOkIcon = lazy(() => import('Components/Icons/BigGreenOk'));
import Loader from 'Components/View/Loader';

import { OrderProps } from '../interfaces';
import OrderItem from '../OrderItem';
import InvoiceAddress from '../InvoiceAddress';

import styles from './styles.module.css';

import { AddonType } from '@/api-types/addons-api';

const OrderSuccess = ({ order }: OrderProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	const subscriptions = order.addons?.filter(
		(addon) =>
			addon.addon?.type === AddonType.SubscriptionMonth.toString() ||
			addon.addon?.type === AddonType.SubscriptionYear.toString()
	);

	return (
		<div className={styles.wrap}>
			<Suspense fallback={<Loader blank />}>
				<BigGreenOkIcon
					alt=""
					title=""
					className={styles.icon}
				/>
			</Suspense>
			<h1 className={styles.heading}>
				{t({ id: 'userSection.vinistoplus.orderSuccess' })}
			</h1>
			<div>
				{subscriptions?.map((addon) => (
					<OrderItem
						key={addon.addon?.id}
						addonItem={addon}
					/>
				))}
			</div>
			<div className={styles.content}>
				<p className={styles.text}>
					<strong>{t({ id: 'userSection.vinistoplus.success.ok' })}</strong>
					<br />
					{t({ id: 'userSection.vinistoplus.success.questions' })}
				</p>
				<div className={styles.buttonWrap}>
					<a
						href="/"
						className={styles.repeatButton}
					>
						{t({ id: 'userSection.vinistoplus.success.goShopping' })}
					</a>
				</div>
			</div>
			<InvoiceAddress order={order} />
		</div>
	);
};

export default OrderSuccess;
