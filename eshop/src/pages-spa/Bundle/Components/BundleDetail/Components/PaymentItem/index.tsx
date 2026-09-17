import { VinistoOrderDllModelsApiPaymentPayment } from 'vinisto_api_client/src/api-types/order-api';
import useLocalizedValue from 'Hooks/useLocalizedValue';

import styles from './styles.module.css';

const PaymentItem = ({
	payment,
}: {
	payment: VinistoOrderDllModelsApiPaymentPayment;
}) => {
	const getLocalizedValue = useLocalizedValue();

	if (!payment?.image?.domainUrls?.original_png) return;

	return (
		<div className={styles.paymentItem}>
			<img
				src={payment.image.domainUrls.original_png}
				className={styles.paymentItemImage}
				alt={getLocalizedValue(payment.name ?? [])}
				height="24"
				width="auto"
			/>
		</div>
	);
};

export default PaymentItem;
