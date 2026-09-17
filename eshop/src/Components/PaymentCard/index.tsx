import { useContext } from 'react';
import { LocalizationContext } from 'Services/LocalizationService';

import styles from './styles.module.css';

import { SubscriptionCardResponse } from '@/api-types/subscription-api';

interface PaymentCardProps {
	cardData: SubscriptionCardResponse;
}

const PaymentCard = ({ cardData }: PaymentCardProps) => {
	const t = useContext(LocalizationContext).useFormatMessage();

	return (
		<div className={styles.component}>
			<img
				src="/assets/checkout-icons/platebni-kartou-online.svg"
				alt=""
				className={styles.icon}
			/>
			<div>
				<div className={styles.title}>{t({ id: 'paymentCard.online' })}</div>
				<div className={styles.info}>{cardData.realMaskedPan?.slice(-8)}</div>
			</div>
		</div>
	);
};

export default PaymentCard;
